<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'programs';
    protected $fillable = [
        'name','id_faculty','id_coordinator'
    ];

    public function faculty(){
        return $this->belongsTo(Faculty::class,'id_faculty');
    }
    public function coordinator(){
        return $this->belongsTo(Coordinator::class,'id_coordinator');
    }
    public function students(){
        return $this->hasMany(Student::class);
    }
    public function requests(){
        return $this->hasMany(Request::class);
    }

}
