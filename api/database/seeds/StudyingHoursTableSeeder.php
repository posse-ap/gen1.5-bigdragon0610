<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudyingHoursTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $params = [

      [
        'studying_hour' => 5,
        'studying_day' => '2022-03-01',
        'language_id' => 1,
        'teaching_material_id' => 1,
      ],
      [
        'studying_hour' => 3,
        'studying_day' => '2022-03-02',
        'language_id' => 2,
        'teaching_material_id' => 2,
      ],
      [
        'studying_hour' => 6,
        'studying_day' => '2022-03-05',
        'language_id' => 3,
        'teaching_material_id' => 3,
      ],
      [
        'studying_hour' => 8,
        'studying_day' => '2022-03-08',
        'language_id' => 2,
        'teaching_material_id' => 2,
      ],
      [
        'studying_hour' => 4,
        'studying_day' => '2022-03-13',
        'language_id' => 4,
        'teaching_material_id' => 1,
      ],
      [
        'studying_hour' => 2,
        'studying_day' => '2022-03-19',
        'language_id' => 3,
        'teaching_material_id' => 2,
      ],
      [
        'studying_hour' => 6,
        'studying_day' => '2022-03-23',
        'language_id' => 1,
        'teaching_material_id' => 1,
      ],
    ];
    foreach ($params as $param) {
      DB::table('studying_hours')->insert($param);
    }
  }
}
