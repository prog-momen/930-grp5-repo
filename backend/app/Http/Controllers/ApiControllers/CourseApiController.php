<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseApiController extends Controller
{
    /**
     * Display a listing of courses
     */
    public function index(Request $request)
    {
        $query = Course::with('instructor');

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('info', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('category', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Category filter
        if ($request->has('category') && !empty($request->category)) {
            $query->where('category', $request->category);
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 12);
        $courses = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $courses,
            'message' => 'Courses retrieved successfully'
        ]);
    }

    /**
     * Get popular courses
     */
    public function popular()
    {
        $courses = Course::with('instructor')
            ->withCount('enrollments')
            ->orderBy('enrollments_count', 'desc')
            ->limit(8)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
            'message' => 'Popular courses retrieved successfully'
        ]);
    }

    /**
     * Get course categories
     */
    public function categories()
    {
        $categories = Course::select('category')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ]);
    }

    /**
     * Display the specified course
     */
    public function show($id)
    {
        $course = Course::with(['instructor', 'lessons', 'reviews.user'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $course,
            'message' => 'Course retrieved successfully'
        ]);
    }

    /**
     * Store a newly created course
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        $course = Course::create([
            'id' => (string) Str::uuid(),
            'title' => $request->title,
            'info' => $request->info,
            'category' => $request->category,
            'price' => $request->price,
            'instructor_id' => $request->instructor_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $course,
            'message' => 'Course created successfully'
        ], 201);
    }

    /**
     * Update the specified course
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'info' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
        ]);

        $course->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $course,
            'message' => 'Course updated successfully'
        ]);
    }

    /**
     * Remove the specified course
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }

    /**
     * Get user's enrolled courses
     */
    public function enrolled(Request $request)
    {
        $user = $request->user();
        $courses = $user->enrolledCourses()->with('instructor')->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
            'message' => 'Enrolled courses retrieved successfully'
        ]);
    }

    /**
     * Enroll user in a course
     */
    public function enroll(Request $request, $courseId)
    {
        $user = $request->user();
        $course = Course::findOrFail($courseId);

        // Check if already enrolled
        if ($user->enrolledCourses()->where('course_id', $courseId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Already enrolled in this course'
            ], 400);
        }

        $user->enrolledCourses()->attach($courseId);

        return response()->json([
            'success' => true,
            'message' => 'Successfully enrolled in course'
        ]);
    }
}
