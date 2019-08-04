<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'requests';
    protected $fillable = [
        'title','description','student_id','status','request_type_id',
        'program_id','date'
    ];
}
