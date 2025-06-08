<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $data['reviews'] = Review::all();
        return view('reviews.index', $data);
    }

 public function create()
{
    $data['review'] = new \App\Models\Review();
    $data['route'] = route('reviews.store');
    $data['method'] = 'post';
    $data['titleForm'] = 'Create  Review';
    $data['submitButton'] = 'Submit';

    return view('reviews.create', $data);
}


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|uuid',
            'course_id' => 'required|uuid',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string'
        ]);

        Review::create($request->all());
        return redirect()->route('reviews.index')->with('success', 'Review created.');
    }
}