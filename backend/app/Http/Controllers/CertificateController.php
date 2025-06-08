<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Certificate;

class CertificateController extends Controller
{
    // عرض جميع الشهادات
    public function index()
    {
        $certificates = Certificate::all();
        return view('certificates.index', compact('certificates'));
    }

    // نموذج إنشاء شهادة جديدة
    public function create()
    {
        $data = [
            'certificate' => new Certificate(),
            'route' => route('certificates.store'),
            'method' => 'post',
            'titleForm' => 'إنشاء شهادة جديدة',
            'submitButton' => 'حفظ'
        ];

        return view('certificates.form_certificate', $data);
    }

    // حفظ الشهادة الجديدة مع التحقق من وجود الطالب والدورة
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

        return redirect()->route('certificates.create')->with('success', 'تم إنشاء الشهادة بنجاح');
    }

    // عرض شهادة معينة
    public function show(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        return view('certificates.show', compact('certificate'));
    }

public function edit(string $id)
{
    $certificate = Certificate::findOrFail($id);
    $users = \App\Models\User::all();     // جلب جميع المستخدمين
    $courses = \App\Models\Course::all(); // جلب جميع الدورات

    return view('certificates.edit_certificate', compact('certificate', 'users', 'courses'));
}

    // تحديث شهادة معينة مع التحقق من وجود الطالب والدورة
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

        return redirect()->route('certificates.index')->with('success', 'تم تحديث الشهادة بنجاح');
    }

    // حذف شهادة
    public function destroy(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();
        return redirect()->route('certificates.index')->with('success', 'تم حذف الشهادة');//عشان نرجع للصفحة الرئيسية + نعطي رسالة 
    }
}
