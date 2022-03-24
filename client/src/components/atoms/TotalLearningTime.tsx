import React from "react";

type Props = {
  term: string;
  learningTime: number;
};

const TotalLearningTime: React.VFC<Props> = (props) => {
  return (
    <div className="bg-white h-32 rounded-lg shadow-md flex flex-col justify-center">
      <p className="text-center text-[#1270BB] font-bold">{props.term}</p>
      <p className="text-center font-bold text-3xl">{props.learningTime}</p>
      <p className="text-center text-[#99BAD2] text-xl font-light">hour</p>
    </div>
  );
};

export default TotalLearningTime;
