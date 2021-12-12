<?php

use Illuminate\Database\Seeder;

class AreasTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('areas')->truncate();
    $param = [
      [
        'name' => '東京'
      ],
      [
        'name' => '広島'
      ]
    ];
    DB::table('areas')->insert($param);
  }
}
