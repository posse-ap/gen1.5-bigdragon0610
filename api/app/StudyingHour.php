<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class StudyingHour extends Model
{
  protected $dates = [
    'studying_day',
  ];

  public static function getTotalStudyingHours()
  {
    return self::sum('studying_hour');
  }

  public static function getMonthlyStudyingHours()
  {
    return self::whereYear('studying_day', Carbon::today())->whereMonth('studying_day', Carbon::today())->sum('studying_hour');
  }

  public static function getDailyStudyingHours()
  {
    return self::whereDate('studying_day', Carbon::today())->sum('studying_hour');
  }

  public static function getMonthlyStudyingHoursForEachDay()
  {
    $monthly_studying_hours_for_each_day = self::whereYear('studying_day', Carbon::today())
      ->whereMonth('studying_day', Carbon::today())
      ->get()
      ->groupBy(function ($row) {
        return $row->studying_day->format('j');
      })
      ->map(function ($day) {
        return $day->sum('studying_hour');
      });
    $end_of_month = Carbon::now()->endOfMonth()->day;
    for ($day = 1; $day <= $end_of_month; $day++) {
      if (!isset($monthly_studying_hours_for_each_day[$day])) {
        $monthly_studying_hours_for_each_day[$day] = 0;
      }
    }
    return $monthly_studying_hours_for_each_day;
  }
}
