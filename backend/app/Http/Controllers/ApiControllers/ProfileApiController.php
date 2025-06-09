<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class ProfileApiController extends Controller
{
    /**
     * Get user profile
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Profile retrieved successfully'
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string|max:1000',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'bio' => $request->bio,
        ]);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Profile updated successfully'
        ]);
    }

    /**
     * Update user avatar
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = $request->user();

        // Delete old avatar if exists
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Store new avatar
        $avatarPath = $request->file('avatar')->store('avatars', 'public');

        $user->update([
            'avatar' => $avatarPath
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'avatar_url' => Storage::url($avatarPath)
            ],
            'message' => 'Avatar updated successfully'
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = $request->user();

        // Check current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 400);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }

    /**
     * Get user statistics
     */
    public function getStats(Request $request)
    {
        $user = $request->user();

        $stats = [
            'enrolled_courses' => $user->enrolledCourses()->count(),
            'completed_courses' => $user->enrolledCourses()
                ->wherePivot('completed', true)
                ->count(),
            'certificates_earned' => $user->certificates()->count(),
            'wishlist_items' => $user->wishlists()->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
            'message' => 'Stats retrieved successfully'
        ]);
    }

    /**
     * Get instructor statistics
     */
    public function getInstructorStats(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'instructor') {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Instructor role required.'
            ], 403);
        }

        $stats = [
            'published_courses' => $user->courses()->count(),
            'total_students' => $user->courses()
                ->withCount('enrollments')
                ->get()
                ->sum('enrollments_count'),
            'average_rating' => $user->courses()
                ->withAvg('reviews', 'rating')
                ->get()
                ->avg('reviews_avg_rating') ?? 0,
            'total_revenue' => $user->courses()
                ->withSum('payments', 'amount')
                ->get()
                ->sum('payments_sum_amount') ?? 0,
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
            'message' => 'Instructor stats retrieved successfully'
        ]);
    }

    /**
     * Get enrolled courses
     */
    public function getEnrolledCourses(Request $request)
    {
        $user = $request->user();
        $courses = $user->enrolledCourses()
            ->with('instructor')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
            'message' => 'Enrolled courses retrieved successfully'
        ]);
    }

    /**
     * Get completed courses
     */
    public function getCompletedCourses(Request $request)
    {
        $user = $request->user();
        $courses = $user->enrolledCourses()
            ->wherePivot('completed', true)
            ->with('instructor')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
            'message' => 'Completed courses retrieved successfully'
        ]);
    }

    /**
     * Get earned certificates
     */
    public function getCertificates(Request $request)
    {
        $user = $request->user();
        $certificates = $user->certificates()
            ->with('course')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $certificates,
            'message' => 'Certificates retrieved successfully'
        ]);
    }

    /**
     * Delete user account
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required'
        ]);

        $user = $request->user();

        // Verify password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password is incorrect'
            ], 400);
        }

        // Delete avatar if exists
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Delete user
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Account deleted successfully'
        ]);
    }
}
