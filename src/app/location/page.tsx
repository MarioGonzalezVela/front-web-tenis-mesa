'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Location = {
  id: number;
  name: string;
  phone: string;
  address: string;
  schedule: string;
};

type VisitedLocation = {
  id: number;
  location_id: number;
  review: string;
};

export default function LocationPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [visitedLocations, setVisitedLocations] = useState<number[]>([]);
  const [reviews, setReviews] = useState<{ [key: number]: string }>({});
  const { token } = useAuth(); // Obtiene el token autenticado
  const [showOnlyVisited, setShowOnlyVisited] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error obteniendo locales:', error));

    if (token) {
      fetch(`http://localhost:8000/api/visited-locations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setVisitedLocations(data.map((visited: VisitedLocation) => visited.location_id));
          const initialReviews = data.reduce((acc: { [key: number]: string }, visited: VisitedLocation) => {
            acc[visited.location_id] = visited.review || '';
            return acc;
          }, {});
          setReviews(initialReviews);
        })
        .catch(error => console.error('Error obteniendo locales visitados:', error));
    }
  }, [token]);

  const markAsVisited = (locationId: number) => {
    if (!token) {
      alert("Debes iniciar sesión para marcar locales como visitados.");
      return;
    }

    fetch("http://localhost:8000/api/visited-locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ location_id: locationId }),
    })
      .then(() => setVisitedLocations([...visitedLocations, locationId]))
      .catch((error) => console.error("Error marcando como visitado:", error));
  };

  const submitReview = async (locationId: number) => {
    if (!token) {
      alert("Debes iniciar sesión para añadir una reseña.");
      return;
    }

    if (!reviews[locationId]) {
      alert("Error: La reseña no puede estar vacía.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/visited-locations`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location_id: locationId, review: reviews[locationId] }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la reseña.");
      }

      alert("Reseña guardada correctamente.");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo guardar la reseña. Verifica que la API está funcionando.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Locales en la Comunidad de Madrid</h1>

      <div className="text-center mb-4">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 my-3 rounded-2xl transition"
          onClick={() => setShowOnlyVisited(!showOnlyVisited)}
        >
          {showOnlyVisited ? "Mostrar todos los locales" : "Mostrar locales visitados"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations
          .filter(location => !showOnlyVisited || visitedLocations.includes(location.id))
          .map(location => (
            <div key={location.id} className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200">
              <h2 className="text-xl font-semibold text-gray-200">{location.name}</h2>
              <p className="text-gray-400 pt-3">📍 {location.address}</p>
              <p className="text-gray-400">📞 {location.phone}</p>
              <p className="text-gray-400">🕒 {location.schedule}</p>

              {!visitedLocations.includes(location.id) ? (
                <button
                  className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
                  onClick={() => markAsVisited(location.id)}
                >
                  ✅ Marcar como visitado
                </button>
              ) : (
                <div className="mt-4">
                  <p className="text-green-400">✔️ Visitado</p>
                  <textarea
                    placeholder="Añadir reseña..."
                    value={reviews[location.id] || ''}
                    onChange={(e) => setReviews({ ...reviews, [location.id]: e.target.value })}
                    className="w-full p-2 mt-2 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
                  />
                  <button
                    className="mt-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
                    onClick={() => submitReview(location.id)}
                  >
                    💬 Guardar reseña
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
