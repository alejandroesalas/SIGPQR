<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $table = 'faculties';
    protected $fillable = [
        'name'
    ];

    /**
     * Función que devuelve los programas que pertenecen a una facultad
     */
    public function programs(){
        return $this->hasMany(Program::class);
    }
}