'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-[#8EF0B5]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full"></div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
      </div>

      <Header />
      
      <main className="flex-1 relative z-10 max-w-[1200px] mx-auto w-full px-8 pb-32">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto pt-10 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
            <Icons.Rocket size={16} className="text-[#8EF0B5]" />
            <span className="text-sm font-semibold tracking-wide text-gray-300">
              {lang === 'tr' ? 'HİKAYEMİZ' : 'OUR STORY'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {lang === 'tr' ? (
              <>Geleceği İnşa Etmiyoruz,<br/>Onu <span className="text-[#8EF0B5]">Otomatize</span> Ediyoruz.</>
            ) : (
              <>We Don't Build The Future,<br/>We <span className="text-[#8EF0B5]">Automate</span> It.</>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            {lang === 'tr'
              ? 'AgentoLabs olarak şirketlerin manuel iş yükünü sıfırlayan, verileri gerçek zamanlı kararlara dönüştüren ve durmaksızın çalışan "Otonom Yapay Zeka Ekosistemleri" tasarlıyoruz.'
              : 'At AgentoLabs, we design "Autonomous AI Ecosystems" that eliminate manual workloads, turn data into real-time decisions, and operate relentlessly.'
            }
          </p>
        </div>

        {/* Mottomuz & Misyonumuz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-32">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8EF0B5]/20 to-purple-500/20 blur-[50px] rounded-[32px]"></div>
            <div className="relative bg-[#13151A]/80 backdrop-blur-xl border border-white/10 p-12 rounded-[32px]">
              <Icons.Target size={40} className="text-[#8EF0B5] mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                {lang === 'tr' ? 'Misyonumuz' : 'Our Mission'}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {lang === 'tr'
                  ? 'İşletmeleri, hantal yazılımlar ve insan sınırlarına takılan manuel süreçlerden kurtarmak. Müşteri iletişiminden reklama, içerik üretiminden B2B ticaret operasyonlarına kadar tüm katmanlarda kendi kendine düşünen ve aksiyon alan modüler çözümler sunmak.'
                  : 'To free businesses from clumsy software and manual processes constrained by human limits. We offer modular solutions that think and act autonomously across all layers—from customer communication and advertising to content creation and B2B trade operations.'
                }
              </p>
            </div>
          </div>
          <div className="space-y-8 pl-0 md:pl-8">
            <h2 className="text-4xl font-bold text-white">
              {lang === 'tr' ? 'Neden AgentoLabs?' : 'Why AgentoLabs?'}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {lang === 'tr'
                ? 'Çünkü sadece "Yapay Zeka" demiyoruz; "Otonom Yapay Zeka Departmanı" diyoruz. Bugün piyasadaki araçlar sadece yardımcı pilot (co-pilot) görevi görürken, biz doğrudan "Oto-Pilot" inşa ediyoruz.'
                : 'Because we don\'t just say "Artificial Intelligence"; we say "Autonomous AI Department". While today\'s market tools act merely as co-pilots, we build direct "Auto-Pilots".'
              }
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Icons.Brain size={16} className="text-[#8EF0B5]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    {lang === 'tr' ? 'Kurumsal Hafıza Ortaklığı' : 'Corporate Memory Partnership'}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'tr'
                      ? 'Ürünlerimizin tamamı aynı dilden konuşur, şirketinize dair öğrendikleri her şeyi ortak bir bellekte toplarlar.'
                      : 'All our products speak the same language, pooling everything they learn about your company into a shared memory.'
                    }
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Icons.Layers size={16} className="text-[#8EF0B5]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    {lang === 'tr' ? 'Durdurulamaz Sinerji' : 'Unstoppable Synergy'}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'tr'
                      ? 'Satış otomasyonu, bütçe ajanı ve içerik stüdyomuz sırayla birbirini tetikleyerek sonsuz bir büyüme döngüsü yaratır.'
                      : 'Our sales automation, budget agent, and content studio trigger each other in sequence, creating an endless growth loop.'
                    }
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="pb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              {lang === 'tr' ? 'Temel Değerlerimiz' : 'Our Core Values'}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Bizi, ürettiğimiz teknolojiyi ve kurduğumuz mimariyi şekillendiren temel prensipler.'
                : 'The fundamental principles that shape us, the technology we build, and our architecture.'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B0C10] border border-white/10 p-10 rounded-[32px] hover:border-[#8EF0B5]/30 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                <Icons.Cpu size={32} className="text-white group-hover:text-[#8EF0B5] transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {lang === 'tr' ? 'Saf Otonomi' : 'Pure Autonomy'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {lang === 'tr'
                  ? 'İnsanın onayına ihtiyaç duymadan da en güvenli, en optimum stratejiyi yürütebilen otonom zekalara inanıyoruz. Teknolojimiz yorulmaz, uyumaz, hata yapmaz.'
                  : 'We believe in autonomous intelligences that can execute the safest and most optimal strategy without requiring human approval. Our technology does not tire, does not sleep, and does not make mistakes.'
                }
              </p>
            </div>
            
            <div className="bg-[#0B0C10] border border-white/10 p-10 rounded-[32px] hover:border-[#8EF0B5]/30 transition-colors group relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                <Icons.Puzzle size={32} className="text-white group-hover:text-[#8EF0B5] transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {lang === 'tr' ? 'Modüler Bütünlük' : 'Modular Integrity'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {lang === 'tr'
                  ? 'Her Agento ürünü güçlü bir Lego parçasıdır. Ayrı ayrı sektörü sallayabilirler ancak birleştiklerinde durdurulamaz bir iş aracı haline gelirler.'
                  : 'Every Agento product is a powerful Lego piece. Individually they can shake up the industry, but when combined, they become an unstoppable business tool.'
                }
              </p>
            </div>

            <div className="bg-[#0B0C10] border border-white/10 p-10 rounded-[32px] hover:border-[#8EF0B5]/30 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                <Icons.ShieldCheck size={32} className="text-white group-hover:text-[#8EF0B5] transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {lang === 'tr' ? 'Kontrollü Güvenlik' : 'Controlled Security'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {lang === 'tr'
                  ? 'Ne kadar otonom olursa olsun, kontrol her zaman sizdedir. Agento mimarisinde katı limitler, bütçe kalkanları ve şeffaf loglama standarttır.'
                  : 'No matter how autonomous, control always remains with you. Strict limits, budget shields, and transparent logging are standard in the Agento architecture.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Bize Katılın CTA */}
        <div className="bg-[#13151A] border border-white/10 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8EF0B5]/5 to-transparent pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            {lang === 'tr' ? 'Makinelerin Çağında Geride Kalmayın' : 'Don\'t Get Left Behind in the Machine Age'}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
            {lang === 'tr'
              ? 'Ekosistemimizin firmanıza nasıl uyarlanabileceğini öğrenmek ve otonom bir geleceğe adım atmak için bizimle iletişime geçin.'
              : 'Contact us to learn how our ecosystem can be adapted to your company and step into an autonomous future.'
            }
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ecosystem" className="h-14 inline-flex items-center justify-center rounded-full bg-white/10 px-8 text-lg font-bold text-white hover:bg-white/20 transition-all border border-white/10">
              {lang === 'tr' ? 'Ekosistemi Keşfet' : 'Explore the Ecosystem'}
            </Link>
            <Link href="/contact" className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
              {lang === 'tr' ? 'Bizimle Tanışın' : 'Meet Us'}
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
