'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{ backgroundImage: "url('/backgroundImage.jpg')" }}
    >
      <div className="max-w-screen-md w-full text-center p-6 rounded-xl">
        <h1 className="text-3xl bg-black rounded-2xl p-6 sm:text-4xl font-bold mb-6 text-white border border-gray-500">¡Bienvenido a la web de tenis de mesa!</h1>
      </div>

      <div className="mt-auto mb-10 flex flex-wrap justify-center gap-4">
        <button
          className="bg-black hover:bg-gray-800 text-white px-6 mb-16 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-500 transition"
          onClick={() => router.push('/store')}
        >
          🏪 Consultar tienda
        </button>

        <button
          className="bg-black hover:bg-gray-800 text-white px-6 mb-16 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-500 transition"
          onClick={() => router.push('/video')}
        >
          🎥 Ver vídeos
        </button>

        <button
          className="bg-black hover:bg-gray-800 text-white px-6 mb-16 sm:px-8 sm:py-4 rounded-2xl text-lg sm:text-xl font-semibold border border-gray-500 transition"
          onClick={() => router.push('/location')}
        >
          📍 Encontrar locales
        </button>
      </div>
    </div>
  );
}
