<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollments;

class EnrollmentsController extends Controller
{
    public function create()
    {
        $data['Enrollments'] = new Enrollments(); 
        $data['route'] = 'dataEnrollments.store'; 
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Enrollments'; 
        $data['submitButton'] = 'Submit';

        return view('Enrollments.form_Enrollments', $data); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'Enrollments_date' => 'required', 
            'Enrollments_topic' => 'required', 
        ]);

        $inputEnrollments = new Enrollments(); 
        $inputEnrollments->name = $request->name;
        $inputEnrollments->Enrollments_date = $request->Enrollments_date;  
        $inputEnrollments->Enrollments_topic = $request->Enrollments_topic; 
        $inputEnrollments->save();

        return redirect('dataEnrollments/create'); 
    }
}
