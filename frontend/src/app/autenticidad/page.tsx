'use client';

export default function AutenticidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 md:mb-8 tracking-tighter leading-tight">Garantía de Origen y Autenticidad</h1>
      
      <div className="prose prose-stone max-w-none space-y-10 md:space-y-12">
        <div className="aspect-video rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-[8px] md:border-[16px] border-white relative group mx-2 md:mx-0">
           <img 
             src="https://artesaniasdecolombia.com.co/Documentos/Contenido/29002_cana-flecha-2-artesanias-colombia-2018-g.jpg" 
             alt="Tejido Zenú" 
             className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
           />
           <div className="absolute inset-0 bg-stone-900/20" />
        </div>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">La Denominación de Origen</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            La Tejeduría Zenú cuenta con el Sello de Denominación de Origen otorgado por la Superintendencia de Industria y Comercio de Colombia. Este sello es un reconocimiento a la tradición, la técnica y el territorio de Tuchín y San Andrés de Sotavento.
          </p>
        </section>

        <section className="bg-amber-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mx-2 md:mx-0">
           <div>
              <h3 className="font-black text-stone-900 mb-2 uppercase tracking-widest text-[10px]">Pintas Tradicionales</h3>
              <p className="text-stone-600 text-sm font-medium">Cada patrón geométrico tiene un nombre y un significado (la flor, el ojo de buey, la palma) que representa la naturaleza del Sinú.</p>
           </div>
           <div>
              <h3 className="font-black text-stone-900 mb-2 uppercase tracking-widest text-[10px]">Técnica Manual</h3>
              <p className="text-stone-600 text-sm font-medium">Garantizamos que el 100% del proceso de raspado, tintura y trenzado de la caña flecha se realiza a mano.</p>
           </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">¿Cómo verificar su pieza?</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            Cada producto premium adquirido en Ansesstral incluye un certificado de autenticidad firmado por el maestro artesano responsable de la obra. Este documento valida el número de vueltas (en el caso de los sombreros) y la fecha de creación en el resguardo indígena.
          </p>
        </section>
      </div>
    </div>
  );
}
