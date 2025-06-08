<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;

class CourseController extends Controller
{
    public function enrolled()
    {
        $user = auth()->user();

        $courses = $user->enrolledCourses()->get();

        return view('courses.enrolled', compact('courses'));
    }

    public function index()
    {
        $courses = Course::all();
        return view('courses.index', compact('courses'));
    }

    public function create()
    {
        $user = auth()->user();

        $instructors = [];
        if (strtolower($user->role) === 'admin') {
            $instructors = User::where('role', 'instructor')->get();
        }

        return view('courses.create', compact('instructors'));
    }



    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        Course::create([
            'id' => (string) Str::uuid(),
            'title' => $request->title,
            'info' => $request->info,
            'category' => $request->category,
            'price' => $request->price,
            'instructor_id' => $request->instructor_id,
        ]);

        return redirect()->route('courses.index')->with('success', 'Course created successfully.');
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return view('courses.show', compact('course'));
    }

    public function edit($id)
    {
        $course = Course::findOrFail($id);

        $teachers = User::where('role', 'instructor')->get();

        return view('courses.edit', compact('course', 'teachers'));
    }


    public function update(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        $course->update($request->all());

        return redirect()->route('courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
