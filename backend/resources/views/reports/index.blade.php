@extends('layouts.app')

@section('content')
<div class="container">
    <h3>All Reports</h3>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('reports.create') }}" class="btn btn-primary mb-3">Create New Report</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Reporter ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

            @forelse($reports as $report)
                <tr>
                    <td>{{ $report->id }}</td>
                    <td>{{ $report->reporter_id }}</td>
                    <td>{{ $report->type }}</td>
                    <td>{{ ucfirst($report->status) }}</td>
                    <td>{{ $report->created_at }}</td>
                    <td>
                        <a href="{{ route('reports.show', $report->id) }}" class="btn btn-sm btn-info">View</a>

                        @if(Auth::user() && Auth::user()->role === 'Admin')
                            <a href="{{ route('reports.edit', $report->id) }}" class="btn btn-sm btn-warning">Edit</a>
                        @endif
                    </td>
                </tr>
            @empty
                <tr><td colspan="6" class="text-center">No reports found.</td></tr>
            @endforelse
        </tbody>
    </table>

    {{ $reports->links() }}
</div>
@endsection
