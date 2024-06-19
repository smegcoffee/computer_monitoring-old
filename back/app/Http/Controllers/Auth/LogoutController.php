<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout()
    {
        auth()->user()->tokens()->delete();

        $user = auth()->user();

        return response()->json([
            'status'            =>          true,
            'message'           =>          "Logout successfully",
            'data'              =>          $user,
            'id'                =>          auth()->user()->id
        ], 200);
    }
}
