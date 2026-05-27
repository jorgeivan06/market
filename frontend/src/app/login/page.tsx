'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      login(data);
      router.push('/'); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 py-32 md:py-20 bg-stone-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
        <div className="p-8 md:p-12">
          <div className="text-center mb-8 md:mb-10">
            <img src="/logo-final.png" alt="Logo" className="h-16 md:h-20 mx-auto mb-6 object-contain" />
            <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter leading-tight">Bienvenido de nuevo</h1>
            <p className="text-stone-500 font-medium text-sm md:text-base mt-2">Ingresa a la comunidad Ansesstral</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-6 text-xs md:text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-2 ml-4">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-stone-800 text-sm md:text-base"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-2 ml-4">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-stone-800 text-sm md:text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-amber-600 transition-all shadow-xl transform active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Iniciando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 md:mt-10 text-center">
            <p className="text-stone-500 text-xs md:text-sm font-medium">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-amber-600 font-black hover:underline">Regístrate aquí</Link>
            </p>
          </div>
        </div>
        
        <div className="bg-amber-50 p-6 text-center border-t border-amber-100">
           <p className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] text-amber-800">
             Protegiendo la herencia Zenú
           </p>
        </div>
      </div>
    </div>
  );
}
