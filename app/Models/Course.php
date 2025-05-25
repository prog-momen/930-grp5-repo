<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    // المفتاح الأساسي UUID (غير auto-increment)
    protected $keyType = 'string';
    public $incrementing = false;

    // اسم جدول قاعدة البيانات (لو ما سويت تغييره)
    protected $table = 'courses';

    // الحقول القابلة للملء
    protected $fillable = [
        'id',
        'title',
        'info',
        'category',
        'price',
        'instructor_id',
    ];

    // الحقول التي تحتاج تحويل
    protected $casts = [
        'id' => 'string',
        'price' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'instructor_id' => 'string',
    ];

    // علاقة الكورس بالمدرس (instructor)
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
    public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}
public function enrolledUsers()
{
    return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'user_id');
}

public function payments()
{
    return $this->hasMany(Payment::class);
}

}
