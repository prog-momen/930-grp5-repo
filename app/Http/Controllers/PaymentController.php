<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // الأدمن يشوف كل الدفعات، واليوزر يشوف دفعاته فقط
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            $payments = Payment::with(['user', 'course'])->latest()->get();
        } elseif ($user->isInstructor()) {
            // جيب كل الكورسات يلي هو الانستركتر تبعها
            $instructorCourseIds = $user->courses()->pluck('id');
            // جيب كل الدفعات التابعة لهاي الكورسات
            $payments = Payment::whereIn('course_id', $instructorCourseIds)
                               ->with(['user', 'course'])
                               ->latest()
                               ->get();
        } else {
            // الطالب - فقط مدفوعاته
            $payments = Payment::where('user_id', $user->id)
                               ->with(['course'])
                               ->latest()
                               ->get();
        }

        return view('payments.index', compact('payments'));
    }


    public function create(Request $request)
{
    $course = Course::findOrFail($request->course_id);
    $student = User::findOrFail($request->student_id);

    return view('payments.create', compact('course', 'student'));
}

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
            'amount' => 'required|numeric',
        ]);

        Payment::create([
            'id' => (string) Str::uuid(),
            'user_id' => auth()->id(),
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'status' => 'pending',
            'paid_at' => null,
        ]);

        return redirect()->route('payments.index')->with('success', 'Payment created!');
    }

    public function show(Payment $payment)
    {
        if (!auth()->user()->isAdmin() && auth()->id() !== $payment->user_id) {
            abort(403, 'Unauthorized');
        }

        return view('payments.show', compact('payment'));
    }

    public function edit(Payment $payment)
    {
        if (!auth()->user()->isAdmin() && auth()->id() !== $payment->user_id) {
            abort(403, 'Unauthorized');
        }

        $courses = Course::all();
        return view('payments.edit', compact('payment', 'courses'));
    }


    public function update(Request $request, Payment $payment)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
            'amount' => 'required|numeric',
            'status' => 'required|string|in:pending,completed,failed',
        ]);

        $data = $request->only(['course_id', 'amount', 'status']);

        if ($request->status === 'completed') {
            $data['paid_at'] = now();

            // إنشاء الانرولمنت إذا لم يكن موجودًا مسبقًا
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
        } else {
            $data['paid_at'] = null;
        }

        $payment->update($data);

        return redirect()->route('payments.index')->with('success', 'Payment updated!');
    }

    public function destroy(Payment $payment)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $payment->delete();
        return redirect()->route('payments.index')->with('success', 'Payment deleted!');
    }
}
