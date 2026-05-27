'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ReviewsSection({ productId }: { productId: number }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3001/reviews/${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        setNewReview({ rating: 5, comment: '' });
        fetchReviews();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 md:mt-20 border-t border-stone-100 pt-12 md:pt-20 px-4 md:px-0">
      <h3 className="text-2xl md:text-3xl font-black text-stone-900 mb-8 md:mb-12 tracking-tighter text-center md:text-left">Voces de la Comunidad</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
        {/* Formulario de Reseña */}
        <div className="lg:col-span-1">
          {user ? (
            <div className="bg-stone-50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-stone-100">
              <h4 className="font-black text-stone-900 mb-4 md:mb-6 uppercase tracking-widest text-[9px] md:text-[10px] text-center md:text-left">Tu Opinión</h4>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-stone-400 mb-2 ml-4">Calificación</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                    className="w-full px-6 py-3 bg-white border border-stone-100 rounded-2xl font-bold text-amber-600 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                  >
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} ★ Estrellas</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-stone-400 mb-2 ml-4">Comentario</label>
                  <textarea 
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Cuéntanos tu experiencia..."
                    className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl font-medium text-stone-800 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Publicar Reseña'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-amber-50 p-8 rounded-[2rem] md:rounded-[2.5rem] border border-amber-100 text-center">
               <p className="text-stone-700 font-bold mb-4 text-sm md:text-base">Ingresa para dejar tu reseña</p>
               <Link href="/login" className="text-amber-600 font-black border-b-2 border-amber-600 pb-0.5 text-sm">Iniciar Sesión →</Link>
            </div>
          )}
        </div>

        {/* Lista de Reseñas */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {reviews.length === 0 ? (
            <div className="py-12 md:py-16 text-center border-2 border-dashed border-stone-100 rounded-[2.5rem] md:rounded-[3rem]">
               <p className="text-stone-400 font-medium italic text-sm md:text-base">Sé el primero en compartir la belleza de esta pieza.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-stone-100 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 font-black text-xs">
                      {review.user.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-black text-stone-900 text-sm">{review.user.name}</h5>
                      <p className="text-[9px] md:text-[10px] text-stone-400 uppercase font-bold tracking-widest">
                        {new Date(review.createdAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-amber-500 font-black tracking-widest text-[10px] md:text-xs bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed font-medium italic text-sm md:text-base">"{review.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
