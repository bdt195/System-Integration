<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\Category;

class CategoryController extends Controller {


	public function __construct(){
		$this->filter_params = array('category_id');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$categories = Category::select('id','category','create_at','update_at')
			->orderBy('id')
            ->get()->toJson();

        return $categories;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
        $newCategory = new Category;
        $newCategory->title = $request->input('name');

        $newCategory->save();
	}

    public function show($id)
    {
        $category = Category::find($id)->toJson();
        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request)
    {
		$id = $request->input('id');
		$category = Category::find($id);
		$category->category = $request->input('title');

        $category->save();
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
		Category::find($id)->delete();
		return true;
	}
	
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function search($string)
	{
		$categories = Category::select('id','category','create_at','update_at')
			->where('category', 'like', '%' . $string . '%')
			->orderBy('id')
			->get()
			->toJson();

        return $categories;
	}
}
