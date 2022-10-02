import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { DateContext } from "@/pages";

const Pagination: React.VFC = () => {
  const { date, setDate } = useContext(DateContext);

  const calculateMonth = (date: Date, num: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + num);
    return newDate;
  };

  return (
    <div className='w-full text-center mt-5'>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className='text-[#0F71BC]'
        onClick={() => setDate(calculateMonth(date, -1))}
      />
      <span className='mx-4'>
        {date.getFullYear()}年 {date.getMonth() + 1}月
      </span>
      <FontAwesomeIcon
        icon={faAngleRight}
        className={
          calculateMonth(date, 1) > new Date()
            ? "pointer-events-none text-[#97B9D1]"
            : "text-[#0F71BC]"
        }
        onClick={() => setDate(calculateMonth(date, 1))}
      />
    </div>
  );
};

export default Pagination;
