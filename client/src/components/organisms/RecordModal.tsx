import axios from "@/libs/axios";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
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

  const [studyingDay, setStudyingDay] = useState<Date>(null);
  const [studyingHour, setStudyingHour] = useState<number>(0);
  const [usedLanguages, setUsedLanguages] = useState<Array<number>>([]);
  const [usedTeachingMaterials, setUsedTeachingMaterials] = useState<
    Array<number>
  >([]);
  const addOrRemove = (array, value: number, checked: boolean) => {
    const newArray = [...array];
    const index = array.indexOf(value);
    checked ? newArray.push(value) : newArray.splice(index, 1);
    return newArray;
  };

  const recordStudyingHour: MouseEventHandler = async () => {
    if (!studyingDay) {
      alert("日付を入力して下さい");
      return;
    }
    if (studyingHour <= 0) {
      alert("学習時間を入力して下さい");
      return;
    }
    if (!usedTeachingMaterials.length) {
      alert("学習コンテンツを1つ以上選択して下さい");
      return;
    }
    if (!usedLanguages.length) {
      alert("学習言語を1つ以上選択して下さい");
      return;
    }
    try {
      const res = await axios.post("/api", {
        studyingDay: studyingDay,
        studyingHour: studyingHour,
        languages: usedLanguages,
        teachingMaterials: usedTeachingMaterials,
      });
      setIsAfterRecord(true);
    } catch (e) {
      console.log(e);
    }
  };

  const [isAfterRecord, setIsAfterRecord] = useState(false);
  const AfterRecordModal: React.VFC = () => {
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
        {isAfterRecord ? (
          <AfterRecordModal />
        ) : (
          <section>
            <div>
              <label htmlFor='studying-day' className='font-bold text-xs'>
                学習日
              </label>
              <input
                type='date'
                id='studying-day'
                name='studying-day'
                className='w-full bg-[#F5F5F8] h-10 px-5 mt-3'
                onChange={(e) => setStudyingDay(new Date(e.target.value))}
              />
            </div>
            <div className='mt-6'>
              <p className='font-bold text-xs mb-3'>
                学習コンテンツ(複数選択可)
              </p>
              <div className='flex flex-wrap gap-2'>
                {teachingMaterials.map((teachingMaterial) => {
                  return (
                    <label className='relative' key={teachingMaterial.id}>
                      <input
                        type='checkbox'
                        value={teachingMaterial.id}
                        className='hidden peer'
                        onChange={(e) =>
                          setUsedTeachingMaterials((prev) => {
                            return addOrRemove(
                              prev,
                              Number(e.target.value),
                              e.target.checked
                            );
                          })
                        }
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
                        value={language.id}
                        className='hidden peer'
                        onChange={(e) =>
                          setUsedLanguages((prev) => {
                            return addOrRemove(
                              prev,
                              Number(e.target.value),
                              e.target.checked
                            );
                          })
                        }
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
                onChange={(e) => setStudyingHour(Number(e.target.value))}
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
            <RecordButton onClick={recordStudyingHour} />
          </section>
        )}
      </div>
    </section>
  );
};

export default RecordModal;
