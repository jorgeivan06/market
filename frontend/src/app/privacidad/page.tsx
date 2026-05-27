'use client';

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 md:mb-8 tracking-tighter">Política de Privacidad</h1>
      
      <div className="prose prose-stone max-w-none space-y-10 md:space-y-12">
        <div className="bg-stone-900 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden mx-2 md:mx-0">
           <div className="relative z-10">
              <p className="text-amber-400 font-black uppercase tracking-widest text-[10px] md:text-xs mb-4">Cumplimiento Legal</p>
              <h2 className="text-xl md:text-2xl font-black mb-4">Ley 1581 de 2012 (Colombia)</h2>
              <p className="text-stone-300 font-medium text-sm md:text-base leading-relaxed">
                En cumplimiento de la Ley de Protección de Datos Personales de Colombia, Ansesstral se compromete a proteger la privacidad de sus artesanos y compradores.
              </p>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full" />
        </div>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">Uso de la Información</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            Los datos recolectados (nombre, email, teléfono, dirección) se utilizan exclusivamente para:
          </p>
          <ul className="list-disc list-inside space-y-3 text-stone-500 font-medium ml-4 text-sm md:text-base text-left inline-block">
            <li>Procesar y rastrear sus pedidos de artesanías.</li>
            <li>Conectar a los compradores con la historia de los artesanos.</li>
            <li>Enviar actualizaciones sobre el estado de la herencia Zenú.</li>
            <li>Mejorar la experiencia de usuario en el marketplace.</li>
          </ul>
        </section>

        <section className="bg-amber-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-amber-100 mx-2 md:mx-0">
          <h2 className="text-xl md:text-2xl font-black text-stone-900 mb-4">Sus Derechos (Habeas Data)</h2>
          <p className="text-stone-700 leading-relaxed font-medium text-sm md:text-base">
            Como titular de los datos, usted tiene derecho a conocer, actualizar, rectificar y suprimir su información personal en cualquier momento escribiéndonos a nuestro canal oficial de soporte.
          </p>
        </section>
      </div>
    </div>
  );
}
