<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


//Register
Route::post('register', [UserController::class, 'register']);

//Login
Route::post('login', [UserController::class, 'login']);

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    
    //Profile
    Route::get('profile', [UserController::class, 'profile']);

    //Logout
    Route::get('logout', [UserController::class, 'logout']);

});