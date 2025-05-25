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

    <form action="{{ route('notifications.store') }}" method="POST">
        @csrf

        <label>User ID</label><br>
        <input type="text" name="user_id" value="{{ old('user_id') }}"><br><br>

        <label>Title</label><br>
        <input type="text" name="title" value="{{ old('title') }}"><br><br>

        <label>Message</label><br>
        <textarea name="message">{{ old('message') }}</textarea><br><br>

        <label>Mark as Read?</label><br>
        <select name="read">
            <option value="0" {{ old('read') == "0" ? 'selected' : '' }}>No</option>
            <option value="1" {{ old('read') == "1" ? 'selected' : '' }}>Yes</option>
        </select><br><br>

        <button type="submit">{{ $submitButton }}</button>
    </form>

    <br>
    <a href="{{ route('notifications.index') }}">← Back to List</a>
</body>
</html>
