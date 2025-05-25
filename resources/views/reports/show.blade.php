@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Report Details</h3>

    <div class="card">
        <div class="card-body">
            <p><strong>ID:</strong> {{ $report->id }}</p>
            <p><strong>Reporter ID:</strong> {{ $report->reporter_id }}</p>
            <p><strong>Type:</strong> {{ $report->type }}</p>
            <p><strong>Course ID:</strong> {{ $report->course_id ?? 'N/A' }}</p>
            <p><strong>Lesson ID:</strong> {{ $report->lesson_id ?? 'N/A' }}</p>
            <p><strong>Status:</strong> {{ ucfirst($report->status) }}</p>
            <p><strong>Message:</strong><br>{{ $report->message }}</p>
            <p><strong>Created At:</strong> {{ $report->created_at }}</p>
        </div>
    </div>
    @auth
    @if(auth()->user()->role === 'Admin')
        <a href="{{ route('reports.edit', $report->id) }}" class="btn btn-primary">Edit Report</a>
    @endif
@endauth

    <a href="{{ route('reports.index') }}" class="btn btn-secondary mt-3">Back to list</a>
</div>
@endsection
