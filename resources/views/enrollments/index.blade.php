@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Enrollments List</h1>

        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Topic</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($enrollments as $enrollment)
                    <tr>
                        <td>{{ $enrollment->id }}</td>
                        <td>{{ $enrollment->name }}</td>
                        <td>{{ $enrollment->Enrollments_date }}</td>
                        <td>{{ $enrollment->Enrollments_topic }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{ $enrollments->links() }}
    </div>
@endsection
