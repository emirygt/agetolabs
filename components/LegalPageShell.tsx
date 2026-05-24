'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RobotCompanion } from '@/components/RobotCompanion';

type Props = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageShell({ eyebrow, title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[-20%] w-[40%] h-[40%] bg-[#8EF0B5]/[0.05] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/[0.07] blur-[140px] rounded-full" />
      </div>

      <Header />
      <RobotCompanion />

      <main className="relative z-10 flex-1 max-w-[820px] mx-auto w-full px-6 pt-32 pb-24">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8EF0B5]/80 mb-6">
          <span className="block w-8 h-px bg-[#8EF0B5]/60" />
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-12 font-mono uppercase tracking-[0.18em]">
          Last updated · {lastUpdated}
        </p>

        <article className="prose-legal space-y-8 text-gray-300 leading-relaxed">
          {children}
        </article>
      </main>

      <Footer />
    </div>
  );
}
