<?php

use Illuminate\Database\Seeder;

class TeachingMaterialsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $params = [
      ['name' => 'ドットインストール'],
      ['name' => 'N予備校'],
      ['name' => 'POSSE課題'],
    ];
    foreach ($params as $param) {
      DB::table('teaching_materials')->insert($param);
    }
  }
}
