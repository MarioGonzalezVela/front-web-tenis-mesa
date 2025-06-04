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

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartId, setCartId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error obteniendo productos:', error));
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto bg-black bg-opacity-90 p-4 sm:p-6 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition w-full sm:w-auto"
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
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl transition w-full sm:w-auto"
        >
          🛒 Ir al carrito
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 m-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-700 rounded-2xl p-4 m-4 bg-gray-900 shadow-lg hover:shadow-xl transition">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto aspect-square object-cover rounded-xl mb-4" 
            />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-200 m-4">{product.name}</h2>
            <p className="text-gray-400 text-sm sm:text-base m-4">Precio: {product.price}€</p>

            <button
              className="mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-2xl transition w-full sm:w-auto"
            >
              🛒 Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
