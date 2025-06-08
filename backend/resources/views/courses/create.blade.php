@extends('layouts.app')

@section('content')
    <h1>Create New Course</h1>

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

    <form action="{{ route('courses.store') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label for="title" class="form-label">Title *</label>
            <input
                type="text"
                name="title"
                id="title"
                class="form-control"
                value="{{ old('title') }}"
                required>
        </div>

        <div class="mb-3">
            <label for="info" class="form-label">Info</label>
            <textarea
                name="info"
                id="info"
                class="form-control">{{ old('info') }}</textarea>
        </div>

        <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <input
                type="text"
                name="category"
                id="category"
                class="form-control"
                value="{{ old('category') }}">
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Price *</label>
            <input
                type="number"
                step="0.01"
                name="price"
                id="price"
                class="form-control"
                value="{{ old('price') }}"
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
                    @foreach($instructors as $instructor)
                        <option
                            value="{{ $instructor->id }}"
                            {{ old('instructor_id') == $instructor->id ? 'selected' : '' }}>
                            {{ $instructor->name }} ({{ $instructor->email }})
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
                    value="{{ old('instructor_id') }}"
                    required>
            @endif
        </div>

        <button type="submit" class="btn btn-success">Create Course</button>
        <a href="{{ route('courses.index') }}" class="btn btn-secondary">Back</a>
    </form>
@endsection
