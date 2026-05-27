import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ansesstral Marketplace | Herencia Zenú",
  description: "Mercado electrónico de productos artesanales y ancestrales de la cultura Zenú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-grow overflow-x-hidden">
              {children}
            </main>
            <WhatsAppButton />
            
            <footer className="bg-stone-950 text-stone-400 py-24 border-t border-amber-900/20">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/logo-transparent.png" alt="Logo" className="h-12 w-12 rounded-full border border-amber-600/30" />
                    <span className="text-white font-black text-2xl tracking-tighter">Ansesstral</span>
                  </div>
                  <p className="text-lg leading-relaxed max-w-md">
                    Llevando la sabiduría y el arte de la cultura Zenú a cada rincón del mundo. 
                    Cada tejido cuenta una historia, cada compra preserva una tradición.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explorar</h4>
                  <ul className="space-y-4 text-sm font-medium">
                    <li><a href="/productos" className="hover:text-amber-500 transition-colors">Catálogo Completo</a></li>
                    <li><a href="/nosotros" className="hover:text-amber-500 transition-colors">Nuestra Historia</a></li>
                    <li><a href="/faq" className="hover:text-amber-500 transition-colors">Preguntas Frecuentes</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contacto</h4>
                  <ul className="space-y-4 text-sm font-medium">
                    <li>Colombia, Córdoba</li>
                    <li>Tuchín & San Andrés</li>
                    <li>info@ansesstral.com</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center text-xs uppercase tracking-[0.3em] font-bold">
                <p>© 2026 Ansesstral Marketplace. Tejido con orgullo.</p>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
