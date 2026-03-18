'use client';

import { topCards, bottomCards } from '@/constants/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function ProductsPage() {
  const { t, lang } = useLanguage();
  const allProducts = [...topCards, ...bottomCards];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col pt-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#8EF0B5]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full"></div>
      </div>

      <Header />
      
      <main className="flex-1 relative z-10 max-w-[1400px] mx-auto w-full px-8 pb-32">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 mt-10">
            <span className="text-[#8EF0B5]">Agento</span> {lang === 'tr' ? 'Ürün Ekosistemi' : 'Product Ecosystem'}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {lang === 'tr' 
              ? 'Yeni nesil yapay zeka ajanlarımızla iş akışlarınızı otomatikleştirin, operasyonel hızınızı artırın ve rakiplerinizin ötesine geçin.' 
              : 'Automate your workflows, increase operational speed, and outperform your competitors with our next-generation AI agents.'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allProducts.map((product, idx) => {
            const IconComponent = (Icons as any)[product.icon] || Icons.Box;
            const name = lang === 'tr' && product.nameTr ? product.nameTr : product.name;
            const description = lang === 'tr' && product.descriptionTr ? product.descriptionTr : product.description;

            return (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="group relative bg-[#13151A]/80 backdrop-blur-sm border border-white/5 rounded-[32px] p-10 hover:border-[#8EF0B5]/50 hover:bg-[#13151A] transition-all duration-500 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Glow Background inside card */}
                {product.glow === 'purple' && (
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-500"></div>
                )}
                {product.glow === 'green' && (
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#8EF0B5]/10 blur-[100px] rounded-full group-hover:bg-[#8EF0B5]/20 transition-all duration-500"></div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center ${product.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#8EF0B5] group-hover:border-[#8EF0B5] transition-all duration-300">
                      <Icons.ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300 group-hover:text-black" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#8EF0B5] transition-colors">{name}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 flex-1">
                    {description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                      {lang === 'tr' ? 'Detayları İncele' : 'View Details'}
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent group-hover:from-[#8EF0B5]/50 transition-colors"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
