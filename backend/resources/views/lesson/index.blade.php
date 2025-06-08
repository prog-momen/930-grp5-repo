<!DOCTYPE html>
<html>
<head>
    <title>Lessons Table</title>
</head>
<body>

    <h1>Lessons Table</h1>


    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif


    <a href="{{ route('lesson.create') }}">Add New Lesson</a>
    <br><br>


    @php
        use Illuminate\Support\Str;
    @endphp


    <table border="1" cellpadding="10" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Course Title (UUID)</th>
                <th>Title</th>
                <th>Content Type</th>
                <th>Content URL</th>
                <th>Order</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            @foreach($lessons as $lesson)
                <tr>
                    <td>{{ $lesson->id }}</td>
                    <td>{{ $lesson->course_id }}</td>
                    <td>{{ $lesson->title }}</td>
                    <td>{{ $lesson->content_type }}</td>
                    <td>{{ $lesson->content_url }}</td>
                    <td>{{ $lesson->order }}</td>
                    <td>{{ $lesson->created_at }}</td>

                    <td>

                        @if(Str::isUuid($lesson->id))
                            <a href="{{ route('lesson.edit', $lesson->id) }}">Edit</a>
                        @else
                            <span style="color: red;">Invalid ID</span>
                        @endif

                   
                        <form action="{{ route('lesson.destroy', $lesson->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure?');">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
