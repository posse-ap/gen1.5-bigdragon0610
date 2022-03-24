<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $params = [
      ['name' => 'JavaScript'],
      ['name' => 'CSS'],
      ['name' => 'PHP'],
      ['name' => 'HTML'],
      ['name' => 'Laravel'],
      ['name' => 'SQL'],
      ['name' => 'SHELL'],
      ['name' => '情報システム基礎知識(その他)'],
    ];
    foreach ($params as $param) {
      DB::table('languages')->insert($param);
    }
  }
}
