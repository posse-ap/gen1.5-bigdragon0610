<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUniqueConstraint extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('areas', function (Blueprint $table) {
      $table->string('name')->change();
      $table->unique(['name'], 'areas_name_unique');
    });
    Schema::table('questions', function (Blueprint $table) {
      $table->unique(['area_id', 'image_url'], 'questions_unique');
    });
    Schema::table('choices', function (Blueprint $table) {
      $table->unique(['area_id', 'question_id', 'choice'], 'choices_unique');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    // 
  }
}
