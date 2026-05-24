'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

type Project = {
  brand: string;
  type: string;
  metric: string;
  pos: { top: string; left: string };
  size: { w: string; h: string };
  accent: 'mint' | 'purple';
};

const PROJECTS: Project[] = [
  {
    brand: 'Turkcell Pasaj',
    type: 'Enterprise platform migration',
    metric: '10M+ MAU · uçtan uca yeniden mimari',
    pos: { top: '50%', left: '50%' },
    size: { w: '28vw', h: '34vh' },
    accent: 'mint',
  },
  {
    brand: 'Samsung',
    type: 'Marketplace + ERP sync',
    metric: 'Çoklu pazaryeri konsolidasyonu',
    pos: { top: '30%', left: '22%' },
    size: { w: '22vw', h: '24vh' },
    accent: 'purple',
  },
  {
    brand: 'Lacoste',
    type: 'OMS + WMS integration',
    metric: 'Omnichannel envanter senkronizasyonu',
    pos: { top: '28%', left: '78%' },
    size: { w: '22vw', h: '24vh' },
    accent: 'mint',
  },
  {
    brand: 'Converse',
    type: 'Multi-channel orchestration',
    metric: 'Pazaryeri + retail + DTC tek panel',
    pos: { top: '72%', left: '24%' },
    size: { w: '22vw', h: '22vh' },
    accent: 'purple',
  },
  {
    brand: 'Vatan Bilgisayar',
    type: 'High-traffic platform',
    metric: '50K+ SKU · peak-load mimarisi',
    pos: { top: '74%', left: '76%' },
    size: { w: '24vw', h: '24vh' },
    accent: 'mint',
  },
  {
    brand: 'English Home',
    type: 'Custom B2C platform',
    metric: 'Sıfırdan checkout + sadakat sistemi',
    pos: { top: '50%', left: '8%' },
    size: { w: '18vw', h: '30vh' },
    accent: 'purple',
  },
  {
    brand: 'GS Store',
    type: 'Real-time price intelligence',
    metric: 'Rakip fiyat tarama + dinamik pricing',
    pos: { top: '50%', left: '92%' },
    size: { w: '20vw', h: '26vh' },
    accent: 'mint',
  },
];

const SCALES: [number, number][] = [
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 5],
  [1, 6],
  [1, 8],
  [1, 9],
];

function ProjectCard({ project }: { project: Project }) {
  const isMint = project.accent === 'mint';
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13151A] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background: isMint
            ? 'radial-gradient(120% 100% at 0% 0%, rgba(142,240,181,0.18) 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, rgba(168,85,247,0.08) 0%, transparent 55%)'
            : 'radial-gradient(120% 100% at 100% 0%, rgba(168,85,247,0.20) 0%, transparent 55%), radial-gradient(120% 100% at 0% 100%, rgba(142,240,181,0.06) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      <div className="relative h-full flex flex-col justify-center items-center text-center p-[3%]">
        <div
          className={`flex items-center gap-2 font-mono text-[clamp(8px,0.85vw,11px)] uppercase tracking-[0.18em] ${
            isMint ? 'text-[#8EF0B5]' : 'text-[#c084fc]'
          }`}
        >
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
            }`}
            style={{
              boxShadow: `0 0 8px ${
                isMint ? 'rgba(142,240,181,0.9)' : 'rgba(192,132,252,0.9)'
              }`,
            }}
          />
          {project.type}
        </div>

        <h3 className="font-bold tracking-tight text-white leading-[1] mt-[5%] text-[clamp(20px,2.6vw,40px)]">
          {project.brand}
        </h3>

        <p className="text-[#9CA3AF] text-[clamp(9px,0.9vw,12px)] mt-[5%] max-w-[80%] leading-snug">
          {project.metric}
        </p>
      </div>

      <span
        aria-hidden
        className={`absolute top-0 left-0 h-px w-1/3 ${
          isMint ? 'bg-[#8EF0B5]' : 'bg-[#c084fc]'
        }`}
        style={{
          boxShadow: `0 0 12px ${
            isMint ? 'rgba(142,240,181,0.6)' : 'rgba(192,132,252,0.6)'
          }`,
        }}
      />
    </div>
  );
}

export function ProjectsZoom() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const s0 = useTransform(scrollYProgress, [0, 1], SCALES[0]);
  const s1 = useTransform(scrollYProgress, [0, 1], SCALES[1]);
  const s2 = useTransform(scrollYProgress, [0, 1], SCALES[2]);
  const s3 = useTransform(scrollYProgress, [0, 1], SCALES[3]);
  const s4 = useTransform(scrollYProgress, [0, 1], SCALES[4]);
  const s5 = useTransform(scrollYProgress, [0, 1], SCALES[5]);
  const s6 = useTransform(scrollYProgress, [0, 1], SCALES[6]);
  const scales: MotionValue<number>[] = [s0, s1, s2, s3, s4, s5, s6];

  const labelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);

  return (
    <section
      ref={container}
      id="projeler"
      className="relative h-[300vh] hidden md:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0B0C10]">
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute top-0 left-0 right-0 z-10 pt-28 px-8 pointer-events-none"
        >
          <div className="max-w-[1180px] mx-auto">
            <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
              Referans projeler
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 max-w-[20ch] leading-[1.1]">
              <span className="text-[#8EF0B5]">100+</span> kurumsal e-ticaret projesinde görev aldık.
            </h2>
          </div>
        </motion.div>

        {PROJECTS.map((p, i) => (
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
            <motion.div
              style={{ scale: scales[i], width: '100%', height: '100%', willChange: 'transform' }}
            >
              <ProjectCard project={p} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsMobile() {
  return (
    <section
      id="projeler"
      className="md:hidden py-14 px-6 border-t border-white/[0.06]"
    >
      <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 mb-4">
        <span className="block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] shadow-[0_0_10px_#8EF0B5]" />
        Referans projeler
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-8 leading-[1.1]">
        <span className="text-[#8EF0B5]">100+</span> kurumsal e-ticaret projesi.
      </h2>
      <div className="space-y-3">
        {PROJECTS.map((p) => (
          <div key={p.brand} className="h-32">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
