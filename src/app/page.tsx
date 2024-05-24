"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/app/services/firebase/firebaseConfiguration";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800 text-white">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">Gerenciador de Metas</h1>
        <p className="text-xl mb-8">
          Soluções inovadoras para gerenciar suas metas e alcançar seus objetivos.
        </p>
        <Link href="/listarMeta" legacyBehavior>
          <a className="bg-white text-blue-800 py-3 px-6 rounded-full font-semibold text-lg">
            Comece agora
          </a>
        </Link>
      </section>
    </div>
  );
}
