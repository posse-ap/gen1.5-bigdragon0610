<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudyingHoursTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('studying_hours', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->integer('studying_hour');
      $table->timestamp('studying_day');
      $table->integer('language_id');
      $table->integer('teaching_material_id');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('studying_hours');
  }
}
