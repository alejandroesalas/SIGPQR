<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestType extends Model
{
    protected $table = 'request_types';
    protected $fillable = [
        'type','description'
    ];
    public function requests(){
        $this->hasMany(Request::class);
    }
}
