@extends('layouts.app')

@section('content')

<link rel="stylesheet" href="{{ asset('css/certificate-form.css') }}">

@if ($errors->any())
    <div style="color: red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('certificates.update', $certificate->id) }}" method="POST">
    @csrf
    @method('PUT')  

    <h1 class="form-title">تعديل شهادة</h1>

    <div>
        <label for="student_id">Student ID:</label>
        <input type="text" name="student_id" id="student_id" value="{{ old('student_id', $certificate->student_id) }}" required>
    </div>

    <div>
        <label for="course_id">Course ID:</label>
        <input type="text" name="course_id" id="course_id" value="{{ old('course_id', $certificate->course_id) }}" required>
    </div>

    <div>
        <label for="issued_at">Issued At:</label>
        <input type="date" name="issued_at" id="issued_at" value="{{ old('issued_at', $certificate->issued_at->format('Y-m-d')) }}" required>
    </div>

    <button type="submit">تحديث الشهادة</button>
</form>

@endsection
