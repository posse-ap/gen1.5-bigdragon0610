@extends('layouts.quiz')

@section('title', $area->name)

@section('main')
  @foreach($area->questions as $question)
    <section class="quiz box-container">
      <h2>{{$loop->iteration}}. この地名はなんて読む？</h2>
      <img src="{{$question->image_url}}" alt="{{$loop->iteration}}問目の画像" class="quiz-image">
      <ul>
        @foreach($question->choices->shuffle() as $choice)
          <li onclick="openAnswer(this)" data-true_false="{{$choice->true_false}}">{{$choice->choice}}</li>
        @endforeach
        <li class="answerLi invisible">
          <p class="answerP_correct">正解！</p>
          <p class="answerP_incorrect">不正解！</p>
          <p class="answerP_detail">正解は「{{$question->choices->where('true_false', 1)->first()->choice}}」です！</p>
        </li>
      </ul>
    </section>
  @endforeach
@endsection