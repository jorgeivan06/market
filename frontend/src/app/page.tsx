import Link from 'next/link';

export default function Home() {
  const articles = [
    {
      title: "El Secreto de las 21 Vueltas",
      excerpt: "Descubre por qué el número de vueltas determina la finura y el prestigio de un sombrero vueltiao...",
      date: "24 Mayo, 2026",
      img: "https://colombia.co/sites/default/files/marca-pais/media/images/sombrero-vueltiao-colombiano_0.webp"
    },
    {
      title: "Pintas: El Lenguaje del Sinú",
      excerpt: "Cada rombo y figura geométrica en el tejido Zenú cuenta una historia sobre la fauna y flora de nuestra tierra...",
      date: "18 Mayo, 2026",
      img: "https://www.unesco.org/tich4sd/sites/default/files/styles/paragraph_full_mobile/public/2021-11/SCF009.jpg.webp?itok=7Fr6J9BS"
    },
    {
      title: "Tuchín: Cuna del Talento",
      excerpt: "Viajamos al corazón de Córdoba para conocer a las familias que han preservado el tejido por generaciones...",
      date: "10 Mayo, 2026",
      img: "https://www.laguiademonteria.co/wp-content/uploads/2022/03/tendrado-1024x580.jpg"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
          style={{ backgroundImage: "url('https://colombia.co/sites/default/files/marca-pais/media/images/sombrero-vueltiao-colombiano_0.webp')" }}
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 w-full text-white text-center md:text-left">
          <div className="max-w-4xl pt-40 md:pt-56">
            <h1 className="text-5xl sm:text-6xl md:text-[9rem] font-black text-white mb-6 md:mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter drop-shadow-2xl">
              Herencia <br />
              <span className="text-amber-400">Zenú</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-100 mb-10 md:mb-12 drop-shadow-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-medium opacity-90">
              Desde el corazón de Tuchín para el mundo. Piezas maestras tejidas con el alma y la fibra de nuestra tierra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
              <Link 
                href="/productos" 
                className="w-full sm:w-auto bg-white text-stone-900 px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-amber-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3"
              >
                Ver Colección
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/nosotros" 
                className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Nuestra Historia
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="relative z-30 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-baseline mb-12 md:mb-20 gap-6">
            <h2 className="text-4xl md:text-7xl font-black text-stone-900 tracking-tighter">Categorías</h2>
            <Link href="/productos" className="text-amber-600 font-black uppercase tracking-widest text-[10px] md:text-sm border-b-2 border-amber-600 pb-1 hover:text-stone-900 hover:border-stone-900 transition-all">
              Ver todo el catálogo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { name: 'Sombreros', img: 'https://artesaniasdecolombia.com.co/Documentos/Contenido/29186_cana-flecha-3-artesanias-colombia-2018-g.jpg' },
              { name: 'Accesorios', img: 'https://www.productosdecolombia.com/wp-content/uploads/2025/05/bolso-canaflecha-estilo-mochila-min.jpg' },
              { name: 'Hogar', img: 'https://http2.mlstatic.com/D_NQ_NP_637756-MCO70042946108_062023-O.webp' },
            ].map((cat) => (
              <Link key={cat.name} href={`/productos?cat=${cat.name}`} className="group relative h-[400px] md:h-[550px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-xl transition-all hover:shadow-2xl">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-10 right-8 md:right-10">
                  <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-2 block">Colección</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">{cat.name}</h3>
                  <div className="h-1 w-12 bg-amber-600 mt-4 transition-all group-hover:w-24" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 md:py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Comercio Ético y Directo</span>
            <h2 className="text-4xl md:text-7xl font-black text-stone-900 mb-8 leading-[1.1] tracking-tighter">Sin intermediarios, <br />del artesano a tu mano.</h2>
            <p className="text-lg md:text-xl text-stone-600 mb-10 md:mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Garantizamos que el 100% del valor justo llegue a las familias de Tuchín. 
              Cada tejido es un pacto de confianza y respeto.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="group bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm hover:shadow-md transition-all border border-stone-100 text-center">
                <div className="h-20 w-20 md:h-28 md:w-28 mb-6 md:mb-8 overflow-hidden rounded-[2rem] border-2 border-amber-100 mx-auto group-hover:scale-110 transition-transform shadow-inner">
                  <img src="https://macondosouvenirs.weebly.com/uploads/1/0/3/7/103709368/cultivo_orig.jpg" alt="Cultivo" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-stone-900 text-xl md:text-2xl mb-4">Sostenibilidad</h4>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">Fibras naturales de caña flecha cultivada con respeto.</p>
              </div>

              <div className="group bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm hover:shadow-md transition-all border border-stone-100 text-center">
                <div className="h-20 w-20 md:h-28 md:w-28 mb-6 md:mb-8 overflow-hidden rounded-[2rem] border-2 border-amber-100 mx-auto group-hover:scale-110 transition-transform shadow-inner">
                  <img src="https://artesaniasdecolombia.com.co/Documentos/Contenido/29002_cana-flecha-2-artesanias-colombia-2018-g.jpg" alt="Sello" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-stone-900 text-xl md:text-2xl mb-4">Autenticidad</h4>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">Piezas 100% originales con certificación de origen.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative group px-6 md:px-0 mx-auto">
            <div className="absolute -inset-10 bg-amber-200/20 rounded-full blur-[100px] group-hover:bg-amber-300/30 transition-all duration-1000" />
            <div className="relative aspect-[3/4] max-w-[280px] sm:max-w-md mx-auto rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] md:border-[16px] border-white">
              <img src="https://www.unesco.org/tich4sd/sites/default/files/styles/paragraph_full_mobile/public/2021-11/SCF009.jpg.webp?itok=7Fr6J9BS" alt="UNESCO" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">Patrimonio UNESCO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlight Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-16 md:mb-24">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-6 block">Selección Curada</span>
          <h2 className="text-4xl md:text-7xl font-black text-stone-900 mb-6 tracking-tighter leading-tight px-2">Piezas de Culto</h2>
          <p className="text-stone-500 text-lg md:text-xl font-medium italic max-w-2xl mx-auto px-4">Obras maestras que representan lo más sublime de la tejeduría Zenú.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { name: 'Sombrero Vueltiao 21 V', cat: 'Obra Maestra', price: '450.000', img: 'https://www.construmole.com/wp-content/uploads/2025/04/D_Q_NP_2X_815393-MCO83281354127_032025-E.webp' },
            { name: 'Mochila Tradicional', cat: 'Simbolismo', price: '180.000', img: 'https://www.productosdecolombia.com/wp-content/uploads/2025/05/bolso-canaflecha-estilo-mochila-min.jpg' },
            { name: 'Accesorios Zenú', cat: 'Accesorio', price: '85.000', img: 'https://i.pinimg.com/236x/73/4c/a5/734ca5971227a4a1ab3b2b86140bd44d.jpg' },
            { name: 'Tapete Circular', cat: 'Hogar', price: '120.000', img: 'https://http2.mlstatic.com/D_NQ_NP_637756-MCO70042946108_062023-O.webp' },
          ].map((product, i) => (
            <div key={i} className="group flex flex-col gap-4 md:gap-6 cursor-pointer">
              <div className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-stone-100 bg-stone-50">
                <img src={product.img} alt={product.name} className="w-full h-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/90 backdrop-blur-md px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-amber-700 shadow-sm">
                  {product.cat}
                </div>
              </div>
              <div className="px-2 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-black text-stone-900 mb-2 group-hover:text-amber-600 transition-colors truncate">{product.name}</h3>
                <div className="flex justify-between items-center px-1">
                  <p className="text-base md:text-lg font-black text-stone-400 group-hover:text-stone-900 transition-colors">${product.price}</p>
                  <span className="text-[8px] md:text-[10px] font-bold text-amber-600 uppercase tracking-widest border-b border-amber-600">Ver Historia</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="py-20 md:py-24 text-center px-4">
        <Link href="/productos" className="w-full sm:w-auto inline-block bg-stone-900 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black text-base md:text-lg hover:bg-amber-600 transition-all shadow-xl hover:-translate-y-1">
          Explorar Catálogo Completo
        </Link>
      </div>
    </div>
  );
}
