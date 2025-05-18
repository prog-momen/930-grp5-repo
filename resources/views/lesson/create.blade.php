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

        <label>Course ID:</label>
        <input type="text" name="course_id" value="{{ old('course_id') }}"><br><br>

        <label>Title:</label>
        <input type="text" name="title" value="{{ old('title') }}"><br><br>

        <label>Content Type:</label>
        <select name="content_type">
            <option value="Text">Text</option>
            <option value="Video">Video</option>
            <option value="File">File</option>
        </select><br><br>

        <label>Content URL:</label>
        <input type="text" name="content_url" value="{{ old('content_url') }}"><br><br>

        <label>Order:</label>
        <input type="number" name="order" value="{{ old('order') }}"><br><br>

        <button type="submit">{{ $submitButton }}</button>
    </form>
</body>
</html>
