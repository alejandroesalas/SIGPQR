<?php

namespace App\Http\Controllers\Student;

use App\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class StudentRequestController extends Controller
{
    /**
     *Devuelve las solicitudes que haya realizado el estudiante.
     * adicional envia las respuestas que la solicitud tenga
     *
     * @return Response
     */
    public function index()
    {
        //
    }



    /**
     * Crea una nueva solicitud asociada al estudiante
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Devuelve una solicitud en particular, que haya realizado el estudiante.
     * adicional envia las respuestas que la solicitud tenga.
     *
     * @param  \App\Student  $student
     * @return Response
     */
    public function show(Student $student)
    {
        //
    }


    /**
     * Actualiza los datos de una solicitud en particulas.
     * Campos modificables: titulo y descripcion, tipo de solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Student  $student
     * @return Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Elimina una solicitud en particular solo si la solicitud se encuentra abierta y
     * no tenga respuestas asociadas
     *
     * @param  \App\Student  $student
     * @return Response
     */
    public function destroy(Student $student)
    {
        //
    }
}
