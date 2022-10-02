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

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get('/hello', function () {
  return json_encode(['name' => '山田太郎', 'gender' => '男', 'mail' => 'yamada@test.com']);
});

Route::get('/', 'StudyingHourController@index');
Route::get('/bar_chart/{year}/{month}', 'StudyingHourController@bar_chart');
Route::get('/doughnut_chart', 'StudyingHourController@doughnut_chart');

Route::get('/language', 'LanguageController@index');
Route::get('/teaching_material', 'TeachingMaterialController@index');
