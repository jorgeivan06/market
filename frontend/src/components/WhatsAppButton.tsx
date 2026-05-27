'use client';

import { useState } from 'react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "573506821509"; // Número de Jorge vinculado
  const message = encodeURIComponent("¡Hola Jorge! Estoy interesado en conocer más sobre las artesanías Zenú de Ansesstral. ¿Podrías ayudarme?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[150] flex flex-col items-end gap-4">
      {/* Popover de bienvenida */}
      {isOpen && (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-100 p-6 max-w-[280px] md:max-w-xs animate-in slide-in-from-bottom-4 duration-300 mx-4 md:mx-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-black">
              A
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Soporte</p>
              <h4 className="text-sm font-black text-stone-900">Comunidad Ansesstral</h4>
            </div>
          </div>
          <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed mb-6 font-medium">
            ¿Tienes dudas sobre un sombrero, el envío o la autenticidad? Escríbenos y te atenderemos.
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#25D366] text-white py-3 md:py-4 rounded-xl text-center font-black text-[10px] md:text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
          >
            Iniciar Chat
          </a>
        </div>
      )}

      {/* Botón flotante principal */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-stone-900 text-white rotate-90' : 'bg-[#25D366] text-white'}`}
      >
        {isOpen ? (
          <span className="text-lg md:text-xl">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.13.57-.072 1.758-.713 2.008-1.403.25-.69.25-1.288.175-1.403-.075-.115-.271-.19-.568-.34z" />
            <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.762.38 3.483 1.134 5.048l-1.144 4.152 4.254-1.118c1.512.704 3.198 1.082 4.935 1.082 5.51 0 9.99-4.49 9.99-10 0-5.51-4.48-10-9.99-10zm0 18c-1.534 0-3.04-.36-4.407-1.046l-.317-.159-2.505.659.67-2.433-.174-.316a7.95 7.95 0 01-1.271-4.405c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
