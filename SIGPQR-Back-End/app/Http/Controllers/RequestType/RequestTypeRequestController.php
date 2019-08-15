<?php

namespace App\Http\Controllers\RequestType;

use App\Http\Controllers\ApiController;
use App\RequestType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Program;

class RequestTypeRequestController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RequestType $requestType)
    {
        $coordinator = auth()->user();
        $program = Program::where('coordinator_id', $coordinator->id)
            ->first();
        $requests = $requestType->requests()
            ->where('program_id', $program->id)
            ->get();
        return $this->showAll($requests);
    }

}
