'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      login(data.access_token);
      setMessage('¡Login exitoso! Redirigiendo...');
      router.push('/store');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4 sm:px-0">
      <div className="w-full max-w-screen-sm sm:max-w-md p-4 sm:p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-200">Inicia Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 text-lg sm:text-xl rounded-xl hover:bg-gray-700 transition"
          >
            Entrar
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-500 text-sm sm:text-base">{message}</p>
        )}
      </div>
    </div>
  );
}
