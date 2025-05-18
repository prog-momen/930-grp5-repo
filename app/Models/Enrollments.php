<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollments extends Model
{
    use HasFactory;

    protected $table = 'enrollments';
    protected $fillable = [
        'name',
        'Enrollments_date',
        'Enrollments_topic', 
    ];

    public $timestamps = true; 
}
