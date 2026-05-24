'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';

export type LimelightNavItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

type Props = {
  items: LimelightNavItem[];
  activeKey?: string;
  defaultActiveIndex?: number;
  onChange?: (key: string, index: number) => void;
  className?: string;
  size?: 'sm' | 'md';
};

export function LimelightNav({
  items,
  activeKey,
  defaultActiveIndex = 0,
  onChange,
  className,
  size = 'md',
}: Props) {
  const findIdx = (key?: string) => {
    if (!key) return defaultActiveIndex;
    const i = items.findIndex((it) => it.key === key);
    return i >= 0 ? i : defaultActiveIndex;
  };

  const [activeIdx, setActiveIdx] = useState(() => findIdx(activeKey));
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    setActiveIdx(findIdx(activeKey));
  }, [activeKey, items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const measure = () => {
    const el = itemRefs.current[activeIdx];
    if (!el) return;
    setBar({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, items.length]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const sizeClasses = size === 'sm'
    ? 'px-1 py-1 text-[13px]'
    : 'px-1.5 py-1.5 text-sm';

  const itemSize = size === 'sm'
    ? 'px-3.5 py-1.5 gap-1.5'
    : 'px-4 py-2 gap-2';

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative inline-flex items-stretch rounded-full bg-[#13151A]/80 backdrop-blur-md border border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_28px_rgba(0,0,0,0.4)]',
        sizeClasses,
        className
      )}
    >
      <span
        className="pointer-events-none absolute -top-[1px] h-[3px] rounded-full bg-[#8EF0B5] z-20"
        style={{
          transform: `translateX(${bar.left}px)`,
          width: `${bar.width}px`,
          opacity: bar.ready ? 1 : 0,
          transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out',
          boxShadow:
            '0 0 14px rgba(142,240,181,1), 0 0 32px rgba(142,240,181,0.75), 0 0 64px rgba(142,240,181,0.45), 0 0 96px rgba(168,85,247,0.28)',
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute top-0 z-0 overflow-hidden"
        style={{
          transform: `translateX(${bar.left - bar.width * 0.12}px)`,
          width: `${bar.width * 1.24}px`,
          height: '150%',
          opacity: bar.ready ? 1 : 0,
          transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out',
          clipPath: 'polygon(9.7% 0%, 90.3% 0%, 100% 100%, 0% 100%)',
          background:
            'linear-gradient(180deg, rgba(142,240,181,0.60) 0%, rgba(142,240,181,0.32) 22%, rgba(142,240,181,0.14) 45%, rgba(168,85,247,0.08) 70%, transparent 100%)',
          filter: 'blur(0.5px)',
        }}
        aria-hidden
      />

      {items.map((item, i) => {
        const isActive = i === activeIdx;
        const baseClass = clsx(
          'group relative z-10 inline-flex items-center justify-center rounded-full font-medium tracking-[-0.005em] transition-colors duration-300',
          itemSize,
          isActive
            ? 'text-white drop-shadow-[0_0_8px_rgba(142,240,181,0.55)]'
            : 'text-gray-400 hover:text-white'
        );

        const content = (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(ellipse 90% 130% at 50% -20%, rgba(142,240,181,0.16) 0%, rgba(142,240,181,0.06) 35%, transparent 75%)',
              }}
            />
            {item.icon && (
              <span
                className={clsx(
                  'relative inline-flex h-4 w-4 items-center justify-center transition-colors duration-300',
                  isActive
                    ? 'text-[#8EF0B5] drop-shadow-[0_0_6px_rgba(142,240,181,0.9)]'
                    : 'text-gray-500 group-hover:text-[#8EF0B5]'
                )}
              >
                {item.icon}
              </span>
            )}
            <span className="relative">{item.label}</span>
          </>
        );

        const setRef = (el: HTMLElement | null) => {
          itemRefs.current[i] = el;
        };

        const handleClick = () => {
          setActiveIdx(i);
          onChange?.(item.key, i);
          item.onClick?.();
        };

        if (item.href) {
          return (
            <Link
              key={item.key}
              href={item.href}
              ref={setRef as React.Ref<HTMLAnchorElement>}
              onClick={handleClick}
              className={baseClass}
            >
              {content}
            </Link>
          );
        }
        return (
          <button
            key={item.key}
            type="button"
            ref={setRef as React.Ref<HTMLButtonElement>}
            onClick={handleClick}
            className={baseClass}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
