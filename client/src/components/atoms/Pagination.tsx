import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination: React.VFC = () => {
  return (
    <div className="w-full text-center mt-5">
      <FontAwesomeIcon icon={faAngleLeft} className="text-[#0F71BC]" />
      <span className="mx-4">2022年 3月</span>
      <FontAwesomeIcon icon={faAngleRight} className="text-[#97B9D1]" />
    </div>
  );
};

export default Pagination;
