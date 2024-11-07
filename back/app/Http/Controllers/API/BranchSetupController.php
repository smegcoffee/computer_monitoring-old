<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Log;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BranchSetupController extends Controller
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
        $rules = [
            'branch_name'       =>          ['required'],
            'branch_code_id'    =>          ['required', 'exists:branch_codes,id'],
            'department_id'     =>          ['required_if:branch_code_id,1', 'nullable', 'exists:departments,id'],
        ];

        $messages = [
            'branch_code_id.required'           =>          'Please select a branch code first.',
            'department_id.required_if'     =>          'Please select a department first.',
        ];

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails()) {
            return response()->json([
                'status'        =>          false,
                'message'       =>          "Something went wrong please fix.",
                'errors'        =>          $validation->errors()
            ], 422);
        }

        $branch = Branch::create([
            'branch_name'           =>              $request->branch_name,
            'branch_code_id'        =>              $request->branch_code_id,
            'department_id'         =>              $request->department_id
        ]);

        Notification::create([
            'user_id'       =>          auth()->user()->id,
            'title'         =>          ' Added a branch (' . $branch->branch_name . ').',
        ]);

        Log::create([
            'user_id'           =>              auth()->user()->id,
            'log_data'          =>              'Added a branch: ' . $branch->branch_name . ' and branch code: ' . $branch->branchCode->branch_name . ' and department: ' . ($branch->department?->department_name ?: 'N/A')
        ]);

        return response()->json([
            'status'                =>          true,
            'message'               =>          $branch->branch_name . ' branch added successfully.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
