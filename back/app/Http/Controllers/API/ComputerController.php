<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Computer;
use App\Models\ComputerUser;
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

        DB::beginTransaction();


        $computer = Computer::create([
            // 'unit_id'                    =>          $request->checkedRows,
            'computer_user_id'           =>          $request->computer_user,
            // 'status'                     =>          $request->status,
            // 'remarks'                    =>          $request->remarks,
        ]);
        $computer->units()->attach($request->checkedRows);

        foreach ($request->checkedRows as $unitId) {
            $unit = Unit::find($unitId);
            if ($unit) {
                $unit->status = 'Used';
                $unit->save();
            }
        }

        DB::commit();

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
    public function destroy(Computer $computer)
    {
        //
    }
}
