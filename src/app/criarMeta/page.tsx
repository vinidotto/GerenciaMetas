"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, push } from "firebase/database";
import { db } from "../services/firebase/firebaseConfiguration";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Cadastrar() {
  const router = useRouter();
  const [newPlace, setNewPlace] = useState({
    descricao: "",
    data_inicio: "",
    data_fim: "",
    status: "Em aberto",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const validateData = () => {
    const newErrors = [];
    const now = new Date().toISOString().split("T")[0];

    if (newPlace.data_inicio < now) {
      newErrors.push("A data de início não pode ser anterior ao dia atual.");
    }

    if (newPlace.data_fim < newPlace.data_inicio) {
      newErrors.push("A data de conclusão não pode ser anterior à data de início.");
    }

    if (newPlace.descricao.length < 1 || newPlace.descricao.length > 255) {
      newErrors.push("A descrição deve ter entre 1 e 255 caracteres.");
    }

    if (newPlace.status !== "Em aberto" && newPlace.status !== "Concluído") {
      newErrors.push("O status deve ser 'Em aberto' ou 'Concluído'.");
    }

    return newErrors;
  };

  const addNewPlace = async () => {
    const validationErrors = validateData();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (userId) {
      await push(ref(db, `/metas/${userId}`), newPlace);
      setNewPlace({ descricao: "", data_inicio: "", data_fim: "", status: "Em aberto" });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex items-center justify-center">
      <div className="relative py-3 w-full max-w-lg sm:max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewPlace();
            }}
          >
            <h2 className="text-center text-3xl mb-8 font-extrabold text-gray-900">
              Cadastrar Meta
            </h2>
            {errors.length > 0 && (
              <div className="bg-red-500 text-white p-4 rounded mb-4">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descricao"
              >
                Descrição:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="descricao"
                type="text"
                placeholder="Descrição"
                value={newPlace.descricao}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, descricao: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="data_inicio"
              >
                Data de Início:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="data_inicio"
                type="date"
                placeholder="Data de Início"
                value={newPlace.data_inicio}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, data_inicio: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="data_fim"
              >
                Data de Conclusão:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="data_fim"
                type="date"
                placeholder="Data de Conclusão"
                value={newPlace.data_fim}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, data_fim: e.target.value })
                }
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                value={newPlace.status}
                onChange={(e) =>
                  setNewPlace({ ...newPlace, status: e.target.value })
                }
              >
                <option value="Em aberto">Em aberto</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Adicionar Meta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
