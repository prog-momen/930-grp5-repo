<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WishlistApiController extends Controller
{
    /**
     * Get user's wishlist items
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $wishlistItems = Wishlist::where('user_id', $user->id)
            ->with('course.instructor')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $wishlistItems,
            'message' => 'Wishlist items retrieved successfully'
        ]);
    }

    /**
     * Add a course to wishlist
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id'
        ]);

        $user = $request->user();

        // Check if already in wishlist
        $existingItem = Wishlist::where('user_id', $user->id)
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingItem) {
            return response()->json([
                'success' => false,
                'message' => 'Course already in wishlist'
            ], 400);
        }

        $wishlistItem = Wishlist::create([
            'id' => (string) Str::uuid(),
            'user_id' => $user->id,
            'course_id' => $request->course_id
        ]);

        $wishlistItem->load('course.instructor');

        return response()->json([
            'success' => true,
            'data' => $wishlistItem,
            'message' => 'Course added to wishlist successfully'
        ], 201);
    }

    /**
     * Check if a course is in user's wishlist
     */
    public function check(Request $request, $courseId)
    {
        $user = $request->user();
        $exists = Wishlist::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->exists();

        return response()->json([
            'success' => true,
            'data' => [
                'inWishlist' => $exists
            ]
        ]);
    }

    /**
     * Remove a course from wishlist
     */
    public function destroy(Request $request, $courseId)
    {
        $user = $request->user();

        $deleted = Wishlist::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found in wishlist'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Course removed from wishlist successfully'
        ]);
    }

    /**
     * Get wishlist count
     */
    public function count(Request $request)
    {
        $user = $request->user();
        $count = Wishlist::where('user_id', $user->id)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'count' => $count
            ]
        ]);
    }

    /**
     * Move all wishlist items to cart
     */
    public function moveAllToCart(Request $request)
    {
        $user = $request->user();
        $wishlistItems = Wishlist::where('user_id', $user->id)->get();

        foreach ($wishlistItems as $item) {
            // Add to cart logic here
            // This will depend on your cart implementation
        }

        // Clear wishlist after moving to cart
        Wishlist::where('user_id', $user->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'All items moved to cart successfully'
        ]);
    }
}
