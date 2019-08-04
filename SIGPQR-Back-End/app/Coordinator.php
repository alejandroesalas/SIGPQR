<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coordinator extends User
{
    use SoftDeletes;
    public function programs()
    {
        return $this->hasMany(Program::class);
    }
    //devuelve las respuestas que ha realizado un coordinador
    /**
    public function responses(){
        return $this->hasMany(Response::class);
    }*/
}
