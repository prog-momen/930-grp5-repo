@extends('layouts.app')

@section('title', $titleForm ?? 'Create Notification')

@section('content')
<div class="container mt-5">
    <h2>{{ $titleForm ?? 'Notification Form' }}</h2>

    <form action="{{ route('notifications.store') }}" method="POST">

        @csrf

        <div class="mb-3">
            <label for="user_id" class="form-label">User ID</label>
            <input type="text" class="form-control" id="user_id" name="user_id"
                value="{{ old('user_id', $notification->user_id ?? '') }}">
            @error('user_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title"
                value="{{ old('title', $notification->title ?? '') }}">
            @error('title')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" name="message" rows="3">{{ old('message', $notification->message ?? '') }}</textarea>
            @error('message')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="read" name="read" value="1"
                {{ old('read', $notification->read ?? false) ? 'checked' : '' }}>
            <label class="form-check-label" for="read">Mark as Read</label>
        </div>

        <button type="submit" class="btn btn-primary">{{ $submitButton ?? 'Submit' }}</button>
    </form>
</div>
@endsection
