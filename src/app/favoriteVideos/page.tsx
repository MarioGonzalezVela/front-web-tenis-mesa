'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FavoriteVideo = {
  id: number;
  video: {
    id: number;
    title: string;
    link: string;
    description: string;
  };
};

const getEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/
  );
  const videoId = videoIdMatch ? (videoIdMatch[1] || videoIdMatch[2]) : null;

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function FavoriteVideosPage() {
  const [favorites, setFavorites] = useState<FavoriteVideo[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/favorite-videos')
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error obteniendo favoritos:', error));
  }, []);

  const removeFromFavorites = (favoriteId: number) => {
    fetch(`http://localhost:8000/api/favorite-videos/${favoriteId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
          localStorage.removeItem(`favorite_${favoriteId}`);
        }
      })
      .catch(error => console.error('Error eliminando favorito:', error));
  };

  return (
    <div className="max-w-screen-lg mx-auto bg-black bg-opacity-90 p-4 sm:p-6 rounded-2xl shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-6">
        Tus Vídeos Favoritos ⭐
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-sm sm:text-base">
          No tienes ningún vídeo guardado como favorito.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {favorites.map(fav => (
            <div key={fav.id} className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200">
              <iframe 
                className="w-full h-auto aspect-video rounded-xl"
                src={getEmbedUrl(fav.video.link)}
                title={fav.video.title}
                allowFullScreen
              ></iframe>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-200 mt-4 mb-4">{fav.video.title}</h2>
              <p className="text-gray-400 text-sm sm:text-base">{fav.video.description}</p>

              <button
                className="mt-4 bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-2xl transition w-full sm:w-auto"
                onClick={() => removeFromFavorites(fav.id)}
              >
                ❌ Eliminar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold border border-gray-600 transition w-full sm:w-auto"
          onClick={() => router.push('/video')}
        >
          Volver a vídeos
        </button>
      </div>
    </div>
  );
}
