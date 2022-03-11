<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class EditquestionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index($area_id)
  {
    $questions = Question::where('area_id', $area_id)->orderBy('sort')->get();
    return view('editquestion.index', compact('questions', 'area_id'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $form = $request->all();
    unset($form['_token']);
    Question::create($form);
    return redirect()->route('editquestion.index', ['area_id' => $request->area_id])->with('success', '登録完了しました');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $area_id)
  {
    $update = [
      'image_url' => $request->image_url
    ];
    Question::where('id', $request->id)->update($update);
    return redirect()->route('editquestion.index', ['area_id' => $area_id])->with('success', '変更完了しました');
  }

  public function update_sort(Request $request, $area_id)
  {
    $data = $request->id;
    foreach ($data as $sort => $datum) {
      $question = Question::find($datum);
      $question->sort = $sort;
      $question->save();
    }
    return redirect()->route('editquestion.index', ['area_id' => $area_id])->with('success', '移動完了しました');
  }

  /**
   * Remove the specified resource from storage.
   * 
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request, $area_id)
  {
    Question::where('area_id', $area_id)->where('id', $request->id)->delete();
    return redirect()->route('editquestion.index', ['area_id' => $area_id])->with('success', '削除完了しました');
  }
}
