import { VFC } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "@/libs/axios";

const Register: VFC = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password_confirmation } = e.target.elements;
    if (password.value !== password_confirmation.value) {
      alert("パスワードが一致していません");
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie");
      const res = await axios.post("/api/register", {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      });
      if (res.data.success) {
        Router.push("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("登録に失敗しました");
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>登録</button>
      </form>
      <Link href='/auth/login'>ログインはこちら</Link>
    </section>
  );
};

export default Register;
