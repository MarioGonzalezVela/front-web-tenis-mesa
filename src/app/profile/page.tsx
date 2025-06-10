'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/cart', {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchUser(), fetchCart()]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-gray-400">Cargando perfil...</p>;
  if (!user) return <p className="text-center mt-20 text-red-600">No se pudo cargar el perfil.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4 sm:px-0">
      <div className="w-full max-w-screen-sm sm:max-w-md p-4 sm:p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl text-center text-gray-300">
        <div className="border-b-2 border-gray-700 pb-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Tu perfil</h1>
          <p className="text-sm sm:text-base mb-2">
            <span className="font-bold">Nombre:</span> {user.name}
          </p>
          <p className="text-sm sm:text-base mb-4">
            <span className="font-bold">Email:</span> {user.email}
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">🛒 Productos en el carrito</h2>
          {cart.length > 0 && (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="text-gray-400 text-sm sm:text-base">
                  🔹 <span className="font-medium">{item.name}</span> – {item.quantity} uds – {item.price}€
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => router.push('/cart')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl mt-4 transition w-full sm:w-auto"
          >
            Ver carrito
          </button>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">⭐ Vídeos Favoritos</h2>
          <button
            onClick={() => router.push('/favoriteVideos')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-2xl mt-4 transition w-full sm:w-auto"
          >
            Ver vídeos favoritos
          </button>
        </div>
      </div>
    </div>
  );
}
