'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
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
  typeKey: TKey;
  metricKey: TKey;
  pos: { top: string; left: string };
  size: { w: string; h: string };
  accent: 'mint' | 'purple';
  bgImage: string;
};

const PROJECTS: Project[] = [
  {
    brand: 'Turkcell Pasaj',
    typeKey: 'eco_project_turkcell_type',
    metricKey: 'eco_project_turkcell_metric',
    pos: { top: '50%', left: '50%' },
    size: { w: '24vw', h: '32vh' },
    accent: 'mint',
    bgImage: '/ecommerce/projects/turkcell-pasaj.png',
  },
  {
    brand: 'Samsung',
    typeKey: 'eco_project_samsung_type',
    metricKey: 'eco_project_samsung_metric',
    pos: { top: '30%', left: '22%' },
    size: { w: '20vw', h: '22vh' },
    accent: 'purple',
    bgImage: '/ecommerce/projects/samsung.png',
  },
  {
    brand: 'Lacoste',
    typeKey: 'eco_project_lacoste_type',
    metricKey: 'eco_project_lacoste_metric',
    pos: { top: '28%', left: '78%' },
    size: { w: '20vw', h: '22vh' },
    accent: 'mint',
    bgImage: '/ecommerce/projects/lacoste.png',
  },
  {
    brand: 'Converse',
    typeKey: 'eco_project_converse_type',
    metricKey: 'eco_project_converse_metric',
    pos: { top: '72%', left: '24%' },
    size: { w: '20vw', h: '20vh' },
    accent: 'purple',
    bgImage: '/ecommerce/projects/converse.png',
  },
  {
    brand: 'Vatan Bilgisayar',
    typeKey: 'eco_project_vatan_type',
    metricKey: 'eco_project_vatan_metric',
    pos: { top: '74%', left: '76%' },
    size: { w: '22vw', h: '22vh' },
    accent: 'mint',
    bgImage: '/ecommerce/projects/vatan.png',
  },
  {
    brand: 'English Home',
    typeKey: 'eco_project_english_home_type',
    metricKey: 'eco_project_english_home_metric',
    pos: { top: '50%', left: '8%' },
    size: { w: '16vw', h: '28vh' },
    accent: 'purple',
    bgImage: '/ecommerce/projects/english-home.png',
  },
  {
    brand: 'GS Store',
    typeKey: 'eco_project_gs_store_type',
    metricKey: 'eco_project_gs_store_metric',
    pos: { top: '50%', left: '92%' },
    size: { w: '18vw', h: '24vh' },
    accent: 'mint',
    bgImage: '/ecommerce/projects/gs-store.png',
  },
];

/* ============================================================
 * SCENE PRIMITIVE — opacity + scale per scroll range
 * ============================================================ */

const TOTAL_SCENES = 17;
const VH_PER_SCENE = 90;

type SceneChildren =
  | ReactNode
  | ((sceneProgress: MotionValue<number>) => ReactNode);

type SceneProps = {
  scrollY: MotionValue<number>;
  index: number;
  children: SceneChildren;
};

function Scene({ scrollY, index, children }: SceneProps) {
  const sliceSize = 1 / TOTAL_SCENES;
  const start = index * sliceSize;
  const end = (index + 1) * sliceSize;
  const fadeIn = Math.max(0, start - sliceSize * 0.15);
  const fadeOut = Math.min(1, end + sliceSize * 0.15);

  const opacity = useTransform(
    scrollY,
    [fadeIn, start + sliceSize * 0.05, end - sliceSize * 0.05, fadeOut],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollY,
    [fadeIn, start + sliceSize * 0.05, end - sliceSize * 0.05, fadeOut],
    [0.94, 1, 1, 1.04]
  );

  const sceneProgress = useTransform(
    scrollY,
    [start + sliceSize * 0.05, end - sliceSize * 0.05],
    [0, 1],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      {typeof children === 'function' ? children(sceneProgress) : children}
    </motion.div>
  );
}

/* ============================================================
 * STAGED HERO REVEAL — title big → disperse → card
 * ============================================================ */

type StagedHeroProps = {
  sceneProgress: MotionValue<number>;
  eyebrow: string;
  title: string;
  accent: 'mint' | 'purple';
  bgImage: string;
  children: ReactNode;
};

function StagedHero({
  sceneProgress,
  eyebrow,
  title,
  accent,
  bgImage,
  children,
}: StagedHeroProps) {
  const isMint = accent === 'mint';
  const parts = title.split(' ');
  const firstWord = parts[0] ?? '';
  const restTitle = parts.slice(1).join(' ');

  const heroTitleOpacity = useTransform(
    sceneProgress,
    [0, 0.4, 0.55],
    [1, 1, 0]
  );
  const heroEyebrowOpacity = useTransform(
    sceneProgress,
    [0, 0.35, 0.5],
    [1, 1, 0]
  );
  const firstWordX = useTransform(
    sceneProgress,
    [0.3, 0.6],
    ['0vw', '-35vw']
  );
  const restWordX = useTransform(sceneProgress, [0.3, 0.6], ['0vw', '35vw']);
  const cardOpacity = useTransform(sceneProgress, [0.45, 0.7], [0, 1]);
  const cardScale = useTransform(sceneProgress, [0.45, 0.7], [0.85, 1]);
  const bgScale = useTransform(sceneProgress, [0, 1], [1.08, 1]);

  return (
    <div className="relative w-full h-full">
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          scale: bgScale,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(11,12,16,0.45) 0%, rgba(11,12,16,0.85) 70%, rgba(11,12,16,0.95) 100%)',
        }}
      />

      <motion.div
        style={{ opacity: heroTitleOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          style={{ opacity: heroEyebrowOpacity }}
          className={`flex items-center justify-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.18em] mb-8 ${
            isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
          }`}
        >
          <span
            className={`block w-8 h-px ${
              isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
            }`}
          />
          {eyebrow}
          <span
            className={`block w-8 h-px ${
              isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
            }`}
          />
        </motion.div>
        <div className="flex flex-col items-center gap-3 md:gap-5 max-w-[20ch]">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-white"
            style={{ x: firstWordX }}
          >
            {firstWord}
          </motion.h2>
          {restTitle && (
            <motion.h2
              className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] ${
                isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
              }`}
              style={{ x: restWordX }}
            >
              {restTitle}
            </motion.h2>
          )}
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ============================================================
 * SLIDES
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
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 pointer-events-none mix-blend-screen"
        style={{
          background: isMint
            ? 'radial-gradient(120% 90% at 0% 0%, rgba(142,240,181,0.15) 0%, transparent 55%), radial-gradient(120% 90% at 100% 100%, rgba(168,85,247,0.06) 0%, transparent 55%)'
            : 'radial-gradient(120% 90% at 100% 0%, rgba(168,85,247,0.18) 0%, transparent 55%), radial-gradient(120% 90% at 0% 100%, rgba(142,240,181,0.05) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      <span
        className={`absolute top-0 left-0 h-[2px] w-1/2 ${
          isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
        }`}
        style={{
          boxShadow: `0 0 16px ${
            isMint ? 'rgba(142,240,181,0.6)' : 'rgba(192,132,252,0.6)'
          }`,
        }}
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
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          background: isMint
            ? 'radial-gradient(120% 100% at 0% 0%, rgba(142,240,181,0.18) 0%, transparent 55%)'
            : 'radial-gradient(120% 100% at 100% 0%, rgba(168,85,247,0.18) 0%, transparent 55%)',
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

function ProjectsIntroSlide() {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 pt-32 px-8 pointer-events-none">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
            {t('eco_projects_label')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 max-w-[22ch] leading-[1.1]">
            <span className="text-[#8EF0B5]">{t('eco_projects_h2_a')}</span>{' '}
            {t('eco_projects_h2_b')}
          </h2>
        </div>
      </div>

      {PROJECTS.map((p) => (
        <div
          key={p.brand}
          style={{
            position: 'absolute',
            top: p.pos.top,
            left: p.pos.left,
            width: p.size.w,
            height: p.size.h,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <MiniProjectCard project={p} />
        </div>
      ))}
    </div>
  );
}

function ProjectHeroSlide({ project }: { project: Project }) {
  const { t } = useLanguage();
  const isMint = project.accent === 'mint';
  return (
    <div
      className="relative w-full max-w-[1100px] aspect-[16/9] rounded-3xl border border-white/[0.08] bg-[#13151A] overflow-hidden"
      style={{
        boxShadow: `0 50px 120px -30px rgba(0,0,0,0.8), 0 0 80px -30px ${
          isMint ? 'rgba(142,240,181,0.35)' : 'rgba(168,85,247,0.35)'
        }`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${project.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.65,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,12,16,0.35) 0%, rgba(11,12,16,0.75) 70%, rgba(11,12,16,0.9) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{
          background: isMint
            ? 'radial-gradient(120% 100% at 0% 0%, rgba(142,240,181,0.22) 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, rgba(168,85,247,0.10) 0%, transparent 55%)'
            : 'radial-gradient(120% 100% at 100% 0%, rgba(168,85,247,0.28) 0%, transparent 55%), radial-gradient(120% 100% at 0% 100%, rgba(142,240,181,0.08) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />
      <span
        className={`absolute top-0 left-0 h-[3px] w-1/2 ${
          isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
        }`}
        style={{
          boxShadow: `0 0 20px ${
            isMint ? 'rgba(142,240,181,0.8)' : 'rgba(192,132,252,0.8)'
          }`,
        }}
      />

      <div className="relative h-full flex flex-col justify-center items-center text-center px-12 py-12">
        <div
          className={`flex items-center gap-2.5 font-mono text-xs md:text-sm uppercase tracking-[0.22em] ${
            isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
          }`}
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${
              isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
            }`}
            style={{
              boxShadow: `0 0 12px ${
                isMint ? 'rgba(142,240,181,0.9)' : 'rgba(192,132,252,0.9)'
              }`,
            }}
          />
          {t(project.typeKey)}
        </div>
        <h2 className="font-bold tracking-tight text-white leading-[1] mt-8 text-5xl md:text-7xl lg:text-8xl">
          {project.brand}
        </h2>
        <p className="text-[#9CA3AF] text-lg md:text-xl mt-8 max-w-[60ch] leading-relaxed">
          {t(project.metricKey)}
        </p>
      </div>
    </div>
  );
}

function ProcessSlide({ step, totalSteps }: { step: Step; totalSteps: number }) {
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
 * MAIN COMPONENT
 * ============================================================ */

export function EcommerceScrollStory() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const progressBarWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  );

  return (
    <section
      ref={container}
      className="relative hidden md:block"
      style={{ height: `${TOTAL_SCENES * VH_PER_SCENE}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0B0C10]">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(88,28,135,0.18) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142,240,181,0.06) 0%, transparent 40%)',
          }}
        />

        <Scene scrollY={scrollYProgress} index={0}>
          <HeroSlide />
        </Scene>

        {SERVICES.map((service, i) => (
          <Scene
            key={`service-${service.idx}`}
            scrollY={scrollYProgress}
            index={1 + i}
          >
            {(sceneProgress) => (
              <StagedHero
                sceneProgress={sceneProgress}
                eyebrow={`${t('eco_service_label')} · ${service.idx}`}
                title={t(service.titleKey)}
                accent={service.accent}
                bgImage={service.bgImage}
              >
                <ServiceSlide service={service} />
              </StagedHero>
            )}
          </Scene>
        ))}

        <Scene scrollY={scrollYProgress} index={5}>
          <ProjectsIntroSlide />
        </Scene>

        {PROJECTS.map((project, i) => (
          <Scene
            key={`project-${project.brand}`}
            scrollY={scrollYProgress}
            index={6 + i}
          >
            {(sceneProgress) => (
              <StagedHero
                sceneProgress={sceneProgress}
                eyebrow={t(project.typeKey)}
                title={project.brand}
                accent={project.accent}
                bgImage={project.bgImage}
              >
                <ProjectHeroSlide project={project} />
              </StagedHero>
            )}
          </Scene>
        ))}

        <Scene scrollY={scrollYProgress} index={13}>
          <ProcessSlide step={STEPS[0]} totalSteps={STEPS.length} />
        </Scene>
        <Scene scrollY={scrollYProgress} index={14}>
          <ProcessSlide step={STEPS[1]} totalSteps={STEPS.length} />
        </Scene>
        <Scene scrollY={scrollYProgress} index={15}>
          <ProcessSlide step={STEPS[2]} totalSteps={STEPS.length} />
        </Scene>
        <Scene scrollY={scrollYProgress} index={16}>
          <ProcessSlide step={STEPS[3]} totalSteps={STEPS.length} />
        </Scene>

        {/* Progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            style={{ width: progressBarWidth }}
            className="h-full bg-[#8EF0B5] shadow-[0_0_10px_rgba(142,240,181,0.8)]"
          />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll
        </div>
      </div>
    </section>
  );
}

/* Mobile fallback — same content as static vertical stack */
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
