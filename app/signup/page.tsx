'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Signing up...');
    try {
      const res = await axios.post('/api/signup', form);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input type="text" name="username" placeholder="Username" className="w-full p-2 border" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  );
}
