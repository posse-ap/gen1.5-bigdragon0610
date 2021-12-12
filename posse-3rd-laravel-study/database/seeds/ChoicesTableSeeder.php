<?php

use Illuminate\Database\Seeder;

class ChoicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('choices')->truncate();
      $param = [
        [
          'area_id' => 1,
          'question_id' => 1,
          'true_false' => 1,
          'choice' => 'たかなわ'
        ],
        [
          'area_id' => 1,
          'question_id' => 1,
          'true_false' => 0,
          'choice' => 'たかわ'
        ],
        [
          'area_id' => 1,
          'question_id' => 1,
          'true_false' => 0,
          'choice' => 'こうわ'
        ],
        [
          'area_id' => 1,
          'question_id' => 2,
          'true_false' => 1,
          'choice' => 'かめいど'
        ],
        [
          'area_id' => 1,
          'question_id' => 2,
          'true_false' => 0,
          'choice' => 'かめと'
        ],
        [
          'area_id' => 1,
          'question_id' => 2,
          'true_false' => 0,
          'choice' => 'かめど'
        ],
      ];
      DB::table('choices')->insert($param);
    }
}
