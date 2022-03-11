<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
  protected $fillable = [
    'area_id',
    'question_id',
    'true_false',
    'choice',
  ];
}
