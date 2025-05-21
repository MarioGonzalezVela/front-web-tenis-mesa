'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      setMessage('Registrado con éxito!');
      setForm({ name: '', email: '', password: '' });
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
      <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-7 text-center text-gray-200">¡Regístrate!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mb-6 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-6 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-6 border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Registrarse
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
