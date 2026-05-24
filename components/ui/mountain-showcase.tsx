'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'motion/react';
import * as Icons from 'lucide-react';
import { MountainScene } from '@/components/ui/mountain-scene';
import { cn } from '@/lib/utils';

export type ScatterItem = {
  id: string;
  label: string;
  icon?: keyof typeof Icons;
  href?: string;
  /** Position in % across the showcase area. */
  x: number; // 0–100
  y: number; // 0–100
  /** Relative size of the chip. 0.8 = small, 1.2 = large. */
  size?: number;
  /** Visual style — chip is text-only, card has icon prefix. */
  variant?: 'chip' | 'card';
  accent?: 'mint' | 'purple' | 'white';
};

type Props = {
  items: ScatterItem[];
  className?: string;
  /** Mountain scene tint color. */
  mountainColor?: string;
  /** Pixel radius around the cursor where items reach full brightness. */
  glowRadius?: number;
};

export function MountainShowcase({
  items,
  className,
  mountainColor = '#8EF0B5',
  glowRadius = 220,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Shared mouse position relative to the container (used by every item).
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const leave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };
    window.addEventListener('mousemove', handle);
    containerRef.current?.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', handle);
      containerRef.current?.removeEventListener('mouseleave', leave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-[680px] overflow-hidden border-y border-white/[0.06]',
        className
      )}
    >
      <MountainScene color={mountainColor} />

      {/* Top/bottom sky-fade to blend cards into scene */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,12,16,0.85) 0%, rgba(11,12,16,0.25) 18%, transparent 45%, transparent 70%, rgba(11,12,16,0.5) 92%, rgba(11,12,16,0.95) 100%)',
        }}
      />

      {/* Scattered items */}
      <div className="absolute inset-0 z-20">
        {items.map((item) => (
          <ScatterChip
            key={item.id}
            item={item}
            mouseX={mouseX}
            mouseY={mouseY}
            glowRadius={glowRadius}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * Single scattered chip — opacity + scale driven by mouse distance
 * ============================================================ */

type ChipProps = {
  item: ScatterItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  glowRadius: number;
};

function ScatterChip({ item, mouseX, mouseY, glowRadius }: ChipProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const chipCenter = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      chipCenter.current = {
        x: r.left - parentRect.left + r.width / 2,
        y: r.top - parentRect.top + r.height / 2,
      };
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // brightness: 0..1 based on distance to mouse
  const brightness = useTransform([mouseX, mouseY] as any, (latest) => {
    const [mx, my] = latest as number[];
    if (mx < -1000) return 0; // mouse outside → dimmed to base
    const dx = mx - chipCenter.current.x;
    const dy = my - chipCenter.current.y;
    const dist = Math.hypot(dx, dy);
    return Math.max(0, 1 - dist / glowRadius);
  });

  // Proximity-based values (mouse near, not on)
  const opacity = useTransform(brightness, [0, 1], [0.16, 1]);
  const scale = useTransform(brightness, [0, 1], [0.94, 1.08]);
  const glowAlpha = useTransform(brightness, [0, 1], [0, 0.55]);
  const boxShadow = useTransform(
    glowAlpha,
    (a) => `0 0 24px rgba(142,240,181,${a}), 0 12px 30px -10px rgba(0,0,0,0.6)`
  );
  const borderColor = useTransform(
    brightness,
    [0, 1],
    ['rgba(255,255,255,0.10)', 'rgba(142,240,181,0.7)']
  );

  const Icon = item.icon ? (Icons[item.icon] as Icons.LucideIcon | undefined) : undefined;
  const accentClass =
    item.accent === 'purple'
      ? 'text-[#c084fc]'
      : item.accent === 'white'
        ? 'text-white'
        : 'text-[#8EF0B5]';
  const size = item.size ?? 1;
  const isCard = item.variant === 'card';

  const Wrapper = item.href ? Link : ('div' as any);
  const wrapperProps = item.href ? { href: item.href } : {};

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: 'translate(-50%, -50%)',
        // Hover wins over proximity dimming/scaling so the chip pops clearly
        opacity: hovered ? 1 : (opacity as any),
        scale: hovered ? 1.2 : (scale as any),
      }}
      className="will-change-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Wrapper
        ref={ref as any}
        {...wrapperProps}
        className={cn(
          'group relative inline-flex items-center gap-2 rounded-full',
          'backdrop-blur-md border',
          'transition-colors cursor-pointer',
          // Distinct hover skin: warm amber/white — clearly different from the mint mountain
          hovered
            ? 'bg-[#1a1410]/95 ring-2 ring-[#fbbf24]/70'
            : 'bg-[#0d0e12]/65'
        )}
      >
        {/* proximity glow layer (subtle mint) */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: hovered
              ? '0 0 0 1px rgba(255,255,255,0.85), 0 0 24px rgba(251,191,36,0.65), 0 0 56px rgba(251,191,36,0.35), 0 16px 40px -10px rgba(0,0,0,0.7)'
              : (boxShadow as any),
            borderColor: hovered ? '#fbbf24' : (borderColor as any),
          }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none border"
          style={{
            borderColor: hovered ? 'rgba(251,191,36,0.95)' : (borderColor as any),
          }}
        />
        <span
          className={cn(
            'relative z-10 inline-flex items-center gap-2',
            isCard ? 'px-4 py-2.5' : 'px-3.5 py-2'
          )}
          style={{ fontSize: `${13 * size}px` }}
        >
          {Icon && (
            <span
              className={cn(
                'shrink-0 transition-colors',
                hovered ? 'text-[#fbbf24]' : accentClass
              )}
            >
              <Icon size={14 * size} strokeWidth={1.8} />
            </span>
          )}
          <span
            className={cn(
              'font-medium tracking-tight whitespace-nowrap transition-colors',
              hovered ? 'text-[#fef3c7] font-semibold' : 'text-white'
            )}
          >
            {item.label}
          </span>
        </span>
      </Wrapper>
    </motion.div>
  );
}

export default MountainShowcase;
