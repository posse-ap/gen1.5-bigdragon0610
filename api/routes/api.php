<?php

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\Resource;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
  Route::get('/', 'StudyingHourController@index');
  Route::post('/', 'StudyingHourController@store');
  Route::get('/bar_chart', 'StudyingHourController@bar_chart');
  Route::get('/doughnut_chart', 'StudyingHourController@doughnut_chart');
  Route::get('/language', 'LanguageController@index');
  Route::get('/teaching_material', 'TeachingMaterialController@index');
  Route::prefix('admin')->group(function () {
    Route::resource('language', 'Admin\LanguageController')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('teaching_material', 'Admin\TeachingMaterialController')->only(['index', 'store', 'update', 'destroy']);
    Route::post('create_admin', 'Admin\RegisterController@create');
  });
});

Route::post('/register', 'Api\Auth\RegisterController@register');
Route::post('/login', 'Api\Auth\LoginController@login');
