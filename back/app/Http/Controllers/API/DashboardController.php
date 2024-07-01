<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Computer;
use App\Models\Unit;
use App\Models\ComputerUser;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();


        $totalUsers = ComputerUser::orderBy('id', 'desc')->count();
        $totalUnits = Unit::orderBy('id', 'desc')->count();
        $totalComputers = Computer::orderBy('id', 'desc')->count();
        $totalRemarks = Computer::whereNotNull('remarks')->count();
        $totalVacant = Unit::where('status', 'Vacant')->count();
        $totalUsed = Unit::where('status', 'Used')->count();
        $totalDefective = Unit::where('status', 'Defective')->count();
        $totalUsedTransfer = Unit::where('status', 'Used (Transfer)')->count();

        // Users
        $usersCount = ComputerUser::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('D');
            });

        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $weeklyUsers = [];

        foreach ($daysOfWeek as $day) {
            $weeklyUsers[] = [
                'name'          =>          $day,
                'users'         =>          isset($usersCount[$day]) ? $usersCount[$day]->count() : 0,
            ];
        }

        $totalUsersInMonth = ComputerUser::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        $user_percentage = ($totalUsersInMonth / $totalUsers) * 100;

        // Units
        $unitsCount = Unit::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('D');
            });

        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $weeklyUnits = [];

        foreach ($daysOfWeek as $day) {
            $weeklyUnits[] = [
                'name'                  =>              $day,
                'units'                 =>              isset($unitsCount[$day]) ? $unitsCount[$day]->count() : 0,
            ];
        }

        $totalUnitsInMonth = Unit::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        $unit_percentage = ($totalUnitsInMonth / $totalUnits) * 100;

        // Remarks
        $remarksData = Computer::whereNotNull('remarks')
            ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('D');
            });

        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $weeklyRemarks = [];

        foreach ($daysOfWeek as $day) {
            $weeklyRemarks[] = [
                'name'              =>          $day,
                'Remarks'           =>          isset($remarksData[$day]) ? $remarksData[$day]->count() : 0,
            ];
        }

        $totalRemarksInMonth = Computer::whereNotNull('remarks')->whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        $remark_percentage = ($totalRemarksInMonth / $totalRemarks) * 100;

        // Computers
        $computersData = Computer::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('D');
            });

        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $weeklyComputers = [];

        foreach ($daysOfWeek as $day) {
            $weeklyComputers[] = [
                'name'                  =>          $day,
                'Computers'             =>          isset($computersData[$day]) ? $computersData[$day]->count() : 0,
            ];
        }
        $totalComputersInMonth = Computer::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        $computer_percentage = ($totalComputersInMonth / $totalComputers) * 100;

        // Analytics
        $analytics = ComputerUser::withCount([
            'computers',
            'computers as units_count' => function ($query) {
                $query->selectRaw('sum(computer_unit.quantity) as total_units')
                    ->join('computer_unit', 'computers.id', '=', 'computer_unit.computer_id')
                    ->groupBy('computers.id');
            }
        ])
            ->whereHas('computers')
            ->orderBy('id', 'asc')
            ->get();

        $analytics = ComputerUser::withCount([
            'computers',
            'computers as units_count' => function ($query) {
                $query->selectRaw('sum(computer_unit.quantity) as total_units')
                    ->join('computer_unit', 'computers.id', '=', 'computer_unit.computer_id')
                    ->groupBy('computers.id');
            }
        ])
            ->whereHas('computers')
            ->orderBy('id', 'asc')
            ->get();

        $usersFormatted = Computer::whereNotNull('formatted_status')->with('computerUser')->orderBy('formatted_status', 'desc')->get();


        return response()->json([
            'status'                =>              true,
            'totalUsers'            =>              $totalUsers,
            'totalUnits'            =>              $totalUnits,
            'totalComputers'        =>              $totalComputers,
            'totalRemarks'          =>              $totalRemarks,
            'totalVacant'           =>              $totalVacant,
            'totalUsed'             =>              $totalUsed,
            'totalDefective'        =>              $totalDefective,
            'totalUsedTransfer'     =>              $totalUsedTransfer,
            'weeklyRemarks'         =>              $weeklyRemarks,
            'weeklyUsers'           =>              $weeklyUsers,
            'weeklyUnits'           =>              $weeklyUnits,
            'weeklyComputers'       =>              $weeklyComputers,
            'weeklyRemarks'         =>              $weeklyRemarks,
            'analytics'             =>              $analytics,
            'usersFormatted'        =>              $usersFormatted,
            'unitsPercent'          =>              round($unit_percentage, 2),
            'usersPercent'          =>              round($user_percentage, 2),
            'computersPercent'      =>              round($computer_percentage, 2),
            'remarksPercent'        =>              round($remark_percentage, 2),
            'message'               =>              "Successfully fetched data"

        ], 200);
    }
}
