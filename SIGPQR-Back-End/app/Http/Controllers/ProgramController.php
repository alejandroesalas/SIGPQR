<?php

namespace App\Http\Controllers;

use App\Coordinator;
use App\Http\Controllers\ApiController;
use App\Program;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class ProgramController extends ApiController
{
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
     * @return Response
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
     * @return Response
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
                    $coordinator = Coordinator::find($params_array['id_coordinator']);
                    if($coordinator->profile()->name == 'coordinador' ){
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
     * @param Program $program
     * @return Response
     */
    public function show(Program $program)
    {
        return $this->showOne($program);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Program $program
     * @return Response
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
     * @param Program $program
     * @return Response
     */
    public function destroy(Program $program)
    {
        //
    }

    public function faculty($id){
        $program = Program::findOrFail($id);
        return $this->showOne($program->faculty);
    }
    public function coordinator($id){
        $program = Program::findOrFail($id);
        return $this->showOne($program->coordinator);
    }
    public function getStudents($id){
        $program = Program::findOrFail($id);
        return $this->showAll($program->students);
    }
    public function getRequests($id){
        $program = Program::findOrFail($id);
        return $this->showAll($program->requests);
    }
}
