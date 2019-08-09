<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Response extends Model
{
    //use SoftDeletes;
    protected $table = 'responses';
    protected $fillable = [
        'request_id','title','description','student_id','coordinator_id','status_response','type'
    ];

    public function attachments(){
        return $this->hasMany(Attachment::class);
    }

    public function request(){
        return $this->belongsTo(Request::class,'request_id');
    }
}
