<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizzes extends Model
{
    use HasFactory;

    protected $table = 'quizzes';  

    protected $fillable = [
        'name',
        'quiz_date',
        'quiz_topic',
    ];

    public $timestamps = true;
}
