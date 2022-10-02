import { MouseEventHandler, ReactNode, VFC } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  closeModal: MouseEventHandler;
}

const Modal: VFC<Props> = ({ children, isOpen, closeModal }) => {
  return (
    <section className={isOpen ? "" : "hidden"}>
      <div
        className='w-screen h-screen bg-black opacity-10 fixed top-0 left-0'
        onClick={closeModal}
      ></div>
      <div className='w-screen h-[90vh] overflow-scroll bg-white fixed bottom-0 left-0 px-5 rounded-t-3xl'>
        {children}
      </div>
    </section>
  );
};

export default Modal;
