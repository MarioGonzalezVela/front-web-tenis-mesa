'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  description: string;
  category: string;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:8000/api/products/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(error => console.error('Error obteniendo producto:', error));

    fetch(`http://localhost:8000/api/carts`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0 && data[0].id) {
          setCartId(data[0].id);
          updateCartState(data[0].id);
        } else {
          console.error('No hay carritos disponibles.');
        }
      })
      .catch(error => console.error('Error obteniendo carritos:', error));
  }, [productId]);

  const updateCartState = (cartId: number) => {
    if (!cartId) return;

    fetch(`http://localhost:8000/api/carts/${cartId}`)
      .then(res => res.json())
      .then(cartData => {
        if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
          console.error("Formato incorrecto de datos del carrito:", cartData);
          return;
        }

        const updatedCartItems = cartData.cart_items.map((item: { product_id: number; quantity: number }) => ({
          productId: item.product_id,
          quantity: item.quantity
        }));
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      })
      .catch(error => console.error('Error actualizando estado del carrito:', error));
  };

  const addToCart = (productId: number) => {
    if (!cartId) {
      alert('No tienes un carrito disponible');
      return;
    }

    if (cartItems.some(item => item.productId === productId)) {
      alert('Este producto ya está en el carrito. Usa el botón de + dentro del carrito para aumentar la cantidad.');
      return;
    }

    fetch(`http://localhost:8000/api/carts/${cartId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    })
      .then(res => {
        if (res.ok) {
          updateCartState(cartId);
        }
      })
      .catch(error => console.error('Error añadiendo producto al carrito:', error));
  };

  if (!product) return <p className="text-center mt-20 text-gray-400">Cargando producto...</p>;

  return (
    <div className="max-w-7xl mx-auto bg-black bg-opacity-90 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/store')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
        >
          ⬅ Volver a la tienda
        </button>

        <button
          onClick={() => router.push('/cart')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition"
        >
          🛒 Ir al carrito
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full sm:max-w-xs h-auto aspect-auto object-contain rounded-xl shadow-lg"
        />

        <div className="text-gray-300 text-left">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-400 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-200 mb-4">{product.price}€</p>
          <p className="text-sm text-gray-400 mb-4">Stock disponible: {product.stock}</p>

          {cartItems.some(item => item.productId === product.id) ? (
            <p className="mt-3 text-green-500 font-semibold">Añadido</p>
          ) : (
            <button
              className="mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-2xl transition w-full sm:w-auto"
              onClick={() => addToCart(product.id)}
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
