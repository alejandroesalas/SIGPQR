<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $table = 'responses';
    protected $fillable = [
        'request_id','title','description','student_id','coordinator_id',
        'date','status_response','type'
    ];
}
