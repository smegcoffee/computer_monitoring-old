<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Computer;
use App\Models\ComputerUser;
use App\Models\InstalledApplication;
use App\Models\Notification;
use App\Models\RecentUser;
use App\Models\Remark;
use App\Models\TransferUnit;
use App\Models\Unit;
use Carbon\Carbon;
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
        $authUser = auth()->user();

        $validation = Validator::make($request->all(), [
            'checkedRows'                    =>              ['required'],
            'checkedRows.*'                  =>              ['exists:units,id'],
            'computer_user'                  =>              ['required', 'exists:computer_users,id'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }

        $computer = Computer::where('computer_user_id', $request->computer_user)->first();

        if (!$computer) {
            $computer = Computer::create([
                'computer_user_id'          =>              $request->computer_user,
                'date_cleaning'             =>              now()
            ]);

            $computer->units()->attach($request->checkedRows);
        } else {
            $computer->units()->attach($request->checkedRows);
        }

        foreach ($request->checkedRows as $unitId) {
            $unit = Unit::find($unitId);
            if ($unit) {
                $unit->status = 'Used';
                $unit->save();

                TransferUnit::create([
                    'unit_id'                   =>              $unitId,
                    'computer_user_id'          =>              $request->computer_user,
                    'date'                      =>              now(),
                    'status'                    =>              'Transfer',
                ]);
            }
        }

        $user = ComputerUser::find($request->computer_user);

        $title = $authUser->firstName . ' ' . $authUser->lastName . " added computer unit to " . '(' . $user->name . ').';

        Notification::create([
            'user_id'   =>      $authUser->id,
            'title'     =>      $title
        ]);

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
    public function show(Computer $computer, $id)
    {

        $computer = Computer::with('units', 'computerUser', 'computerUser.branchCode', 'computerUser.position', 'units.category', 'units.supplier', 'installedApplications', 'remarks', 'recentUsers.computerUser', 'recentUsers.unit.category')->find($id);

        if (!$computer) {
            return response()->json([
                'status'                =>              false,
                'message'               =>              'No computer found.',
            ], 200);
        } else {
            return response()->json([
                'status'                =>              true,
                'message'               =>              'Successfully fetched computer data.',
                'computer'              =>              $computer,
                'id'                    =>              $computer->id
            ], 200);
        }
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
    public function destroy(Request $request, Computer $computer, $computerId, $unitId)
    {
        // try {
        //     $computer = Computer::find($computerId);

        //     if (!$computer) {
        //         return response()->json([
        //             'status'            =>              false,
        //             'message'           =>              'Computer not found.',
        //         ], 404);
        //     }

        //     $unit = Unit::findOrFail($unitId);

        //     if (!$unit) {
        //         return response()->json([
        //             'status'        =>          false,
        //             'message'       =>          'Unit not found.',
        //         ], 404);
        //     }

        //     $unit->status = 'Vacant';
        //     $unit->save();

        //     $computer->units()->detach($unitId);

        //     if ($computer->units()->count() === 0) {
        //         $computer->delete();
        //     }


        //     $user = ComputerUser::find($computer->computer_user_id);

        //     $recentUser = RecentUser::create([
        //         'computer_id'        =>          $computerId,
        //         'unit_id'            =>          $unitId,
        //         'computer_user_id'   =>          $request->computer_user_id
        //     ], 200);

        //     return response()->json([
        //         'status'            =>          true,
        //         'message'           =>          $user->name . ' computer unit deleted successfully. And automatically transfer to ' . $recentUser->computerUser->name,
        //     ], 200);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'status'            =>          false,
        //         'message'           =>          'Failed to delete unit from computer.',
        //         'error'             =>          $e->getMessage(),
        //     ], 500);
        // }
    }

    public function installAndRemark(Request $request, $computerId)
    {
        $validation = Validator::make($request->all(), [
            'application_content'           =>              ['required', 'array'],
            'application_content.*'         =>              ['string'],
            'remark_content'                =>              ['required'],
            'date'                          =>              ['required'],
            'format'                        =>              ['required']
        ]);

        if ($validation->fails()) {
            return response([
                'status'            =>          false,
                'message'           =>          'Something went wrong. Please fix.',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $computer = Computer::find($computerId);

        if (!$computer) {

            return response()->json([
                'status'            =>              false,
                'message'           =>              'No computers found'
            ], 422);
        } else {
            $installedApplications = [];
            foreach ($request->application_content as $content) {
                $installed = InstalledApplication::create([
                    'computer_id'                   =>                  $computerId,
                    'application_content'           =>                  $content,
                ]);
                $installedApplications[] = $installed;
                $installedContent[] = $content;
            }

            $remark = Remark::create([
                'computer_id'                   =>                  $computerId,
                'date'                          =>                  $request->date,
                'remark_content'                =>                  $request->remark_content,
            ]);

            if ($request->format === 'Yes') {
                $computer->increment('formatted_status');
            }
            $computer->increment('remarks');
            $computer->save();

            return response()->json([
                'status'                    =>          true,
                'message'                   =>          'Successfully installed ' . implode(', ', $installedContent) . ', and added a remark: ' . $remark->remark_content . ($request->format === 'Yes' ? ', and formatted the computer.' : '.'),
                'computer'                  =>          $computer
            ], 201);
        }
    }

    public function unitAction(Request $request, $computerId, $unitIds)
    {

        try {
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
                $computer = Computer::findOrFail($computerId);
                $unit = Unit::findOrFail($unitId);

                if ($request->action === 'Transfer') {
                    $validation = Validator::make($request->all(), [
                        'computer_user'         =>              ['required', 'exists:computer_users,id'],
                        'date'                  =>              ['required'],
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
                    $computer->units()->detach($unitId);

                    if ($computer->units()->count() === 0) {
                        $computer->delete();
                    }

                    $newUser = ComputerUser::find($request->computer_user);
                    $newComputer = Computer::firstOrCreate([
                        'computer_user_id'          =>          $newUser->id,
                    ]);

                    $newComputer->units()->attach($unitId);

                    $transfer = TransferUnit::create([
                        'unit_id'                       =>              $unitId,
                        'computer_user_id'              =>              $request->computer_user,
                        'date'                          =>              $request->date,
                        'status'                        =>              'Transfer'
                    ]);
                    $transfers[] = $transfer;

                    return response()->json([
                        'status'                =>              true,
                        'message'               =>              'Unit(s) successfully transferred',
                    ], 200);
                }

                if ($request->action === 'Defective') {
                    $unit->status = 'Defective';
                    $unit->save();
                    $units[] = $unit;

                    return response()->json([
                        'status'                =>              true,
                        'message'               =>              'Unit(s) successfully marked as defective',
                    ], 200);
                }
                if ($request->action ===  'Delete') {
                    if ($unit->status === 'Defective') {

                        $unit->status = 'Defective';
                    } else {
                        $unit->status = 'Vacant';
                    }

                    $computer->units()->detach($unitId);
                    $unit->save();

                    if ($computer->units()->count() === 0) {
                        $computer->delete();
                    }
                    $units[] = $unit;
                    return response()->json([
                        'status'                =>              true,
                        'message'               =>              'Unit(s) successfully marked deleted',
                    ], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'status'                    =>                  false,
                'message'                   =>                  'Failed to perform action on unit.',
                'error'                     =>                  $e->getMessage(),
            ], 500);
        }
    }

    public function updateApplicationAndUserDetails(Request $request, $computerId, $computerUserId)
    {
        $validation = Validator::make($request->all(), [
            'application_content'               =>              ['required', 'array'],
            'application_content.*'             =>              ['string'],
            'position'                          =>              ['required', 'exists:positions,id'],
            'branch_code'                       =>              ['required', 'exists:branch_codes,id']
        ]);

        if ($validation->fails()) {
            return response([
                'status'            => false,
                'message'           => 'Something went wrong. Please fix.',
                'errors'            => $validation->errors()
            ], 422);
        }

        $computer = Computer::find($computerId);

        if (!$computer) {
            return response()->json([
                'status'            => false,
                'message'           => 'No computers found'
            ], 422);
        } else {
            if ($request->has('application_content')) {
                $existingApplications = InstalledApplication::where('computer_id', $computerId)->get();
                $existingApplications->whereNotIn('application_content', $request->application_content)->each(function ($app) {
                    $app->delete();
                });

                foreach ($request->application_content as $content) {
                    InstalledApplication::updateOrCreate(
                        ['computer_id' => $computerId, 'application_content' => $content],
                        ['application_content' => $content]
                    );
                }
            }

            $computerUser = ComputerUser::find($computerUserId);

            if (!$computerUser) {
                return response([
                    'status'            => false,
                    'message'           => 'No computer user found.',
                    'errors'            => $validation->errors()
                ], 400);
            } else {
                $computerUser->update([
                    'position_id'             =>          $request->position,
                    'branch_code_id'          =>          $request->branch_code
                ]);
            }

            return response()->json([
                'status'            =>          true,
                'message'           =>          'Updated successfully.',
                'computer'          =>          $computer
            ], 200);
        }
    }

    public function doneCleaning($id)
    {
        $cleaning = Computer::find($id);

        if (!$cleaning) {
            return response()->json([
                'status'                        =>                  false,
                'message'                       =>                  'Computer not found.'
            ], 422);
        }

        $dateCleaning = Carbon::parse($cleaning->date_cleaning);

        if ($dateCleaning->isFuture()) {
            return response()->json([
                'status'                =>                  false,
                'message'               =>                  $cleaning->computerUser->name . '`s computer is already cleaned.'
            ], 422);
        } else {
            $cleaning->update([
                'date_cleaning' => now()->addMonth(3)->format('Y-m-d'),
            ]);

            return response()->json([
                'status'                    =>                  true,
                'message'                   =>                  $cleaning->computerUser->name . '`s computer is completely cleaned.'
            ], 200);
        }
    }
}
