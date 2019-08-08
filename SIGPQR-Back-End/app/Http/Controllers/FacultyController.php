<?php

namespace App\Http\Controllers;

use App\Faculty;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FacultyController extends ApiController
{
    private $rules =array(
        'name'=>'required'
    );
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $faculty = Faculty::all();
        return $this->showAll($faculty);
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
                    return $this->errorResponse("datos no validos", 400, $validate->errors());
                }else{
                    $faculty = Faculty::create($params_array);
                    return $this->showOne($faculty);
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
     * @param  \App\Faculty  $faculty
     * @return Response
     */
    public function show(Faculty $faculty)
    {
        return $this->showOne($faculty);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Faculty  $faculty
     * @return Response
     */
    public function update(Request $request, Faculty $faculty)
    {
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validate = $this->checkValidation($params_array,$this->rules);
                if ($validate->fails()){
                    return $this->errorResponse("datos no validos", 400, $validate->errors());
                }else{
                    $faculty->name = $params_array['title'];
                    if($faculty->isDirty()){
                        return $this->errorResponse('se debe especificar al menos un valor',422);
                    }
                    $faculty->save();
                    return $this->showOne($faculty);
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
     * @param  \App\Faculty  $faculty
     * @return Response
     */
    public function destroy(Faculty $faculty)
    {
        $faculty->delete();
        return $this->showOne($faculty);
    }
}
