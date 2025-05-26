'use client'

import { useEffect, useState } from 'react'

type FavoriteVideo = {
  id: number  // ID del favorito en la API
  video: {
    id: number
    title: string
    link: string
    description: string
  }
}

const getEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/
  )
  const videoId = videoIdMatch ? (videoIdMatch[1] || videoIdMatch[2]) : null

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

export default function FavoriteVideosPage() {
  const [favorites, setFavorites] = useState<FavoriteVideo[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/favorite-videos')
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error obteniendo favoritos:', error))
  }, [])

  const removeFromFavorites = (favoriteId: number) => {
    fetch(`http://localhost:8000/api/favorite-videos/${favoriteId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId))
          localStorage.removeItem(`favorite_${favoriteId}`) // Cambiamos el botón en Vídeos
        }
      })
      .catch(error => console.error('Error eliminando favorito:', error))
  }

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Tus Vídeos Favoritos ⭐</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">No tienes ningún vídeo guardado como favoritos</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <div key={fav.id} className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200">
              <iframe width="100%" height="200" src={getEmbedUrl(fav.video.link)} title={fav.video.title} allowFullScreen className="rounded-xl"></iframe>
              <h2 className="text-xl font-semibold text-gray-200 mt-4">{fav.video.title}</h2>
              <p className="text-gray-400">{fav.video.description}</p>

              <button
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl transition"
                onClick={() => removeFromFavorites(fav.id)}
              >
                ❌ Eliminar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
