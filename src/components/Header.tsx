'use client';

import { usePathname, useRouter } from 'next/navigation'; 
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-black bg-opacity-80 shadow-md sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => handleNav('/')} className="text-2xl font-bold text-gray-300 hover:text-white transition duration-200">
          Ping Pong World 🏓
        </button>

        <nav className="hidden md:flex gap-6 text-gray-300 font-medium">
          {!isAuthenticated ? (
            <>
              <button onClick={() => handleNav('/login')} className="px-4 py-2 hover:text-white transition duration-200">Login</button>
              <button onClick={() => handleNav('/register')} className="px-4 py-2 hover:text-white transition duration-200">Registro</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('/store')} className={`px-5 py-2 transition duration-200 ${pathname === '/store' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Tienda</button>
              <button onClick={() => handleNav('/history')} className={`px-5 py-2 transition duration-200 ${pathname === '/history' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Historia</button>
              <button onClick={() => handleNav('/video')} className={`px-5 py-2 transition duration-200 ${pathname === '/video' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Vídeos</button>
              <button onClick={() => handleNav('/location')} className={`px-5 py-2 transition duration-200 ${pathname === '/location' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Locales</button>
              <button onClick={() => handleNav('/contact')} className={`px-5 py-2 transition duration-200 ${pathname === '/contact' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Contacto</button>
              <button onClick={() => handleNav('/profile')} className={`px-5 py-2 transition duration-200 ${pathname === '/profile' ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-white'}`}>Perfil</button>
              <button onClick={handleLogout} className="px-4 py-2 text-gray-300 hover:text-red-500 transition duration-200">Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
