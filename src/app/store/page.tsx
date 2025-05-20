'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = {
  id: number
  name: string
  image: string
  price: number
  category: string
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [cartId, setCartId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Obtener productos (PÚBLICO)
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error obteniendo productos:', error))

    // Obtener carrito sin autenticación (PÚBLICO)
    fetch('http://localhost:8000/api/carts')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setCartId(data[0].id) // Toma el primer carrito disponible
        } else {
          alert('No hay carritos disponibles')
        }
      })
      .catch(error => console.error('Error obteniendo carritos:', error))
  }, [])

  const addToCart = (productId: number) => {
    if (!cartId) {
      alert('No tienes un carrito disponible')
      return
    }

    fetch(`http://localhost:8000/api/carts/${cartId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    })
      .then(res => res.json())
      .then(() => alert('Producto añadido al carrito'))
      .catch(error => console.error('Error añadiendo producto al carrito:', error))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push('/cart')}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Ir al carrito
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Tienda</h1>

      <div className="mb-6 text-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Todo</option>
          <option value="ropa">Ropa</option>
          <option value="mesas">Mesas</option>
          <option value="palas">Palas</option>
          <option value="gomas">Gomas</option>
          <option value="extras">Extras</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-md flex flex-col items-center bg-white transition duration-200">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">Precio: {product.price}€</p>
            <button
              className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
              onClick={() => addToCart(product.id)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
