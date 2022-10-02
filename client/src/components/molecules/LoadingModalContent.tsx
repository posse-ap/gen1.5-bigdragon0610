import { VFC } from "react";

const LoadingModalContent: VFC = () => {
  return (
    <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='loading'></div>
    </section>
  );
};

export default LoadingModalContent;
