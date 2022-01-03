<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{{asset('css/edittitle.css')}}">
  <title>タイトル編集</title>
</head>
<body>
  <h1>@yield('title')</h1>
  @yield('content')

  <script src="{{asset('js/edittitle.js')}}"></script>
</body>
</html>