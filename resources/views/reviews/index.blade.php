<!DOCTYPE html>
<html>
<head>
    <title> Reviews Table</title>
</head>
<body>

    <h1>Course Reviews Table</h1>
    <a href="{{ route('reviews.create') }}">Add New Review</a>

    <table border="1">
        <tr>
            <th>User ID</th>
            <th>Course ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Created At</th>
            <th>Actions</th>
        </tr>

        @foreach ($reviews as $review)
        <tr>
            <td>{{ $review->user_id }}</td>
            <td>{{ $review->course_id }}</td>
            <td>{{ $review->rating }}</td>
            <td>{{ $review->comment }}</td>
            <td>{{ $review->created_at }}</td>
            <td>
                <a href="{{ route('reviews.edit', $review->id) }}">Edit</a>
                <form action="{{ route('reviews.destroy', $review->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach

    </table>

</body>
</html>