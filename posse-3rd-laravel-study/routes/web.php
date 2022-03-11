<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('welcome');
});

Route::get('quiztitle', 'HelloController@index');
Route::get('quizy/{id}', 'HelloController@quiz')->name('quizy')->middleware('auth');
Route::resource('edittitle', 'EdittitleController');
Route::post('edittitle/update_sort', 'EdittitleController@update_sort')->name('edittitle.update_sort');

Route::prefix('editquestion')->group(function () {
  Route::get('/{area_id}', 'EditquestionController@index')->name('editquestion.index');
  Route::post('/store', 'EditquestionController@store')->name('editquestion.store');
  Route::put('/update/{area_id}', 'EditquestionController@update')->name('editquestion.update');
  Route::put('/update_sort/{area_id}', 'EditquestionController@update_sort')->name('editquestion.update_sort');
  Route::delete('/delete/{area_id}', 'EditquestionController@destroy')->name('editquestion.delete');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
