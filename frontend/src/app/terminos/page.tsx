'use client';

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 md:pt-44 pb-20">
      <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 md:mb-8 tracking-tighter text-center md:text-left">Términos y Condiciones</h1>
      
      <div className="prose prose-stone max-w-none space-y-10 md:space-y-12">
        <section className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">1. Relación con el Territorio</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            Ansesstral es una plataforma que conecta directamente a maestros artesanos de la comunidad Zenú con compradores globales. Al utilizar nuestro sitio, usted reconoce que cada pieza es única y tejida a mano, lo que puede implicar ligeras variaciones inherentes al proceso ancestral.
          </p>
        </section>

        <section className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">2. Proceso de Venta</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            El contrato de compraventa se realiza directamente entre el comprador y el artesano. Ansesstral actúa como facilitador tecnológico y garante de la transacción financiera. Los precios están expresados en Pesos Colombianos (COP) e incluyen los impuestos de ley aplicables.
          </p>
        </section>

        <section className="bg-stone-50 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-stone-100 text-center md:text-left mx-2 md:mx-0">
          <h2 className="text-xl md:text-2xl font-black text-stone-900 mb-4">3. Propiedad Intelectual</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-sm md:text-base">
            Los diseños, patrones (pintas) y técnicas representadas en los productos son patrimonio cultural de la comunidad Zenú. Queda prohibida la reproducción industrial o el uso comercial de estas iconografías sin el consentimiento expreso de las autoridades del resguardo.
          </p>
        </section>

        <section className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-black text-amber-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">4. Cancelaciones y Devoluciones</h2>
          <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg px-2 md:px-0">
            Dada la naturaleza personalizada de muchas piezas (como sombreros de altas vueltas), las cancelaciones solo se aceptarán dentro de las primeras 24 horas tras el pedido. Las devoluciones por calidad se gestionarán directamente a través de nuestro canal de soporte en WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
