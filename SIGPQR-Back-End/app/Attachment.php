<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $table = 'attachment';
    protected $fillable = [
        'response_id','route','name'
    ];

    public function response()
    {
        return $this->belongsTo(Response::class,'response_id');
    }
}
