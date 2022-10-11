import { ErrorContext } from "@/pages";
import React, { useContext } from "react";
import ErrorPage from "../atoms/ErrorPage";

type Props = {
  children: React.ReactNode;
};

const Main: React.VFC<Props> = (props) => {
  const { hasError } = useContext(ErrorContext);
  return (
    <div className='bg-[#F5F5F8] px-5 min-h-[calc(100vh-60px)]'>
      {hasError ? <ErrorPage /> : <div>{props.children}</div>}
    </div>
  );
};

export default Main;
