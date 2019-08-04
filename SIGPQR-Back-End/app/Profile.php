<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
     const  ADMIN_PROFILE = 'administrador';
     const  STUDENT_PROFILE = 'estudiante';
     const  COOR_PROFILE = 'coordinador';
    use SoftDeletes;
    protected $table = 'profiles';
    protected $fillable = [
        'name','description'
    ];

    public function users(){
        return $this->hasMany(User::class);
    }
}
