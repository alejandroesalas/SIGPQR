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
//ruta del controlador de auth para login
Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

//ruta del controlador de facultades
Route::apiResource('faculties','Faculty\FacultyController');
Route::get('faculties/{id}/programs','Faculty\FacultyController@facultyprograms');
Route::get('faculties/{id}/students','Faculty\FacultyController@facultyUsers');
Route::get('faculties/{id}/programs/count','Faculty\FacultyController@programscount');
//ruta del controlador de programas
Route::apiResource('programs','Program\ProgramController');
Route::get('programs/{id}/faculties','Program\ProgramController@faculty');
Route::get('programs/{id}/coordinators','Program\ProgramController@coordinator');
Route::get('programs/{id}/students','Program\ProgramController@getStudents');
Route::get('programs/{id}/requests','Program\ProgramController@getRequests');
//ruta del controlador de perfiles
Route::apiResource('profiles','Profile\ProfileController');
//mostrar usuarios de un perfil especifico
Route::get('profiles/{id}/users','Profile\ProfileController@usersByProfile');
Route::apiResource('requestsType','RequestType\RequestTypeController');
//Ruta para las requestsType(tipos de solicitudes)
//ruta del controlador de Estudiantes
Route::resource('students', 'Student\StudentController', ['except' => ['create', 'edit']]);
//ruta del controlador de Coordinadores
Route::resource('coordinators', 'Coordinator\CoordinatorController', ['except' => ['create', 'edit']]);

//Verificacion del correo del usuario
Route::name('verify')->get('users/verify/{token}','User\UserController@verify');


/*Route::post('/api/users/upload','PostController@upload');
Route::get('/api/post/avatar/{filename}','PostController@getImage');
Route::get('/api/post/category/{id}','PostController@getPostsByCategory');
Route::get('/api/post/user/{id}','PostController@getPostsByUser');*/
