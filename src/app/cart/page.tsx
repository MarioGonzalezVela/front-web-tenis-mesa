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

  return (
    <div className="max-w-screen-lg mx-auto bg-black bg-opacity-90 p-4 sm:p-6 rounded-2xl shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-6">Tu carrito 🛒</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold border border-gray-600 transition w-full sm:w-auto"
          onClick={() => router.push('/store')}
        >
          🔄 Volver a la tienda
        </button>
      </div>
    </div>
  );
}
