<?php

namespace App\Http\Controllers\RequestType;

use App\Http\Controllers\ApiController;
use App\RequestType;
use Illuminate\Http\Request;

class RequestTypeController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
        //$this->middleware('auth',['except'=>['auth/login']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->showAll(RequestType::all());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules =['name'=>'required'];
        $json = $request->input('json', null);
        if (!isEmpty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!isEmpty($params_array)){

            }else{
                return $this->errorResponse('Datos Vacios!',400);
            }
        }else{
            return $this->errorResponse('La estrucutra del json no es valida',400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RequestType  $requestType
     * @return \Illuminate\Http\Response
     */
    public function show(RequestType $requestType)
    {
        return $this->showOne($requestType);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RequestType  $requestType
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequestType $requestType)
    {
        $requestType->delete();
        return $this->showOne($requestType);
    }
}
