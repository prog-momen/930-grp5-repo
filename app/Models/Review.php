<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Review extends Model
{
    use HasFactory;


    public $incrementing = false;

    public $timestamps = false;

   
    protected $table = 'reviews';

    
    protected $keyType = 'string';

    
    protected $fillable = [
        'user_id',
        'course_id',
        'rating',
        'comment',
    ];

  
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
