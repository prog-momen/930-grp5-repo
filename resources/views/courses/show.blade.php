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
            $hasCompletedPayment = $course->payments()
                ->where('user_id', $user->id)
                ->where('status', 'completed')
                ->exists();
            $isEnrolled = $course->enrollments()
                ->where('user_id', $user->id)
                ->exists();
        @endphp

        @if(strtolower($user->role) === 'Admin' || (strtolower($user->role) === 'instructor' && $user->id === $course->instructor_id))
            <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-warning">Edit</a>
            <form action="{{ route('courses.destroy', $course->id) }}" method="POST" style="display:inline-block;">
                @csrf
                @method('DELETE')
                <button onclick="return confirm('Delete this course?')" class="btn btn-danger">Delete</button>
            </form>
        @elseif(strtolower($user->role) === 'student')
            @if($isEnrolled)
                <a href="{{ route('courses.lessons', $course->id) }}" class="btn btn-primary">Go to Lessons</a>
            @elseif(!$hasCompletedPayment)
                <form action="{{ route('payments.create') }}" method="GET" style="display:inline-block;">
                    <input type="hidden" name="course_id" value="{{ $course->id }}">
                    <input type="hidden" name="student_id" value="{{ $user->id }}">
                    <button class="btn btn-success">Pay ${{ number_format($course->price, 2) }}</button>
                </form>
            @else
                <p><em>Waiting for payment confirmation...</em></p>
            @endif
        @endif
    @endauth
</div>
@endsection
