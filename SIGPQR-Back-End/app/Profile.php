<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use SoftDeletes;
    protected $table = 'profiles';
    protected $fillable = [
        'name','description'
    ];

    public function users(){
        return $this->hasMany(User::class);
    }
}
