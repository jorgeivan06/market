'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function NuevoProductoPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    culturalHistory: '',
    price: 0,
    category: 'Sombreros',
    material: 'Caña Flecha',
    technique: '',
    stock: 1,
    imageUrl: '', 
  });

  if (!authLoading && (!user || user.role === 'BUYER')) {
    router.push('/dashboard');
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/uploads/image', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (!res.ok) throw new Error('Error al subir imagen');
      
      const result = await res.json();
      setFormData({ ...formData, imageUrl: result.url });
    } catch (err) {
      setError('No se pudo subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setError('Debes subir una imagen para el producto');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          images: [formData.imageUrl],
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al crear producto');
      }

      router.push('/productos'); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <div className="mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <Link href="/dashboard" className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-stone-900 hover:text-white transition-all text-xl font-bold">
           ←
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tighter">Publicar Obra Zenú</h1>
          <p className="text-stone-500 font-medium">Comparte tu herencia cultural con el mundo.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-stone-100 p-8 md:p-12">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          
          {/* Image Upload Area */}
          <div className="space-y-4">
            <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Imagen del Producto</label>
            <div className="relative group">
               <div className={`w-full h-48 md:h-64 border-4 border-dashed rounded-[2rem] md:rounded-[2.5rem] transition-all flex flex-col items-center justify-center overflow-hidden ${formData.imageUrl ? 'border-amber-600 bg-amber-50' : 'border-stone-100 bg-stone-50 hover:border-amber-200'}`}>
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="w-full h-full object-contain p-4" alt="Preview" />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">{uploading ? '⏳' : '📷'}</span>
                      <p className="text-xs md:text-sm font-bold text-stone-400">{uploading ? 'Subiendo...' : 'Haz clic para seleccionar foto'}</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
               </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Nombre del Producto</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold"
                placeholder="Ej: Sombrero Vueltiao 19 Vueltas"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Categoría</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold appearance-none"
              >
                <option>Sombreros</option>
                <option>Bolsos</option>
                <option>Accesorios</option>
                <option>Hogar</option>
                <option>Moda</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Descripción Comercial</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
              placeholder="Describe las características físicas y el uso del producto..."
            />
          </div>

          <div className="bg-amber-50/50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-amber-100 space-y-4">
            <label className="block text-[10px] uppercase font-black text-amber-600 ml-4 tracking-[0.2em]">Historia y Significado Cultural</label>
            <textarea 
              rows={4}
              value={formData.culturalHistory}
              onChange={(e) => setFormData({...formData, culturalHistory: e.target.value})}
              className="w-full px-6 md:px-8 py-4 md:py-5 bg-white border border-amber-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-medium italic"
              placeholder="¿Qué representan los tejidos? ¿Cuál es el origen ancestral de esta pieza?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Precio (COP)</label>
              <input 
                type="number" 
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Stock</label>
              <input 
                type="number" 
                required
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] uppercase font-black text-stone-400 ml-4 tracking-[0.2em]">Técnica</label>
              <input 
                type="text" 
                value={formData.technique}
                onChange={(e) => setFormData({...formData, technique: e.target.value})}
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold"
                placeholder="Ej: 21 vueltas"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-stone-900 text-white py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-amber-600 transition-all shadow-2xl transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Publicando en el Territorio...' : 'Publicar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
}
