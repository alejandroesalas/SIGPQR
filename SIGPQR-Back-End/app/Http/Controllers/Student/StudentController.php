<?php

namespace App\Http\Controllers\Student;

use App\Student;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\ApiController;
use App\Profile;

class StudentController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Profile $profile)
    {
        $students  = $profile
            ->where('name','=','estudiante')
            ->with('users')
            ->get()
            ->pluck('users')
            ->collapse()
            ->values();
        return $this->showAll($students);
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
            'password' => 'min:6|confirmed',
            'id_type' => 'required|in:'. User::CC_TYPE . ',' . User::TI_TYPE,
            'id_num' => 'required|unique:users',
            'password' => 'required|min:3',
            'program_id' => 'required|integer',
        ];
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validation = $this->checkValidation($params_array,$rules);
                if ($validation->fails()){
                    return $this->errorResponse("datos no validos", 400, $validation->errors());
                }else{
                    $params_array['password'] = bcrypt($params_array['password']);
                    $params_array['admin'] = 'false';
                    $params_array['profile_id'] = User::STUDENT_PROFILE;
                    $params_array['status'] = User::ACTIVE_STATE;
                    $params_array['admin'] = User::REGULAR_USER;
                    $params_array['verified']= User::NOT_VERIFIED_USER;
                    $params_array['verification_token'] =User::createVerificationToken();
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
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        return $this->showOne($student);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        //
    }
}
