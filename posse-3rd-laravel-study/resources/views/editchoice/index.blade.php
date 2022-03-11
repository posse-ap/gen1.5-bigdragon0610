<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <title>選択肢編集</title>
</head>

<body class="p-10">
    @if (Session::get('success'))
        <p class="success">{{ Session::get('success') }}</p>
    @endif

    <a href="{{ route('editquestion.index', ['area_id' => $area_id]) }}" class="text-blue-400">戻る</a>
    <section class="mb-10">
        <h2 class="font-bold text-2xl mb-2 mt-3">新規登録</h2>
        <form
            action="{{ route('edittitle.editquestion.editchoice.store', [
                'edittitle' => $area_id,
                'editquestion' => $question_id,
            ]) }}"
            method="POST" class="mr-1 my-auto">
            @csrf
            <input type="text" name="choice" class="border-2">
            <input type="hidden" name="area_id" value="{{ $area_id }}">
            <input type="hidden" name="question_id" value="{{ $question_id }}">
            <input type="hidden" name="true_false" value="0">
            <input type="submit" value="登録">
        </form>
    </section>
    <section>
        <h2 class="font-bold text-2xl mb-2 mt-3">選択肢一覧</h2>
        <div class="flex">
            <form action="" class="">
                @foreach ($choices as $choice)
                    <input type="radio" name="true_false" class="block h-10 mr-2"
                        {{ $choice->true_false == 1 ? 'checked' : '' }}>
                @endforeach
            </form>
            <ul>
                @foreach ($choices as $choice)
                    <li class="flex h-10">
                        <form
                            action="{{ route('edittitle.editquestion.editchoice.update', [
                                'edittitle' => $area_id,
                                'editquestion' => $question_id,
                                'editchoice' => $choice->id,
                            ]) }}"
                            method="POST" class="mr-1 my-auto">
                            @csrf
                            @method("PUT")
                            <input type="text" name="choice" value="{{ $choice->choice }}" class="border-2">
                            <input type="submit" value="変更">
                        </form>
                        <form
                            action="{{ route('edittitle.editquestion.editchoice.destroy', [
                                'edittitle' => $area_id,
                                'editquestion' => $question_id,
                                'editchoice' => $choice->id,
                            ]) }}"
                            method="POST" class="my-auto">
                            @csrf
                            @method("DELETE")
                            <input type="submit" value="削除">
                        </form>
                    </li>
                @endforeach
            </ul>
        </div>
    </section>
</body>

</html>
