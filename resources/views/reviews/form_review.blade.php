@extends('layouts.app')

@section('title', $titleForm)

@section('content')
<div class="container mt-5">
    <h2>{{ $titleForm }}</h2>

    <form action="{{ $route }}" method="POST">
        @csrf

        {{-- User ID --}}
        <div class="mb-3">
            <label for="user_id" class="form-label">User ID</label>
            <input type="text" class="form-control" id="user_id" name="user_id" value="{{ old('user_id', $review->user_id ?? '') }}">
            @error('user_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Course ID --}}
        <div class="mb-3">
            <label for="course_id" class="form-label">Course ID</label>
            <input type="text" class="form-control" id="course_id" name="course_id" value="{{ old('course_id', $review->course_id ?? '') }}">
            @error('course_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Rating --}}
        <div class="mb-3">
            <label for="rating" class="form-label">Rating (1 to 5)</label>
            <select class="form-control" id="rating" name="rating">
                <option value="">Select rating</option>
                @for ($i = 1; $i <= 5; $i++)
                    <option value="{{ $i }}" {{ old('rating', $review->rating ?? '') == $i ? 'selected' : '' }}>
                        {{ $i }}
                    </option>
                @endfor
            </select>
            @error('rating')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Comment --}}
        <div class="mb-3">
            <label for="comment" class="form-label">Comment (optional)</label>
            <textarea class="form-control" id="comment" name="comment" rows="3">{{ old('comment', $review->comment ?? '') }}</textarea>
            @error('comment')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Submit Button --}}
        <button type="submit" class="btn btn-primary">{{ $submitButton }}</button>
    </form>
</div>
@endsection
