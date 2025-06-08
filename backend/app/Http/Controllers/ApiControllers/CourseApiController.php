<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;

class CourseApiController extends Controller
{
    public function enrolled()
    {
        $user = auth()->user();
        $courses = $user->enrolledCourses()->get();

        if ($courses->isEmpty()) {
            return response()->json([
                'status' => 'success',
                'courses' => []
            ], 204); // No Content
        }

        return response()->json([
            'status' => 'success',
            'courses' => $courses
        ], 200); // OK
    }

    public function index()
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
            return response()->json([
                'status' => 'success',
                'courses' => []
            ], 204); // No Content
        }

        return response()->json([
            'status' => 'success',
            'courses' => $courses
        ], 200); // OK
    }

    public function create()
    {
        $user = auth()->user();
        $instructors = [];

        if (strtolower($user->role) === 'admin') {
            $instructors = User::where('role', 'instructor')->get();
        }

        return response()->json([
            'status' => 'success',
            'instructors' => $instructors
        ], 200); // OK
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        $course = Course::create([
            'id' => (string) Str::uuid(),
            'title' => $validated['title'],
            'info' => $validated['info'] ?? null,
            'category' => $validated['category'] ?? null,
            'price' => $validated['price'],
            'instructor_id' => $validated['instructor_id'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Course created successfully.',
            'course' => $course
        ], 201); // Created
    }

    public function show($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found.'
            ], 404); // Not Found
        }

        return response()->json([
            'status' => 'success',
            'course' => $course
        ], 200); // OK
    }

    public function edit($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found.'
            ], 404); // Not Found
        }

        $teachers = User::where('role', 'instructor')->get();

        return response()->json([
            'status' => 'success',
            'course' => $course,
            'teachers' => $teachers
        ], 200); // OK
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        $course->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Course updated successfully.',
            'course' => $course
        ], 200); // OK
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Course deleted successfully.'
        ], 200); // OK
    }
}
