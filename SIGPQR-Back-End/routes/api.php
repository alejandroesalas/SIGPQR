<?php

use Illuminate\Http\Request;

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
Route::resource('faculties','FacultyController', ['except' => ['create', 'edit']]);
//ruta del controlador de programas
Route::resource('programs','ProgramController', ['except' => ['create', 'edit']]);
//ruta del controlador de perfiles
Route::resource('profiles','ProfileController', ['except' => ['create', 'edit']]);
//ruta del controlador de usuarios
Route::resource('users', 'UserController', ['except' => ['create', 'edit']]);
//ruta del controlador de Estudiantes
Route::resource('students', 'StudentController', ['except' => ['create', 'edit']]);
//ruta del controlador de Coordinadores
Route::resource('coordinators', 'CoordinatorController', ['except' => ['create', 'edit']]);

/*Route::post('/api/users/upload','PostController@upload');
Route::get('/api/post/avatar/{filename}','PostController@getImage');
Route::get('/api/post/category/{id}','PostController@getPostsByCategory');
Route::get('/api/post/user/{id}','PostController@getPostsByUser');*/
