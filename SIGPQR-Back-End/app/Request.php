<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Request extends Model
{
    use SoftDeletes;
    protected $table = 'requests';
    protected $fillable = [
        'title','description','student_id','status','request_type_id',
        'program_id'
    ];

    public function student(){
        return $this->belongsTo(Student::class,'student_id');
    }
    public function program(){
        return $this->belongsTo(Program::class,'program_id');
    }
    public function requestType(){
        return $this->belongsTo(RequestType::class,'request_type_id');
    }
    public function responses(){
        return $this->hasMany(Response::class);
    }

}
