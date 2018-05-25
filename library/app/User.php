<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /* Alowing Eloquent to insert data into our database */
    protected $fillable = array('name', 'username', 'password', 'verification_status');

    public $timestamps = false;

    use UserTrait, RemindableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';
    protected $primaryKey = 'id';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('password');

    public function getAuthPassword() {
        return $this->password;
    }
}
