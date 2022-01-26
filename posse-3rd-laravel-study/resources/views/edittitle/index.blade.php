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
    <table border="1">
      <tr>
        <th>タイトル</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
        @foreach($areas as $area)
          <tr data-title_index="{{$loop->index}}">
            <form action="{{route('edittitle.update', $area->id)}}" method="POST">
              @csrf
              @method('PUT')
              <td>
                <a href="quizy/1" id="link_title_{{$loop->index}}">{{$area->name}}の難読地名クイズ</a>
                <div id="edit_title_{{$loop->index}}" class="invisible"><input type="text" name="name" value="{{$area->name}}">の難読地名クイズ</div>
              </td>
              <td>
                <div id="edit_title_button_{{$loop->index}}" class="edit_title_button">編集</div>
                <input type="submit" value="OK" id="edit_submit_button_{{$loop->index}}" class="invisible">
              </td>
            </form>
            <td>
              <form action="{{route('edittitle.destroy', $area->id)}}" method="POST">
                @csrf
                @method('DELETE')
                <input type="submit" value="削除">
              </form>
            </td>
          </tr>
        @endforeach
    </table>
  </section>
@endsection