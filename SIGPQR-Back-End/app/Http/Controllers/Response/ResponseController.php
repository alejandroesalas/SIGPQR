<?php

namespace App\Http\Controllers\Response;

use App\AttachmentResponse;
use App\Http\Controllers\ApiController;
use App\Response;
use Illuminate\Http\Request;

class ResponseController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
        //$this->middleware('auth',['except'=>['auth/login']]);
    }
    private $rules =array(
        'request_id'=>'required|integer',
        'title'=>'required|max:200',
        'description'=>'max:500',
        'student_id'=>'required|integer',
        'coordinator_id'=> 'required|integer',
        'status_response'=> 'integer',
        'type'=>'integer'
    );
    private $updateRules =array(
        'title'=>'required|max:200',
        'description'=>'max:500',
    );
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $responses = Response::all();
        return $this->showAll($responses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = json_decode(trim($json), true);
            if (!Empty($params_array)){
                    $validate = $this->checkValidation($params_array,$this->rules);
                    if ($validate->fails()){
                            return $this->errorResponse("datos no validos",$validate->errors());
                    }else{

                        $response = new Response;
                        $response->title = $params_array['title'];
                        $response->description = $params_array['description'];
                        $response->status_response = $params_array['status_response'];
                        $response->type = $params_array['type'];
                        $response->request_id = $params_array['request_id'];
                        $response->student_id = $params_array['student_id'];
                        $response->coordinator_id = $params_array['coordinator_id'];

                        DB::transaction(function () use ($params_array) {
                            $response =  Response::create($params_array);
                            $responseId = $response->id;
                            if(Arr::has($params_array, 'attachments')) {
                                $length = count($params_array['attachments']);
                                for ($i=0; $i < $length; $i++) {
                                    $params_array['attachments'][$i]['response_id'] = $responseId;
                                    AttachmentResponse::create($params_array['attachments'][$i]);
                                }
                            }
                        });
                        return $this->showOne($response);
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
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function show(Response $response)
    {
        return $this->showOne($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Response $response)
    {
        $json = $request->input('json', null);
        if (!Empty($json)){
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                $validate = $this->checkValidation($params_array,$this->updateRules);
                if ($validate->fails()){
                    return $this->errorResponse("datos no validos",$validate->errors());
                }else{
                    $response->title = $params_array['title'];
                    $response->description = $params_array['description'];
                    if($response->isDirty()){
                        return $this->errorResponse('se debe especificar al menos un valor',422);
                    }
                    $response->save();
                    return $this->showOne($response);
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
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function destroy(Response $response)
    {
        $response->delete();
        return $this->showOne($response);
    }

}
