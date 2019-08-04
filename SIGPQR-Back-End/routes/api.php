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
//ruta del controlador de facultades
Route::resource('faculties','FacultyController');
//ruta del controlador de programas
Route::resource('programs','ProgramController');
//ruta del controlador de perfiles
Route::resource('profiles','ProfileController');

/*Route::post('/api/users/upload','PostController@upload');
Route::get('/api/post/avatar/{filename}','PostController@getImage');
Route::get('/api/post/category/{id}','PostController@getPostsByCategory');
Route::get('/api/post/user/{id}','PostController@getPostsByUser');*/
