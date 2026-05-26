import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StarField } from '@/components/StarField';
import { RobotCompanion } from '@/components/RobotCompanion';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { services } from '@/constants/services';

export default function HizmetlerPage() {
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
        {/* Hero */}
        <section className="relative pt-40 md:pt-48 pb-12 md:pb-16">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <Breadcrumbs
              items={[
                { label: 'Anasayfa', href: '/' },
                { label: 'Hizmetler', href: '/hizmetler' },
                { label: 'E-ticaret ve Dijitalleşme' },
              ]}
            />
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#8EF0B5] mb-6">
              <span className="block w-8 h-px bg-[#8EF0B5]" />
              Hizmetler
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-[18ch]">
              Hizmetler
            </h1>
            <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mt-8 max-w-[68ch]">
              E-ticarete başlayan girişimlerden çok kanallı operasyon yöneten
              kurumsal markalara kadar her ölçekte iş için uçtan uca çözümler
              sunuyoruz. Aşağıdaki hizmetlerden işinize en uygun olanı seçin —
              tüm projelerimiz ücretsiz keşif görüşmesiyle başlar.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-12 md:py-16">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4 group-hover:text-[#8EF0B5] transition-colors">
                      {service.title}
                    </h2>

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

        {/* CTA */}
        <section className="relative">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
            <div
              className="relative overflow-hidden border border-white/[0.1] rounded-3xl px-8 md:px-12 py-14 md:py-16"
              style={{
                background:
                  'radial-gradient(120% 140% at 80% 0%, rgba(168,85,247,0.14), transparent 55%), radial-gradient(120% 140% at 10% 100%, rgba(142,240,181,0.14), transparent 55%), #13151A',
              }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-[22ch] leading-[1.1] relative z-10">
                Hangi hizmete ihtiyacınız olduğundan{' '}
                <span className="text-[#8EF0B5] italic">emin değil misiniz?</span>
              </h2>
              <p className="text-[#9CA3AF] mt-4 max-w-[52ch] text-base md:text-[16.5px] relative z-10">
                30 dakikalık ücretsiz keşif görüşmesinde işinizi dinleyip
                ihtiyacınıza en uygun çözüm yolunu birlikte planlıyoruz.
              </p>
              <div className="mt-8 relative z-10">
                <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
                  Ücretsiz Keşif Görüşmesi
                </FlyingIconsButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
