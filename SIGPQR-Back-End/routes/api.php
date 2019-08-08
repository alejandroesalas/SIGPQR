<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
//ruta del controlador de facultades
Route::apiResource('faculties','FacultyController');
Route::get('faculties/{id}/programs','FacultyController@facultyprograms');
Route::get('faculties/{id}/students','FacultyController@facultyUsers');
Route::get('faculties/{id}/programs/count','FacultyController@programscount');
//ruta del controlador de programas
Route::apiResource('programs','ProgramController');
Route::get('programs/{id}/faculties','ProgramController@faculty');
Route::get('programs/{id}/coordinators','ProgramController@coordinator');
Route::get('programs/{id}/students','ProgramController@getStudents');
Route::get('programs/{id}/requests','ProgramController@getRequests');
//ruta del controlador de perfiles
Route::apiResource('profiles','ProfileController');
//mostrar usuarios de un perfil especifico
Route::get('profiles/{id}/users','ProfileController@usersByProfile');
Route::apiResource('requestsType','RequestTypeController');
//Ruta para las requestsType(tipos de solicitudes)

//
Route::name('verify')->get('users/verify/{token}','UserController@verify');
/*Route::post('/api/users/upload','PostController@upload');
Route::get('/api/post/avatar/{filename}','PostController@getImage');
Route::get('/api/post/category/{id}','PostController@getPostsByCategory');
Route::get('/api/post/user/{id}','PostController@getPostsByUser');*/
