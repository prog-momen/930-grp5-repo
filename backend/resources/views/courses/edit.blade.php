@extends('layouts.app')

@section('content')
    <div class="container text-white">
        <h1>Edit Course</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @php
            $user = auth()->user();
        @endphp

        <form action="{{ route('courses.update', $course->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label for="title" class="form-label">Title *</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    value="{{ old('title', $course->title) }}"
                    required>
            </div>

            <div class="mb-3">
                <label for="info" class="form-label">Info</label>
                <textarea
                    name="info"
                    id="info"
                    class="form-control">{{ old('info', $course->info) }}</textarea>
            </div>

            <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    class="form-control"
                    value="{{ old('category', $course->category) }}">
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price *</label>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    id="price"
                    class="form-control"
                    value="{{ old('price', $course->price) }}"
                    required>
            </div>

            <div class="mb-3">
                <label for="instructor_id" class="form-label">Instructor *</label>

                @if(strtolower($user->role) === 'admin')
                    <select
                        name="instructor_id"
                        id="instructor_id"
                        class="form-control"
                        required>
                        <option value="">Select Instructor</option>
                        @foreach($teachers as $teacher)
                            <option
                                value="{{ $teacher->id }}"
                                {{ old('instructor_id', $course->instructor_id) == $teacher->id ? 'selected' : '' }}>
                                {{ $teacher->name }} ({{ $teacher->email }})
                            </option>
                        @endforeach
                    </select>
                @elseif(strtolower($user->role) === 'instructor')
                    <input
                        type="text"
                        class="form-control"
                        value="{{ $user->id }}"
                        readonly>
                    <input
                        type="hidden"
                        name="instructor_id"
                        value="{{ $user->id }}">
                @else
                    <input
                        type="text"
                        name="instructor_id"
                        id="instructor_id"
                        class="form-control"
                        value="{{ old('instructor_id', $course->instructor_id) }}"
                        required>
                @endif
            </div>

            <button type="submit" class="btn btn-primary">Update Course</button>
            <a href="{{ route('courses.index') }}" class="btn btn-secondary">Back</a>
        </form>
    </div>
@endsection
