<!DOCTYPE html>
<html>
<head>
    <title>{{ $titleForm }}</title>
</head>
<body>
    <h1>{{ $titleForm }}</h1>


    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

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
        @method('PUT')

        <label>Course ID</label><br>
        <input type="text" name="course_id" value="{{ $lesson->course_id }}"><br><br>

        <label>Title</label><br>
        <input type="text" name="title" value="{{ $lesson->title }}"><br><br>

        <label>Content Type</label><br>
        <input type="text" name="content_type" value="{{ $lesson->content_type }}"><br><br>

        <label>Content URL</label><br>
        <input type="text" name="content_url" value="{{ $lesson->content_url }}"><br><br>

        <label>Order</label><br>
        <input type="number" name="order" value="{{ $lesson->order }}"><br><br>

        <button type="submit">{{ $submitButton }}</button>
    </form>

</body>
</html>
