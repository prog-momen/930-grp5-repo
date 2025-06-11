<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Validator;

class PaymentApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of payments
     */
    public function index()
    {
        try {
            $user = auth('api')->user();

            if ($user->isAdmin()) {
                $payments = Payment::with(['user', 'course'])->latest()->get();
            } elseif ($user->isInstructor()) {
                // Get all courses where user is instructor
                $instructorCourseIds = $user->courses()->pluck('id');
                $payments = Payment::whereIn('course_id', $instructorCourseIds)
                                   ->with(['user', 'course'])
                                   ->latest()
                                   ->get();
            } else {
                // Student - only their payments
                $payments = Payment::where('user_id', $user->id)
                                   ->with(['course'])
                                   ->latest()
                                   ->get();
            }

            return response()->json([
                'success' => true,
                'data' => $payments
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching payments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created payment
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'course_id' => 'required|uuid|exists:courses,id',
                'amount' => 'required|numeric|min:0',
                'payment_method' => 'nullable|string',
                'transaction_id' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = auth('api')->user();

            // Check if user already has a payment for this course
            $existingPayment = Payment::where('user_id', $user->id)
                                     ->where('course_id', $request->course_id)
                                     ->where('status', 'completed')
                                     ->first();

            if ($existingPayment) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already paid for this course'
                ], 400);
            }

            $payment = Payment::create([
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'course_id' => $request->course_id,
                'amount' => $request->amount,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'transaction_id' => $request->transaction_id,
                'paid_at' => null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment created successfully',
                'data' => $payment->load(['course'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified payment
     */
    public function show($id)
    {
        try {
            $payment = Payment::with(['user', 'course'])->findOrFail($id);
            $user = auth('api')->user();

            // Check authorization
            if (!$user->isAdmin() && $user->id !== $payment->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            return response()->json([
                'success' => true,
                'data' => $payment
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified payment
     */
    public function update(Request $request, $id)
    {
        try {
            $user = auth('api')->user();

            if (!$user->isAdmin()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only admins can update payments'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'course_id' => 'sometimes|required|uuid|exists:courses,id',
                'amount' => 'sometimes|required|numeric|min:0',
                'status' => 'sometimes|required|string|in:pending,completed,failed',
                'payment_method' => 'nullable|string',
                'transaction_id' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $payment = Payment::findOrFail($id);
            $data = $request->only(['course_id', 'amount', 'status', 'payment_method', 'transaction_id']);

            if ($request->status === 'completed') {
                $data['paid_at'] = now();

                // Create enrollment if payment is completed
                $existingEnrollment = Enrollment::where('user_id', $payment->user_id)
                                                ->where('course_id', $payment->course_id)
                                                ->first();

                if (!$existingEnrollment) {
                    Enrollment::create([
                        'user_id' => $payment->user_id,
                        'course_id' => $payment->course_id,
                        'enrollment_date' => now(),
                    ]);
                }
            } elseif ($request->status === 'failed') {
                $data['paid_at'] = null;
            }

            $payment->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Payment updated successfully',
                'data' => $payment->load(['user', 'course'])
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified payment
     */
    public function destroy($id)
    {
        try {
            $user = auth('api')->user();

            if (!$user->isAdmin()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only admins can delete payments'
                ], 403);
            }

            $payment = Payment::findOrFail($id);
            $payment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Payment deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process payment (simulate payment processing)
     */
    public function processPayment(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'payment_method' => 'required|string|in:credit_card,paypal,bank_transfer',
                'transaction_id' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $payment = Payment::findOrFail($id);
            $user = auth('api')->user();

            // Check if user owns this payment
            if ($user->id !== $payment->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            // Simulate payment processing
            $success = rand(1, 10) > 2; // 80% success rate for simulation

            if ($success) {
                $payment->update([
                    'status' => 'completed',
                    'payment_method' => $request->payment_method,
                    'transaction_id' => $request->transaction_id,
                    'paid_at' => now()
                ]);

                // Create enrollment
                $existingEnrollment = Enrollment::where('user_id', $payment->user_id)
                                                ->where('course_id', $payment->course_id)
                                                ->first();

                if (!$existingEnrollment) {
                    Enrollment::create([
                        'user_id' => $payment->user_id,
                        'course_id' => $payment->course_id,
                        'enrollment_date' => now(),
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Payment processed successfully',
                    'data' => $payment->load(['course'])
                ], 200);
            } else {
                $payment->update([
                    'status' => 'failed',
                    'payment_method' => $request->payment_method,
                    'transaction_id' => $request->transaction_id
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Payment processing failed'
                ], 400);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error processing payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's payment history
     */
    public function userPayments()
    {
        try {
            $user = auth('api')->user();

            $payments = Payment::where('user_id', $user->id)
                               ->with(['course'])
                               ->latest()
                               ->get();

            return response()->json([
                'success' => true,
                'data' => $payments
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching user payments',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
