<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User; // ضروري استدعاء موديل المستخدم

class Wishlist extends Model
{
    use HasUuids;

    protected $table = 'wishlist'; // تأكد اسم الجدول بالضبط

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'course_id',
        // لا حاجة لكتابة created_at في fillable
    ];

    public $timestamps = true;
    const UPDATED_AT = null; // لا يوجد عمود updated_at

    // علاقة المستخدم فقط
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // لا توجد علاقة للدورة لتجنب الخطأ
}
