'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
          
          {/* Header */}
          <div className="px-6 md:px-8 py-8 md:py-10 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter">Mi Carrito</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-stone-100 flex items-center justify-center text-xl hover:bg-stone-900 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <span className="text-6xl mb-6 grayscale">🛍️</span>
                <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-6">Tu carrito está vacío</p>
                <Link 
                  href="/productos" 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
                >
                  Explorar Herencia
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6 group">
                  <div className="h-24 w-20 md:h-28 md:w-24 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-1 md:mb-2 gap-2">
                      <h3 className="font-black text-stone-900 tracking-tight leading-tight text-sm md:text-base truncate">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-red-600 text-sm flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-amber-600 font-black text-sm mb-3 md:mb-4">${item.price.toLocaleString('es-CO')}</p>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex items-center border border-stone-100 rounded-xl px-2 py-1 bg-stone-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 font-bold hover:text-amber-600 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 font-bold hover:text-amber-600 flex items-center justify-center"
                          >
                            +
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 md:p-8 bg-stone-50 border-t border-stone-100 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Total a Pagar</span>
                <span className="text-2xl md:text-3xl font-black text-stone-900">${totalPrice.toLocaleString('es-CO')}</span>
              </div>
              <Link 
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-stone-900 text-white py-5 md:py-6 rounded-[2rem] font-black text-lg md:text-xl hover:bg-amber-600 transition-all shadow-2xl transform active:scale-95 flex items-center justify-center gap-3"
              >
                Finalizar Compra
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <p className="text-[10px] text-center text-stone-400 font-bold uppercase tracking-widest">
                Seguridad Ansesstral Protegida
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
