<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $data['notifications'] = Notification::all();
        return view('notification.index', $data);
    }

    public function create()
    {
        $data['notification'] = new Notification();
        $data['route'] = route('notifications.store');
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Notification';
        $data['submitButton'] = 'Submit';

        return view('notification.form_notification', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|uuid',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'read' => 'required|boolean',
        ]);

        $notification = new Notification();
        $notification->user_id = $request->user_id;
        $notification->title = $request->title;
        $notification->message = $request->message;
        $notification->read = $request->read;
        $notification->save();

        return redirect()->route('notifications.index')->with('success', 'Notification created successfully!');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
