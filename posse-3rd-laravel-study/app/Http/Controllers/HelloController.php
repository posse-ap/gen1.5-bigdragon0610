<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Console\Presets\React;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Area;
use App\Choice;
use App\Image;

class HelloController extends Controller
{
  public function index()
  {
    $areas = Area::all();
    return view('quiztitle', compact('areas'));
  }
  
  public function quiz($id) 
  {
    $area = Area::with('questions.choices')->find($id);
    return view('quizy', compact('area'));
  }
}
