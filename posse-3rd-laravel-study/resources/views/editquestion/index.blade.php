<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  <title>設問編集</title>
</head>
<body class="p-10">
  @if (Session::get('success'))
  <p class="success">{{Session::get('success')}}</p>
  @endif

  <section class="new_title">
    <h2>新規登録</h2>
    <form action="{{route('editquestion.store')}}" method="POST">
      @csrf
      <input type="text" name="image_url" value="{{old('image_url')}}" class="border-2">
      <input type="hidden" name="area_id" value="{{$id}}">
      <input type="submit" value="登録">
    </form>
  </section>

  <section id="all_questions" class="all_questions">
    <h2 class="font-bold text-2xl mb-5">タイトル一覧</h2>
    @foreach ($questions as $question)
    <img src="{{$question->image_url}}" alt="設問画像" class="w-80 h-52 border-2 mb-2">
    @endforeach
  </section>

{{-- <section>
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
        @foreach($questions as $question)
          <tr>
            <td>
              <a href="quizy/1">{{$question->name}}の難読地名クイズ</a>
              <input type="hidden" name="id[]" value="{{$question->id}}">
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
    <input type="submit" value="移動完了">
  </form>
</section>   --}}
  
</body>
</html>