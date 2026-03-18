'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function EcosystemPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col pt-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-[#8EF0B5]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-purple-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <Header />
      
      <main className="flex-1 relative z-10 max-w-[1400px] mx-auto w-full px-8 pb-32 space-y-32">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
            <Icons.Network size={16} className="text-[#8EF0B5]" />
            <span className="text-sm font-semibold tracking-wide text-gray-300">
              {lang === 'tr' ? 'MODÜLER YAPAY ZEKA MİMARİSİ' : 'MODULAR AI ARCHITECTURE'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {lang === 'tr' ? (
              <>Bütünleşik Güç,<br/><span className="text-[#8EF0B5]">Modüler</span> Özgürlük.</>
            ) : (
              <>Unified Power,<br/><span className="text-[#8EF0B5]">Modular</span> Freedom.</>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {lang === 'tr' 
              ? 'AgentoLabs ürünleri tek başlarına sektörde devrim yaratacak güce sahiptir. Ancak bir araya geldiklerinde, şirketiniz için 7/24 çalışan kesintisiz bir Otonom İşletim Sistemi yaratırlar.'
              : 'AgentoLabs products possess the standalone power to revolutionize the industry. However, when combined, they create a seamless Autonomous Operating System working 24/7 for your company.'
            }
          </p>
        </div>

        {/* Philosophy - Bağımsız & Bütünleşik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-12 border-t border-white/10">
          {/* Card 1: Bağımsız */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-12 relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.Box size={120} className="text-purple-400" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20">
              <Icons.Puzzle size={32} className="text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {lang === 'tr' ? 'Her Biri Tek Başına Güçlü' : 'Individually Powerful'}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              {lang === 'tr'
                ? 'Sadece ihtiyacınız olan ürünü alın. WhatsApp Satış Otomasyonu, Otonom Ajan veya Structa AI. Ekosistemin geri kalanına ihtiyaç duymadan da en yüksek verimde çalışır ve mevcut sistemlerinize (ERP, CRM) saniyeler içinde entegre olur.'
                : 'Get only the product you need. WhatsApp Sales Automation, Autonomous Agent, or Structa AI. They operate at peak efficiency without needing the rest of the ecosystem and integrate into your existing systems (ERP, CRM) in seconds.'
              }
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-purple-400"/> {lang === 'tr' ? 'Plug & Play (Tak-Çalıştır)' : 'Plug & Play'}</li>
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-purple-400"/> {lang === 'tr' ? 'Mevcut yazılımlarla %100 uyum' : '100% compatible with existing software'}</li>
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-purple-400"/> {lang === 'tr' ? 'Kurumsal seviye güvenlik ve izolasyon' : 'Enterprise-grade security and isolation'}</li>
            </ul>
          </div>

          {/* Card 2: Bütünleşik */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-12 relative overflow-hidden group hover:border-[#8EF0B5]/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.Infinity size={120} className="text-[#8EF0B5]" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#8EF0B5]/10 flex items-center justify-center mb-8 border border-[#8EF0B5]/20">
              <Icons.Layers size={32} className="text-[#8EF0B5]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {lang === 'tr' ? 'Birlikte Durdurulamazlar' : 'Unstoppable Together'}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              {lang === 'tr'
                ? "Ajanlarımız kendi aralarında aynı veritabanı belleğini (memory) kullanır. Birinin öğrendiğini diğeri anında bilir ve ortak hedefe doğru veri transferi yaparak şirketinizi görünmez bir yapay zeka departmanı gibi yönetirler."
                : 'Our agents share the same database memory. What one learns, the other instantly knows. They manage your company like an invisible AI department by seamlessly transferring data towards a common goal.'
              }
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-[#8EF0B5]"/> {lang === 'tr' ? 'Ajanlar arası sorunsuz veri aktarımı' : 'Seamless data transfer between agents'}</li>
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-[#8EF0B5]"/> {lang === 'tr' ? 'Ortak içgörü havuzu (Shared Context)' : 'Shared insight pool (Context)'}</li>
              <li className="flex items-center gap-3 text-gray-300"><Icons.CheckCircle2 size={20} className="text-[#8EF0B5]"/> {lang === 'tr' ? 'Siloları ortadan kaldıran 360° yönetim' : '360° management eliminating data silos'}</li>
            </ul>
          </div>
        </div>

        {/* Synergy Diagram Section */}
        <div className="pt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              {lang === 'tr' ? 'AgentoLabs Sinerjisi Nasıl Çalışır?' : 'How Does AgentoLabs Synergy Work?'}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {lang === 'tr'
                ? 'Ürünlerimiz birbirini tetikleyerek sonsuz bir pazarlama ve büyüme döngüsü yaratır. E-Ticaret ve B2B senaryolarında eşsiz bir otomasyon akışı kurun.'
                : 'Our products trigger each other to create an infinite marketing and growth loop. Establish a unique automation flow in E-Commerce and B2B scenarios.'
              }
            </p>
          </div>

          <div className="relative">
            {/* Arka plandaki çizgi (Görsel bağlantı) */}
            <div className="hidden lg:block absolute top-[50%] left-[10%] w-[80%] h-1 bg-gradient-to-r from-[#8EF0B5]/20 via-purple-500/50 to-orange-500/20 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {/* Adım 1 */}
              <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-[32px] text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <Icons.MessageSquare size={24} className="text-blue-400" />
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{lang === 'tr' ? 'Satış Yakalama' : 'Sales Capture'}</h4>
                <p className="text-sm text-gray-400">
                  <span className="text-blue-400 font-semibold">WH Sales</span> {lang === 'tr' ? 'müşteri mesajlarını karşılar, siparişleri toplar ve müşteri profilini sisteme kaydeder.' : 'handles customer messages, collects orders, and saves the customer profile to the system.'}
                </p>
              </div>

              {/* Adım 2 */}
              <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-[32px] text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
                  <Icons.LineChart size={24} className="text-orange-400" />
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{lang === 'tr' ? 'Veri ve Bütçe' : 'Data & Budget'}</h4>
                <p className="text-sm text-gray-400">
                  <span className="text-orange-400 font-semibold">{lang === 'tr' ? 'Otonom Ajan' : 'Autonomous Agent'}</span> {lang === 'tr' ? 'gerçekleşen satış verisini Ads paneliyle birleştirip karlılık getiren reklamlara bütçe basar.' : 'combines realized sales data with the Ads panel and allocates budget to profitable ads.'}
                </p>
              </div>

              {/* Adım 3 */}
              <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-[32px] text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                  <Icons.PenTool size={24} className="text-purple-400" />
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{lang === 'tr' ? 'İçerik Üretimi' : 'Content Creation'}</h4>
                <p className="text-sm text-gray-400">
                  <span className="text-purple-400 font-semibold">Structa AI</span> {lang === 'tr' ? 'kampanyası tutan ürün grupları için otomatik olarak yeni görseller ve blog yazıları oluşturur.' : 'automatically creates new visuals and blog posts for product groups with successful campaigns.'}
                </p>
              </div>

              {/* Adım 4 */}
              <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-[32px] text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-16 h-16 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center mx-auto mb-6 border border-[#8EF0B5]/30">
                  <Icons.Recycle size={24} className="text-[#8EF0B5]" />
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{lang === 'tr' ? 'Otomatize Döngü' : 'Automated Loop'}</h4>
                <p className="text-sm text-gray-400">
                  {lang === 'tr' ? 'Üretilen yeni içerikler reklama çıkılır, yeni müşteriler doğrudan WhatsApp hunisine düşer. Süreç ' : 'Newly created content is advertised, and new customers fall directly into the WhatsApp funnel. The process runs '}
                  <span className="text-white font-semibold">24/7</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Eczane & Pharma Side Highlight */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 rounded-[40px] p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#8EF0B5]/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8EF0B5]/30 bg-[#8EF0B5]/10 mb-6 font-semibold text-[#8EF0B5] text-sm">
                {lang === 'tr' ? 'Sağlık Teknolojileri' : 'Health Technologies'}
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                {lang === 'tr' ? 'Eczane ve İlaç Endüstrisi İçin Kapalı Devre Ekosistem' : 'Closed-Loop Ecosystem for Pharmacy and Pharma Industry'}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {lang === 'tr' 
                  ? "Genel e-ticaret çözümlerinin dışında, sağlık sektörü için özel kurguladığımız Pharma AI ve Eczaport ile eczaneler arası ortak alım yaparken aynı platformdan ürünlerin bilimsel içeriklerini AI ile yönetebilirsiniz. Sektörel know-how, teknolojik güçle buluşuyor."
                  : "Beyond general e-commerce solutions, with Pharma AI and Eczaport tailored for the healthcare sector, you can manage joint purchases among pharmacies while managing the scientific content of products via AI on the same platform. Industry know-how meets technological power."
                }
              </p>
              <div className="flex gap-4">
                <Link href="/products/agento-eczaport" className="h-12 inline-flex items-center justify-center rounded-full bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 transition-all border border-white/5">
                  {lang === 'tr' ? "Eczaport'u İncele" : 'Explore Eczaport'}
                </Link>
                <Link href="/products/agento-pharm-ia" className="h-12 inline-flex items-center justify-center rounded-full bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 transition-all border border-white/5">
                  {lang === 'tr' ? "Pharma AI'ı İncele" : 'Explore Pharma AI'}
                </Link>
              </div>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-[#0B0C10]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <Icons.Store size={24} className="text-[#8EF0B5] mt-1 shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">{lang === 'tr' ? 'Eczaport Ortak Alım' : 'Eczaport Joint Buying'}</h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Sektördeki stok ve fiyata erişin, alım gücünüzü artırın.' : 'Access industry stock and pricing, increase your buying power.'}
                  </p>
                </div>
              </div>
              <div className="bg-[#0B0C10]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start gap-4 ml-0 md:ml-12 border-l-[#8EF0B5]/30">
                <Icons.ArrowDownUp size={24} className="text-gray-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">{lang === 'tr' ? 'Kesintisiz Veri Akışı' : 'Continuous Data Flow'}</h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'tr' ? "Satın alınan ürünlerin tüm farmakolojik verileri anında AI'a aktarılır." : "All pharmacological data of purchased products is instantly transferred to AI."}
                  </p>
                </div>
              </div>
              <div className="bg-[#0B0C10]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start gap-4 ml-0 md:ml-24">
                <Icons.Pill size={24} className="text-[#8EF0B5] mt-1 shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">{lang === 'tr' ? 'Pharma AI İşleme' : 'Pharma AI Processing'}</h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Ürünlerin SEO uyumlu açıklamaları, görsel tasarımları ve POS bilgilendirmeleri otomatik üretilir.' : 'SEO-friendly descriptions, visual designs, and POS information of products are automatically generated.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-20">
          <h2 className="text-4xl font-bold text-white mb-6">
            {lang === 'tr' ? 'Mimarimizi İncelemeye Hazır Mısınız?' : 'Ready to Explore Our Architecture?'}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {lang === 'tr' 
              ? 'İşletmenizin ihtiyaçlarına en uygun yapay zeka ürünlerini birlikte seçelim ve kurumsal otomasyon serüveninizi başlatalım.'
              : 'Let’s select the most suitable AI products for your business needs and start your corporate automation journey together.'
            }
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link href="/products" className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-10 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
              {lang === 'tr' ? 'Ürünlerimizi Keşfedin' : 'Discover Our Products'}
            </Link>
            <Link href="/contact" className="h-14 inline-flex items-center justify-center rounded-full bg-white/10 px-10 text-lg font-bold text-white hover:bg-white/20 transition-all">
              {lang === 'tr' ? 'Bizimle İletişime Geçin' : 'Contact Us'}
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
