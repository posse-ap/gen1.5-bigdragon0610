<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ガチで@yield('title')の人しか解けない！ #@yield('title')の難読地名クイズ</title>
  <link href="https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/html5resetcss/html5reset-1.6.css">
  <link rel="stylesheet" href="{{asset('css/quizy.css?1.0')}}">
</head>
<body>
  <div class="container container-wrapper">
    <h1 id="quiz-title" class="quiz-title box-container">ガチで@yield('title')の人しか解けない！ #@yield('title')の難読地名クイズ</h1>
    @section('main')
    <section class="quiz box-container">
      <h2>n.この地名はなんて読む？</h2>
      <img src="" alt="" class="quiz-image">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
    @show
  </div>
<script src="{{asset('js/quizy.js?1.0')}}"></script>
</body>
</html>