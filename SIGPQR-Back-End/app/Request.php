<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'requests';
    protected $fillable = [
        'title','description','student_id','status','request_type_id',
        'program_id'
    ];

    public function student(){
        $this->belongsTo(Student::class,'student_id');
    }
    public function program(){
        $this->belongsTo(Program::class,'program_id');
    }
    public function requestType(){
        $this->belongsTo(RequestType::class,'request_type_id');
    }
    public function responses(){
        $this->hasMany(Response::class);
    }

}
