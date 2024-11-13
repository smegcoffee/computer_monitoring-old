<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BranchCode;
use App\Models\BranchOldDataUnit;
use App\Models\BranchUnit;
use App\Models\Department;
use App\Models\Log;
use App\Models\Notification;
use App\Models\TransferBranchUnit;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BranchUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branchUnits = BranchCode::with(['departments', 'branchUnits.unit.category', 'branchUnits.unit.supplier'])->whereHas('branchUnits')->get();

        if ($branchUnits->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>             'Branch units fetched successfully.',
                'branch_units'          =>              $branchUnits,
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>             'No branch units found.'
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
        $authUser = auth()->user();

        $validation = Validator::make($request->all(), [
            'checkedRows'                    =>              ['required'],
            'checkedRows.*'                  =>              ['exists:units,id'],
            'branch'                         =>              ['required', 'exists:branch_codes,id'],
            'department'                     =>              ['required', 'exists:departments,id'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }

        foreach ($request->checkedRows as $unitId) {
            $unit = Unit::find($unitId);
            if ($unit) {
                $unit->status = 'Used';
                $unit->save();

                $branchUnits = BranchUnit::create([
                    'unit_id'                   =>              $unitId,
                    'branch_code_id'            =>              $request->branch,
                    'department_id'             =>              $request->department
                ]);

                $branchOldUnits = BranchOldDataUnit::create([
                    'unit_id'                   =>              $unitId,
                    'branch_code_id'            =>              $request->branch,
                    'department_id'             =>              $request->department
                ]);

                $transfer = TransferBranchUnit::create([
                    'unit_id'                   =>              $unitId,
                    'branch_old_data_unit_id'   =>              $branchOldUnits->id,
                    'date'                      =>              now(),
                    'status'                    =>              'Transfer',
                ]);

                Log::create([
                    'user_id'                   =>              auth()->user()->id,
                    'computer_user_id'          =>              $request->computer_user,
                    'log_data'                  =>              $transfer->unit->category->category_name . ' transfered' . ' to ' . $transfer->branchOldDataUnit->branchCode->branch_name_english . ' (' . $transfer->branchOldDataUnit->branchCode->branch_name . ')' . ' department: ' . $transfer->branchOldDataUnit->department->department_name,
                ]);
            }
        }

        $title = $authUser->firstName . ' ' . $authUser->lastName . " added unit to " . $branchUnits->branchCode->branch_name_english . ' (' . $branchUnits->branchCode->branch_name . ')';

        Notification::create([
            'user_id'   =>      $authUser->id,
            'title'     =>      $title
        ]);

        return response()->json([
            'status'                =>              true,
            'message'               =>              $branchUnits->branchCode->branch_name_english . ' (' . $branchUnits->branchCode->branch_name . ') unit(s) added successfully.',
        ], 200);
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
        $branchUnits = BranchCode::with('branchUnits.unit.category', 'branchUnits.unit.supplier', 'branchUnits.department')->find($id);

        if (!$branchUnits) {
            return response()->json([
                'status'                =>              false,
                'message'               =>              'Branch unit not found.'
            ], 404);
        }

        return response()->json([
            'status'                =>              true,
            'message'               =>              'Branch unit item fetched successfully.',
            'branch_unit_data'      =>              $branchUnits
        ], 200);
    }

    public function unitAction(Request $request, $branchUnitId, $unitIds)
    {
        $unitIds = explode(',', $unitIds);

        $validation = Validator::make($request->all(), [
            'action'        =>              ['required']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'Something went wrong. Please fix.',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $transfers = [];
        $units = [];

        foreach ($unitIds as $unitId) {
            $branchUnit = BranchUnit::where('branch_code_id', $branchUnitId)->first();
            $unit = Unit::findOrFail($unitId);

            if ($request->action === 'Transfer') {
                $validation = Validator::make($request->all(), [
                    'branch'                         =>              ['required', 'exists:branch_codes,id'],
                    'department'                     =>              ['required', 'exists:departments,id'],
                    'date'                           =>              ['required'],
                ]);

                if ($validation->fails()) {
                    return response()->json([
                        'status'            =>          false,
                        'message'           =>          'Something went wrong. Please fix.',
                        'errors'            =>          $validation->errors()
                    ], 422);
                }

                $unit->status = 'Used';
                $unit->save();

                $oldBranchUnit = $branchUnit->branchCode->branch_name_english . ' (' . $branchUnit->branchCode->branch_name . ')' . ' department: ' . $branchUnit->department->department_name;

                $branchUnit->update([
                    'branch_code_id'            =>              $request->branch,
                    'department_id'             =>              $request->department,
                ]);

                $existsOldDataBranch = BranchOldDataUnit::where('branch_code_id', $request->branch)->where('department_id', $request->department)->where('unit_id', $unitId)->exists();

                if (!$existsOldDataBranch) {
                    $branchOldUnits = BranchOldDataUnit::create([
                        'unit_id'                   =>              $unitId,
                        'branch_code_id'            =>              $request->branch,
                        'department_id'             =>              $request->department
                    ]);
                }

                $transfer = TransferBranchUnit::create([
                    'unit_id'                       =>              $unitId,
                    'branch_old_data_unit_id'       =>              $branchOldUnits->id,
                    'date'                          =>              $request->date,
                    'status'                        =>              'Transfer'
                ]);

                $transfers[] = $transfer;

                Log::create([
                    'user_id'                   =>              auth()->user()->id,
                    'computer_user_id'          =>              null,
                    'log_data'                  =>              $transfer->unit->category->category_name . ' unit transfered ' . ' to ' . $transfer->branchOldDataUnit->branchCode->branch_name_english . ' (' . $transfer->branchOldDataUnit->branchCode->branch_name . ')' . ' in the ' . $branchUnit->department->department_name . ' department, and this unit is from ' . $oldBranchUnit
                ]);

                return response()->json([
                    'status'                =>              true,
                    'message'               =>              'Unit(s) successfully transfered',
                ], 200);
            }

            if ($request->action === 'Defective') {
                $unit->status = 'Defective';
                $unit->save();
                $units[] = $unit;

                Log::create([
                    'user_id'                   =>              auth()->user()->id,
                    'computer_user_id'          =>              null,
                    'log_data'                  =>              $unit->category->category_name . ' unit marked as defective in the ' . $branchUnit->branchCode->branch_name_english . ' (' . $branchUnit->branchCode->branch_name . ') branch' . ' in the ' . $branchUnit->department->department_name . ' department.'
                ]);

                return response()->json([
                    'status'                =>              true,
                    'message'               =>              'Unit(s) successfully marked as defective',
                ], 200);
            }

            if ($request->action ===  'Delete') {
                if ($unit->status === 'Defective') {
                    Log::create([
                        'user_id'                   =>              auth()->user()->id,
                        'computer_user_id'          =>              null,
                        'log_data'                  =>              $unit->category->category_name . ' unit marked as defective in the ' . $branchUnit->branchCode->branch_name_english . ' (' . $branchUnit->branchCode->branch_name . ') branch' . ' in the ' . $branchUnit->department->department_name . ' department.'
                    ]);
                    $unit->status = 'Defective';
                } else {
                    Log::create([
                        'user_id'                   =>              auth()->user()->id,
                        'computer_user_id'          =>              null,
                        'log_data'                  =>              $unit->category->category_name . ' unit marked as vacant and this unit is from ' . $branchUnit->branchCode->branch_name_english . ' (' . $branchUnit->branchCode->branch_name . ') branch' . ' in the ' . $branchUnit->department->department_name . ' department.'
                    ]);
                    $unit->status = 'Vacant';
                }

                $unit->save();

                $branchUnitDelete = BranchUnit::where('branch_code_id', $branchUnitId)->get();
                foreach ($branchUnitDelete as $deleteUnit) {
                    $deleteUnit->delete();
                }
                $units[] = $unit;
                return response()->json([
                    'status'                =>              true,
                    'message'               =>              'Unit(s) successfully marked deleted',
                ], 200);
            }
        }
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
