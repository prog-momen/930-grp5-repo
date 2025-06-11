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
        $wishlists = Wishlist::with('user')->get();
        return response()->json($wishlists, 200);
    }

    public function store(Request $request)
    {
        $request->merge([
            'user_id' => (string) $request->user_id,
            'course_id' => (string) $request->course_id,
        ]);

        $uuidPattern = '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';

        if (!preg_match($uuidPattern, $request->user_id)) {
            return response()->json(['error' => 'user_id غير صالح، يرجى إدخال UUID صحيح.'], 422);
        }

        if (!preg_match($uuidPattern, $request->course_id)) {
            return response()->json(['error' => 'course_id غير صالح، يرجى إدخال UUID صحيح.'], 422);
        }

        $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'course_id' => 'required|uuid',
        ]);

        try {
            $wishlist = Wishlist::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $request->user_id,
                'course_id' => $request->course_id,
                'created_at' => now(),
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
            'user_id' => 'required|uuid|exists:users,id',
            'course_id' => 'required|uuid',
        ]);

        $wishlist->user_id = $request->user_id;
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
