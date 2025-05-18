@extends('layouts.app')

@section('content')
<div class="container text-white">
    <h1>{{ $course->title }}</h1>
    <p><strong>Description:</strong> {{ $course->description }}</p>
    <p><strong>Category:</strong> {{ $course->category }}</p>
    <p><strong>Price:</strong> ${{ number_format($course->price, 2) }}</p>
    <p><strong>Created at:</strong> {{ $course->created_at->format('Y-m-d') }}</p>

    @auth
        @php
            $user = auth()->user();
        @endphp

        <pre>User role: {{ $user->role }}</pre> {{-- للتأكد فقط --}}

        {{-- إذا كان المستخدم Admin أو Instructor هو صاحب الكورس --}}
        @if(
            strtolower($user->role) === 'admin' ||
            (strtolower($user->role) === 'instructor' && $user->id === $course->instructor_id)
        )
            <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-warning">Edit</a>

            <form action="{{ route('courses.destroy', $course->id) }}" method="POST" style="display:inline-block;">
                @csrf
                @method('DELETE')
                <button onclick="return confirm('Delete this course?')" class="btn btn-danger">Delete</button>
            </form>

        {{-- إذا كان المستخدم طالب --}}
        @elseif(strtolower($user->role) === 'student')
            <form action="{{ route('payments.create') }}" method="GET" style="display:inline-block;">
                <input type="hidden" name="course_id" value="{{ $course->id }}">
                <input type="hidden" name="student_id" value="{{ $user->id }}">
                <button class="btn btn-success">Pay ${{ number_format($course->price, 2) }}</button>
            </form>
        @endif
    @endauth
</div>
@endsection
