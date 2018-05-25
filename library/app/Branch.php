<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = array('id', 'branch');

    public $timestamps = false;

	protected $table = 'branches';
	protected $primaryKey = 'id';

	protected $hidden = array();

}
