<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
  protected $fillable = [
    'area_id',
    'image_url',
  ];

  public function choices()
  {
    return $this->hasMany('App\Choice');
  }
}
