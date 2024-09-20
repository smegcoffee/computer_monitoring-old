<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Log as CategoryLog;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allCategories = Category::orderBy('created_at', 'desc')->get();

        if ($allCategories->count() > 0) {
            return response()->json([
                'status'                =>              true,
                'message'               =>              "Successfully fetch all categories data",
                'data'                  =>              $allCategories
            ], 200);
        } else {
            return response()->json([
                'status'                =>              false,
                'message'               =>              "No categories found.",
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
            'category_name'         =>              ['required', 'max:5000', 'unique:categories,category_name']
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Something went wrong. Please fix.',
                'errors'                =>          $validation->errors()
            ], 422);
        }


        $category = Category::create([
            'category_name'          =>          $request->category_name
        ]);

        CategoryLog::create([
            'user_id'           =>              auth()->user()->id,
            'log_data'          =>              'Added a category: ' . $category->category_name
        ]);

        return response()->json([
            'status'                =>              true,
            'message'               =>              $category->category_name . " category added successfully.",
            'data'                  =>              $category,
            'id'                    =>              $category->id
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
