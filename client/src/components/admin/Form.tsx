import Image from "next/image";
import { useState, VFC } from "react";

type Props = {
  id: number;
  name: string;
  setData: Function;
};

const Form: VFC<Props> = ({ id, name, setData }) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);

  type data = {
    id: number;
    name: string;
    deleted_at: Date | null;
  };

  const deleteData = () => {
    if (!confirm(`${name}を削除しますか？`)) return;
    setData((prev: Array<data>) => {
      return prev.map((data) => {
        if (data.id === id) data.deleted_at = new Date();
        return data;
      });
    });
  };

  const [newName, setNewName] = useState<string>(name);
  const editData = () => {
    if (!confirm(`「${name}」を「${newName}」に変更しますか？`)) return;
    setData((prev: Array<data>) => {
      return prev.map((data) => {
        if (data.id === id) data.name = newName;
        return data;
      });
    });
    setCanEdit(false);
  };

  if (!canEdit) {
    return (
      <li className='flex gap-3' key={id} id={String(id)}>
        <Image
          src='/images/delete.svg'
          width='18'
          height='18'
          onClick={deleteData}
        />
        <Image
          src='/images/edit.svg'
          width='18'
          height='18'
          onClick={() => setCanEdit(true)}
        />
        <span>{name}</span>
      </li>
    );
  } else {
    return (
      <li className='flex gap-3'>
        <Image
          src='/images/close.svg'
          width='18'
          height='18'
          onClick={() => setCanEdit(false)}
        />
        <Image
          src='/images/check.svg'
          width='18'
          height='18'
          onClick={editData}
        />
        <input
          type='text'
          name='name'
          defaultValue={name}
          onChange={(e) => setNewName(e.target.value)}
        />
      </li>
    );
  }
};

export default Form;
