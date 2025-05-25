@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Update Report Status</h3>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <form action="{{ route('reports.update_status', $report->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="form-group mb-3">
            <label for="status">Status</label>
            <select name="status" id="status" class="form-control" required>
                <option value="pending" {{ $report->status === 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="reviewed" {{ $report->status === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                <option value="resolved" {{ $report->status === 'resolved' ? 'selected' : '' }}>Resolved</option>
            </select>
            @error('status')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary">Update Status</button>
        <a href="{{ route('reports.show', $report->id) }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
