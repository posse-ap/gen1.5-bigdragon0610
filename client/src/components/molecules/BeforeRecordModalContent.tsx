import { auth } from "@/firebase";
import axios from "@/libs/axios";
import { ErrorContext } from "@/pages";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged } from "firebase/auth";
import { Dispatch, MouseEventHandler, useContext, useState, VFC } from "react";
import RecordButton from "../atoms/RecordButton";

type Language = {
  id: number;
  name: string;
};
type TeachingMaterial = {
  id: number;
  name: string;
};
interface Props {
  languages: Array<Language>;
  teachingMaterials: Array<TeachingMaterial>;
  progressStatuses: Array<string>;
  setCurrentProgressStatus: Dispatch<React.SetStateAction<string>>;
}

const BeforeRecordModalContent: VFC<Props> = ({
  languages,
  teachingMaterials,
  progressStatuses,
  setCurrentProgressStatus,
}) => {
  const { setHasError } = useContext(ErrorContext);

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

  const recordStudyingHour: MouseEventHandler = () => {
    if (!studyingDay) {
      alert("学習日を入力して下さい");
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
      onAuthStateChanged(auth, async (user) => {
        const user_id = user.uid;
        setCurrentProgressStatus(progressStatuses[1]);
        await axios.post(`/api`, {
          userId: user_id,
          studyingDay: studyingDay,
          studyingHour: studyingHour,
          languages: usedLanguages,
          teachingMaterials: usedTeachingMaterials,
        });
        setCurrentProgressStatus(progressStatuses[2]);
      });
    } catch (e) {
      setHasError(true);
      console.log(e);
    }
  };

  return (
    <section>
      <section>
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
      </section>

      <section className='mt-6'>
        <p className='font-bold text-xs mb-3'>学習コンテンツ(複数選択可)</p>
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
                  <FontAwesomeIcon icon={faCheck} className='text-white w-3' />
                </p>
                <p className='peer-checked:bg-[#e7f5ff] bg-[#F5F5F8] text-sm pr-3 pl-8 py-1 rounded-full'>
                  {teachingMaterial.name}
                </p>
              </label>
            );
          })}
        </div>
      </section>

      <section className='mt-6'>
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
                  <FontAwesomeIcon icon={faCheck} className='text-white w-3' />
                </p>
                <p className='peer-checked:bg-[#e7f5ff] bg-[#F5F5F8] text-sm pr-3 pl-8 py-1 rounded-full'>
                  {language.name}
                </p>
              </label>
            );
          })}
        </div>
      </section>

      <section className='mt-6'>
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
      </section>

      <section className='mt-6'>
        <label htmlFor='twitter' className='font-bold text-xs'>
          Twitter用コメント
        </label>
        <textarea
          id='twitter'
          name='twitter'
          className='w-full bg-[#F5F5F8] h-24 px-5 mt-3 resize-none'
        ></textarea>
      </section>

      <section className='mt-3'>
        <label>
          <input type='checkbox' name='twitter' className='peer hidden' />
          <p className='peer-checked:bg-[#0f71bd] bg-[#cccccc] mr-2 w-8 h-8 leading-8 rounded-full text-center inline-block'>
            <FontAwesomeIcon icon={faCheck} className='text-white w-4' />
          </p>
          <p className='inline text-xs font-bold'>Twitterにシェアする</p>
        </label>
      </section>

      <RecordButton onClick={recordStudyingHour} />
    </section>
  );
};

export default BeforeRecordModalContent;
