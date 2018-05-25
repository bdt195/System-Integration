<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\Category;

class BookController extends Controller {


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
		$bookList = Book::select('book_id','title','author','description','category_id')
			->orderBy('book_id')
            ->get()->toJson();

        return $bookList;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
        $newBook = new Book;
        $newBook->title = $request->input('title');
        $newBook->author = $request->input('author');
        $newBook->description = $request->input('description');
        $newBook->category_id = $request->input('category_id');
        $newBook->added_by = $request->input('added_by');

        $newBook->save();
	}

    public function show($id)
    {
        $book = Book::find($id)->toJson();
        return $book;
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
		$book = Book::find($id);
		$book->title = $request->input('title');
        $book->author = $request->input('author');
        $book->description = $request->input('description');
        $book->category_id = $request->input('category_id');
        $book->added_by = $request->input('added_by');

        $book->save();
		
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
		Book::find($id)->delete();
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
		$books = Book::select('book_id','title','author','description','category_id')
			->where('title', 'like', '%' . $string . '%')
			->orWhere('author', 'like', '%' . $string . '%')
			->orderBy('book_id')
            ->get()
			->toJson();

        return $books;
	}
}
