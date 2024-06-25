<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allSuppliers = Supplier::all();

        if ($allSuppliers->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>              "Successfully fetch all suppliers data",
                'data'                  =>              $allSuppliers
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>              "No suppliers found.",
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
            'supplier_name'         =>              ['required', 'max:5000', 'unique:suppliers,supplier_name']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }


        $supplier = Supplier::create([
            'supplier_name'          =>          $request->supplier_name
        ]);

        return response()->json([
            'status'                =>              true,
            'message'               =>              $supplier->supplier_name . " supplier added successfully.",
            'data'                  =>              $supplier,
            'id'                    =>              $supplier->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
    }
}
