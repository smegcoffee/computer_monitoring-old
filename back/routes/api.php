<?php

use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PasswordChangeController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// POST
Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);


Route::middleware("auth:sanctum")->group(function () {
    // GET
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/logout', [LogoutController::class, 'logout']);

    // POST
});


// POST
Route::post('/change-new-password/{id}', [PasswordChangeController::class, 'update']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
