'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: number
  name: string
  image: string
  price: number
  category: string
}

type CartItem = {
  id: number
  product_id: number
  quantity: number
  product: Product
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/carts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCartId(data[0].id) // Tomamos el primer carrito disponible
          return fetch(`http://localhost:8000/api/carts/${data[0].id}`)
        }
        throw new Error('No hay carritos disponibles')
      })
      .then(res => res.json())
      .then(cart => setCartItems(cart.cart_items ?? []))
      .catch(err => {
        console.error('Error obteniendo carrito:', err)
        alert('No se pudo cargar el carrito')
        setCartItems([])
      })
      .finally(() => setLoading(false))
  }, [])

  const updateQuantity = async (productId: number, newQty: number) => {
    if (!cartId) return

    const res = await fetch(`http://localhost:8000/api/carts/${cartId}/update/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty }),
    })

    if (res.ok) {
      setCartItems(items =>
        items.map(item =>
          item.product_id === productId ? { ...item, quantity: newQty } : item
        )
      )
    }
  }

  const removeItem = async (productId: number) => {
    if (!cartId) return

    const res = await fetch(`http://localhost:8000/api/carts/${cartId}/remove/${productId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setCartItems(items => items.filter(item => item.product_id !== productId))
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Tu carrito</h1>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-md flex flex-col items-center bg-white transition duration-200"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{item.product?.name}</h2>
              <p className="text-gray-700">Precio: {item.product?.price}€</p>
              <p className="text-gray-600">Cantidad: {item.quantity}</p>
              
              {/* Botones para modificar cantidad y eliminar */}
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.product_id, item.quantity - 1)
                      : null
                  }
                >
                  -
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => removeItem(item.product_id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
