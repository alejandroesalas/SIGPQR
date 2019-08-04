<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'tokens';
    protected $fillable = [
        'token','user_id','correo','tipo','status'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
