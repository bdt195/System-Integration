<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = array('book_id', 'title', 'author', 'category_id', 'description', 'added_by');
    public $timestamps = false;
	protected $table = 'books';
	protected $primaryKey = 'book_id';
	protected $hidden = array();
    public function issues()
    {
    	// $issue = new Issue;
        return $this::count();
        	// ->hasMany('Issue', 'book_id', 'book_id');
        	// ->with('books');
        	// ->select('book_id','available_status','issue_id');
        	// ->first()->count;
    }
}
