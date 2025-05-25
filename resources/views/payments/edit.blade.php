@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Edit Payment</h2>

    <form action="{{ route('payments.update', $payment->id) }}" method="POST">
        @csrf
        @method('PUT')
        @include('payments.form')
        <button class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
