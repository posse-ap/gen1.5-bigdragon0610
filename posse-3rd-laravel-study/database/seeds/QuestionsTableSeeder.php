<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('questions')->truncate();
      $param = [
        [
          'area_id' => 1,
          'image_url' => 'https://d1khcm40x1j0f.cloudfront.net/quiz/34d20397a2a506fe2c1ee636dc011a07.png'
        ],
        [
          'area_id' => 1,
          'image_url' => 'https://d1khcm40x1j0f.cloudfront.net/quiz/512b8146e7661821c45dbb8fefedf731.png'
        ],
      ];
      DB::table('questions')->insert($param);
    }
}
