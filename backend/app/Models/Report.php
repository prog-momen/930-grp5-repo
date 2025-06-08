<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Report extends Model
{
    use HasFactory;

    protected $table = 'reports';

    // المفتاح الأساسي UUID نصي
    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = true;

    protected $fillable = [
        'id',
        'reporter_id',
        'type',
        'course_id',
        'lesson_id',
        'message',
        'status',
        // أضف أي حقول أخرى مثل cv_pdf_path لو تحتاج
    ];

    protected $casts = [
        'id' => 'string',
        'reporter_id' => 'string',
        'course_id' => 'string',
        'lesson_id' => 'string',
    ];

    // أنواع التقارير
    public const TYPES = [
        'technical_issue' => 'Technical Issue',
        'become_instructor' => 'Become Instructor',
        'certificate_request' => 'Certificate Request',
    ];

    // حالات التقرير
    public const STATUSES = [
        'pending' => 'Pending',
        'reviewed' => 'Reviewed',
        'resolved' => 'Resolved',
    ];

    // توليد UUID تلقائي عند الإنشاء
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }
}
