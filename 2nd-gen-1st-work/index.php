<?php
try {
  $pdo = new PDO(
    'mysql:host=db;dbname=webapp;charset=utf8mb4',
    'ryudai',
    'password',
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ]
  );
} catch (PDOException $e) {
  echo $e->getMessage() . PHP_EOL;
  exit;
}

$contents = $pdo->query("SELECT * FROM contents")->fetchAll();
$languages = $pdo->query("SELECT * FROM languages")->fetchAll();
$studytime_thismonth = $pdo->query(
  "SELECT sum(studytime) as studytime FROM records WHERE record_date BETWEEN(SELECT DATE_FORMAT(now(),'%Y-%m-01')) AND (SELECT LAST_DAY(now()))")->fetch();

$studytime_today = $pdo->query("SELECT sum(studytime) as studytime FROM records WHERE record_date = (SELECT DATE_FORMAT(now(), '%Y-%m-%d')) GROUP BY record_date")->fetch();

$studytime_all = $pdo->query("SELECT sum(studytime) as studytime FROM records")->fetch();

$studytime_content = $pdo->query("SELECT sum(studytime) as studytime FROM records GROUP BY content_id")->fetchAll();

$studytime_language = $pdo->query("SELECT sum(studytime) as studytime FROM records GROUP BY language_id")->fetchAll();

$studytime_daily = $pdo->query("WITH thismonth AS (SELECT DATE_FORMAT(now(),'%Y-%m-01') + INTERVAL seq_no DAY AS date
FROM (SELECT @seq_no := 0 AS seq_no
UNION SELECT @seq_no := @seq_no +1 AS seq_no FROM information_schema.COLUMNS) AS monthcalendar
HAVING date BETWEEN(SELECT DATE_FORMAT(now(),'%Y-%m-01')) AND (SELECT LAST_DAY(now()))
)
SELECT SUM(studytime) AS studytime FROM records
RIGHT JOIN thismonth ON records.record_date = thismonth.date GROUP BY thismonth.date")->fetchAll();
$studytime_daily = array_column($studytime_daily, 'studytime');
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./index.css">
  <title>ｸｿｱﾌﾟﾘ</title>
</head>

<body style="background: linear-gradient(to top, #000, #000) repeat-y center/1px;">
  <div class="body-wrapper">
    <div id="modal-bg" class="modal-bg-position modal-bg-hidden">
      <div id="modal" class="modal-position modal-hidden">
        <div class="modal-closeBtn">
          <p id="modal-closeBtn-btn" onclick="closemodal()">×</p>
        </div>
        <div class="modal-content-wrapper" id="modal-content-wrapper">
          <div class="modal-content-1st">
            <div class="learn-day">
              <h2>学習日</h2>
              <input type="text" class="learn-day-text">
            </div>
            <div class="learn-content">
              <h2>学習コンテンツ (複数選択可)</h2>
              <!-- <p><input type="checkbox">N予備校</p>
                            <p><input type="checkbox">ドットインストール</p>
                            <p><input type="checkbox">POSSE課題</p> -->
              <?php foreach ($contents as $content) {
                echo '<p><input type="checkbox">' . $content['content'] . '</p>';
              } ?>
            </div>
            <div class="learn-lang">
              <h2>学習言語 (複数選択可)</h2>
              <!-- <p><input type="checkbox">HTML</p>
                            <p><input type="checkbox">CSS</p>
                            <p><input type="checkbox">JavaScript</p>
                            <p><input type="checkbox">PHP</p>
                            <p><input type="checkbox">Laravel</p>
                            <p><input type="checkbox">SQL</p>
                            <p><input type="checkbox">SHELL</p>
                            <p><input type="checkbox">情報システム基礎知識(その他)</p> -->
              <?php foreach ($languages as $language) {
                echo '<p><input type="checkbox">' . $language['language'] . '</p>';
              } ?>
            </div>
          </div>
          <div class="modal-content-2nd">
            <div class="learn-time">
              <h2>学習時間</h2>
              <input type="text" class="learn-time-text">
            </div>
            <div class="twitter">
              <h2>Twitter用コメント</h2>
              <textarea cols="30" rows="10" class="twitter-text"></textarea>
              <p><input type="checkbox">Twitterに自動投稿する</p>
            </div>
          </div>
        </div>
        <div class="modal-done-wrapper" id="modal-done-wrapper">
          <div class="modal-done">
            <div>
              <p>AWESOME!</p>
              <p>✔</p>
            </div>
            <div class="modal-done-message">
              <p>記録・投稿</p>
              <p>完了しました</p>
            </div>
          </div>
        </div>
        <div class="modal-postBtn" id="modal-postBtn">
          <button onclick="showmodalDone()">記録・投稿</button>
        </div>
      </div>
    </div>
    <header class="index-header">
      <div class="index-header-div1st">
        <img src="./posselogo.jpg" alt="posseのロゴ" class="header-img">
        <h1 class="index-h1">4th week</h1>
      </div>
      <div class="index-header-div2nd">
        <button type="button" id="postBtn" class="postBtn" onclick="showmodal()">記録・投稿</button>
      </div>
    </header>
    <div class="content-wrapper">
      <div class="studytime-wrapper">
        <div class="studytime">
          <div>
            <p>Today</p>
            <p><?php echo $studytime_today['studytime'] ?? 0 ; ?></p>
            <p>hour</p>
          </div>
          <div>
            <p>Month</p>
            <p><?PHP echo $studytime_thismonth['studytime'] ?? 0; ?></p>
            <p>hour</p>
          </div>
          <div>
            <p>Total</p>
            <p><?PHP echo $studytime_all['studytime'] ?? 0; ?></p>
            <p>hour</p>
          </div>
        </div>
        <div class="bargraph">
          <canvas id="myBarChart"></canvas>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
          <script>
            var ctx = document.getElementById("myBarChart");
            var myBarChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: [
                  <?php
                  $lastdate = intval(date('d', strtotime('last day of this month')));
                  for ($date = 1; $date <= $lastdate; $date++) {
                    if ($date % 2 != 0) {
                      echo "\"\",";
                      continue;
                    }
                    echo $date . ",";
                  }
                  ?>
                ],
                datasets: [{
                  label: '学習時間',
                  data: [
                    <?php foreach($studytime_daily as $studytime) {
                      echo $studytime . ",";
                    }?>
                  ],
                  backgroundColor: "rgba(50,160,220,1)"
                }, ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      color: "transparent",
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      suggestedMax: 8,
                      suggestedMin: 0,
                      stepSize: 2,
                      callback: function(value, index, values) {
                        return value + "h"
                      }
                    },
                    gridLines: {
                      color: "transparent",
                      zeroLineColor: "transparent"
                    }
                  }]
                },
              }
            });
          </script>
        </div>
      </div>
      <div class="piecharts">
        <div>
          <p>学習言語</p>
          <canvas id="myPieChart-languages"></canvas>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>

          <script>
            // Define a plugin to provide data labels
            Chart.plugins.register({
              afterDatasetsDraw: function(chart, easing) {
                // To only draw at the end of animation, check for easing === 1
                var ctx = chart.ctx;

                chart.data.datasets.forEach(function(dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                      // Draw the text in black, with the specified font
                      ctx.fillStyle = 'rgb(255, 255, 255)';

                      var fontSize = 16;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                      // Just naively convert to string for now
                      var dataString = dataset.data[index].toString();

                      // Make sure alignment settings are correct
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';

                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString + "%", position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            });
            var ctx = document.getElementById("myPieChart-languages");
            var myPieChart = new Chart(ctx, {
              type: 'doughnut',
              data: {
                labels: [
                  // "JavaScript",
                  // "CSS",
                  // "PHP",
                  // "HTML",
                  // "Laravel",
                  // "SQL",
                  // "SHELL",
                  // "情報システム基礎知識(その他)",
                  <?php foreach ($languages as $language) {
                    echo "\"" . $language['language'] . "\",";
                  } ?>
                ],
                datasets: [{
                  backgroundColor: [
                    // "#0346EC",
                    // "#1071BD",
                    // "#20BEDE",
                    // "#3CCEFE",
                    // "#B29EF3",
                    // "#6D46EC",
                    // "#4A18EF",
                    // "#3105C0",
                    <?php foreach ($languages as $language) {
                      echo "\"#" . $language['color'] . "\",";
                    } ?>
                  ],
                  data: [
                    <?php foreach ($studytime_language as $record) {
                      echo round($record['studytime']*100 / $studytime_all['studytime']) . ",";
                    }?>
                  ]
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  position: 'bottom',
                },
              },
            });
          </script>
        </div>
        <div>
          <p>学習コンテンツ</p>
          <canvas id="myPieChart-contents"></canvas>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>

          <script>
            // Define a plugin to provide data labels
            Chart.plugins.register({
              afterDatasetsDraw: function(chart, easing) {
                // To only draw at the end of animation, check for easing === 1
                var ctx = chart.ctx;

                chart.data.datasets.forEach(function(dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                      // Draw the text in black, with the specified font
                      ctx.fillStyle = 'rgb(255, 255, 255)';

                      var fontSize = 16;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                      // Just naively convert to string for now
                      var dataString = dataset.data[index].toString();

                      // Make sure alignment settings are correct
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';

                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString + "%", position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            });
            var ctx = document.getElementById("myPieChart-contents");
            var myPieChart = new Chart(ctx, {
              type: 'doughnut',
              data: {
                labels: [
                  // "ドットインストール",
                  // "N予備校",
                  // "POSSE課題",
                  <?php foreach ($contents as $content) {
                    echo "\"" . $content['content'] . "\",";
                  } ?>
                ],
                datasets: [{
                  backgroundColor: [
                    // "#0346EC",
                    // "#1071BD",
                    // "#20BEDE",
                    <?php foreach ($contents as $content) {
                      echo "\"#" . $content['color'] . "\",";
                    } ?>
                  ],
                  data: [
                    <?php foreach ($studytime_content as $record) {
                      echo round($record['studytime']*100 / $studytime_all['studytime']) . ",";
                    }?>
                  ]
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  position: 'bottom',
                },
              },
            });
          </script>
        </div>
      </div>
    </div>
    <footer class="index-footer">
      <?php echo date('Y') . "年 " . date('m') . "月" ?>
    </footer>
  </div>
  <script src="./index.js"></script>
</body>

</html>