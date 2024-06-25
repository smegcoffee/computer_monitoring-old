<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Computer;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::orderBy('id', 'desc')->count();
        $totalUnits = Unit::orderBy('id', 'desc')->count();
        $totalComputers = Computer::orderBy('id', 'desc')->count();
        $totalRemarks = Computer::whereNotNull('remarks')->count();

        return response()->json([
            'status'                =>              true,
            'totalUsers'            =>              $totalUsers,
            'totalUnits'            =>              $totalUnits,
            'totalComputers'        =>              $totalComputers,
            'totalRemarks'          =>              $totalRemarks,
            'message'               =>              "Successfully fetched data"

        ], 200);
    }
}
