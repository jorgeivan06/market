'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface ProductImage {
  url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: ProductImage[];
  user: {
    name: string;
    location: string;
  };
}

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState(2000000);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      params.append('maxPrice', priceRange.toString());

      const res = await fetch(`http://localhost:3001/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, category, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      
      {/* Search & Filter Header */}
      <div className="mb-12 md:mb-20 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 md:gap-12 text-center lg:text-left">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-4 md:mb-6 tracking-tighter">Catálogo de Herencia</h1>
          <p className="text-stone-500 text-lg md:text-xl font-medium leading-relaxed mb-8 md:mb-10">
            Piezas maestras que cuentan la historia de un pueblo.
          </p>
          
          <div className="relative group max-w-lg mx-auto lg:mx-0">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-stone-400 group-focus-within:text-amber-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Buscar artesanía..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 bg-white border border-stone-100 rounded-full md:rounded-[2.5rem] shadow-sm outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold text-stone-800 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Categories Quick Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {['', 'Sombreros', 'Bolsos', 'Accesorios', 'Hogar', 'Moda'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transition-all ${category === cat ? 'bg-amber-600 text-white shadow-xl scale-105' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
            >
              {cat === '' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-16">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-8 md:space-y-12">
           <div className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-stone-100">
              <h3 className="text-sm font-black text-stone-900 mb-6 md:mb-8 tracking-tighter uppercase tracking-widest">Presupuesto</h3>
              <input 
                type="range" 
                min="10000" 
                max="2000000" 
                step="50000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-600 mb-4"
              />
              <div className="flex justify-between items-center">
                 <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Máximo:</span>
                 <span className="text-lg md:text-xl font-black text-amber-600">${priceRange.toLocaleString('es-CO')}</span>
              </div>
           </div>

           <div className="hidden lg:block bg-stone-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-amber-400 font-black uppercase tracking-widest text-[10px] mb-4">Autenticidad</h3>
                <p className="text-stone-400 text-sm font-medium leading-relaxed">Solo productos con certificación de origen de la comunidad Zenú.</p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full" />
           </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center text-center animate-pulse">
               <div className="h-10 w-10 md:h-12 md:w-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-6" />
               <p className="text-stone-400 font-black uppercase text-[10px] md:text-xs tracking-widest">Buscando en el territorio...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="h-96 bg-white rounded-[2rem] md:rounded-[3rem] border border-stone-100 flex flex-col items-center justify-center text-center p-8 md:p-12">
               <span className="text-5xl md:text-6xl mb-6">🛖</span>
               <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-2">No encontramos esa pieza</h3>
               <p className="text-stone-400 font-medium max-w-xs text-sm md:text-base">Prueba ajustando los filtros o buscando otra palabra clave.</p>
               <button onClick={() => {setSearch(''); setCategory(''); setPriceRange(2000000);}} className="mt-8 text-amber-600 font-black border-b-2 border-amber-600 pb-1 text-sm">Limpiar todo</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col gap-4 md:gap-6 animate-in fade-in duration-700">
                  <Link 
                    href={`/productos/${product.id}`}
                    className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-stone-100 bg-stone-50"
                  >
                    <img 
                      src={product.images[0]?.url || 'https://via.placeholder.com/600'} 
                      alt={product.name}
                      className="w-full h-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/90 backdrop-blur-md px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-amber-700 shadow-sm">
                      {product.category}
                    </div>
                  </Link>
                  
                  <div className="px-2">
                    <Link href={`/productos/${product.id}`}>
                      <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-1 md:mb-2 hover:text-amber-600 transition-colors leading-tight truncate">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center mt-3 md:mt-4">
                      <p className="text-xl md:text-2xl font-black text-stone-900">
                        ${product.price.toLocaleString('es-CO')}
                      </p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-stone-900 text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-amber-600 transition-all transform active:scale-90 shadow-lg flex items-center gap-2 group/btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Añadir</span>
                      </button>
                    </div>
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-stone-50 flex items-center gap-3">
                      <div className="h-7 w-7 md:h-8 md:w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-[9px] md:text-[10px] font-black shadow-inner">
                        {product.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[9px] md:text-[10px] text-stone-400 uppercase font-black tracking-widest leading-none mb-1">Artesano</p>
                        <p className="text-xs font-bold text-stone-800 truncate max-w-[120px] md:max-w-none">{product.user.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
