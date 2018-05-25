<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = array('category');
    public $timestamps = false;
	protected $table = 'book_categories';
	protected $primaryKey = 'id';
	protected $hidden = array();
}
