<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Models\ComputerUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComputerUserController extends Controller
{
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
            'name'                           =>              ['required'],
            'position'                       =>              ['required'],
            'branch_code'                    =>              ['required']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }


        $user = ComputerUser::create([
            'name'                    =>          $request->name,
            'position_id'             =>          $request->position,
            'branch_code_id'          =>          $request->branch_code

        ]);


        return response()->json([
            'status'                =>              true,
            'message'               =>              $user->name . " user added successfully.",
            'data'                  =>              $user,
            'id'                    =>              $user->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(ComputerUser $computerUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ComputerUser $computerUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ComputerUser $computerUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComputerUser $computerUser)
    {
        //
    }
}
