import React from "react";

type Props = {
  children: React.ReactNode;
};

const Main: React.VFC<Props> = (props) => {
  return <div className="bg-[#F5F5F8] px-5">{props.children}</div>;
};

export default Main;
