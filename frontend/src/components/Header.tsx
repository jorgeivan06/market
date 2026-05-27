'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled 
          ? 'py-2 bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-stone-100' 
          : 'py-4 bg-white/20 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Container */}
        <Link href="/" className="relative flex items-center group">
          <div className={`transition-all duration-700 ease-in-out ${isScrolled ? 'h-10 md:h-14' : 'h-16 md:h-28'} flex items-center`}>
            <img 
              src="/logo-final.png" 
              alt="Ansesstral Logo" 
              className="h-full w-auto object-contain transition-all group-hover:scale-105" 
            />
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-12">
            {['Inicio', 'Productos', 'Nosotros'].map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} 
                  className={`text-[10px] xl:text-[11px] uppercase tracking-[0.3em] font-black transition-all hover:text-amber-600 ${
                    isScrolled ? 'text-stone-500' : 'text-stone-800'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
            
            {/* Cart Icon */}
            <li>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 transition-all hover:scale-110 group"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" 
                  alt="Carrito" 
                  className="h-7 w-7 transition-all brightness-0" 
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>

            {user ? (
              <div className="flex items-center gap-4 xl:gap-6 pl-6 border-l border-stone-200">
                <Link 
                  href="/dashboard" 
                  className={`text-[10px] xl:text-[11px] uppercase tracking-[0.3em] font-black transition-all hover:text-amber-600 ${
                    isScrolled ? 'text-stone-500' : 'text-stone-800'
                  }`}
                >
                  Panel
                </Link>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black uppercase text-amber-600 tracking-widest leading-none mb-1">{user.role === 'SELLER' ? 'Artesano' : 'Comprador'}</span>
                  <span className="text-[11px] font-bold text-stone-900">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-stone-900 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
                >
                  Salir
                </button>
              </div>
            ) : (
              <li>
                <Link 
                  href="/login" 
                  className="px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-xl hover:bg-amber-600"
                >
                  Ingresar
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Actions Container */}
        <div className="flex items-center gap-2 md:gap-4 lg:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
          >
             <img 
               src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" 
               alt="Carrito" 
               className="h-6 w-6 brightness-0" 
             />
             {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
             )}
          </button>
          
          <button 
            className={`p-2.5 rounded-xl transition-colors ${isScrolled ? 'bg-stone-100 text-stone-900' : 'bg-white/30 text-stone-900 backdrop-blur-md'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-stone-100 animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[80vh]">
          <ul className="flex flex-col p-6 gap-4 text-center">
            {['Inicio', 'Productos', 'Nosotros'].map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-lg font-black text-stone-800 hover:text-amber-600 uppercase tracking-widest"
                >
                  {item}
                </Link>
              </li>
            ))}
            
            {user ? (
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="flex flex-col items-center">
                   <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">{user.role}</p>
                   <p className="text-base font-bold text-stone-900">{user.name}</p>
                </div>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-stone-100 text-stone-900 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest"
                >
                  Ir al Panel
                </Link>
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <li className="pt-4 border-t border-stone-100">
                <Link 
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-amber-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg"
                >
                  Ingresar a Ansesstral
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
