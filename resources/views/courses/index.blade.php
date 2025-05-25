@extends('layouts.app')

@section('content')
<div class="text-white">
    <h1>Courses</h1>

    @php
        $user = auth()->user();
    @endphp

    {{-- مؤقت لعرض دور المستخدم --}}
    <pre>User role: {{ $user ? $user->role : 'Guest' }}</pre>

    @if($user && (strtolower($user->role) === 'Admin' || strtolower($user->role) === 'instructor'))
        <a href="{{ route('courses.create') }}" class="btn btn-primary mb-3">Add New Course</a>
    @endif

    @if($courses->count())
        <table class="table table-bordered text-white">
            <thead>
            <tr>
                <th>Title</th>
                <th>Info</th>
                <th>Category</th>
                <th>Price</th>
                <th>Instructor ID</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($courses as $course)
                <tr>
                    <td>{{ $course->title }}</td>
                    <td>{{ $course->info }}</td>
                    <td>{{ $course->category }}</td>
                    <td>${{ number_format($course->price, 2) }}</td>
                    <td>{{ $course->instructor_id }}</td>
                    <td>
                        <a href="{{ route('courses.show', $course->id) }}" class="btn btn-info btn-sm">View</a>

                        @if($user && (strtolower($user->role) === 'Admin' || (strtolower($user->role) === 'instructor' && $user->id === $course->instructor_id)))
                            <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-warning btn-sm">Edit</a>

                            <form action="{{ route('courses.destroy', $course->id) }}" method="POST" style="display:inline-block;">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Delete this course?')" class="btn btn-danger btn-sm">Delete</button>
                            </form>
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    @else
        <p>No courses found.</p>
    @endif
@endsection
</div>
