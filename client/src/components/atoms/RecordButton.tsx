import React, { MouseEventHandler } from "react";

interface Props {
  onClick: MouseEventHandler;
}

const RecordButton: React.VFC<Props> = (props) => {
  return (
    <div>
      <button
        className='w-full bg-gradient-to-r from-[#0F71BC] to-[#3CCFFF] text-white text-lg py-2 rounded-r-full rounded-l-full my-5'
        onClick={props.onClick}
      >
        記録・投稿
      </button>
    </div>
  );
};

export default RecordButton;
