'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="shadow-md sticky top-0 z-50 border-b bg-black text-white border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => handleNav('/')} className="text-2xl font-bold hover:text-gray-500 transition">
          Ping Pong World 🏓
        </button>

        {/* Botón hamburguesa en móvil */}
        <button 
          className="md:hidden text-3xl hover:text-gray-400 transition" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Escritorio */}
        <nav className="hidden md:flex gap-6 font-medium">
          {!isAuthenticated ? (
            <>
              <button onClick={() => handleNav('/login')} className="px-4 py-2 hover:text-gray-500 transition">Login</button>
              <button onClick={() => handleNav('/register')} className="px-4 py-2 hover:text-gray-500 transition">Registro</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('/store')} className={`px-5 py-2 ${pathname === '/store' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Tienda</button>
              <button onClick={() => handleNav('/history')} className={`px-5 py-2 ${pathname === '/history' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Historia</button>
              <button onClick={() => handleNav('/video')} className={`px-5 py-2 ${pathname === '/video' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Vídeos</button>
              <button onClick={() => handleNav('/location')} className={`px-5 py-2 ${pathname === '/location' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Locales</button>
              <button onClick={() => handleNav('/contact')} className={`px-5 py-2 ${pathname === '/contact' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Contacto</button>
              <button onClick={() => handleNav('/profile')} className={`px-5 py-2 ${pathname === '/profile' ? 'font-bold border-b-2 border-gray-500' : 'hover:text-gray-500'}`}>Perfil</button>
              <button onClick={handleLogout} className="px-4 py-2 hover:text-red-500 transition">Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>

      {/* Móvil */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center border-t border-gray-700 py-4">
          {!isAuthenticated ? (
            <>
              <button onClick={() => handleNav('/login')} className="py-2 hover:text-gray-500 transition">Login</button>
              <button onClick={() => handleNav('/register')} className="py-2 hover:text-gray-500 transition">Registro</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('/store')} className="py-2 hover:text-gray-500 transition">Tienda</button>
              <button onClick={() => handleNav('/history')} className="py-2 hover:text-gray-500 transition">Historia</button>
              <button onClick={() => handleNav('/video')} className="py-2 hover:text-gray-500 transition">Vídeos</button>
              <button onClick={() => handleNav('/location')} className="py-2 hover:text-gray-500 transition">Locales</button>
              <button onClick={() => handleNav('/contact')} className="py-2 hover:text-gray-500 transition">Contacto</button>
              <button onClick={() => handleNav('/profile')} className="py-2 hover:text-gray-500 transition">Perfil</button>
              <button onClick={handleLogout} className="py-2 hover:text-red-500 transition">Cerrar sesión</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
