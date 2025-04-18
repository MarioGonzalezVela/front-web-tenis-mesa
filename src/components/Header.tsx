'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Tenis de Mesa 🏓
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <Link href="/login" className="hover:text-blue-600">Login</Link>
          <Link href="/register" className="hover:text-blue-600">Registro</Link>
          <Link href="../blog" className="hover:text-blue-600">Blog</Link>
          <Link href="../video" className="hover:text-blue-600">Vídeos</Link>
          <Link href="../location" className="hover:text-blue-600">Locales</Link>
          <Link href="../store" className="hover:text-blue-600">Tienda</Link>
          <Link href="../contact" className="hover:text-blue-600">Contacto</Link>
        </nav>

        {/* Móvil (placeholder por ahora) */}
        <div className="md:hidden text-sm text-gray-500">
          Menú
        </div>
      </div>
    </header>
  )
}
