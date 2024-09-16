<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\BranchCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Log as BranchLog;

class BranchCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branches = BranchCode::orderBy('branch_name', 'asc')->get();

        if ($branches->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>             'Branch fetched successfully.',
                'branches'              =>              $branches,
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>             'No branches found.'
            ], 404);
        }
    }

    public function branchCode()
    {
        $branches = BranchCode::orderBy('branch_name', 'asc')->get();

        if ($branches->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>             'Branch fetched successfully.',
                'branches'              =>              $branches,
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>             'No branches found.'
            ], 404);
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
            'branch_name'           =>              ['required', 'unique:branch_codes,branch_name'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'        =>          false,
                'message'       =>          'Something went wrong. Please fix.',
                'errors'        =>          $validation->errors()
            ], 422);
        }

        $branch = BranchCode::create([
            'branch_name'           =>              $request->branch_name
        ], 200);

        BranchLog::create([
            'user_id'           =>              auth()->user()->id,
            'log_data'          =>              'Added a branch: ' . $branch->branch_name
        ]);

        return response()->json([
            'status'                =>              true,
            'message'               =>              $branch->branch_name . ' Branch added successfully.',
            'id'                    =>              $branch->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(BranchCode $branchCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BranchCode $branchCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BranchCode $branchCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $branchCode = BranchCode::find($id);

        if (!$branchCode) {
            return response()->json([
                'status' => false,
                'message' => 'Branch code not found.'
            ], 404);
        }

        $users = $branchCode->users()->count();

        if ($users > 0) {
            return response()->json([
                'status' => false,
                'message' => 'You cannot delete a branch code that is already in use by users.'
            ], 422);
        }

        BranchLog::create([
            'user_id'           =>              auth()->user()->id,
            'log_data'          =>              'Deleted a branch: ' . $branchCode->branch_name
        ]);

        $branchCode->delete();

        return response()->json([
            'status' => true,
            'message' => 'Branch code deleted successfully.'
        ], 200);
    }
}
