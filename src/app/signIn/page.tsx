"use client";

import { useState, FormEvent } from "react";
import signIn from "../services/firebase/auth/signin";
import { useRouter } from "next/navigation";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);


      return router.push("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center pb-30">
      <section className="bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <label htmlFor="email" className="block">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password" className="block">
            <p>Senha</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Senha"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/signUp")}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
