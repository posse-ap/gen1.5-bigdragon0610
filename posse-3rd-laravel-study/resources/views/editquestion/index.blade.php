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
        <p class="success">{{ Session::get('success') }}</p>
    @endif

    <a href="{{ route('edittitle.index') }}" class="text-blue-400">戻る</a>

    <section class="new_title mb-10">
        <h2 class="font-bold text-2xl mb-2 mt-3">新規登録</h2>
        <form action="{{ route('editquestion.store') }}" method="POST">
            @csrf
            <input type="text" name="image_url" value="{{ old('image_url') }}" class="border-2">
            <input type="hidden" name="area_id" value="{{ $area_id }}">
            <input type="hidden" name="sort" value="{{ count($questions) }}">
            <input type="submit" value="登録">
        </form>
    </section>

    <section id="all_questions">
        <h2 class="font-bold text-2xl mb-2 inline-block">設問一覧</h2>
        <input type="button" id="sort_questions_button" class="bg-gray-100 inline-block font-bold" value="設問並び替えへ">
        @foreach ($questions as $question)
            <p>No.{{ $loop->iteration }}</p>
            <form action="{{ route('editquestion.delete', $area_id) }}" method="POST">
                @csrf
                @method('DELETE')
                <input type="hidden" name="id" value="{{ $question->id }}">
                <input type="submit" value="削除" class="mb-1">
            </form>
            <form action="{{ route('editquestion.update', $area_id) }}" method="POST">
                @csrf
                @method('PUT')
                <input type="hidden" name="id" value="{{ $question->id }}">
                <input type="text" name="image_url" class="border-2 mb-1">
                <input type="submit" value="編集">
            </form>
            <img src="{{ $question->image_url }}" alt="設問画像" class="w-80 h-52 border-2 mb-2">
        @endforeach
    </section>

    <section id="sort_questions" class="hidden">
        <form action="{{ route('editquestion.update_sort', $area_id) }}" method="POST">
            @csrf
            @method('PUT')
            <h2 class="font-bold text-2xl mb-2 inline-block">設問並び替え</h2>
            <div class="inline-block">
                <button type="submit">移動確定</button>
                <input type="button" id="all_questions_button" class="bg-gray-100 font-bold" value="設問一覧へ">
            </div>
            <ul id="sortable_questions">
                @foreach ($questions as $question)
                    <li>
                        <p>No.{{ $loop->iteration }}</p>
                        <a href="">

                        </a>
                        <img src="{{ $question->image_url }}" alt="設問画像" class="w-80 h-52 border-2 mb-2">
                        <input type="hidden" name="id[]" value="{{ $question->id }}">
                    </li>
                @endforeach
            </ul>
        </form>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="{{ asset('js/editquestion.js') }}"></script>
</body>

</html>
