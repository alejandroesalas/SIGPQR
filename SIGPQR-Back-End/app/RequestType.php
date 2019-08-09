<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequestType extends Model
{
    use SoftDeletes;
    protected $table = 'request_types';
    protected $fillable = [
        'type','description'
    ];
    public function requests(){
        return $this->hasMany(Request::class);
    }
}
