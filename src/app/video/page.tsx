'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Video = {
  id: number
  title: string
  link: string
  description: string
  difficulty: string
}

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:8000/api/videos')
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error obteniendo vídeos:', error))

    fetch('http://localhost:8000/api/favorite-videos')
      .then(res => res.json())
      .then(data => setFavorites(data.map((fav: { video_id: number }) => fav.video_id)))
      .catch(error => console.error('Error obteniendo favoritos:', error))
  }, [])

const addToFavorites = (videoId: number) => {
  if (favorites.includes(videoId)) return

  fetch('http://localhost:8000/api/favorite-videos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id: 1, video_id: videoId }),
  })
    .then(res => {
      if (res.ok) {
        setFavorites([...favorites, videoId])
        localStorage.setItem(`favorite_${videoId}`, "true") // Guarda el estado en localStorage
      }
    })
    .catch(error => console.error('Error agregando a favoritos:', error))
}



  const getEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/
    )
    const videoId = videoIdMatch ? (videoIdMatch[1] || videoIdMatch[2]) : null

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="border p-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
        >
          <option value="">Todos</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Experto">Experto</option>
        </select>

        <button
          onClick={() => router.push('/favoriteVideos')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
        >
          ⭐ Ver Favoritos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos
          .filter(video => (selectedDifficulty ? video.difficulty === selectedDifficulty : true))
          .map(video => (
            <div key={video.id} className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200">
              <div className="relative">
                {getEmbedUrl(video.link).includes('youtube.com/embed') ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={getEmbedUrl(video.link)}
                    title={video.title}
                    allowFullScreen
                    className="rounded-xl"
                  ></iframe>
                ) : (
                  <p className="text-red-600">❌ Enlace no válido</p>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-200 mt-4">{video.title}</h2>
              <p className="text-gray-400">{video.description}</p>
              <p className="text-gray-500 mt-2">Dificultad: {video.difficulty}</p>

              <button
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
                onClick={() => addToFavorites(video.id)}
                disabled={favorites.includes(video.id)}
              >
                ⭐ {favorites.includes(video.id) ? "Añadido" : "Añadir a favoritos"}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}
