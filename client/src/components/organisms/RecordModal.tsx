import axios from "@/libs/axios";
import { faCheck, faClose, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import RecordButton from "../atoms/RecordButton";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RecordModal: React.VFC<Props> = ({ isOpen, setIsOpen }) => {
  const record: MouseEventHandler = () => {
    alert("record");
  };

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

  return (
    <section className={isOpen ? "" : "hidden"}>
      <div
        className='w-screen h-screen bg-black opacity-10 fixed top-0 left-0'
        onClick={() => setIsOpen(false)}
      ></div>
      <div className='w-screen h-[90vh] overflow-scroll bg-white fixed bottom-0 left-0 px-5 rounded-t-3xl'>
        <div className='text-right mt-5'>
          <button
            className='w-8 h-8 bg-[#f5f5f8] rounded-full'
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faClose} className='text-[#666666]' />
          </button>
        </div>
        <div>
          <label htmlFor='studying-day' className='font-bold text-xs'>
            学習日
          </label>
          <input
            type='date'
            id='studying-day'
            name='studying-day'
            className='w-full bg-[#F5F5F8] h-10 px-5 mt-3'
          />
        </div>
        <div className='mt-6'>
          <p className='font-bold text-xs mb-3'>学習コンテンツ(複数選択可)</p>
          <div className='flex flex-wrap gap-2'>
            {teachingMaterials.map((teachingMaterial) => {
              return (
                <label className='relative' key={teachingMaterial.id}>
                  <input
                    type='checkbox'
                    name='teaching_materials[]'
                    value={teachingMaterial.id}
                    className='hidden peer'
                  />
                  <p className='peer-checked:bg-[#0f71bd] absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 leading-4 bg-[#cccccc] rounded-full text-center inline-block'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className='text-white w-3'
                    />
                  </p>
                  <p className='peer-checked:bg-[#e7f5ff] bg-[#F5F5F8] text-sm pr-3 pl-8 py-1 rounded-full'>
                    {teachingMaterial.name}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
        <div className='mt-6'>
          <p className='font-bold text-xs mb-3'>学習言語(複数選択可)</p>
          <div className='flex flex-wrap gap-2'>
            {languages.map((language) => {
              return (
                <label className='relative' key={language.id}>
                  <input
                    type='checkbox'
                    name='teaching_materials[]'
                    value={language.id}
                    className='hidden peer'
                  />
                  <p className='peer-checked:bg-[#0f71bd] absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 leading-4 bg-[#cccccc] rounded-full text-center inline-block'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className='text-white w-3'
                    />
                  </p>
                  <p className='peer-checked:bg-[#e7f5ff] bg-[#F5F5F8] text-sm pr-3 pl-8 py-1 rounded-full'>
                    {language.name}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
        <div className='mt-6'>
          <label htmlFor='studying-hour' className='font-bold text-xs'>
            学習時間
          </label>
          <input
            type='number'
            id='studying-hour'
            name='studying-hour'
            className='w-full bg-[#F5F5F8] h-10 px-5 mt-3'
          />
        </div>
        <div className='mt-6'>
          <label htmlFor='twitter' className='font-bold text-xs'>
            Twitter用コメント
          </label>
          <textarea
            id='twitter'
            name='twitter'
            className='w-full bg-[#F5F5F8] h-24 px-5 mt-3 resize-none'
          ></textarea>
        </div>
        <div className='mt-3'>
          <label>
            <input type='checkbox' name='twitter' className='peer hidden' />
            <p className='peer-checked:bg-[#0f71bd] bg-[#cccccc] mr-2 w-8 h-8 leading-8 rounded-full text-center inline-block'>
              <FontAwesomeIcon icon={faCheck} className='text-white w-4' />
            </p>
            <p className='inline text-xs font-bold'>Twitterにシェアする</p>
          </label>
        </div>
        <RecordButton onClick={record} />
      </div>
    </section>
  );
};

export default RecordModal;
