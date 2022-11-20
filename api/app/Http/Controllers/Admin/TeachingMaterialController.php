<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\TeachingMaterial;
use Illuminate\Http\Request;

class TeachingMaterialController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return TeachingMaterial::all();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $teaching_material = new TeachingMaterial();
    $teaching_material->name = $request->name;
    $teaching_material->save();
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $teaching_material = TeachingMaterial::find($id);
    $teaching_material->name = $request->name;
    $teaching_material->save();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    TeachingMaterial::find($id)->delete();
  }
}
