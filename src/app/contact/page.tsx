'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('✅ ¡Mensaje enviado correctamente!');

    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setStatusMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4 sm:px-0">
      <div className="w-full max-w-screen-sm sm:max-w-md p-4 sm:p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-200">¡Contáctanos!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition resize-none h-24"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 text-lg sm:text-xl rounded-xl hover:bg-gray-700 transition"
          >
            Enviar
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-green-500 text-sm sm:text-base">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
