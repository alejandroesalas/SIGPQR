<?php

namespace App\Http\Controllers\Request;

use App\AttachmentRequest;
use App\Http\Controllers\ApiController;
use App\Request as AppRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
 use lluminate\Support\Facades\File;
use Tymon\JWTAuth\JWTAuth;
class RequestController extends ApiController
{
    private $rules = array(
        'title' => 'required|max:200',
        'description' => 'max:500',
        'status' => 'required',
        'request_type_id' => 'required|integer',
        'program_id' => 'required|integer',
        'student_id' => 'required|integer',
    );
    private $updateRules = array(
        'title' => 'required|max:200',
        'description' => 'max:500',
    );
    public function index()
    {
        $student = auth()->user();
        $_requests =  AppRequest::where('student_id', $student->id)
            ->with('program')
            ->with('program.coordinator')
            ->get();
        return $this->showAll($_requests);
    }

    public function uploadFiles(Request $request)
    {
        $attachments = array();
        $student = auth()->user();
        $files = $request->allFiles();
        if ($files){
            foreach ($files as $file){
                 $attachmentRequest = new AttachmentRequest();

                $fileName = time().$file->getClientOriginalName();
                $attachmentRequest->name = $fileName;
                if (!Storage::disk('upload')->exists($student->id_num)){
                    Storage::disk('upload')->makeDirectory($student->id_num);
                }
                Storage::disk('upload')->put($student->id_num.'/'.$fileName,\File::get($file));
                $attachmentRequest->route = 'upload/'.$student->id_num.'/'.$fileName;
                $attachments[]=$attachmentRequest;
            }
            return $this->showOther($attachments);

        }else{
            return $this->showMessage('error al subi archivos',400);
        }
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
            if (!Empty($json)) {
                $params_array = array_map('trim', json_decode($json, true));
                if (!Empty($params_array)) {
                    $validate = $this->checkValidation($params_array, $this->rules);

                    if ($validate->fails()) {
                        return $this->errorResponse("datos no validos", $validate->errors());
                    } else {
                        $response = AppRequest::create($params_array);
                        return $this->showOne($response);
                    }
                } else {
                    return $this->errorResponse('Datos Vacios!', 422);
                }
            } else {
                return $this->errorResponse('La estrucutra del json no es valida', 422);
            }
        }

        /**
         * Update the specified resource in storage.
         *
         * @param Request $request
         * @param \App\Request $request
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request1, AppRequest $response)
        {
            $json = $request1->input('json', null);
            if (!Empty($json)) {
                $params_array = array_map('trim', json_decode($json, true));
                if (!Empty($params_array)) {
                    $validate = $this->checkValidation($params_array, $this->updateRules);
                    if ($validate->fails()) {
                        return $this->errorResponse("datos no validos", $validate->errors());
                    } else {
                        $response->title = $params_array['title'];
                        $response->description = $params_array['description'];
                        if ($response->isDirty()) {
                            return $this->errorResponse('se debe especificar al menos un valor', 422);
                        }
                        $response->save();
                        return $this->showOne($response);
                    }
                } else {
                    return $this->errorResponse('Datos Vacios!', 422);
                }
            } else {
                return $this->errorResponse('La estrucutra del json no es valida', 422);
            }
        }

}
