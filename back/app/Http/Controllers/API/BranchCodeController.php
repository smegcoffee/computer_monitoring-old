<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\BranchCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BranchCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branches = BranchCode::all();

        if ($branches) {
            return response()->json([
                'status'                =>              true,
                'message'               =>             'Branch fetched successfully.',
                'branches'              =>              $branches
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>             'No branches found.'
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
    public function destroy(BranchCode $branchCode)
    {
        //
    }
}
