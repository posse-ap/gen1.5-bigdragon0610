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

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
