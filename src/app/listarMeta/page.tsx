"use client";

import { ref, onValue, update, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/services/firebase/firebaseConfiguration";
import { useEffect, useState } from "react";

interface IPlace {
  [key: string]: {
    descricao: string;
    data_inicio: string;
    data_fim: string;
    status: string;
  };
}

export default function Metas() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<IPlace>({});
  const [userId, setUserId] = useState<string | null>(null);

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

  useEffect(() => {
    if (userId) {
      const fetchData = () => {
        const userMetasRef = ref(db, `/metas/${userId}`);
        const unsubscribe = onValue(userMetasRef, (querySnapShot) => {
          const metasData: IPlace = querySnapShot.val() || {};
          setPlaces(metasData);
          setLoading(false);
        });

        return () => unsubscribe();
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const statusChange = (metaId: string, newStatus: string) => {
    if (userId) {
      const currentStatus = places[metaId].status;
      const updatedStatus = currentStatus === "Concluída" ? "Pendente" : "Concluída";
      const metaRef = ref(db, `/metas/${userId}/${metaId}`);
      update(metaRef, { status: updatedStatus });
    }
  };

  const deleteMeta = (metaId: string) => {
    if (userId) {
      const metaRef = ref(db, `/metas/${userId}/${metaId}`);
      remove(metaRef).then(() => {
        setPlaces((prevPlaces) => {
          const newPlaces = { ...prevPlaces };
          delete newPlaces[metaId];
          return newPlaces;
        });
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-12">
        {userId &&
          Object.keys(places).map((metaId) => (
            <div key={metaId} className="relative py-3">
              <div className="max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    {places[metaId].descricao.toUpperCase()}
                  </h2>
                  <div className="my-4">
                    <p className="text-gray-700">{`ID: ${metaId}`}</p>
                    <p className="text-gray-700">{`Data fim: ${places[metaId].data_inicio}`}</p>
                    <p className="text-gray-700">{`Data fim: ${places[metaId].data_fim}`}</p>
                    <p className="text-gray-700">{`Status: ${places[metaId].status}`}</p>
                    <div className="flex space-x-4 mt-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => statusChange(metaId, "Concluída")}
                      >
                        {places[metaId].status === "Concluída" ? "Marcar como Pendente" : "Marcar como Concluída"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => deleteMeta(metaId)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
