'use client'

import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tenis de Mesa 🏓
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
          <Link href="/">Inicio</Link>
          {/* Si el usuario está no logueado */}
          {!isAuthenticated ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Registro</Link>
            </>
            // Una vez logueado
          ) : (
            <>
              <Link href="/store">Tienda</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/video">Vídeos</Link>
              <Link href="/location">Locales</Link>
              <Link href="/contact">Contacto</Link>
              <Link href="/profile">Perfil</Link>
              <button onClick={logout} className="hover:bg-red-600 bg-red-500 p-2 rounded-lg text-white font-bold">
                Cerrar sesión
              </button>
            </>
          )}
        </nav>

        <div className="md:hidden text-sm text-gray-500">Menú</div>
      </div>
    </header>
  )
}

