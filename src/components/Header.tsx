'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname() // Detecta la ruta actual

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/store' },
    { name: 'Blog', path: '/blog' },
    { name: 'Vídeos', path: '/video' },
    { name: 'Locales', path: '/location' },
    { name: 'Contacto', path: '/contact' },
    { name: 'Perfil', path: '/profile' },
  ]

  return (
    <header className="bg-black bg-opacity-80 shadow-md sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-300 hover:text-gray-100 transition">
          Tenis de Mesa 🏓
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-300 font-medium">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="px-4 py-2 hover:text-gray-100 transition">Login</Link>
              <Link href="/register" className="px-4 py-2 hover:text-gray-100 transition">Registro</Link>
            </>
          ) : (
            <>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-5 py-2 transition ${
                    pathname === link.path ? 'text-white font-bold border-b-2 border-gray-500' : 'hover:text-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={logout}
                className="px-4 py-2 text-gray-300 hover:text-red-500 transition"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
