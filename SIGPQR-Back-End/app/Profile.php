<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';
    protected $fillable = [
        'name','description'
    ];

    public function users(){
        return $this->hasMany(User::class);
    }
}
