<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class WishlistApiController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $wishlists = Wishlist::with('user')->where('user_id', $user->id)->get();
        return response()->json($wishlists, 200);
    }

    public function store(Request $request)
    {
        Log::info($request->all());

        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
        ]);

        try {
            $user = auth()->user(); // ✅ نحصل على المستخدم من التوكن

            $wishlist = Wishlist::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $user->id,
                'course_id' => $request->course_id,
            ]);

            return response()->json([
                'message' => 'تمت إضافة الدورة إلى قائمة الرغبات',
                'data' => $wishlist
            ], 201);
        } catch (\Exception $e) {
            Log::error('Wishlist API Store Error: ' . $e->getMessage());
            return response()->json(['error' => 'حدث خطأ أثناء الإضافة'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $wishlist = Wishlist::find($id);

        if (!$wishlist) {
            return response()->json(['error' => 'العنصر غير موجود'], 404);
        }

        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
        ]);

        $wishlist->course_id = $request->course_id;
        $wishlist->save();

        return response()->json([
            'message' => 'تم تحديث عنصر قائمة الرغبات',
            'data' => $wishlist
        ], 200);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::find($id);

        if (!$wishlist) {
            return response()->json(['error' => 'العنصر غير موجود'], 404);
        }

        $wishlist->delete();

        return response()->json(['message' => 'تم حذف العنصر من قائمة الرغبات'], 200);
    }

    public function show($id)
    {
        $wishlist = Wishlist::with('user')->find($id);

        if (!$wishlist) {
            return response()->json(['error' => 'العنصر غير موجود'], 404);
        }

        return response()->json($wishlist, 200);
    }
}