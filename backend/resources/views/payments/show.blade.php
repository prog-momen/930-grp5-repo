@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Payment Details</h2>

    <p><strong>Course:</strong> {{ $payment->course->title }}</p>
    <p><strong>Amount:</strong> {{ $payment->amount }}</p>
    <p><strong>Status:</strong> {{ ucfirst($payment->status) }}</p>
    <p><strong>Paid At:</strong> {{ $payment->paid_at ? $payment->paid_at->format('Y-m-d H:i') : 'Not Paid Yet' }}</p>

    <a href="{{ route('payments.index') }}" class="btn btn-secondary">Back to List</a>

    @if(auth()->user()->isAdmin())
        <a href="{{ route('payments.edit', $payment->id) }}" class="btn btn-primary">Edit</a>
    @endif
</div>
@endsection
