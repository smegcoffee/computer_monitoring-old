<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Computer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'unit'                           =>              ['required'],
            'computer_user'                  =>              ['required'],
            'status'                         =>              ['required', 'in:Formatted,Transfer'],
            'remarks'                        =>              ['required', 'max:5000'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }


        $computer = Computer::create([
            'unit_id'                    =>          $request->unit,
            'computer_user_id'           =>          $request->computer_user,
            'status'                     =>          $request->status,
            'remarks'                    =>          $request->remarks,
        ]);


        return response()->json([
            'status'                =>              true,
            'message'               =>              $computer->computerUser->name . " computer added successfully.",
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
