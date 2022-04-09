<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyConstraint extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('questions', function (Blueprint $table) {
      $table->unsignedBigInteger('area_id')->change();
      $table->foreign('area_id')->references('id')->on('areas')->onUpdate('CASCADE')->onDelete('CASCADE');
    });
    Schema::table('choices', function (Blueprint $table) {
      $table->unsignedBigInteger('question_id')->change();
      $table->foreign('question_id')->references('id')->on('questions')->onUpdate('CASCADE')->onDelete('CASCADE');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('questions', function (Blueprint $table) {
      $table->dropForeign('questions_area_id_foreign');
    });
    Schema::table('choices', function (Blueprint $table) {
      $table->dropForeign('choices_question_id_foreign');
    });
  }
}
