<!DOCTYPE html>
<html>
<head>
    <title>Notifications</title>
</head>
<body>

    <h1>Notifications</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <a href="{{ route('notifications.create') }}">Add New Notification</a>
    <br><br>

    <table border="1" cellpadding="10" cellspacing="0">
        <thead>
            <tr>
                <th>User ID</th>
                <th>Title</th>
                <th>Message</th>
                <th>Read</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($notifications as $notification)
                <tr>
                    <td>{{ $notification->user_id }}</td>
                    <td>{{ $notification->title }}</td>
                    <td>{{ $notification->message }}</td>
                    <td>{{ $notification->read ? 'Yes' : 'No' }}</td>
                    <td>{{ $notification->created_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
