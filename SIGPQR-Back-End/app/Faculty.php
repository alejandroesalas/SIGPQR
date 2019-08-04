<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faculty extends Model
{
    use SoftDeletes;
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
