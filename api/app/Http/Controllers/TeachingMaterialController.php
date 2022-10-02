<?php

namespace App\Http\Controllers;

use App\TeachingMaterial;
use Illuminate\Http\Request;

class TeachingMaterialController extends Controller
{
  public function index()
  {
    return TeachingMaterial::get();
  }
}
