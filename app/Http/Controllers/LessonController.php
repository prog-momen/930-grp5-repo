<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use Illuminate\Support\Str;
class LessonController extends Controller
{

    public function index()
    {
        $data['lessons'] = Lesson::all();
        return view('lesson.index', $data);
    }


    public function create()
    {
        $data['lesson'] = new Lesson();
        $data['route'] = route('lesson.store');
        $data['method'] = 'post';
        $data['titleForm'] = 'Add New Lesson';
        $data['submitButton'] = 'Submit';
        return view('lesson.create', $data);
    }


    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|uuid',
            'title' => 'required|string',
            'content_type' => 'required|in:Text,Video,File',
            'content_url' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $lesson = new Lesson();
        $lesson->course_id = $request->course_id;
        $lesson->title = $request->title;
        $lesson->content_type = $request->content_type;
        $lesson->content_url = $request->content_url;
        $lesson->order = $request->order;
        $lesson->save();

        return redirect()->route('lesson.index')->with('success', 'Lesson created successfully!');
    }




    public function edit($id)
    {

        if (!\Illuminate\Support\Str::isUuid($id)) {
            abort(404, 'Invalid UUID');
        }


        $lesson = \App\Models\Lesson::findOrFail($id);


        $data['lesson'] = $lesson;
        $data['route'] = route('lesson.update', $lesson->id); /
        $data['method'] = 'put';
        $data['titleForm'] = 'Edit Lesson';
        $data['submitButton'] = 'Update';

        return view('lesson.edit', $data);
    }

    public function update(Request $request, $id)
    {

        if (!\Illuminate\Support\Str::isUuid($id)) {
            abort(404, 'Invalid UUID');
        }


        $request->validate([
            'course_id' => 'required|uuid',
            'title' => 'required|string',
            'content_type' => 'required|in:Text,Video,File',
            'content_url' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);


        $lesson = \App\Models\Lesson::findOrFail($id);
        $lesson->course_id = $request->course_id;
        $lesson->title = $request->title;
        $lesson->content_type = $request->content_type;
        $lesson->content_url = $request->content_url;
        $lesson->order = $request->order;
        $lesson->save();

        return redirect()->route('lesson.index')->with('success', 'Lesson updated successfully!');
    }





    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return redirect()->route('lesson.index')->with('success', 'Lesson deleted successfully!');
    }
}
