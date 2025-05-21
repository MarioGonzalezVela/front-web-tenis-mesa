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
          setCartId(data[0].id)
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
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-10 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">Tu carrito</h1>

      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-200">{item.product?.name}</h2>
              <p className="text-gray-400">Precio: {item.product?.price}€</p>
              <p className="text-gray-400">Cantidad: {item.quantity}</p>
              
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-2 rounded-lg hover:from-green-400 hover:to-green-600 transition"
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                >
                  ➕
                </button>
                <button
                  className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-3 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-600 transition"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.product_id, item.quantity - 1)
                      : null
                  }
                >
                  ➖
                </button>
                <button
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-2 rounded-lg hover:from-red-500 hover:to-red-700 transition"
                  onClick={() => removeItem(item.product_id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
