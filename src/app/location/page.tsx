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
  const { token } = useAuth();
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

  return (
    <div className="max-w-screen-lg mx-auto bg-black bg-opacity-90 p-4 sm:p-6 rounded-2xl shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-6">Locales en Madrid</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition w-full sm:w-auto"
          onClick={() => setShowOnlyVisited(!showOnlyVisited)}
        >
          {showOnlyVisited ? "Mostrar todos los locales" : "Mostrar visitados"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 m-8">
        {locations
          .filter(location => !showOnlyVisited || visitedLocations.includes(location.id))
          .map(location => (
            <div key={location.id} className="border border-gray-700 rounded-2xl p-4 m-3 bg-gray-900 shadow-lg hover:shadow-xl transition">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-200 m-4">{location.name}</h2>
              <p className="text-gray-400 text-sm sm:text-base mt-2">📍 {location.address}</p>
              <p className="text-gray-400 text-sm sm:text-base mt-2">📞 {location.phone}</p>
              <p className="text-gray-400 text-sm sm:text-base mt-2">🕒 {location.schedule}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
