@extends('layouts.app')

@section('content')

<link rel="stylesheet" href="{{ asset('css/certificates-list.css') }}">

<div class="certificates-container">

    <header class="certificates-header">
    <a href="{{ route('certificates.create') }}" class="btn-create">
        إنشاء شهادة جديدة
    </a>
    <h1 class="header-title">جميع الشهادات</h1>
</header>

    @if(session('success'))
        <div class="alert-success">{{ session('success') }}</div>
    @endif

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Student ID</th>
                <th>Course ID</th>
                <th>Issued At</th>
                <th>الإجراءات</th>
            </tr>
        </thead>
        <tbody>
            @forelse($certificates as $certificate)
                <tr>
                    <td>{{ $certificate->id }}</td>
                    <td>{{ $certificate->student_id }}</td>
                    <td>{{ $certificate->course_id }}</td>
                    <td>{{ $certificate->issued_at->format('Y-m-d') }}</td>
                    <td class="actions">
                        <a href="{{ route('certificates.edit', $certificate->id) }}">تعديل</a>
                        <form action="{{ route('certificates.destroy', $certificate->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('هل أنت متأكد من حذف الشهادة؟')">حذف</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">لا توجد شهادات حتى الآن</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection