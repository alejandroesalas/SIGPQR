<?php

namespace App\Http\Controllers\Request;

use App\Http\Controllers\ApiController;
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

}
}
