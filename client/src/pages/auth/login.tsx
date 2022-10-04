import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import { VFC } from "react";

const Login: VFC = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      Router.push("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("メールアドレスを確認して下さい");
      } else if (error.code === "auth/user-disabled") {
        alert("ユーザーが無効です");
      } else if (error.code === "auth/user-not-found") {
        alert("このメールアドレスは登録されていません");
      } else if (error.code === "auth/wrong-password") {
        alert("パスワードが間違っています");
      } else if (error.code === "auth/too-many-requests") {
        alert("しばらく経ってから再度ログインして下さい");
      } else {
        alert("ログインに失敗しました");
      }
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
