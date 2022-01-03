<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{{asset('css/quiztitle.css')}}">
  <title>quiztitle</title>
</head>

<body>
  @foreach($areas as $area)
  <div class="quiztitle">
    <a href="{{route('quizy', ['id' => $area->id])}}"></a>
    <p>{{$area->name}}の難読地名クイズ</p>
  </div>
  @endforeach
</body>

</html>