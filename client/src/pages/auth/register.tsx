import { VFC } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";

const Register: VFC = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      Router.push("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("メールアドレスを確認して下さい");
      } else if (error.code === "auth/weak-password") {
        alert("パスワードは6文字以上で設定して下さい");
      } else if (error.code === "auth/email-already-in-use") {
        alert("このメールアドレスは既に登録されています");
      } else {
        alert("登録に失敗しました");
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
          minLength={6}
          placeholder='パスワード'
          required
        />
        <button type='submit'>登録</button>
      </form>
      <Link href='/auth/login'>ログインはこちら</Link>
    </section>
  );
};

export default Register;
