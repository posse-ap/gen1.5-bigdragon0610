<?php

namespace App\Http\Controllers;

use App\StudyingHour;
use Illuminate\Http\Request;

class StudyingHourController extends Controller
{
  public function index()
  {
    $total_studying_hours = StudyingHour::getTotalStudyingHours();
    $monthly_studying_hours = StudyingHour::getMonthlyStudyingHours();
    $daily_studying_hours = StudyingHour::getDailyStudyingHours();
    return [
      'total_studying_hours' => $total_studying_hours,
      'monthly_studying_hours' => $monthly_studying_hours,
      'daily_studying_hours' => $daily_studying_hours,
    ];
  }

  public function bar_chart()
  {
    $monthly_studying_hours_for_each_day = StudyingHour::getMonthlyStudyingHoursForEachDay();
    return $monthly_studying_hours_for_each_day;
  }

  public function language()
  {
  }

  public function teaching_material()
  {
  }
}
