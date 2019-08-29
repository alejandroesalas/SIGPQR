<?php

namespace App\Http\Controllers\Request;

use App\Http\Controllers\ApiController;
use App\Request as AppRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestController extends ApiController
{
public function index(){
    $student = auth()->user();
    $_requests = \App\Request::where('student_id', $student->id)
        ->with('program')
        ->with('program.coordinator')
        ->get();
    return $this->showAll($_requests);
}
public function uploadFiles(Request $request){
    $files = $request->allFiles();
    dd($files);
    /*$validate = Validator::make($request->all(), [
        'file0' => 'required|image|mimes:jpg,jpeg,png',
    ]);
    if (!files || $validate->fails()) {
        $data = array(
            'code' => 400,
            'status' => 'error',
            'message' => 'error al subir la imagen',
            'errors'=>$validate->errors()
        );
    } else {
        files_name = time().files->getClientOriginalName();
        \Storage::disk('users')->put(files_name, \File::get(files));
        $data = array(
            'code' => 200,
            'status' => 'succes',
            'image' => files_name
        );
    }*/
   // return response()->json($data, $data['code']);
    private $rules =array(
        'title'=>'required|max:200',
        'description'=>'max:500',
        'status'=> 'required',
        'request_type_id'=>'required|integer',
        'program_id'=>'required|integer',
        'student_id'=> 'required|integer',
    );
    private $updateRules =array(
        'title'=>'required|max:200',
        'description'=>'max:500',
    );

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
            $params_array = array_map('trim', json_decode($json, true));
            if (!Empty($params_array)){
                    $validate = $this->checkValidation($params_array,$this->rules);

                    if ($validate->fails()){
                            return $this->errorResponse("datos no validos",$validate->errors());
                    }else{
                        $response = AppRequest::create($params_array);
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
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request1, AppRequest $response)
    {
        $json = $request1->input('json', null);
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

    public function uploadFiles(Request $request)
    {
        $files = $request->allFiles();
        dd($files);
        /*$validate = Validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png',
        ]);
        if (!files || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'error al subir la imagen',
                'errors'=>$validate->errors()
            );
        } else {
            files_name = time().files->getClientOriginalName();
            \Storage::disk('users')->put(files_name, \File::get(files));
            $data = array(
                'code' => 200,
                'status' => 'succes',
                'image' => files_name
            );
        }*/
    // return response()->json($data, $data['code']);

    }
}
