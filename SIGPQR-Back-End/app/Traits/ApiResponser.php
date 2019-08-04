<?php


namespace App\Traits;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

trait ApiResponser
{
    private function succesResponse($data,$code){
        return response()->json($data,$code);
    }
    protected function errorResponse($message,$code,$errors = null){
        $data = array(
            'status'=>'error',
            'code'=> $code,
            'message'=> $message,
            'errors'=> $errors == null?'':$errors
        );
        return response()->json($data,$code);
    }
    protected function showAll(Collection $collection,$code = 200){
        $data = array(
            'status'=>'success',
            'code'=> $code,
            '$data'=>$collection
        );
        return $this->succesResponse($data,$code);
    }
    protected function showOne(Model $instance,$code = 200){
        $data = array(
            'status'=>'success',
            'code'=> $code,
            '$data'=>$instance
        );
        return $this->succesResponse($data,$code);
    }

}
