<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment; // مفرد، وهذا صحيح

class EnrollmentsController extends Controller
{
    public function index()
    {
        // جلب السجلات مرتبة نزولاً وعرضها مع pagination
        $enrollments = Enrollment::orderBy('created_at', 'desc')->paginate(10);

        return view('enrollments.index', compact('enrollments'));
    }

    public function create()
    {
        $data['enrollment'] = new Enrollment(); // مفرد

        $data['route'] = 'dataEnrollments.store';
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Enrollment';
        $data['submitButton'] = 'Submit';

        return view('enrollments.form_enrollments', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'enrollment_date' => 'required|date',
            'enrollment_topic' => 'required|string|max:255',
        ]);

        $enrollment = new Enrollment();
        $enrollment->name = $request->name;
        $enrollment->enrollment_date = $request->enrollment_date;
        $enrollment->enrollment_topic = $request->enrollment_topic;
        $enrollment->save();

        return redirect()->route('dataEnrollments.create')->with('success', 'Enrollment created successfully.');
    }
}
