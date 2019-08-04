<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends User
{
    public function program(){
        return $this->belongsTo(Program::class,'program_id');
    }
    public function requests(){
        return $this->hasMany(Request::class);
    }
}
