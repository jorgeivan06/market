'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [nequiPhone, setNequiPhone] = useState('');
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'nequi' && !nequiPhone) {
      alert('Por favor ingresa tu número de Nequi');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...shippingData,
          total: totalPrice,
          paymentMethod,
          nequiPhone,
          items: cart,
        }),
      });

      if (!res.ok) throw new Error('Error al procesar el pedido');

      setTimeout(() => {
        setLoading(false);
        setStep(3);
        clearCart();
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-44 pb-20 text-center px-6">
        <h2 className="text-3xl font-black mb-6">Tu carrito está vacío</h2>
        <Link href="/productos" className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-black inline-block">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
        
        <div className="lg:col-span-2 order-2 lg:order-1">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
               <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 tracking-tighter text-center md:text-left">Finalizar Compra</h1>
               <p className="text-stone-500 mb-10 md:mb-12 font-medium text-center md:text-left">Completa tus datos de envío para recibir tu herencia Zenú.</p>
               
               <form onSubmit={handleNextStep} className="space-y-6 md:space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-stone-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-stone-400 ml-4 tracking-widest">Nombre Completo</label>
                      <input type="text" required value={shippingData.fullName} onChange={(e)=>setShippingData({...shippingData, fullName: e.target.value})} className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-2xl md:rounded-3xl outline-none focus:ring-2 focus:ring-amber-500/20 font-bold" placeholder="Jorge Manjarrez" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-stone-400 ml-4 tracking-widest">Teléfono</label>
                      <input type="tel" required value={shippingData.phone} onChange={(e)=>setShippingData({...shippingData, phone: e.target.value})} className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-2xl md:rounded-3xl outline-none focus:ring-2 focus:ring-amber-500/20 font-bold" placeholder="300 123 4567" />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] uppercase font-black text-stone-400 ml-4 tracking-widest">Dirección de Entrega</label>
                    <input type="text" required value={shippingData.address} onChange={(e)=>setShippingData({...shippingData, address: e.target.value})} className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-2xl md:rounded-3xl outline-none focus:ring-2 focus:ring-amber-500/20 font-bold" placeholder="Calle 123 #45-67" />
                  </div>
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] uppercase font-black text-stone-400 ml-4 tracking-widest">Ciudad / Municipio</label>
                    <input type="text" required value={shippingData.city} onChange={(e)=>setShippingData({...shippingData, city: e.target.value})} className="w-full px-6 md:px-8 py-4 md:py-5 bg-stone-50 border border-stone-100 rounded-2xl md:rounded-3xl outline-none focus:ring-2 focus:ring-amber-500/20 font-bold" placeholder="Montería, Córdoba" />
                  </div>
                  
                  <button type="submit" className="w-full bg-stone-900 text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:bg-amber-600 transition-all shadow-2xl flex items-center justify-center gap-3">
                    Continuar al Pago
                    <span>→</span>
                  </button>
               </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <button onClick={() => setStep(1)} className="mb-6 md:mb-8 text-stone-400 font-bold uppercase text-[10px] flex items-center gap-2 hover:text-stone-900 transition-colors mx-auto md:mx-0">
                  ← Volver a Envío
               </button>
               <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 tracking-tighter text-center md:text-left">Método de Pago</h1>
               <p className="text-stone-500 mb-10 md:mb-12 font-medium text-center md:text-left">Selecciona tu forma de pago preferida.</p>
               
               <div className="space-y-4 md:space-y-6 text-left">
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-4 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-50/50' : 'border-stone-100 bg-white hover:border-amber-200'}`}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-3xl md:text-4xl">💳</span>
                      <div>
                        <h4 className="font-black text-stone-900 text-sm md:text-base">Tarjeta de Crédito</h4>
                        <p className="text-stone-400 text-[10px] md:text-sm font-medium">Visa, Mastercard</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 md:h-6 md:w-6 rounded-full border-4 ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-600' : 'border-stone-200'}`} />
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('nequi')}
                    className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-4 cursor-pointer transition-all flex flex-col gap-6 ${paymentMethod === 'nequi' ? 'border-pink-500 bg-pink-50/50' : 'border-stone-100 bg-white hover:border-pink-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Logo_Nequi.svg/2048px-Logo_Nequi.svg.png" className="h-8 w-8 md:h-10 md:w-10 object-contain" alt="Nequi" />
                        <div>
                          <h4 className="font-black text-stone-900 text-sm md:text-base">Nequi</h4>
                          <p className="text-stone-400 text-[10px] md:text-sm font-medium">Notificación push en tu App</p>
                        </div>
                      </div>
                      <div className={`h-5 w-5 md:h-6 md:w-6 rounded-full border-4 ${paymentMethod === 'nequi' ? 'border-pink-500 bg-pink-500' : 'border-stone-200'}`} />
                    </div>
                    
                    {paymentMethod === 'nequi' && (
                      <div className="animate-in slide-in-from-top-4 duration-300">
                         <label className="text-[9px] font-black uppercase text-pink-600 tracking-widest ml-4 mb-2 block text-left">Celular Nequi</label>
                         <input 
                           type="tel" 
                           placeholder="300 000 0000"
                           value={nequiPhone}
                           onChange={(e) => setNequiPhone(e.target.value)}
                           className="w-full px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-pink-200 rounded-xl md:rounded-2xl outline-none focus:border-pink-500 font-black text-base md:text-lg"
                         />
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full mt-6 md:mt-10 text-white py-6 md:py-8 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 ${paymentMethod === 'nequi' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-stone-900 hover:bg-amber-600'}`}
                  >
                    {loading ? (
                      <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>{paymentMethod === 'nequi' ? 'Pedir Notificación' : `Pagar $${totalPrice.toLocaleString('es-CO')}`}</>
                    )}
                  </button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 md:py-20 animate-in zoom-in duration-700">
               <div className={`h-24 w-24 md:h-32 md:w-32 ${paymentMethod === 'nequi' ? 'bg-pink-500' : 'bg-green-500'} text-white rounded-full flex items-center justify-center text-5xl md:text-6xl mx-auto mb-8 md:mb-10 shadow-2xl`}>
                 {paymentMethod === 'nequi' ? '📲' : '✓'}
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-6 tracking-tighter">
                 {paymentMethod === 'nequi' ? '¡Enviado!' : '¡Confirmado!'}
               </h1>
               <p className="text-stone-500 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 md:mb-12 leading-relaxed px-4">
                 {paymentMethod === 'nequi' 
                   ? `Entra a tu App Nequi en el celular ${nequiPhone} y aprueba el pago.`
                   : 'Gracias por apoyar el arte Zenú. Hemos enviado los detalles a tu correo.'}
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-6">
                 <Link href="/dashboard" className="bg-stone-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black shadow-xl text-sm md:text-base">Ver Mis Pedidos</Link>
                 <Link href="/" className="bg-white border-2 border-stone-100 text-stone-400 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:text-stone-900 transition-colors">Volver al Inicio</Link>
               </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {step !== 3 && (
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden sticky top-32 md:top-44">
               <div className="p-6 md:p-8 bg-stone-50 border-b border-stone-100">
                  <h3 className="font-black text-stone-900 uppercase tracking-widest text-[10px]">Tu Pedido</h3>
               </div>
               <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-12 w-12 md:h-14 md:w-14 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                         <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0 text-left">
                         <p className="font-black text-stone-900 text-[10px] md:text-xs leading-tight truncate">{item.name}</p>
                         <p className="text-stone-400 text-[9px] font-bold">Cant: {item.quantity}</p>
                      </div>
                      <p className="font-black text-stone-900 text-[10px] md:text-xs">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-stone-100 text-left">
                    <p className="text-stone-400 text-[9px] font-black uppercase tracking-widest mb-1">Total a Pagar</p>
                    <p className="text-stone-900 font-black text-2xl md:text-3xl">${totalPrice.toLocaleString('es-CO')}</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
