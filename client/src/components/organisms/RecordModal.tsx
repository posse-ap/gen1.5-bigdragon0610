import axios from "@/libs/axios";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
  VFC,
} from "react";
import CloseButton from "../atoms/CloseButton";
import Modal from "../atoms/Modal";
import AfterRecordModalContent from "../molecules/AfterRecordModalContent";
import BeforeRecordModalContent from "../molecules/BeforeRecordModalContent";
import LoadingModalContent from "../molecules/LoadingModalContent";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RecordModal: React.VFC<Props> = ({ isOpen, setIsOpen }) => {
  type Language = {
    id: number;
    name: string;
  };
  type TeachingMaterial = {
    id: number;
    name: string;
  };
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [teachingMaterials, setTeachingMaterials] = useState<
    Array<TeachingMaterial>
  >([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const languagesRes = await axios.get("/api/language");
        setLanguages(languagesRes.data);
        const teachingMaterialsRes = await axios.get("/api/teaching_material");
        setTeachingMaterials(teachingMaterialsRes.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const progressStatuses = ["beforeRecord", "loading", "afterRecord", "error"];
  const [currentProgressStatus, setCurrentProgressStatus] = useState(
    progressStatuses[0]
  );

  const ModalContent: VFC = () => {
    switch (currentProgressStatus) {
      case progressStatuses[0]:
        return (
          <BeforeRecordModalContent
            languages={languages}
            teachingMaterials={teachingMaterials}
            progressStatuses={progressStatuses}
            setCurrentProgressStatus={setCurrentProgressStatus}
          />
        );
      case progressStatuses[1]:
        return <LoadingModalContent />;
      case progressStatuses[2]:
        return <AfterRecordModalContent />;
    }
  };

  const closeModal: MouseEventHandler = () => {
    setIsOpen(false);
    setCurrentProgressStatus(progressStatuses[0]);
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className='text-right mt-5'>
        <CloseButton closeModal={closeModal} />
      </div>
      <ModalContent />
    </Modal>
  );
};

export default RecordModal;
