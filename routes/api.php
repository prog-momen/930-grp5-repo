<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiControllers\CourseApiController;
use App\Http\Controllers\ApiControllers\CertificateApiController;

Route::apiResource('certificate', CertificateApiController::class);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/courses/enrolled', [CourseApiController::class, 'enrolled']);
//     Route::apiResource('courses', CourseApiController::class);
// });

// خارج middleware المحمي
Route::apiResource('courses', CourseApiController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');





