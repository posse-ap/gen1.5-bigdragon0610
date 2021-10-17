<?php
try {
    $pdo = new PDO(
        'mysql:host=db;dbname=quizy;charset=utf8mb4',
        'ryudai',
        'password',
        [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
          PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );

    $stmt = $pdo->query("SELECT * FROM questions");
    $places = $stmt->fetchAll();
    $id = filter_input(INPUT_GET, 'id');
    $place = $places[$id-1]['place'];
    if ($place == null) {
        $id = 1;
        $place = '東京';
    }

    $choices = [];
    $stmt = $pdo->query("SELECT choice FROM choices WHERE place_id = $id AND true_false = 1");
    $true_choices = $stmt->fetchAll();
    foreach($true_choices as $true_choice) {
        $choices[][] = $true_choice["choice"];
    }
    
    $stmt = $pdo->query("SELECT choice FROM choices WHERE place_id = $id AND true_false = 0");
    $false_choices = $stmt->fetchAll();
    $false_choices = array_chunk($false_choices, 2);
    $i = 0;
    foreach($false_choices as $false_choice) {
        $choices[$i][] = $false_choice[0]["choice"];
        $choices[$i][] = $false_choice[1]["choice"];
        $i++;
    }
    $choices_json = json_encode($choices);

    $stmt = $pdo->query("SELECT image_url FROM images WHERE place_id = $id");
    $images = $stmt->fetchAll();
    $i = 0;
    foreach($images as $image) {
        $images[$i] = $image["image_url"];
        $i++;
    }
    $images_json = json_encode($images);

} catch (PDOException $e) {
    echo $e->getMessage() . PHP_EOL;
    exit;
}


?>

<script>
    var places = JSON.parse('<?php echo $choices_json; ?>');
    var pictures = JSON.parse('<?php echo $images_json; ?>')
</script>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ガチで<?= $place; ?>の人しか解けない！ #<?= $place; ?>の難読地名クイズ</title>
    <link href="https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/html5resetcss/html5reset-1.6.css">
    <link rel="stylesheet" href="quizy.css">
</head>

<body>
    <div class="container container-wrapper">
        <h1 id="quiz-title" class="quiz-title box-container">ガチで<?= $place; ?>の人しか解けない！ #<?= $place; ?>の難読地名クイズ</h1>
    </div>
<script src="quizy.js?<?php echo date('YmdHis'); ?>"></script>
</body>

</html>