import AuthCheck from "@/components/admin/AuthCheck";
import { VFC } from "react";
import axios from "@/libs/axios";

const CreateAdmin: VFC = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password_confirmation, is_admin } =
      e.target.elements;
    if (password.value !== password_confirmation.value) {
      alert("パスワードが一致していません");
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/admin/create_admin", {
        name: name.value,
        email: email.value,
        password: password.value,
        is_admin: is_admin.value,
      });
      alert("ユーザーが作成されました");
    } catch (error) {
      alert("ユーザーの作成に失敗しました");
    }
  };

  return (
    <AuthCheck>
      <section className='mt-5 ml-10'>
        <h1 className='font-bold mb-3 text-lg'>ユーザー作成</h1>
        <form onSubmit={handleSubmit} className='flex flex-col max-w-sm gap-2'>
          <input type='text' name='name' placeholder='名前' required />
          <input
            type='email'
            name='email'
            placeholder='メールアドレス'
            required
          />
          <input
            type='password'
            name='password'
            minLength={8}
            placeholder='パスワード'
            required
          />
          <input
            type='password'
            name='password_confirmation'
            minLength={8}
            placeholder='パスワード確認'
            required
          />
          <div className='flex gap-3'>
            <label>
              <input
                type='radio'
                name='is_admin'
                value={1}
                required
                className='mr-1'
              />
              管理者
            </label>
            <label>
              <input
                type='radio'
                name='is_admin'
                value={0}
                required
                className='mr-1'
              />
              一般ユーザー
            </label>
          </div>
          <div>
            <button
              type='submit'
              className='bg-blue-500 text-white shadow-md rounded-md p-1'
            >
              作成
            </button>
          </div>
        </form>
      </section>
    </AuthCheck>
  );
};

export default CreateAdmin;
