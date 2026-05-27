'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'BUYER', 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrarse');
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
      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col md:flex-row">
        {/* Left Side - Info */}
        <div className="md:w-5/12 bg-stone-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden text-center md:text-left">
          <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1590611380053-1fd423f322bb?q=80&w=1000" className="w-full h-full object-cover" alt="Zenú" />
          </div>
          <div className="relative z-10">
            <img src="/logo-final.png" alt="Logo" className="h-14 md:h-16 mx-auto md:mx-0 brightness-200 grayscale mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 leading-tight">Únete a la Herencia</h2>
            <p className="text-stone-400 font-medium leading-relaxed text-sm md:text-base">
              Sé parte de la comunidad que preserva el arte milenario del Sinú.
            </p>
          </div>
          <div className="relative z-10 mt-8 md:mt-12 hidden md:block">
            <div className="flex gap-4 items-center mb-4 md:mb-6">
               <div className="h-1 w-8 bg-amber-500 rounded-full" />
               <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-amber-500">Misión Zenú</p>
            </div>
            <p className="text-xs italic text-stone-500">"Cada compra es un hilo más en nuestra historia."</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-8 md:p-12">
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter leading-tight">Crea tu cuenta</h1>
            <p className="text-stone-500 font-medium text-sm md:text-base">Elige tu rol en el marketplace</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-6 text-xs md:text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
               <button 
                 type="button"
                 onClick={() => setFormData({...formData, role: 'BUYER'})}
                 className={`py-3 md:py-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center gap-1 md:gap-2 ${formData.role === 'BUYER' ? 'border-amber-600 bg-amber-50' : 'border-stone-100 hover:border-amber-200'}`}
               >
                 <span className="text-xl md:text-2xl">🛍️</span>
                 <span className={`text-[8px] md:text-[9px] uppercase font-black tracking-widest ${formData.role === 'BUYER' ? 'text-amber-800' : 'text-stone-400'}`}>Comprador</span>
               </button>
               <button 
                 type="button"
                 onClick={() => setFormData({...formData, role: 'SELLER'})}
                 className={`py-3 md:py-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center gap-1 md:gap-2 ${formData.role === 'SELLER' ? 'border-amber-600 bg-amber-50' : 'border-stone-100 hover:border-amber-200'}`}
               >
                 <span className="text-xl md:text-2xl">🎨</span>
                 <span className={`text-[8px] md:text-[9px] uppercase font-black tracking-widest ${formData.role === 'SELLER' ? 'text-amber-800' : 'text-stone-400'}`}>Artesano</span>
               </button>
            </div>

            <div className="space-y-3 md:space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1 md:mb-2 ml-4">Nombre Completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 md:px-6 py-3 md:py-4 bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1 md:mb-2 ml-4">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 md:px-6 py-3 md:py-4 bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1 md:mb-2 ml-4">Contraseña</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-5 md:px-6 py-3 md:py-4 bg-stone-50 border border-stone-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-amber-600 transition-all shadow-xl transform active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Comenzar ahora'}
            </button>
          </form>

          <div className="mt-8 md:mt-10 text-center">
            <p className="text-stone-500 text-xs md:text-sm font-medium">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-amber-600 font-black hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
