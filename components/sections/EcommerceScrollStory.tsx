'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

/* ============================================================
 * DATA
 * ============================================================ */

type TKey = keyof typeof translations.en;

type Service = {
  idx: string;
  titleKey: TKey;
  bodyKey: TKey;
  fitKey: TKey;
  accent: 'mint' | 'purple';
  bgImage: string;
};

const SERVICES: Service[] = [
  {
    idx: '01',
    titleKey: 'eco_service_1_title',
    bodyKey: 'eco_service_1_body',
    fitKey: 'eco_service_1_fit',
    accent: 'mint',
    bgImage: '/ecommerce/services/entegrasyon.png',
  },
  {
    idx: '02',
    titleKey: 'eco_service_2_title',
    bodyKey: 'eco_service_2_body',
    fitKey: 'eco_service_2_fit',
    accent: 'purple',
    bgImage: '/ecommerce/services/pazaryeri.png',
  },
  {
    idx: '03',
    titleKey: 'eco_service_3_title',
    bodyKey: 'eco_service_3_body',
    fitKey: 'eco_service_3_fit',
    accent: 'purple',
    bgImage: '/ecommerce/services/proje-yonetimi.png',
  },
  {
    idx: '04',
    titleKey: 'eco_service_4_title',
    bodyKey: 'eco_service_4_body',
    fitKey: 'eco_service_4_fit',
    accent: 'mint',
    bgImage: '/ecommerce/services/surec-analizi.png',
  },
];

type Step = {
  idx: string;
  titleKey: TKey;
  bodyKey: TKey;
};

const STEPS: Step[] = [
  { idx: '01', titleKey: 'eco_step_1_title', bodyKey: 'eco_step_1_body' },
  { idx: '02', titleKey: 'eco_step_2_title', bodyKey: 'eco_step_2_body' },
  { idx: '03', titleKey: 'eco_step_3_title', bodyKey: 'eco_step_3_body' },
  { idx: '04', titleKey: 'eco_step_4_title', bodyKey: 'eco_step_4_body' },
];

type Project = {
  brand: string;
  slug: string;
  typeKey: TKey;
  metricKey: TKey;
  accent: 'mint' | 'purple';
  bgImage: string;
};

const PROJECTS: Project[] = [
  {
    brand: 'Turkcell Pasaj',
    slug: 'turkcell-pasaj',
    typeKey: 'eco_project_turkcell_type',
    metricKey: 'eco_project_turkcell_metric',
    accent: 'mint',
    bgImage: '/ecommerce/projects/turkcell-pasaj.png',
  },
  {
    brand: 'Samsung',
    slug: 'samsung',
    typeKey: 'eco_project_samsung_type',
    metricKey: 'eco_project_samsung_metric',
    accent: 'purple',
    bgImage: '/ecommerce/projects/samsung.png',
  },
  {
    brand: 'Lacoste',
    slug: 'lacoste',
    typeKey: 'eco_project_lacoste_type',
    metricKey: 'eco_project_lacoste_metric',
    accent: 'mint',
    bgImage: '/ecommerce/projects/lacoste.png',
  },
  {
    brand: 'Converse',
    slug: 'converse',
    typeKey: 'eco_project_converse_type',
    metricKey: 'eco_project_converse_metric',
    accent: 'purple',
    bgImage: '/ecommerce/projects/converse.png',
  },
  {
    brand: 'Vatan Bilgisayar',
    slug: 'vatan-bilgisayar',
    typeKey: 'eco_project_vatan_type',
    metricKey: 'eco_project_vatan_metric',
    accent: 'mint',
    bgImage: '/ecommerce/projects/vatan.png',
  },
  {
    brand: 'English Home',
    slug: 'english-home',
    typeKey: 'eco_project_english_home_type',
    metricKey: 'eco_project_english_home_metric',
    accent: 'purple',
    bgImage: '/ecommerce/projects/english-home.png',
  },
  {
    brand: 'GS Store',
    slug: 'gs-store',
    typeKey: 'eco_project_gs_store_type',
    metricKey: 'eco_project_gs_store_metric',
    accent: 'mint',
    bgImage: '/ecommerce/projects/gs-store.png',
  },
];

/* ============================================================
 * INTRO — Explore the Story eyebrow + headline + stats
 * ============================================================ */

function HeroSlide() {
  const { t } = useLanguage();
  return (
    <div className="relative max-w-[1180px] w-full">
      <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-[#8EF0B5] mb-5">
        <span className="block w-6 h-px bg-[#8EF0B5]" />
        {t('eco_story_hero_eyebrow')}
      </div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] max-w-[15ch]">
        {t('eco_story_hero_title_a')}{' '}
        <em className="not-italic text-[#8EF0B5] italic font-bold">
          {t('eco_story_hero_title_em')}
        </em>
        {t('eco_story_hero_title_b')}
      </h1>
      <p className="text-[#9CA3AF] text-lg md:text-xl max-w-[58ch] mt-7 leading-relaxed">
        {t('eco_story_hero_p')}
      </p>
      <div className="flex gap-x-14 gap-y-7 mt-10 flex-wrap">
        <div>
          <div className="text-4xl md:text-5xl font-bold leading-none">
            <span className="text-[#8EF0B5]">100+</span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 mt-3">
            {t('eco_story_stat1_label')}
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold leading-none">
            <span className="text-[#8EF0B5]">9+</span>{' '}
            <span className="text-white/90">{t('eco_story_stat2_value')}</span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 mt-3">
            {t('eco_story_stat2_label')}
          </div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold leading-none text-white/90">
            360°
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 mt-3">
            {t('eco_story_stat3_label')}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * SERVICE SLIDE — used by mobile vertical stack
 * ============================================================ */

function ServiceSlide({ service }: { service: Service }) {
  const { t } = useLanguage();
  const isMint = service.accent === 'mint';
  return (
    <div
      className="relative w-full max-w-[920px] rounded-3xl border border-white/[0.08] bg-[#13151A] p-10 md:p-14 overflow-hidden"
      style={{
        boxShadow:
          '0 40px 100px -30px rgba(0,0,0,0.7), 0 0 60px -30px rgba(142,240,181,0.18)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${service.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,12,16,0.55) 0%, rgba(11,12,16,0.82) 60%, rgba(11,12,16,0.92) 100%)',
        }}
      />
      <span
        className={`absolute top-0 left-0 h-[2px] w-1/2 ${
          isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
        }`}
      />
      <div className="relative">
        <div className="font-mono text-sm text-gray-500 tracking-[0.2em]">
          {service.idx}
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5 leading-[1.05]">
          {t(service.titleKey)}
        </h2>
        <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mt-6 max-w-[64ch]">
          {t(service.bodyKey)}
        </p>
        <div className="mt-8 pt-6 border-t border-dashed border-white/[0.12] max-w-[64ch]">
          <b
            className={`block font-mono text-xs uppercase tracking-[0.16em] mb-2 font-medium ${
              isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
            }`}
          >
            {t('eco_service_fit')}
          </b>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            {t(service.fitKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * MINI PROJECT CARD — used by mobile vertical stack
 * ============================================================ */

function MiniProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const isMint = project.accent === 'mint';
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13151A] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${project.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,12,16,0.45) 0%, rgba(11,12,16,0.85) 100%)',
        }}
      />
      <span
        className={`absolute top-0 left-0 h-px w-1/3 ${
          isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
        }`}
      />
      <div className="relative h-full flex flex-col justify-center items-center text-center p-[4%]">
        <div
          className={`flex items-center gap-1.5 font-mono text-[clamp(8px,0.7vw,10px)] uppercase tracking-[0.16em] ${
            isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
          }`}
        >
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
            }`}
          />
          {t(project.typeKey)}
        </div>
        <h3 className="font-bold tracking-tight text-white leading-[1] mt-[6%] text-[clamp(14px,1.6vw,22px)]">
          {project.brand}
        </h3>
        <p className="text-[#9CA3AF] text-[clamp(8px,0.7vw,11px)] mt-[6%] max-w-[80%] leading-snug">
          {t(project.metricKey)}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
 * PROCESS SLIDE — used by both desktop and mobile process list
 * ============================================================ */

function ProcessSlide({
  step,
  totalSteps,
}: {
  step: Step;
  totalSteps: number;
}) {
  const { t } = useLanguage();
  const stepNum = parseInt(step.idx, 10);
  return (
    <div className="relative w-full max-w-[1000px]">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-gray-500 mb-6">
        <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
        {t('eco_step_label')}
      </div>

      <div className="flex items-start gap-8 md:gap-12">
        <div className="shrink-0 pt-2">
          <div className="font-mono text-sm text-[#8EF0B5] mb-2 border-t-2 border-[#8EF0B5] pt-3 inline-block min-w-[44px]">
            {step.idx}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]">
            {t(step.titleKey)}
            <span className="text-[#8EF0B5]">.</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg md:text-xl leading-relaxed mt-6 max-w-[60ch]">
            {t(step.bodyKey)}
          </p>

          <div className="mt-10 flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i + 1 === stepNum
                    ? 'w-12 bg-[#8EF0B5] shadow-[0_0_10px_rgba(142,240,181,0.7)]'
                    : i + 1 < stepNum
                      ? 'w-6 bg-white/30'
                      : 'w-6 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * WORK CARD — Lume-style sticky stacking card
 * ============================================================ */

type WorkCardProps = {
  index: number;
  total: number;
  eyebrow: string;
  title: string;
  description: string;
  bgImage: string;
  accent: 'mint' | 'purple';
  href?: string;
};

function WorkCard({
  index,
  total,
  eyebrow,
  title,
  description,
  bgImage,
  accent,
  href,
}: WorkCardProps) {
  const isMint = accent === 'mint';
  const topOffset = 96 + index * 14;
  const accentColor = isMint ? '#8EF0B5' : '#c084fc';
  const accentBorder = isMint
    ? 'rgba(142,240,181,0.32)'
    : 'rgba(168,85,247,0.32)';
  const accentGlow = isMint
    ? 'rgba(142,240,181,0.18)'
    : 'rgba(168,85,247,0.18)';

  const inner = (
    <div
      className="relative w-full overflow-hidden rounded-[28px] border"
      style={{
        borderColor: accentBorder,
        background: '#0E1014',
        height: 'min(78vh, 720px)',
        boxShadow: `0 30px 80px -30px rgba(0,0,0,0.7), 0 0 60px -20px ${accentGlow}`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,12,16,0.18) 0%, rgba(11,12,16,0.55) 50%, rgba(11,12,16,0.92) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
        style={{
          background: isMint
            ? 'radial-gradient(120% 100% at 0% 0%, rgba(142,240,181,0.22) 0%, transparent 55%)'
            : 'radial-gradient(120% 100% at 100% 0%, rgba(168,85,247,0.28) 0%, transparent 55%)',
        }}
      />
      <span
        className="absolute top-0 left-0 h-[3px] w-1/3"
        style={{
          background: accentColor,
          boxShadow: `0 0 16px ${accentColor}`,
        }}
      />

      <div className="absolute top-6 left-6 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {href && (
        <span
          aria-hidden
          className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.14] flex items-center justify-center text-white group-hover:bg-[#8EF0B5] group-hover:text-black group-hover:border-transparent transition-colors"
        >
          <ArrowUpRight size={20} strokeWidth={1.8} />
        </span>
      )}

      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-14">
        <div
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] mb-4"
          style={{ color: accentColor }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          {eyebrow}
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.04] max-w-[18ch]">
          {title}
        </h3>
        <p className="text-[#9CA3AF] text-base md:text-lg mt-5 max-w-[60ch] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="sticky" style={{ top: `${topOffset}px` }}>
      {href ? (
        <Link
          href={href}
          aria-label={`Open ${title} case study`}
          className="group block"
        >
          {inner}
        </Link>
      ) : (
        <div className="group">{inner}</div>
      )}
    </div>
  );
}

/* ============================================================
 * MAIN — Desktop
 * ============================================================ */

export function EcommerceScrollStory() {
  const { t } = useLanguage();

  const cards: WorkCardProps[] = [
    ...SERVICES.map((s, i) => ({
      index: i,
      total: SERVICES.length + PROJECTS.length,
      eyebrow: `${t('eco_service_label')} · ${s.idx}`,
      title: t(s.titleKey),
      description: t(s.bodyKey),
      bgImage: s.bgImage,
      accent: s.accent,
      href: undefined,
    })),
    ...PROJECTS.map((p, i) => ({
      index: SERVICES.length + i,
      total: SERVICES.length + PROJECTS.length,
      eyebrow: t(p.typeKey),
      title: p.brand,
      description: t(p.metricKey),
      bgImage: p.bgImage,
      accent: p.accent,
      href: `/case-studies/${p.slug}`,
    })),
  ];

  return (
    <section className="hidden md:block bg-[#0B0C10] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, rgba(88,28,135,0.10) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142,240,181,0.04) 0%, transparent 40%)',
        }}
      />

      {/* Intro */}
      <div className="relative max-w-[1280px] mx-auto px-8 pt-32 pb-20">
        <HeroSlide />
      </div>

      {/* Stacking work cards */}
      <div className="relative max-w-[1380px] mx-auto px-8 pb-[24vh]">
        <div className="space-y-[24vh]">
          {cards.map((card, i) => (
            <WorkCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="relative max-w-[1180px] mx-auto px-8 pb-32">
        <div className="mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">
            <span className="block w-6 h-px bg-[#8EF0B5]" />
            {t('eco_story_approach_label')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-[16ch]">
            {t('eco_steps_h2_mobile')}
          </h2>
        </div>
        <div className="space-y-20">
          {STEPS.map((step) => (
            <ProcessSlide key={step.idx} step={step} totalSteps={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * MAIN — Mobile (unchanged static vertical stack)
 * ============================================================ */

export function EcommerceScrollStoryMobile() {
  const { t } = useLanguage();
  return (
    <div className="md:hidden">
      <section className="pt-28 pb-14 px-6">
        <HeroSlide />
      </section>
      <section className="py-10 px-6 space-y-6 border-t border-white/[0.06]">
        {SERVICES.map((s) => (
          <ServiceSlide key={s.idx} service={s} />
        ))}
      </section>
      <section className="py-14 px-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 mb-4">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
          {t('eco_projects_label')}
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="text-[#8EF0B5]">{t('eco_projects_h2_a')}</span>{' '}
          {t('eco_projects_h2_mobile_b')}
        </h2>
        <div className="space-y-3">
          {PROJECTS.map((p) => (
            <div key={p.brand} className="h-32">
              <MiniProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
      <section className="py-14 px-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 mb-4">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
          {t('eco_story_approach_label')}
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-8 leading-[1.1]">
          {t('eco_steps_h2_mobile')}
        </h2>
        <div className="space-y-8">
          {STEPS.map((s) => (
            <ProcessSlide key={s.idx} step={s} totalSteps={STEPS.length} />
          ))}
        </div>
      </section>
    </div>
  );
}
