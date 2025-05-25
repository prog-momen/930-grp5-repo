<?php

namespace App\Http\Controllers\ApiControllers;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Certificate;

class CertificateApiController extends Controller
{
    // عرض جميع الشهادات
    public function index()
    {
        $certificates = Certificate::all();
        return response()->json($certificates);
    }

    // إنشاء شهادة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|uuid|exists:users,id',
            'course_id' => 'required|uuid|exists:courses,id',
            'issued_at' => 'required|date',
        ]);

        $certificate = new Certificate();
        $certificate->id = Str::uuid()->toString();
        $certificate->student_id = $request->student_id;
        $certificate->course_id = $request->course_id;
        $certificate->issued_at = $request->issued_at;
        $certificate->save();

        return response()->json([
            'message' => 'تم إنشاء الشهادة بنجاح',
            'certificate' => $certificate
        ], 201);
    }

    // عرض شهادة معينة
    public function show(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        return response()->json($certificate);
    }

    // تحديث شهادة معينة
    public function update(Request $request, string $id)
    {
        $request->validate([
            'student_id' => 'required|uuid|exists:users,id',
            'course_id' => 'required|uuid|exists:courses,id',
            'issued_at' => 'required|date',
        ]);

        $certificate = Certificate::findOrFail($id);
        $certificate->student_id = $request->student_id;
        $certificate->course_id = $request->course_id;
        $certificate->issued_at = $request->issued_at;
        $certificate->save();

        return response()->json([
            'message' => 'تم تحديث الشهادة بنجاح',
            'certificate' => $certificate
        ]);
    }

    // حذف شهادة
    public function destroy(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();

        return response()->json([
            'message' => 'تم حذف الشهادة بنجاح'
        ]);
    }
}
