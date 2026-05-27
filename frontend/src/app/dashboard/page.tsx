'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio'); 
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    community: '',
  });

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          location: data.location || '',
          community: data.community || '',
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchProfile();
        fetchOrders();
      }
    }
  }, [user, authLoading, router, fetchProfile, fetchOrders]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/users/profile', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchProfile();
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const confirmNequiPayment = async (orderId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}/confirm-nequi`, { method: 'PATCH' });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
    }
  };

  if (authLoading || (loading && !profile)) {
    return <div className="p-20 md:p-44 text-center font-black uppercase tracking-widest text-stone-400 animate-pulse">Sincronizando con el territorio...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-6 md:p-8 text-center">
            <div className="h-20 w-20 md:h-24 md:w-24 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-black mx-auto mb-4 shadow-xl">
              {profile?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">{profile?.name || 'Usuario'}</h2>
            <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest mt-1">
              {profile?.role === 'SELLER' ? 'Artesano Maestro' : 'Comprador Ansesstral'}
            </p>
          </div>

          <nav className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden flex lg:flex-col overflow-x-auto">
             {[
               { id: 'inicio', label: 'Mi Tablero', icon: '🏠' },
               { id: 'pedidos', label: 'Mis Pedidos', icon: '📦' },
               { id: 'perfil', label: 'Editar Historia', icon: '🎨' },
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex-shrink-0 lg:w-full flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-amber-600 text-white' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-900'}`}
               >
                 <span>{tab.icon}</span>
                 <span className="whitespace-nowrap">{tab.label}</span>
               </button>
             ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          
          {/* TAB: INICIO */}
          {activeTab === 'inicio' && profile && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-stone-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl text-center md:text-left">
                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Shitua, {profile.name?.split(' ')[0] || 'Artesano'}</h1>
                    <p className="text-stone-400 text-base md:text-lg max-w-md font-medium mx-auto md:mx-0">Gestiona tu legado Zenú desde aquí.</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-amber-500 transform skew-x-12 translate-x-10" />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center md:text-left">
                     <p className="text-[10px] font-black uppercase text-stone-400 tracking-[0.2em] mb-2">Pedidos Realizados</p>
                     <p className="text-3xl font-black text-stone-900">{orders.length}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center md:text-left">
                     <p className="text-[10px] font-black uppercase text-stone-400 tracking-[0.2em] mb-2">Calificación</p>
                     <p className="text-3xl font-black text-amber-500">5.0 ★</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center md:text-left">
                     <p className="text-[10px] font-black uppercase text-stone-400 tracking-[0.2em] mb-2">Comunidad</p>
                     <p className="text-3xl font-black text-stone-900">{profile.community || 'Zenú'}</p>
                  </div>
               </div>

               <div className="bg-amber-50 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-amber-100 text-center md:text-left">
                  <h3 className="text-2xl font-black text-stone-900 mb-6 tracking-tighter">Acceso Rápido</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {profile.role === 'SELLER' && (
                      <Link href="/dashboard/nuevo-producto" className="w-full sm:w-auto bg-white px-8 py-4 rounded-2xl font-black text-xs text-stone-900 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                        ➕ Subir Obra
                      </Link>
                    )}
                    <button onClick={() => setActiveTab('pedidos')} className="w-full sm:w-auto bg-white px-8 py-4 rounded-2xl font-black text-xs text-stone-900 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                       📦 Ver Compras
                    </button>
                  </div>
               </div>
            </div>
          )}

          {/* TAB: PEDIDOS (Rastreo) */}
          {activeTab === 'pedidos' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tighter mb-8 text-center md:text-left">Mis Pedidos de Herencia</h1>
               
               {orders.length === 0 ? (
                 <div className="bg-white p-12 md:p-20 rounded-[2.5rem] md:rounded-[3rem] border border-stone-100 text-center">
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Aún no has tejido ninguna compra.</p>
                    <Link href="/productos" className="inline-block mt-6 text-amber-600 font-black border-b-2 border-amber-600 pb-1">Ir al catálogo →</Link>
                 </div>
               ) : (
                 <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden transition-all hover:shadow-xl">
                        <div className="p-6 md:p-8 border-b border-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
                           <div className="text-center md:text-left">
                              <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-1">ID PEDIDO: #{order.id}</p>
                              <p className="text-stone-900 font-black text-sm md:text-base">{new Date(order.createdAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                           </div>
                           <div className="flex flex-col md:flex-row items-center gap-4">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${
                                order.status === 'PAID' ? 'bg-green-100 text-green-700 border-green-200' : 
                                order.status === 'WAITING_NEQUI' ? 'bg-pink-100 text-pink-700 border-pink-200' : 
                                'bg-stone-100 text-stone-700 border-stone-200'
                              }`}>
                                 {order.status === 'PAID' ? 'Pago Confirmado' : 
                                  order.status === 'WAITING_NEQUI' ? 'Esperando Nequi' : order.status}
                              </span>
                              <p className="text-xl md:text-2xl font-black text-stone-900">${order.total.toLocaleString('es-CO')}</p>
                           </div>
                        </div>
                        <div className="p-6 md:p-8 bg-stone-50/50">
                           {order.status === 'WAITING_NEQUI' && (
                             <div className="mb-8 p-6 bg-pink-50 border-2 border-pink-100 rounded-[2rem] flex flex-col items-center text-center gap-6 animate-pulse">
                                <div>
                                   <p className="text-pink-600 font-black text-xs md:text-sm uppercase tracking-widest mb-1">Simulador de Notificación Push</p>
                                   <p className="text-pink-800 text-xs md:text-sm font-medium">Imagina que te llegó el aviso a tu Nequi {order.paymentId}.</p>
                                </div>
                                <button 
                                  onClick={() => confirmNequiPayment(order.id)}
                                  className="w-full md:w-auto bg-pink-600 text-white px-8 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-pink-700 transition-all shadow-lg"
                                >
                                   Confirmar en App Nequi (Simulación)
                                </button>
                             </div>
                           )}
                           <div className="flex flex-col gap-6">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4 md:gap-6">
                                   <div className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                                      <img src={item.product?.images?.[0]?.url || '/logo-ansesstral.png'} className="w-full h-full object-contain p-2" />
                                   </div>
                                   <div className="min-w-0">
                                      <p className="font-black text-stone-900 text-xs md:text-sm truncate">{item.product?.name || 'Producto'}</p>
                                      <p className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Cant: {item.quantity} • ${item.price.toLocaleString('es-CO')}</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                           
                           <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">Destino de Entrega</p>
                                 <p className="text-xs md:text-sm font-bold text-stone-700">{order.fullName}</p>
                                 <p className="text-xs md:text-sm text-stone-500">{order.address}, {order.city}</p>
                              </div>
                              <div className="flex items-end justify-center md:justify-end">
                                 <button className="w-full md:w-auto bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg">
                                    Seguir Envío
                                 </button>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {/* TAB: PERFIL (Edición) */}
          {activeTab === 'perfil' && (
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-stone-100 p-8 md:p-12 animate-in fade-in duration-500">
               <h3 className="text-3xl font-black text-stone-900 mb-8 tracking-tighter text-center md:text-left">Mi Perfil y Legado</h3>
               <form onSubmit={handleUpdate} className="space-y-8 text-center md:text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label className="block text-[10px] uppercase font-black text-stone-400 mb-2 ml-4 tracking-widest">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-amber-500/20 outline-none font-bold text-stone-800"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] uppercase font-black text-stone-400 mb-2 ml-4 tracking-widest">Ubicación</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-amber-500/20 outline-none font-bold text-stone-800"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2 ml-4 tracking-widest">Mi Historia Personal</label>
                    <textarea 
                      rows={6}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-amber-500/20 outline-none font-medium text-stone-800 leading-relaxed"
                    />
                  </div>
                  <button type="submit" className="w-full md:w-auto bg-amber-600 text-white px-12 py-5 rounded-2xl font-black shadow-xl hover:bg-amber-700 transition-all transform hover:-translate-y-1">
                    Guardar Cambios
                  </button>
               </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
