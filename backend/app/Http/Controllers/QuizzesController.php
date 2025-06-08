<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quizzes;

class QuizzesController extends Controller
{
    public function create()
    {
        $data['Quizzes'] = new Quizzes(); 
        $data['route'] = 'dataQuizzes.store'; 
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Quizzes'; 
        $data['submitButton'] = 'Submit';

        return view('Quizzes.form_Quizzes', $data); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'quiz_date' => 'required', 
            'quiz_topic' => 'required', 
        ]);

        $inputQuizzes = new Quizzes(); 
        $inputQuizzes->name = $request->name;
        $inputQuizzes->quiz_date = $request->quiz_date;  
        $inputQuizzes->quiz_topic = $request->quiz_topic; 
        $inputQuizzes->save();

        return redirect('dataQuizzes/create'); 
    }
}
