<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    // عرض قائمة التقارير
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'Admin') {
            $reports = Report::orderBy('created_at', 'desc')->paginate(10);
        } else {
            $reports = Report::where('reporter_id', $user->id)
                             ->orderBy('created_at', 'desc')
                             ->paginate(10);
        }

        return view('reports.index', compact('reports'));
    }

    // عرض نموذج إنشاء تقرير
    public function create()
    {
        $data['report'] = new Report();
        $data['route'] = 'reports.store';
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Report';
        $data['submitButton'] = 'Submit';

        $data['types'] = [
            'technical_issue' => 'Technical Issue',
            'become_instructor' => 'Become Instructor',
            'certificate_request' => 'Certificate Request',
        ];

        $data['statuses'] = [
            'pending' => 'Pending',
            'reviewed' => 'Reviewed',
            'resolved' => 'Resolved',
        ];

        return view('reports.form_report', $data);
    }

    // تخزين تقرير جديد
    public function store(Request $request)
    {
        $rules = [
            'reporter_id' => 'required|exists:users,id',
            'type' => 'required|in:technical_issue,become_instructor,certificate_request,lesson_issue',
            'message' => 'nullable|string',
        ];

        if ($request->type === 'become_instructor') {
            $rules = array_merge($rules, [
                'full_name' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'email' => 'required|email',
                'whatsapp' => 'nullable|string|max:20',
                'cv_pdf' => 'required|file|mimes:pdf|max:2048',
            ]);
        } elseif ($request->type === 'technical_issue') {
            $rules['course_id'] = 'required|exists:courses,id';
        } elseif ($request->type === 'lesson_issue') {
            $rules['lesson_id'] = 'required|exists:lessons,id';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('cv_pdf')) {
            $path = $request->file('cv_pdf')->store('cvs', 'public');
            $validated['cv_pdf_path'] = $path;
        }

        Report::create($validated);

        return redirect()->back()->with('success', 'Report submitted successfully.');
    }

    // عرض تقرير معين
    public function show($id)
    {
        $report = Report::findOrFail($id);
        $user = Auth::user();

        // السماح فقط للمستخدم صاحب التقرير أو الأدمن
        if ($user->id !== $report->reporter_id && $user->role !== 'Admin') {
            return redirect()->route('reports.index')->with('error', 'Access denied.');
        }

        return view('reports.show', compact('report'));
    }

    // صفحة تعديل تقرير (للأدمن فقط)
    public function edit($id)
    {
        $report = Report::findOrFail($id);
        $user = Auth::user();

        if ($user->role !== 'Admin') {
            return redirect()->route('reports.show', $id)
                             ->with('error', 'You do not have permission to edit this report.');
        }

        $data['report'] = $report;
        $data['route'] = ['reports.update', $id];
        $data['method'] = 'put';
        $data['titleForm'] = 'Edit Report Status';
        $data['submitButton'] = 'Update Status';

        $data['statuses'] = [
            'pending' => 'Pending',
            'reviewed' => 'Reviewed',
            'resolved' => 'Resolved',
        ];

        // مفتاح يخبر الفورم أن التعديل مقتصر على حالة التقرير فقط
        $data['editStatusOnly'] = true;

        return view('reports.form_report', $data);
    }


    // تحديث تقرير (للأدمن فقط)
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if ($user->role !== 'Admin') {
            return redirect()->route('reports.show', $id)
                             ->with('error', 'You do not have permission to update this report.');
        }

        // إذا التعديل مقتصر على الحالة فقط (مثلاً استدعاء من الفورم الجديد)
        if ($request->has('status') && !$request->has('type')) {
            $request->validate([
                'status' => 'required|in:pending,reviewed,resolved',
            ]);

            $report = Report::findOrFail($id);
            $report->update([
                'status' => $request->status,
            ]);

            return redirect()->route('reports.show', $id)
                             ->with('success', 'Report status updated successfully.');
        }
    }
    // صفحة طلب Become Instructor
    public function createBecomeInstructor()
    {
        return view('reports.become_instructor');
    }

    // تخزين طلب Become Instructor
    public function storeBecomeInstructor(Request $request)
    {
        $request->validate([
            'message' => 'nullable|string|max:1000',
        ]);

        $exists = Report::where('reporter_id', Auth::id())
                        ->where('type', 'become_instructor')
                        ->first();

        if ($exists) {
            return back()->with('error', 'You already submitted a request.');
        }

        Report::create([
            'reporter_id' => Auth::id(),
            'type' => 'become_instructor',
            'message' => $request->message,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Your request has been submitted.');
    }

    // الموافقة على طلب Become Instructor
    public function approveInstructor($id)
    {
        $report = Report::findOrFail($id);

        if ($report->type !== 'become_instructor') {
            return back()->with('error', 'Invalid request type.');
        }

        $report->update([
            'status' => 'resolved',
        ]);

        $report->reporter->update([
            'role' => 'instructor',
        ]);

        return back()->with('success', 'User promoted to instructor.');
    }

    // عرض طلبات Become Instructor (Admin)
    public function listInstructorRequests()
    {
        $requests = Report::where('type', 'become_instructor')
                          ->orderBy('created_at', 'desc')
                          ->paginate(10);

        return view('reports.instructor_requests', compact('requests'));
    }
}
