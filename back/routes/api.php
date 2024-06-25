<?php

use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\Auth\ForgotPasswordController;
use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\LogoutController;
use App\Http\Controllers\API\Auth\PasswordChangeController;
use App\Http\Controllers\API\Auth\RegisterController;
use App\Http\Controllers\API\BranchCodeController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ComputerController;
use App\Http\Controllers\API\ComputerUserController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\UnitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// POST
Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/change-new-password/{id}', [PasswordChangeController::class, 'update']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);

Route::middleware("auth:sanctum")->group(function () {
    // GET
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/logout', [LogoutController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/units', [UnitController::class, 'index']);
    Route::post('/add-branch', [BranchCodeController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);
});
Route::get('/suppliers', [SupplierController::class, 'index']);

// POST
Route::post('/add-category', [CategoryController::class, 'store']);
Route::post('/add-supplier', [SupplierController::class, 'store']);
Route::post('/add-unit', [UnitController::class, 'store']);
Route::post('/add-computer', [ComputerController::class, 'store']);
Route::post('/add-computer-user', [ComputerUserController::class, 'store']);


// GET
Route::get('/branches', [BranchCodeController::class, 'index']);