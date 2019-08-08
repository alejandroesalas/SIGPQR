<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;
    const CC_TYPE = 'CC';
    const TI_TYPE = 'TI';
    const ACTIVE_STATE = 'true';
    const FALSE_STATE = 'false';
    const VERIFIED_USER = '1';
    const NOT_VERIFIED_USER = '0';
    const ADMIN_USER = 'true';
    const REGULAR_USER = 'false';
    const ADMIN_PROFILE = 1;
    const COORDINATOR_PROFILE = 2;
    const STUDENT_PROFILE = 3;
    const TEACHER_PROFILE = 4;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'lastname', 'id_type','id_num',
        'password','email','verified','status','admin',
        'program_id','profile_id','verification_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
        ,'verification_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function setNameAttribute($valor){
        $this->attributes['name'] = Str::lower($valor);
    }
    public function getNameAttribute($valor){
        return ucwords($valor);
    }
    public function setEmailAttribute($valor){
        $this->attributes['email'] = Str::lower($valor);
    }
    public function setLastNameAttribute($valor){
        $this->attributes['lastname'] = Str::lower($valor);
    }
    public function getLastNameAttribute($valor){
        return ucwords($valor);
    }
    public function isVerified(){
        return $this->verified == User::VERIFIED_USER;
    }
    public function isAdmin(){
        return $this->admin == User::ADMIN_USER;
    }
    public static function createVerificationToken(){
        return Str::random(40);
    }
    public function profile(){
        return $this->belongsTo(Profile::class,'profile_id');
    }
    public function tokens(){
        return $this->hasMany(Token::class);
    }

}
