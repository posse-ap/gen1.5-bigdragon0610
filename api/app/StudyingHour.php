<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class StudyingHour extends Model
{
  protected $dates = [
    'studying_day',
  ];

  public function languages()
  {
    return $this->belongsTo('App\Language', 'language_id');
  }

  public function teaching_materials()
  {
    return $this->belongsTo('App\TeachingMaterial', 'teaching_material_id');
  }

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

  public static function getStudyingHoursForEachLanguage()
  {
    $studying_hours_for_each_language = self::get()
      ->groupBy(function ($row) {
        return $row->language_id;
      })
      ->map(function ($language) {
        return $language->sum('studying_hour');
      });
    $languages = Language::get();
    foreach ($languages as $key => $language) {
      $id = $key + 1;
      if (isset($studying_hours_for_each_language[$id])) {
        $studying_hours_for_each_language[$id] = [
          'label' => $language->name,
          'studyingHours' => $studying_hours_for_each_language[$id],
        ];
      } else {
        $studying_hours_for_each_language[$id] = [
          'label' => $language->name,
          'studyingHours' => 0,
        ];
      }
    }
    return $studying_hours_for_each_language;
  }

  public static function getStudyingHoursForEachTeachingMaterial()
  {
    $studying_hours_for_each_teaching_material = self::get()
      ->groupBy(function ($row) {
        return $row->teaching_material_id;
      })
      ->map(function ($teaching_material) {
        return $teaching_material->sum('studying_hour');
      });
    $teaching_materials = TeachingMaterial::get();
    foreach ($teaching_materials as $key => $teaching_material) {
      $id = $key + 1;
      if (isset($studying_hours_for_each_teaching_material[$id])) {
        $studying_hours_for_each_teaching_material[$id] = [
          'label' => $teaching_material->name,
          'studyingHours' => $studying_hours_for_each_teaching_material[$id],
        ];
      } else {
        $studying_hours_for_each_teaching_material[$id] = [
          'label' => $teaching_material->name,
          'studyingHours' => 0,
        ];
      }
    }
    return $studying_hours_for_each_teaching_material;
  }
}
