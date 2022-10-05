import React from "react";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import DoughnutChartContainer from "@/components/molecules/DoughnutChartContainer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

const DoughnutChartContainerWrapper: React.VFC = () => {
  const [languageData, setLanguageData] = useState([]);
  const [teachingMaterialData, setTeachingMaterialData] = useState([]);
  useEffect(() => {
    const newLanguageData = [];
    const newTeachingMaterialData = [];
    onAuthStateChanged(auth, async (user) => {
      const user_id = user.uid;
      try {
        const background_colors = [
          "#0445EC",
          "#0F70BD",
          "#20BDDE",
          "#3CCEFE",
          "#B29EF3",
          "#6C46EB",
          "#4A17EF",
          "#3005C0",
        ];
        const res = await axios.get(`/api/doughnut_chart?user_id=${user_id}`);
        const language_res_data = res.data.language;
        const teaching_material_res_data = res.data.teaching_material;
        for (let i = 0; i < Object.keys(language_res_data).length; i++) {
          newLanguageData[i] = {
            label: language_res_data[i + 1]["label"],
            studyingHours: language_res_data[i + 1]["studyingHours"],
            backgroundColor: background_colors[i],
          };
        }
        for (
          let i = 0;
          i < Object.keys(teaching_material_res_data).length;
          i++
        ) {
          newTeachingMaterialData[i] = {
            label: teaching_material_res_data[i + 1]["label"],
            studyingHours: teaching_material_res_data[i + 1]["studyingHours"],
            backgroundColor: background_colors[i],
          };
        }
        setLanguageData(newLanguageData);
        setTeachingMaterialData(newTeachingMaterialData);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);
  return (
    <div className='grid gap-x-5 grid-cols-2'>
      <DoughnutChartContainer
        title={"学習コンテンツ"}
        data={teachingMaterialData}
      />
      <DoughnutChartContainer title={"学習言語"} data={languageData} />
    </div>
  );
};

export default DoughnutChartContainerWrapper;
