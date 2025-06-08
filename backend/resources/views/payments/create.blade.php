@extends('layouts.app')

@section('content')
<div class="container text-white">
    <h2>Create Payment</h2>

    <div class="mb-4">
        <h5>Course: {{ $course->title }}</h5>
        <p>Price: ${{ number_format($course->price, 2) }}</p>
    </div>

    <form action="{{ route('payments.store') }}" method="POST">
        @csrf

        {{-- Hidden inputs to pass IDs --}}
        <input type="hidden" name="course_id" value="{{ $course->id }}">
        <input type="hidden" name="student_id" value="{{ $student->id }}">

        {{-- Include additional form fields if needed --}}
        @include('payments.form')

        <button class="btn btn-primary">Create Payment</button>
    </form>
</div>
@endsection
