@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Payments</h2>

    @if(auth()->user()->isAdmin())
        <a href="{{ route('payments.create') }}" class="btn btn-success mb-3">Add Payment</a>
    @endif

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if($payments->isEmpty())
        <div class="alert alert-info">No payments found.</div>
    @else
        <table class="table">
            <thead>
                <tr>
                    @if(auth()->user()->isAdmin())
                        <th>User</th>
                    @endif
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Paid At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($payments as $payment)
                <tr>
                    @if(auth()->user()->isAdmin())
                        <td>{{ $payment->user->name }}</td>
                    @endif
                    <td>{{ $payment->course->title }}</td>
                    <td>{{ $payment->amount }}</td>
                    <td>{{ ucfirst($payment->status) }}</td>
                    <td>{{ $payment->paid_at ? $payment->paid_at->format('Y-m-d H:i') : 'N/A' }}</td>
                    <td>
                        <a href="{{ route('payments.show', $payment->id) }}" class="btn btn-info btn-sm">View</a>

                        @if(auth()->user()->isAdmin())
                            <a href="{{ route('payments.edit', $payment->id) }}" class="btn btn-primary btn-sm">Edit</a>
                            <form action="{{ route('payments.destroy', $payment->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger btn-sm" onclick="return confirm('Delete this payment?')">Delete</button>
                            </form>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</div>
@endsection
