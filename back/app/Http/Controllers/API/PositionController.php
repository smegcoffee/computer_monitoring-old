<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $positions = Position::orderBy('position_name', 'asc')->get();

        if ($positions->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>             'Postion fetched successfully.',
                'positions'             =>              $positions,
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>             'No positions found.'
            ], 200);
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
            'position_name'           =>              ['required', 'unique:positions,position_name'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'        =>          false,
                'message'       =>          'Something went wrong. Please fix.',
                'errors'        =>          $validation->errors()
            ], 422);
        }

        $position = Position::create([
            'position_name'           =>              $request->position_name
        ], 200);

        return response()->json([
            'status'                =>              true,
            'message'               =>              $position->position_name . ' Position added successfully.',
            'id'                    =>              $position->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        //
    }
}
