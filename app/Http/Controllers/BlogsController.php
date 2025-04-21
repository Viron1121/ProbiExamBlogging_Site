<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $blogs = Blogs::all();
            return response()->json($blogs);
        }catch(\Exception $e){
            if($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException){
                abort(404); 
        }
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
        //
        try{
            $blogs = Blogs::create($request->all());
            return response()->json($blogs);
        }catch(\Exception $e){
            if($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException){
                abort(404); 
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blogs $blogs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blogs $blogs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        try{
            $customer = Blogs::find($id);
            $customer->update($request->all());
            return response([
                'customer' => $customer
            ], Response::HTTP_OK);
        }catch(\Exception $e){
            return response([
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try{
            Blogs::find($id)->delete();
            return response([
                'message' => 'Blog deleted successfully'
            ], Response::HTTP_OK);
        }
        catch(\Exception $e){
            return response([
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
