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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [cartId, setCartId] = useState<number | null>(null)
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(error => console.error('Error obteniendo productos:', error))

    fetch('http://localhost:8000/api/carts')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setCartId(data[0].id)
          updateCartState(data[0].id) // Cargar los productos en el carrito correctamente
        } else {
          alert('No hay carritos disponibles')
        }
      })
      .catch(error => console.error('Error obteniendo carritos:', error))
  }, [])

  const updateCartState = (cartId: number) => {
    fetch(`http://localhost:8000/api/carts/${cartId}`)
      .then(res => res.json())
      .then(cartData => {
        if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
          console.error("Formato incorrecto de datos del carrito:", cartData)
          return
        }

        const updatedCartItems = cartData.cart_items.map((item: { product_id: number; quantity: number }) => ({
          productId: item.product_id,
          quantity: item.quantity
        }))
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      })
      .catch(error => console.error('Error actualizando estado del carrito:', error))
  }

  const addToCart = (productId: number) => {
    if (!cartId) {
      alert('No tienes un carrito disponible')
      return
    }

    if (cartItems.some(item => item.productId === productId)) {
      alert('Este producto ya está en el carrito. Usa el botón de + dentro del carrito para aumentar la cantidad.')
      return
    }

    fetch(`http://localhost:8000/api/carts/${cartId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    })
      .then(res => {
        if (res.ok) {
          updateCartState(cartId) // Refresca los datos del carrito tras añadir
        }
      })
      .catch(error => console.error('Error añadiendo producto al carrito:', error))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setFilteredProducts(category ? products.filter(product => product.category === category) : products)
  }

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
        >
          <option value="">Todo</option>
          <option value="ropa">Ropa</option>
          <option value="mesas">Mesas</option>
          <option value="palas">Palas</option>
          <option value="gomas">Gomas</option>
          <option value="extras">Extras</option>
        </select>

        <button
          onClick={() => router.push('/cart')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
        >
          Ir al carrito
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gray-900 transition duration-200">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-200">{product.name}</h2>
            <p className="text-gray-400">Precio: {product.price}€</p>
            
            {cartItems.some(item => item.productId === product.id) ? (
              <p className="mt-2 text-green-500 font-semibold">Añadido</p>
            ) : (
              <button
                className="mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-2xl transition"
                onClick={() => addToCart(product.id)}
              >
                Añadir al carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
