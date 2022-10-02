import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VFC } from "react";

const AfterRecordModalContent: VFC = () => {
  return (
    <section>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <p className='text-[#bde360] text-center text-lg'>AWESOME!</p>
        <p className='mx-auto mt-2 peer-checked:bg-[#0f71bd] w-20 h-20 flex justify-center items-center bg-[#bde360] rounded-full'>
          <FontAwesomeIcon icon={faCheck} className='text-white w-10 h-10' />
        </p>
        <p className='text-center mt-8 text-xl'>
          記録・投稿
          <br />
          完了しました
        </p>
      </div>
    </section>
  );
};

export default AfterRecordModalContent;
