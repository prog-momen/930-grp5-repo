@extends('layouts.app') {{-- أو استخدم التخطيط اللي عندك --}}

@section('content')
    <div class="container">
        <h1>My Enrolled Courses</h1>

        @if($courses->isEmpty())
            <p>You are not enrolled in any courses yet.</p>
        @else
            <ul>
                @foreach($courses as $course)
                    <li>{{ $course->title }}</li>
                @endforeach
            </ul>
        @endif
    </div>
@endsection
