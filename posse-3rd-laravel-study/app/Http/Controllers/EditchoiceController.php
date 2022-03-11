<?php

namespace App\Http\Controllers;

use App\Choice;
use Illuminate\Http\Request;

class EditchoiceController extends Controller
{
  /**
   * Display a listing of the resource.
   * 
   * @param  int  $area_id
   * @param  int  $question_id
   * @return \Illuminate\Http\Response
   */
  public function index($area_id, $question_id)
  {
    $choices = Choice::where('area_id', $area_id)->where('question_id', $question_id)->get();
    return view('editchoice.index', compact('choices', 'area_id', 'question_id'));
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
   * @param  int  $area_id
   * @param  int  $question_id
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request, $area_id, $question_id)
  {
    $form = $request->all();
    unset($form['_token']);
    Choice::create($form);
    return redirect()
      ->route('edittitle.editquestion.editchoice.index', [
        'edittitle' => $area_id,
        'editquestion' => $question_id,
      ])
      ->with('success', '登録完了しました');
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
   * 
   * @param  int  $area_id
   * @param  int  $question_id
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $area_id, $question_id, $id)
  {
    $update = [
      'choice' => $request->choice
    ];
    Choice::where('id', $id)->update($update);
    return redirect()
      ->route('edittitle.editquestion.editchoice.index', [
        'edittitle' => $area_id,
        'editquestion' => $question_id,
      ])
      ->with('success', '変更完了しました');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $area_id
   * @param  int  $question_id
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($area_id, $question_id, $id)
  {
    Choice::where('id', $id)->delete();
    return redirect()
      ->route('edittitle.editquestion.editchoice.index', [
        'edittitle' => $area_id,
        'editquestion' => $question_id,
      ])
      ->with('success', '削除完了しました');
  }
}
