<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;
use App\Profile;
use App\Coordinator;
use App\Program;

class CoordinatorController extends ApiController
{
    public function __construct()
    {
        //$this->middleware('auth:api');
        //$this->middleware('auth',['except'=>['auth/login']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @param Profile $profile
     * @return void
     */
    public function index(Profile $profile)
    {
        $students = $profile
            ->where('name','=','coordinador')
            ->with('users')
            ->get()
            ->pluck('users')
            ->collapse()
            ->values();
        return $this->showAll($students);
    }

    public function countCoordinators(Coordinator $coordinator)
    {
        $countCoordinators = $coordinator
            ->where('profile_id', User::COORDINATOR_PROFILE)
            ->count();
        return $this->showOther($countCoordinators);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\coordinator  $coordinator
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coordinator $coordinator)
    {
        $rules = [
            'program_id'=>'required|integer',
        ];

        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validate = $this->checkValidation($params_array, $rules);
                if ($validate->fails()){
                    return $this->errorResponse("datos no validos", 400, $validate->errors());
                }else{

                    $coordinator->profile_id = User::COORDINATOR_PROFILE;
                    if(!$coordinator->isDirty()){
                        return $this->errorResponse('se debe especificar al menos un valor', 422);
                    }
                    $isTeacher = $coordinator->where('id', $coordinator->id)
                        ->where('profile_id', User::TEACHER_PROFILE)
                        ->count();
                    if($isTeacher == 0) {
                        return $this->errorResponse("Este usuario no es docente", 404);
                    }
                    $coordinator::where('id', $coordinator->id)
                        ->update([
                            'profile_id' => User::COORDINATOR_PROFILE,
                        ]);
                    Program::where('id', $params_array['program_id'])
                        ->update([
                            'coordinator_id' => $coordinator->id
                        ]);
                    return $this->showOne($coordinator);
                }
            }else{
                return $this->errorResponse('Datos Vacios!', 422);
            }
        }else{
            return $this->errorResponse('La estrucutra del json no es valida', 422);
        }
    }

}
