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

  <section id="all_titles" class="all_titles">
    <h2>タイトル一覧</h2>
    <table border="1">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  </section>

  <section>
    <h2>タイトル並び替え</h2>
    <button id="start_sort_button">移動</button>

    <form action="{{route('edittitle.update_sort')}}" method="POST" id="sort_form" class="invisible">
      @csrf
      <!-- @method('PUT') -->
      <table border="1">
        <thead>
          <tr>
            <th>タイトル</th>
          </tr>
        </thead>
        <tbody id="titles_tbody">
          @foreach($areas as $area)
            <tr>
              <td>
                <a href="quizy/1">{{$area->name}}の難読地名クイズ</a>
                <input type="hidden" name="id" value="{{$area->id}}">
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
      <input type="submit" value="移動完了">
    </form>

  </section>  
@endsection