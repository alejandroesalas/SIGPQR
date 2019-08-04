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
    public function attachments(){
        return $this->hasMany(Attachment::class);
    }
    public function request(){
        return $this->belongsTo(Request::class,'request_id');
    }
}
