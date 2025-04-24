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

    // Conexión con la API 

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-gray-50 border rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-7 text-center">¡Regístrate!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mb-6 border rounded-lg bg-white hover:border-cyan-800 shadow-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-6 border rounded-lg bg-white hover:border-cyan-800 shadow-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-6 border rounded-lg bg-white hover:border-cyan-800 shadow-md"
          />
          <button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900"
          >
            Registrarse
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
