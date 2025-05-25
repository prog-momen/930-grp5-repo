<!DOCTYPE html>
<html>
<head>
    <title>{{ $titleForm }}</title>
</head>
<body>
    <h1>{{ $titleForm }}</h1>

    @if ($errors->any())
        <div style="color:red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ $route }}" method="POST">
        @csrf

        <label>User ID</label><br>
        <input type="text" name="user_id" value="{{ old('user_id') }}"><br><br>

        <label>Course ID</label><br>
        <input type="text" name="course_id" value="{{ old('course_id') }}"><br><br>

        <label>Rating (1-5)</label><br>
        <input type="number" name="rating" min="1" max="5" value="{{ old('rating') }}"><br><br>

        <label>Comment</label><br>
        <textarea name="comment">{{ old('comment') }}</textarea><br><br>

        <button type="submit">{{ $submitButton }}</button>
    </form>

    <br>
    <a href="{{ route('reviews.index') }}">← Back to List</a>
</body>
</html>