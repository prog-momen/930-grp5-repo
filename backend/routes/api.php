<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiControllers\AuthController;
use App\Http\Controllers\ApiControllers\PaymentController;
use App\Http\Controllers\ApiControllers\CourseApiController;
use App\Http\Controllers\ApiControllers\WishlistApiController;
use App\Http\Controllers\ApiControllers\CartApiController;
use App\Http\Controllers\ApiControllers\ProfileApiController;

// Auth Routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

// Public Course Routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'courses'
], function ($router) {
    Route::get('/', [CourseApiController::class, 'index']);
    Route::get('/popular', [CourseApiController::class, 'popular']);
    Route::get('/categories', [CourseApiController::class, 'categories']);
    Route::get('/{id}', [CourseApiController::class, 'show']);
});

// Protected Payment Routes
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'payments'
], function ($router) {
    Route::get('/', [PaymentController::class, 'index']);
    Route::post('/', [PaymentController::class, 'store']);
    Route::get('/user', [PaymentController::class, 'userPayments']);
    Route::get('/{id}', [PaymentController::class, 'show']);
    Route::put('/{id}', [PaymentController::class, 'update']);
    Route::delete('/{id}', [PaymentController::class, 'destroy']);
    Route::post('/{id}/process', [PaymentController::class, 'processPayment']);
});

// Protected Course Routes
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'courses'
], function ($router) {
    Route::post('/', [CourseApiController::class, 'store']);
    Route::put('/{id}', [CourseApiController::class, 'update']);
    Route::delete('/{id}', [CourseApiController::class, 'destroy']);
    Route::get('/enrolled', [CourseApiController::class, 'enrolled']);
    Route::post('/{id}/enroll', [CourseApiController::class, 'enroll']);
    Route::get('/{courseId}/reviews', [CourseApiController::class, 'getReviews']);
    Route::post('/{courseId}/reviews', [CourseApiController::class, 'addReview']);
});

// Protected Wishlist Routes
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'wishlist'
], function ($router) {
    Route::get('/', [WishlistApiController::class, 'index']);
    Route::post('/', [WishlistApiController::class, 'store']);
    Route::get('/count', [WishlistApiController::class, 'count']);
    Route::get('/check/{courseId}', [WishlistApiController::class, 'check']);
    Route::delete('/{courseId}', [WishlistApiController::class, 'destroy']);
    Route::post('/move-to-cart', [WishlistApiController::class, 'moveAllToCart']);
});

// Protected Cart Routes
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'cart'
], function ($router) {
    Route::get('/', [CartApiController::class, 'index']);
    Route::post('/', [CartApiController::class, 'store']);
    Route::get('/count', [CartApiController::class, 'count']);
    Route::get('/check/{courseId}', [CartApiController::class, 'check']);
    Route::put('/{courseId}', [CartApiController::class, 'update']);
    Route::delete('/{courseId}', [CartApiController::class, 'destroy']);
    Route::delete('/', [CartApiController::class, 'clear']);
});

// Protected Profile Routes
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'profile'
], function ($router) {
    Route::get('/', [ProfileApiController::class, 'show']);
    Route::put('/', [ProfileApiController::class, 'update']);
    Route::post('/avatar', [ProfileApiController::class, 'updateAvatar']);
    Route::post('/change-password', [ProfileApiController::class, 'changePassword']);
    Route::get('/stats', [ProfileApiController::class, 'getStats']);
    Route::get('/instructor-stats', [ProfileApiController::class, 'getInstructorStats'])->middleware('role:instructor|admin');
    Route::get('/enrolled-courses', [ProfileApiController::class, 'getEnrolledCourses']);
    Route::get('/completed-courses', [ProfileApiController::class, 'getCompletedCourses']);
    Route::get('/certificates', [ProfileApiController::class, 'getCertificates']);
    Route::delete('/', [ProfileApiController::class, 'destroy']);
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome to your dashboard!']);
    });
});

Route::group([
    'middleware' => ['api', 'jwt.auth', 'role:admin'],
], function ($router) {
    Route::get('/users', [\App\Http\Controllers\ProfileController::class, 'getAllUsers']);
    Route::put('/users/{user}/role', [\App\Http\Controllers\ProfileController::class, 'updateRole']);
});
