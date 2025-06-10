'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/carts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCartId(data[0].id);
          return fetch(`http://localhost:8000/api/carts/${data[0].id}`);
        }
        throw new Error('No hay carritos disponibles');
      })
      .then(res => res.json())
      .then(cart => setCartItems(cart.cart_items ?? []))
      .catch(err => {
        console.error('Error obteniendo carrito:', err);
        alert('No se pudo cargar el carrito');
        setCartItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateQuantity = async (productId: number, newQty: number) => {
    if (!cartId) return;

    const res = await fetch(`http://localhost:8000/api/carts/${cartId}/update/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty }),
    });

    if (res.ok) {
      setCartItems(items =>
        items.map(item =>
          item.product_id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeItem = async (productId: number) => {
    if (!cartId) return;

    const res = await fetch(`http://localhost:8000/api/carts/${cartId}/remove/${productId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCartItems(items => items.filter(item => item.product_id !== productId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-10 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/store')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
        >
          ⬅ Volver a la tienda
        </button>
      </div>

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
              <div className="flex justify-center items-center w-full h-40 mb-5">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="max-w-full max-h-full aspect-auto object-contain rounded-xl"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-200">{item.product?.name}</h2>
              <p className="text-gray-400">Precio: {item.product?.price}€</p>
              <p className="text-gray-400">Cantidad: {item.quantity}</p>
              
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                >
                  ➕
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.product_id, item.quantity - 1)
                      : null
                  }
                >
                  ➖
                </button>
                <button
                  className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-800"
                  onClick={() => removeItem(item.product_id)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
