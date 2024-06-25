<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
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
        //
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

    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->first();


        $validation = Validator::make($request->all(), [
            'email'         =>          ['required', 'email', 'regex:/^\S+@\S+\.\S+$/'],
            'password'      =>          ['required', 'min:8']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'        =>      false,
                'message'       =>      "Something went wrong please fix.",
                'errors'        =>      $validation->errors()
            ], 400);
        }


        if (!$user) {
            return response()->json([
                'status'        =>      false,
                'message'       =>      "This email is not exists or not verified yet",
            ], 400);
        }

        $login = auth()->attempt([
            'email'         =>          $request->email,
            'password'      =>          $request->password
        ]);

        if (!$login) {
            return response()->json([
                'status'        =>          false,
                'message'       =>          'Invalid Credentials'
            ], 400);
        }elseif ($user->request_new_password == true) {
            return response()->json([
                'status'            =>          true,
                'message'           =>          'You need to change your password first',
                'token'             =>          $user->createToken("API TOKEN")->plainTextToken,
                'data'              =>          $user,
                'id'                =>          auth()->user()->id
            ], 409);
        
        } else {
            return response()->json([
                'status'        =>      true,
                'message'       =>      "Welcome " . $user->email . " you are now login",
                'token'         =>      $user->createToken("API TOKEN")->plainTextToken,
                'user'          =>      $user
            ], 200);
        }
    }
}
