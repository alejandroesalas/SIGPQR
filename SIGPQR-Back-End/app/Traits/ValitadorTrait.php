<?php


namespace App\Traits;


use Illuminate\Validation\Validator;

trait ValitadorTrait
{
    public function checkValidation($params,$rules){
        $validate = Validator::make($params, $rules);
        return $validate;
    }

}
