import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, VFC } from "react";

interface Props {
  closeModal: MouseEventHandler;
}

const CloseButton: VFC<Props> = ({ closeModal }) => {
  return (
    <button className='w-8 h-8 bg-[#f5f5f8] rounded-full' onClick={closeModal}>
      <FontAwesomeIcon icon={faClose} className='text-[#666666]' />
    </button>
  );
};

export default CloseButton;
