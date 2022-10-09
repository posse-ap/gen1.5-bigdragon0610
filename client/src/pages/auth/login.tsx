import axios from "@/libs/axios";
import Link from "next/link";
import Router from "next/router";
import { VFC } from "react";

const Login: VFC = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/login", {
        email: email.value,
        password: password.value,
      });
      Router.push("/");
    } catch (error) {
      alert("ログインに失敗しました");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='メールアドレス'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='パスワード'
          required
        />
        <button type='submit'>ログイン</button>
      </form>
      <Link href='/auth/register'>ユーザー登録はこちら</Link>
    </section>
  );
};

export default Login;
