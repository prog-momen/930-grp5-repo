@extends('layouts.app')

@section('content')

<link rel="stylesheet" href="{{ asset('css/certificate-form.css') }}">

<h1 class="form-title">قائمة الرغبات</h1>

@if(session('success'))
    <p style="color:green;">{{ session('success') }}</p>
@endif

@if(session('error'))
    <p style="color:red;">{{ session('error') }}</p>
@endif

<form action="{{ route('wishlist.store') }}" method="POST" class="form-container">
    @csrf

    <div class="form-group">
        <label for="user_id">معرف المستخدم (user_id) كـ UUID:</label>
        <input type="text" id="user_id" name="user_id" required placeholder="مثال: 550e8400-e29b-41d4-a716-446655440000" />
    </div>

    <div class="form-group">
        <label for="course_id">معرف الدورة (course_id) كـ UUID:</label>
        <input type="text" id="course_id" name="course_id" required placeholder="مثال: 550e8400-e29b-41d4-a716-446655440000" />
    </div>

    <button type="submit" class="btn-submit">أضف إلى قائمة الرغبات</button>
</form>

<hr/>

<ul class="wishlist-items">
    @foreach($wishlists as $item)
        <li>
            معرف المستخدم: {{ $item->user_id }} - معرف الدورة: {{ $item->course_id }} - أضيفت في: {{ $item->created_at }}
            <form action="{{ route('wishlist.destroy', $item->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('هل تريد الحذف؟')" class="btn-delete">حذف</button>
            </form>
        </li>
    @endforeach
</ul>

@endsection
