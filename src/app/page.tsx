'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 py-10 px-4">
      <div className="max-w-screen-lg w-full h-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-200">Bienvenido a la web de tenis de mesa 🏓</h1>

        <Image 
          src="/HomeImage.jpg" 
          alt="Tenis de mesa en acción"
          width={700} 
          height={400} 
          className="rounded-xl mx-auto w-full max-w-md sm:max-w-lg"
        />

        <p className="mt-6 text-gray-400 text-md sm:text-lg">
          Explora la mejor tienda de tenis de mesa, descubre vídeos de entrenamiento y forma parte de nuestra comunidad.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-600 transition"
            onClick={() => router.push('/store')}
          >
            🏪 Ir a la tienda
          </button>

          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-600 transition"
            onClick={() => router.push('/video')}
          >
            🎥 Ver vídeos
          </button>

          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-600 transition"
            onClick={() => router.push('/location')}
          >
            📍 Encontrar locales
          </button>
        </div>
      </div>
    </div>
  );
}
