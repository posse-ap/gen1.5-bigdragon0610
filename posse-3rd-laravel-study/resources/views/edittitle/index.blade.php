@extends('layouts.edittitle')

@section('title', 'タイトル一覧')

@section('content')

  @if (Session::get('success'))
    <p class="success">{{Session::get('success')}}</p>
  @endif

  <section class="new_title">
    <h2>新規登録</h2>
    <form action="{{route('edittitle.store')}}" method="POST">
      @csrf
      <input type="text" name="name" value="{{old('name')}}">
      <input type="submit" value="登録">
    </form>
  </section>

  <section class="all_titles">
    <h2>タイトル一覧</h2>
    <div id="title_table">
      <div>
        <div>タイトル</div>
        <div>編集</div>
        <div>削除</div>
      </div>
      <div>
        <div id="title_table_main">
          @foreach($areas as $area)
          <div data-title_index="{{$loop->index}}">
            <form action="{{route('edittitle.update', $area->id)}}" method="POST">
              @csrf
              @method('PUT')
              <div>
                <a href="quizy/1" id="link_title_{{$loop->index}}">{{$area->name}}の難読地名クイズ</a>
                <div id="edit_title_{{$loop->index}}" class="invisible"><input type="text" name="name" value="{{$area->name}}">の難読地名クイズ</div>
              </div>
              <div>
                <div id="edit_title_button_{{$loop->index}}" class="edit_title_button">編集</div>
                <input type="submit" value="OK" id="edit_submit_button_{{$loop->index}}" class="invisible">
              </div>
            </form>
            <div>
              <form action="{{route('edittitle.destroy', $area->id)}}" method="POST">
                @csrf
                @method('DELETE')
                <input type="submit" value="削除">
              </form>
            </div>
          </div>
          @endforeach
        </div>
        <form action="{{route('edittitle.update_sort', $area->id)}}" method="POST">
          @csrf
          @method('PUT')
          @for($i = 0; $i < count($areas); $i++)
            <div>
              <input id="input_sort_{{$i}}" data-sort="{{$i}}" type="hidden" value="{{$i}}">
              <div id="sort_up_{{$i}}" style="cursor: pointer;">↑</div>
              <div id="sort_down_{{$i}}" style="cursor: pointer;">↓</div>
            </div>
          @endfor
        </form>
      </div>
    </div>
  </section>
@endsection