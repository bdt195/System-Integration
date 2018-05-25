<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentCategory extends Model
{
    protected $fillable = array('cat_id', 'category');

    public $timestamps = false;

	protected $table = 'student_categories';
	protected $primaryKey = 'cat_id';

	protected $hidden = array();
}
