'use client';

import { useState, useEffect } from 'react';

const faqs = [
  {
    question: "¿Cómo garantizan la autenticidad de los productos?",
    answer: "Todas nuestras piezas cuentan con el respaldo de la comunidad Zenú y el Sello de Denominación de Origen. Trabajamos directamente con maestros artesanos certificados."
  },
  {
    question: "¿Cuánto tiempo tarda en llegar mi sombrero vueltiao?",
    answer: "Si la pieza está en stock, el envío tarda entre 3 a 5 días hábiles a nivel nacional. Si es un pedido personalizado, el artesano puede tardar de 15 a 20 días en el tejido manual."
  },
  {
    question: "¿Tienen envíos internacionales?",
    answer: "Sí, llevamos la herencia Zenú a todo el mundo. El costo de envío se calcula al finalizar la compra según el país de destino."
  },
  {
    question: "¿Cómo puedo cuidar mi artesanía de caña flecha?",
    answer: "Recomendamos no mojar la pieza y evitar la exposición directa al sol por tiempos prolongados. Para limpiar, usa un paño seco o ligeramente húmedo."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 md:mb-6 tracking-tighter">Preguntas Frecuentes</h1>
        <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl mx-auto px-2">
          Resolvemos tus dudas sobre nuestra cultura, envíos y piezas artesanales.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden mx-2 md:mx-0">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 md:px-10 py-6 md:py-8 text-left flex justify-between items-center group gap-4"
            >
              <span className="text-base md:text-lg font-black text-stone-800 group-hover:text-amber-600 transition-colors leading-tight">
                {faq.question}
              </span>
              <span className={`text-xl md:text-2xl transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 md:px-10 pb-8 md:pb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-stone-500 leading-relaxed font-medium text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-20 bg-amber-50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center border border-amber-100 mx-2 md:mx-0">
        <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-4">¿Aún tienes dudas?</h3>
        <p className="text-stone-600 mb-8 font-medium text-sm md:text-base">Nuestro equipo está listo para atenderte personalmente.</p>
        <button 
          onClick={() => window.location.href = "https://wa.me/573506821509?text=Hola!%20Tengo%20una%20duda%20sobre%20Ansesstral"}
          className="w-full sm:w-auto bg-stone-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black shadow-xl hover:bg-amber-600 transition-all text-sm md:text-base"
        >
          Hablar por WhatsApp
        </button>
      </div>
    </div>
  );
}
