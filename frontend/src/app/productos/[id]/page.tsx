'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ReviewsSection from '@/components/ReviewsSection';

interface ProductImage {
  url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  culturalHistory: string;
  price: number;
  category: string;
  material: string;
  technique: string;
  stock: number;
  images: ProductImage[];
  user: {
    name: string;
    bio: string;
    location: string;
    community: string;
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-24 md:p-44 text-center font-black uppercase tracking-widest text-stone-400 animate-pulse">Cargando herencia...</div>;
  if (!product) return <div className="p-24 md:p-44 text-center font-bold">Producto no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        
        {/* Gallery Section */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="aspect-square rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-stone-50 border border-stone-100 shadow-xl md:shadow-2xl">
            <img 
              src={product.images[activeImage]?.url} 
              alt={product.name} 
              className="w-full h-full object-contain p-6 md:p-10 transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 transition-all ${activeImage === idx ? 'border-amber-600 scale-105 shadow-lg' : 'border-transparent opacity-60'}`}
              >
                <img src={img.url} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 mb-4">
               <span className="text-amber-600 font-black uppercase text-[8px] md:text-[10px] bg-amber-50 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-amber-100 tracking-widest">{product.category}</span>
               <span className="text-stone-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest">{product.technique}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-4 tracking-tighter leading-tight">{product.name}</h1>
            <p className="text-4xl md:text-5xl font-black text-amber-600">${product.price.toLocaleString('es-CO')}</p>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="text-center md:text-left px-2">
              <h3 className="font-black text-stone-900 uppercase text-[9px] md:text-[10px] mb-3 tracking-widest">Sobre esta pieza</h3>
              <p className="text-stone-500 leading-relaxed text-base md:text-lg italic font-medium">"{product.description}"</p>
            </div>

            <div className="bg-stone-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-black text-amber-400 uppercase text-[9px] md:text-[10px] mb-4 flex items-center justify-center md:justify-start gap-2 tracking-widest">
                  <span>✨</span> Legado Cultural
                </h3>
                <p className="text-stone-300 leading-relaxed font-medium text-sm md:text-base text-center md:text-left">{product.culturalHistory}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-stone-100 shadow-sm text-center md:text-left">
                <span className="block text-[8px] md:text-[10px] uppercase font-black text-stone-400 mb-1 tracking-widest">Material</span>
                <span className="font-bold text-stone-900 text-sm md:text-base">{product.material}</span>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-stone-100 shadow-sm text-center md:text-left">
                <span className="block text-[8px] md:text-[10px] uppercase font-black text-stone-400 mb-1 tracking-widest">Estado</span>
                <span className="font-bold text-green-600 text-sm md:text-base">{product.stock} disponibles</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="group bg-stone-900 text-white py-6 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-xl md:text-2xl hover:bg-amber-600 transition-all shadow-2xl mb-8 md:mb-12 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
          >
            Añadir al Carrito
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 118 0m-4 4v2m0 0l-1.5 1.5M16 11l-1.5-1.5M3 5h4M3 5l1.5 13A2 2 0 006.5 20h11a2 2 0 002-1.8L21 5H3z" />
            </svg>
          </button>

          {/* Artisan Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-stone-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 text-center md:text-left">
              <div className="h-16 w-16 md:h-20 md:w-20 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-xl">
                {product.user.name.charAt(0)}
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Maestro Artesano</p>
                <h4 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight leading-tight">{product.user.name}</h4>
                <p className="text-xs md:text-sm text-amber-600 font-bold uppercase tracking-widest">{product.user.community} • {product.user.location}</p>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed border-t border-stone-50 pt-6 font-medium italic text-center md:text-left">"{product.user.bio}"</p>
          </div>
        </div>
      </div>

      <ReviewsSection productId={Number(id)} />
    </div>
  );
}
