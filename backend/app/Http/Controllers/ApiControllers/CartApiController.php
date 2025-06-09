<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Course;

class CartApiController extends Controller
{
    /**
     * Get cart items
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $cartItems = Session::get('cart_' . $user->id, []);

        $courses = [];
        $total = 0;

        foreach ($cartItems as $courseId => $quantity) {
            $course = Course::with('instructor')->find($courseId);
            if ($course) {
                $courses[] = [
                    'course' => $course,
                    'quantity' => $quantity,
                    'subtotal' => $course->price * $quantity
                ];
                $total += $course->price * $quantity;
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $courses,
                'total' => $total,
                'count' => count($courses)
            ],
            'message' => 'Cart items retrieved successfully'
        ]);
    }

    /**
     * Add course to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
            'quantity' => 'integer|min:1|max:1' // For courses, quantity is usually 1
        ]);

        $user = $request->user();
        $courseId = $request->course_id;
        $quantity = $request->get('quantity', 1);

        // Check if user is already enrolled in this course
        if ($user->enrolledCourses()->where('course_id', $courseId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'You are already enrolled in this course'
            ], 400);
        }

        $cart = Session::get('cart_' . $user->id, []);

        if (isset($cart[$courseId])) {
            return response()->json([
                'success' => false,
                'message' => 'Course already in cart'
            ], 400);
        }

        $cart[$courseId] = $quantity;
        Session::put('cart_' . $user->id, $cart);

        $course = Course::with('instructor')->find($courseId);

        return response()->json([
            'success' => true,
            'data' => [
                'course' => $course,
                'quantity' => $quantity
            ],
            'message' => 'Course added to cart successfully'
        ], 201);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $courseId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:1'
        ]);

        $user = $request->user();
        $cart = Session::get('cart_' . $user->id, []);

        if (!isset($cart[$courseId])) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found in cart'
            ], 404);
        }

        $cart[$courseId] = $request->quantity;
        Session::put('cart_' . $user->id, $cart);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated successfully'
        ]);
    }

    /**
     * Remove course from cart
     */
    public function destroy(Request $request, $courseId)
    {
        $user = $request->user();
        $cart = Session::get('cart_' . $user->id, []);

        if (!isset($cart[$courseId])) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found in cart'
            ], 404);
        }

        unset($cart[$courseId]);
        Session::put('cart_' . $user->id, $cart);

        return response()->json([
            'success' => true,
            'message' => 'Course removed from cart successfully'
        ]);
    }

    /**
     * Clear entire cart
     */
    public function clear(Request $request)
    {
        $user = $request->user();
        Session::forget('cart_' . $user->id);

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully'
        ]);
    }

    /**
     * Get cart count
     */
    public function count(Request $request)
    {
        $user = $request->user();
        $cart = Session::get('cart_' . $user->id, []);
        $count = count($cart);

        return response()->json([
            'success' => true,
            'data' => [
                'count' => $count
            ]
        ]);
    }

    /**
     * Check if course is in cart
     */
    public function check(Request $request, $courseId)
    {
        $user = $request->user();
        $cart = Session::get('cart_' . $user->id, []);
        $inCart = isset($cart[$courseId]);

        return response()->json([
            'success' => true,
            'data' => [
                'inCart' => $inCart
            ]
        ]);
    }
}
