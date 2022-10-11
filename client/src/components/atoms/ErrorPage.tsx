import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VFC } from "react";

const ErrorPage: VFC = () => {
  return (
    <section className='w-full h-full'>
      <div className='absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <p className='text-[#F3BD66] text-center text-lg'>ERROR</p>
        <p className='mx-auto mt-2 w-20 h-20 flex justify-center items-center bg-white rounded-full'>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className='text-[#F3BD66] w-20 h-20'
          />
        </p>
        <p className='text-center mt-8 text-sm leading-6'>
          一時的にご利用出来ない状態です。
          <br />
          しばらく経ってから
          <br />
          再度アクセスしてください。
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
