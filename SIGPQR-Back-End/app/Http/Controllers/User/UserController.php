<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;
use App\Profile;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param Profile $profile
     * @return void
     */
    public function index(Profile $profile)
    {
        $students  = $profile
            ->where('name','=','docente')
            ->with('users')
            ->get()
            ->pluck('users')
            ->collapse()
            ->values();
        return $this->showAll($students);
    }

    public function countTeachers(User $user)
    {
        $countTeachers = $user
            ->where('profile_id', User::TEACHER_PROFILE)
            ->count();
        return $this->showOther($countTeachers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name'=>'required',
            'lastname'=>'required',
            'email' => 'email|unique:users',
            'password' => 'min:3|confirmed',
            'id_type' => 'required|in:'. User::CC_TYPE . ',' . User::TI_TYPE,
            'id_num' => 'required|unique:users',
            'password' => 'required|min:3',
        ];
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validation = $this->checkValidation($params_array,$rules);
                if ($validation->fails()){
                    return $this->errorResponse("datos no validos",404, $validation->errors());
                }else{
                    $params_array['password'] = bcrypt($params_array['password']);
                    $params_array['profile_id'] = User::TEACHER_PROFILE;
                    $params_array['status'] = User::ACTIVE_STATE;
                    $params_array['admin'] = User::REGULAR_USER;
                    $params_array['verified']= User::VERIFIED_USER;
                   // $params_array['verification_token'] =User::createVerificationToken();
                    $user = User::create($params_array);
                    return $this->showOne($user);
                }
            }else{
                return $this->errorResponse('Datos Vacios!', 400);
            }
        }else{
            return $this->errorResponse('La estrucutra del json no es valida',415);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
    public function verify($token){
        $user = User::where('verification_token',$token)->firstOrFail();
        $user->verified = User::VERIFIED_USER;
        $user->verification_token = null;
        $user->save();
        return $this->showMessage('Correo validado con exito.');
    }
}
