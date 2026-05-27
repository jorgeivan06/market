'use client';

import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <div className="flex flex-col w-full pt-32 md:pt-44">
      {/* Hero Section - Story Focused */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://www.laguiademonteria.co/wp-content/uploads/2022/03/tendrado-1024x580.jpg" 
            alt="Tejido Zenú Ancestral" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-6">
          <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-4 block">Nuestra Esencia</span>
          <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-tight">Tejiendo <span className="text-amber-500">Historias</span></h1>
          <p className="text-stone-300 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Ansesstral nació de una visión: llevar el alma del territorio Zenú a cada rincón del mundo, honrando las manos que lo crean.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8 md:mb-10 tracking-tighter leading-tight">Más que un mercado, <br/>un compromiso <span className="text-amber-600">ansesstral</span>.</h2>
            <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed font-medium">
              En Ansesstral, creemos que la verdadera belleza de una artesanía no reside solo en su forma, sino en la historia y la cultura que representa.
            </p>
            <div className="space-y-8 md:space-y-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="h-16 w-16 bg-stone-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xl border border-stone-200">
                  <img src="https://d2yoo3qu6vrk5d.cloudfront.net/images/20230401132822/sombrero-vueltiao-01_04_23.jpg" alt="Comercio Directo" className="w-full h-full object-cover" />
                </div>
                <div className="md:text-left">
                  <h4 className="text-base md:text-xl font-black text-stone-900 mb-2 uppercase tracking-widest text-[10px] md:text-xs">Comercio 100% Directo</h4>
                  <p className="text-stone-500 font-medium text-sm md:text-base leading-relaxed">Eliminamos intermediarios para que el artesano reciba el valor justo por su maestría y tiempo.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="h-16 w-16 bg-stone-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xl border border-stone-200">
                  <img src="https://7a3edd10fb.cbaul-cdnwnd.com/541a45664eca7d68b408a895d2ab3bba/200000148-b0288b0289/SOMBRERO%20FINO-6.jpeg?ph=7a3edd10fb" alt="Sombrero Fino" className="w-full h-full object-cover" />
                </div>
                <div className="md:text-left">
                  <h4 className="text-base md:text-xl font-black text-stone-900 mb-2 uppercase tracking-widest text-[10px] md:text-xs">Preservación Cultural</h4>
                  <p className="text-stone-500 font-medium text-sm md:text-base leading-relaxed">Fomentamos la transmisión de las "pintas" y técnicas Zenú a las nuevas generaciones.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative group px-6 md:px-0">
            <div className="absolute -inset-10 bg-amber-200/20 rounded-full blur-[100px]" />
            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-stone-50">
               <img 
                 src="https://www.unesco.org/tich4sd/sites/default/files/styles/paragraph_full_mobile/public/2021-11/SCF009.jpg.webp?itok=7Fr6J9BS" 
                 alt="Artesana Zenú" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter">Nuestros Pilares</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: "Honestidad", desc: "Transparencia absoluta en el origen y los materiales de cada pieza.", img: "https://colombia.co/sites/default/files/marca-pais/media/images/tejidos-ancestrales.webp" },
            { title: "Respeto", desc: "Valoramos el tiempo del artesano y el ritmo natural del tejido manual.", img: "https://artesaniasdecolombia.com.co/Documentos/Contenido/39883_39883_trenzado-zenu-cana-flecha-artesanias-colombia-2022-g.jpeg" },
            { title: "Comunidad", desc: "Ansesstral pertenece al territorio. Crecemos si la comunidad crece.", img: "https://colombia.co/sites/default/files/marca-pais/media/images/hombre-en-festival.webp" }
          ].map((v, i) => (
            <div key={i} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-stone-100 text-center hover:shadow-xl transition-all duration-500 group">
              <div className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-6 md:mb-8 rounded-2xl overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-500 border border-amber-50">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-stone-900 mb-4 uppercase tracking-widest text-[10px] md:text-xs">{v.title}</h3>
              <p className="text-stone-500 font-medium leading-relaxed text-sm md:text-base">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-amber-600 text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-7xl font-black mb-8 md:mb-10 tracking-tighter leading-tight px-2">¿Listo para llevar <br/>una historia contigo?</h2>
          <p className="text-amber-100 text-lg md:text-xl mb-10 md:mb-12 font-medium">Cada producto es un pedazo del Sinú que viaja a tu hogar.</p>
          <Link 
            href="/productos" 
            className="inline-block bg-white text-stone-900 px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black text-base md:text-lg hover:bg-stone-900 hover:text-white transition-all shadow-2xl"
          >
            Explorar el Catálogo
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-black/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
