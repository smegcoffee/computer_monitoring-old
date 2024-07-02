<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Computer;
use App\Models\ComputerUser;
use App\Models\RecentUser;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $computers = Computer::orderBy('id', 'desc')->with('unit', 'computerUser', 'unit.category', 'unit.supplier')->get();

        if ($computers->count() > 0) {
            return response()->json([
                'status'            =>              true,
                'message'           =>              'Successfully fetched all computer set.',
                'data'              =>              $computers
            ], 200);
        } else {
            return response()->json([
                'status'            =>              false,
                'message'           =>              'No computer set found.'
            ], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'checkedRows'                    =>              ['required'],
            'checkedRows.*'                  =>              ['exists:units,id'],
            'computer_user'                  =>              ['required', 'exists:computer_users,id'],
            // 'status'                         =>              ['required', 'in:Formatted,Transfer'],
            // 'remarks'                        =>              ['required', 'max:5000'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }

        $computer = Computer::where('computer_user_id', $request->computer_user)->first();

        if (!$computer) {
            $computer = Computer::create([
                'computer_user_id' => $request->computer_user,
            ]);
            $computer->units()->attach($request->checkedRows);
        } else {
            $computer->units()->attach($request->checkedRows);
        }

        foreach ($request->checkedRows as $unitId) {
            $unit = Unit::find($unitId);
            if ($unit) {
                $unit->status = 'Used';
                $unit->save();
            }
        }

        $user = ComputerUser::find($request->computer_user);
        return response()->json([
            'status'                =>              true,
            'message'               =>              $user ? $user->name . " computer added successfully." : "Computer added successfully.",
            'data'                  =>              $computer,
            'id'                    =>              $computer->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Computer $computer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Computer $computer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Computer $computer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Computer $computer, $computerId, $unitId)
    {
        try {
            $computer = Computer::find($computerId);

            if (!$computer) {
                return response()->json([
                    'status'            =>              false,
                    'message'           =>              'Computer not found.',
                ], 404);
            }

            $unit = Unit::findOrFail($unitId);

            if (!$unit) {
                return response()->json([
                    'status'        =>          false,
                    'message'       =>          'Unit not found.',
                ], 404);
            }

            $unit->status = 'Vacant';
            $unit->save();

            $computer->units()->detach($unitId);

            if ($computer->units()->count() === 0) {
                $computer->delete();
            }


            $user = ComputerUser::find($computer->computer_user_id);

            $recentUser = RecentUser::create([
                'computer_id'        =>          $computerId,
                'unit_id'            =>          $unitId,
                'computer_user_id'   =>          $request->computer_user_id
            ], 200);

            return response()->json([
                'status'            =>          true,
                'message'           =>          $user->name . ' computer unit deleted successfully. And automatically transfer to ' . $recentUser->computerUser->name,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'Failed to delete unit from computer.',
                'error'             =>          $e->getMessage(),
            ], 500);
        }
    }
}
