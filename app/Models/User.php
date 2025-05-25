<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function courses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    public function isAdmin()
    {
        return strtolower($this->role) === 'admin';
    }

    public function isInstructor()
    {
        return strtolower($this->role) === 'instructor';
    }

    public function isStudent()
    {
        return strtolower($this->role) === 'student';
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollments', 'user_id', 'course_id');
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}

}
