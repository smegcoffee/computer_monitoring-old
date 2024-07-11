<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allUnits = Unit::orderBy('id', 'asc')->with(['category', 'supplier', 'transferUnits.computerUser'])->get();
        $vacantDefectiveUnits = Unit::orderBy('id', 'asc')->where('status', 'Vacant')->orWhere('status', 'Defective')->with(['category', 'supplier'])->get();
        $vacantUnits = Unit::orderBy('id', 'asc')->where('status', 'Vacant')->with(['category', 'supplier'])->get();

        if ($allUnits->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>              "Successfully fetch all units data",
                'data'                  =>              $allUnits,
                'vacantDefective'       =>              $vacantDefectiveUnits,
                'vacant'                =>              $vacantUnits
            ], 200);
        } else {
            return response()->json([
                'status'                =>              true,
                'message'               =>              "No units found.",
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
            '*.category'                        =>              ['required', 'exists:categories,id'],
            '*.supplier'                        =>              ['required', 'exists:suppliers,id'],
            '*.date_of_purchase'                =>              ['required', 'date'],
            '*.description'                     =>              ['required', 'max:5000'],
            '*.serial_number'                   =>              ['required'],
            '*.status'                          =>              ['required', 'in:Used,Vacant,Defective,Used (Transfer)']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>              false,
                'message'               =>              'Something went wrong. Please fix.',
                'errors'                =>              $validation->errors()
            ], 422);
        }

        $createdUnits = [];

        foreach ($request->all() as $unitData) {
            $createdUnit = Unit::create([
                'category_id'                   =>                  $unitData['category'],
                'supplier_id'                   =>                  $unitData['supplier'],
                'date_of_purchase'              =>                  $unitData['date_of_purchase'],
                'description'                   =>                  $unitData['description'],
                'serial_number'                 =>                  $unitData['serial_number'],
                'status'                        =>                  $unitData['status']
            ]);

            $createdUnit->unit_code = '00000' . $createdUnit->id;
            $createdUnit->save();

            $createdUnits[] = $createdUnit;
        }

        return response()->json([
            'status'                    =>                  true,
            'message'                   =>                  count($createdUnits) . (count($createdUnits) <= 1 ? " Unit" : " Units") . " added successfully.",
            'data'                      =>                  $createdUnits
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
