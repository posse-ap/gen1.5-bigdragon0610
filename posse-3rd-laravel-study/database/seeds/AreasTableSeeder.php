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
        'name' => '東京',
        'sort_id' => 1,
      ],
      [
        'name' => '広島',
        'sort_id' => 2,
      ]
    ];
    DB::table('areas')->insert($param);
  }
}
