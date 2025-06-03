'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
      <div className="w-full max-w-xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-200">Bienvenido a la web de tenis de mesa 🏓</h1>

        <Image 
          src="/images/tenis-mesa.jpg" 
          alt="Tenis de mesa en acción"
          width={500} 
          height={300} 
          className="rounded-xl mx-auto"
        />

        <p className="mt-4 text-gray-400">
          Explora la mejor tienda de tenis de mesa, descubre vídeos de entrenamiento y forma parte de nuestra comunidad.
        </p>

        <div className="mt-6 space-x-4">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold border border-gray-600 transition"
            onClick={() => router.push('/store')}
          >
            🏪 Ir a la tienda
          </button>

          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold border border-gray-600 transition"
            onClick={() => router.push('/videos')}
          >
            🎥 Ver vídeos
          </button>
        </div>

        <p className="mt-6 text-gray-500 italic">"El tenis de mesa es más que un deporte, es estrategia y velocidad." 🏓</p>
      </div>
    </div>
  );
}
