'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StarField } from '@/components/StarField';
import { RobotCompanion } from '@/components/RobotCompanion';
import {
  EcommerceScrollStory,
  EcommerceScrollStoryMobile,
} from '@/components/sections/EcommerceScrollStory';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { useLanguage } from '@/components/LanguageContext';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { services } from '@/constants/services';

export default function EcommercePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 overflow-x-clip">
      <StarField />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.18) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142, 240, 181, 0.06) 0%, transparent 40%)',
        }}
      />

      <Header />
      <RobotCompanion />

      <main className="relative z-10">
        {/* Scroll Expansion Hero — title → disperse → card description */}
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/ecommerce/hero/card.png"
          bgImageSrc="/ecommerce/hero/bg.png"
          title={t('eco_hero_title')}
          date={t('eco_hero_eyebrow')}
          scrollToExpand={t('eco_hero_scroll')}
          textBlend
        >
          <div className="max-w-[920px] mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {t('eco_hero_h2_a')}{' '}
              <span className="text-[#8EF0B5] italic">{t('eco_hero_h2_em')}</span>
              {t('eco_hero_h2_b')}
            </h2>
            <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mt-6 max-w-[64ch] mx-auto">
              {t('eco_hero_p')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#8EF0B5]">
              <span className="block w-8 h-px bg-[#8EF0B5]" />
              {t('eco_hero_explore')}
              <span className="block w-8 h-px bg-[#8EF0B5]" />
            </div>
          </div>
        </ScrollExpandMedia>

        {/* Service selector — kart-grid hero altı */}
        <section className="relative py-20 md:py-28">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#8EF0B5] mb-6">
              <span className="block w-8 h-px bg-[#8EF0B5]" />
              Hizmetlerimiz
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
              İhtiyacınıza göre{' '}
              <span className="text-[#8EF0B5] italic">başlangıç noktası</span>.
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    aria-label={`${service.title} hizmetine git`}
                    className="group relative block rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7 md:p-9 hover:border-[#8EF0B5]/40 hover:bg-[#13151A] transition-all duration-300"
                  >
                    {service.eyebrow ? (
                      <span className="absolute top-6 right-6 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] text-[#8EF0B5] bg-[#8EF0B5]/10 border border-[#8EF0B5]/30">
                        {service.eyebrow}
                      </span>
                    ) : null}

                    <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center mb-6 transition-colors group-hover:bg-[#8EF0B5]/20">
                      <Icon size={22} className="text-[#8EF0B5]" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4 group-hover:text-[#8EF0B5] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm md:text-[15px] text-[#9CA3AF] leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8EF0B5]">
                      Detayları gör
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Scrollytelling — 17 sahne (Hero + 4 Service + 1 Spread + 7 Project + 4 Process) */}
        <EcommerceScrollStory />
        <EcommerceScrollStoryMobile />

        {/* Final CTA — static */}
        <section className="relative">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative overflow-hidden border border-white/[0.1] rounded-3xl px-8 md:px-12 py-14 md:py-16"
              style={{
                background:
                  'radial-gradient(120% 140% at 80% 0%, rgba(168,85,247,0.14), transparent 55%), radial-gradient(120% 140% at 10% 100%, rgba(142,240,181,0.14), transparent 55%), #13151A',
              }}
            >
              <svg
                aria-hidden
                className="absolute right-[-80px] bottom-[-80px] w-[300px] h-[300px] opacity-35 pointer-events-none"
                viewBox="0 0 300 300"
                fill="none"
              >
                <g
                  className="animate-[spin_9s_linear_infinite]"
                  style={{ transformOrigin: '50% 50%' }}
                >
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="120"
                    ry="48"
                    stroke="#8EF0B5"
                    strokeWidth="1"
                  />
                  <circle cx="270" cy="150" r="4" fill="#8EF0B5" />
                </g>
                <g
                  className="animate-[spin_14s_linear_infinite_reverse]"
                  style={{ transformOrigin: '50% 50%' }}
                >
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="48"
                    ry="120"
                    stroke="#a855f7"
                    strokeWidth="1"
                  />
                </g>
              </svg>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-[18ch] leading-[1.1] relative z-10">
                {t('eco_cta_h2_a')}{' '}
                <span className="text-[#8EF0B5] italic">{t('eco_cta_em')}</span>
                {t('eco_cta_h2_b')}
              </h2>
              <p className="text-[#9CA3AF] mt-4 max-w-[48ch] text-base md:text-[16.5px] relative z-10">
                {t('eco_cta_p')}
              </p>
              <div className="mt-8 relative z-10">
                <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
                  {t('eco_cta_button')}
                </FlyingIconsButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other services link */}
        <section className="relative pb-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8 flex justify-center">
            <Link
              href="/hizmetler/eticaret-dijitallesme"
              className="group inline-flex items-center gap-3 text-sm text-[#9CA3AF] hover:text-[#8EF0B5] transition-colors font-mono uppercase tracking-[0.18em]"
            >
              <span className="block w-8 h-px bg-current transition-all group-hover:w-12" />
              Tüm hizmetlerimize göz at
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
