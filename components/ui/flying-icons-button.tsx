'use client';

import {
  useRef,
  useState,
  startTransition,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type FlyingIcon = {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  rotation: number;
};

type Props = {
  label: string;
  href: string;
  className?: string;

  /** Override colors. Defaults use brand mint scheme. */
  buttonColor?: string;
  hoverButtonColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  iconColor?: string;

  iconSize?: number;
  flySpeed?: number;
  fadeSpeed?: number;
  spreadDistance?: number;

  /** Custom icon SVG path (defaults to envelope). */
  iconPath?: ReactNode;

  /** Px padding (top, right, bottom, left). */
  paddingY?: number;
  paddingX?: number;
  borderRadius?: number | string;
};

const DEFAULT_ICON_PATH = (
  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
);

export function FlyingIconsButton({
  label,
  href,
  className,
  buttonColor = '#8EF0B5',
  hoverButtonColor = '#ffffff',
  textColor = '#000000',
  hoverTextColor = '#000000',
  iconColor = '#0B0C10',
  iconSize = 18,
  flySpeed = 1,
  fadeSpeed = 1,
  spreadDistance = 110,
  iconPath = DEFAULT_ICON_PATH,
  paddingY = 10,
  paddingX = 22,
  borderRadius = 9999,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [icons, setIcons] = useState<FlyingIcon[]>([]);
  const wrapperRef = useRef<HTMLAnchorElement | null>(null);
  const iconIdCounter = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseEnter = () => {
    startTransition(() => setIsHovered(true));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!wrapperRef.current || !isHovered) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastSpawnPos.current) {
      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      if (Math.hypot(dx, dy) < 5) return;
    }
    lastSpawnPos.current = { x, y };

    const newIcon: FlyingIcon = {
      id: iconIdCounter.current++,
      startX: x,
      startY: y,
      angle: (Math.random() - 0.5) * 60,
      speed: 0.8 + Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 720,
    };
    startTransition(() => setIcons((prev) => [...prev, newIcon]));
  };

  const handleMouseLeave = () => {
    startTransition(() => {
      setIsHovered(false);
      setIcons([]);
      lastSpawnPos.current = null;
    });
  };

  const handleAnimationComplete = (id: number) => {
    startTransition(() =>
      setIcons((prev) => prev.filter((icon) => icon.id !== id))
    );
  };

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: 'max-content',
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: isHovered ? hoverButtonColor : buttonColor,
    color: isHovered ? hoverTextColor : textColor,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius:
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    transition: 'background-color 0.2s ease, color 0.2s ease',
    overflow: 'visible',
    boxShadow:
      '0 0 24px rgba(142,240,181,0.25), 0 8px 24px -10px rgba(0,0,0,0.4)',
  };

  return (
    <Link
      ref={wrapperRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={wrapperStyle}
      className={cn('select-none focus-visible:outline-none', className)}
    >
      <span
        style={buttonStyle}
        className="relative inline-flex items-center justify-center text-sm font-semibold tracking-tight cursor-pointer"
      >
        {label}
      </span>

      {icons.map((icon) => {
        const radians = (icon.angle * Math.PI) / 180;
        const distance = spreadDistance * 3;
        const dx = Math.cos(radians) * distance;
        const dy = Math.sin(radians) * distance;
        return (
          <motion.div
            key={icon.id}
            initial={{
              x: icon.startX,
              y: icon.startY,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            animate={{
              x: icon.startX + dx,
              y: icon.startY + dy,
              opacity: 0,
              scale: 0.5,
              rotate: icon.rotation,
            }}
            transition={{
              duration: flySpeed * icon.speed,
              ease: 'linear',
              opacity: { duration: fadeSpeed * icon.speed },
            }}
            onAnimationComplete={() => handleAnimationComplete(icon.id)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill={iconColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              {iconPath}
            </svg>
          </motion.div>
        );
      })}
    </Link>
  );
}

export default FlyingIconsButton;
