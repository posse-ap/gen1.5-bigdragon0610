<?php

namespace App\Http\Controllers;

use App\Language;
use App\StudyingHour;
use Carbon\Carbon;
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

  public function bar_chart(int $year, int $month)
  {
    $monthly_studying_hours_for_each_day = StudyingHour::getMonthlyStudyingHoursForEachDay($year, $month);
    return $monthly_studying_hours_for_each_day;
  }

  public function doughnut_chart()
  {
    return [
      'language' => StudyingHour::getStudyingHoursForEachLanguage(),
      'teaching_material' => StudyingHour::getStudyingHoursForEachTeachingMaterial(),
    ];
  }

  public function store(Request $request)
  {
    $data = [];
    $languages = $request->languages;
    $teaching_materials = $request->teachingMaterials;
    $studying_hour = $request->studyingHour / count($languages) / count($teaching_materials);
    foreach ($languages as $language) {
      foreach ($teaching_materials as $teaching_material) {
        $data[] = [
          "studying_hour" => $studying_hour,
          "studying_day" => new Carbon($request->studyingDay),
          "language_id" => $language,
          "teaching_material_id" => $teaching_material,
        ];
      }
    }
    StudyingHour::insert($data);
    return response('stored studying_hours', 200);
  }
}
