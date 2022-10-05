import React from "react";
import TotalLearningTime from "@/components/atoms/TotalLearningTime";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

const LearningTimeWrapper: React.VFC = () => {
  const [daily_studying_hours, setDailyStudyingHours] = useState();
  const [monthly_studying_hours, setMonthlyStudyingHours] = useState();
  const [total_studying_hours, setTotalStudyingHours] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const user_id = user.uid;
      try {
        const res = await axios.get(`/api?user_id=${user_id}`);
        setDailyStudyingHours(res.data["daily_studying_hours"]);
        setMonthlyStudyingHours(res.data["monthly_studying_hours"]);
        setTotalStudyingHours(res.data["total_studying_hours"]);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <div className='grid gap-x-5 grid-cols-3 py-5'>
      <TotalLearningTime term={"Today"} learningTime={daily_studying_hours} />
      <TotalLearningTime term={"Month"} learningTime={monthly_studying_hours} />
      <TotalLearningTime term={"Total"} learningTime={total_studying_hours} />
    </div>
  );
};

export default LearningTimeWrapper;
