<?php

namespace App\Http\Controllers;

use App\Coordinator;
use App\Http\Controllers\ApiController;
use App\Program;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class ProgramController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
        //$this->middleware('auth',['except'=>['auth/login']]);
    }

    private $rules =array(
        'name'=>'required',
        'id_faculty'=>'required|integer',
        'id_coordinator'=>'required|integer'
    );
    private $updateRules =array(
        'name'=>'required',
    );
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programs = Program::all();
        return $this->showAll($programs);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validate = $this->checkValidation($params_array,$this->rules);
                if ($validate->fails()){
                    return $this->errorResponse("datos no validos",$validate->errors());
                }else{
                    //Validar que la persona que se asigne como coordinador tenga ese perfil
                    $coordinator = Coordinator::findOrFail($params_array['coordinator_id']);
                    if($coordinator->profile->name == 'coordinador'){
                        $program = Program::create($params_array);
                        return $this->showOne($program);
                    }else{
                        return $this->errorResponse('El usuario especificado no es un coordinador',422);
                    }
                }
            }else{
                return $this->errorResponse('Datos Vacios!',422);
            }
        }else{
            return $this->errorResponse('La estrucutra del json no es valida',422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Program  $program
     * @return \Illuminate\Http\Response
     */
    public function show(Program $program)
    {
        return $this->showOne($program);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Program  $program
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Program $program)
    {
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validate = $this->checkValidation($params_array,$this->updateRules);
                if ($validate->fails()){
                    return $this->errorResponse("datos no validos",$validate->errors());
                }else{
                    $program->name = $params_array['name'];
                    if($program->isDirty()){
                        return $this->errorResponse('se debe especificar al menos un valor',422);
                    }
                    $program->save();
                    return $this->showOne($program);
                }
            }else{
                return $this->errorResponse('Datos Vacios!',422);
            }
        }else{
            return $this->errorResponse('La estrucutra del json no es valida',422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Program  $program
     * @return \Illuminate\Http\Response
     */
    public function destroy(Program $program)
    {
        //
    }
}
