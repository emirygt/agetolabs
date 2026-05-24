'use client';

import {
  forwardRef,
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

type SharedProps = {
  children: ReactNode;
  className?: string;

  /** Visual */
  buttonColor?: string;
  hoverButtonColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  iconColor?: string;
  /** Drop-shadow color applied to the flying icons so they pop on dark backgrounds. */
  iconGlow?: string;

  iconSize?: number;
  iconsPerSpawn?: number;
  flySpeed?: number;
  fadeSpeed?: number;
  spreadDistance?: number;
  /** Distribution range in degrees. Defaults to 360 (full burst). */
  angleRangeDeg?: number;
  /** Center of the angle distribution in degrees. 0 = right, -90 = up. */
  angleCenterDeg?: number;

  /** Custom icon SVG path. */
  iconPath?: ReactNode;

  /** Px padding (y, x) — uses Tailwind classes for height when paddingY is provided alone. */
  paddingY?: number;
  paddingX?: number;
  borderRadius?: number | string;

  fullWidth?: boolean;
  disabled?: boolean;
};

type AsLinkProps = SharedProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type AsButtonProps = SharedProps & {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

export type FlyingIconsButtonProps = AsLinkProps | AsButtonProps;

const DEFAULT_ICON_PATH = (
  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
);

export const FlyingIconsButton = forwardRef<
  HTMLElement,
  FlyingIconsButtonProps
>(function FlyingIconsButton(props, _ref) {
  const {
    children,
    className,
    buttonColor = '#8EF0B5',
    hoverButtonColor = '#ffffff',
    textColor = '#000000',
    hoverTextColor = '#000000',
    iconColor = '#ffffff',
    iconGlow = 'rgba(142,240,181,0.85)',
    iconSize = 22,
    iconsPerSpawn = 2,
    flySpeed = 1,
    fadeSpeed = 1,
    spreadDistance = 140,
    angleRangeDeg = 360,
    angleCenterDeg = 0,
    iconPath = DEFAULT_ICON_PATH,
    paddingY = 10,
    paddingX = 22,
    borderRadius = 9999,
    fullWidth = false,
    disabled = false,
  } = props;

  const isLink = 'href' in props && props.href != null;

  const [isHovered, setIsHovered] = useState(false);
  const [icons, setIcons] = useState<FlyingIcon[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iconIdCounter = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);

  const interactive = !disabled;

  const handleMouseEnter = () => {
    if (!interactive) return;
    startTransition(() => setIsHovered(true));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !wrapperRef.current || !isHovered) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastSpawnPos.current) {
      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      if (Math.hypot(dx, dy) < 4) return;
    }
    lastSpawnPos.current = { x, y };

    const newIcons: FlyingIcon[] = Array.from({ length: iconsPerSpawn }, () => {
      const angle =
        angleCenterDeg + (Math.random() - 0.5) * angleRangeDeg;
      return {
        id: iconIdCounter.current++,
        startX: x,
        startY: y,
        angle,
        speed: 0.7 + Math.random() * 0.5,
        rotation: (Math.random() - 0.5) * 720,
      };
    });
    startTransition(() => setIcons((prev) => [...prev, ...newIcons]));
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
    display: fullWidth ? 'block' : 'inline-block',
    width: fullWidth ? '100%' : 'max-content',
  };

  const innerStyle: CSSProperties = {
    backgroundColor: disabled
      ? buttonColor
      : isHovered
        ? hoverButtonColor
        : buttonColor,
    color: disabled ? textColor : isHovered ? hoverTextColor : textColor,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius:
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    transition: 'background-color 0.2s ease, color 0.2s ease',
    overflow: 'visible',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow:
      '0 0 24px rgba(142,240,181,0.25), 0 8px 24px -10px rgba(0,0,0,0.4)',
  };

  const sharedInnerClasses = cn(
    'relative inline-flex items-center justify-center text-sm font-semibold tracking-tight',
    fullWidth && 'w-full'
  );

  const flyingIconNodes = icons.map((icon) => {
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
          scale: 0.4,
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
          filter: `drop-shadow(0 0 6px ${iconGlow})`,
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
  });

  const inner = (
    <span style={innerStyle} className={sharedInnerClasses}>
      {children}
    </span>
  );

  if (isLink) {
    const { href } = props as AsLinkProps;
    return (
      <div
        ref={wrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={wrapperStyle}
        className={cn('select-none', className)}
      >
        <Link
          href={href}
          className="block focus-visible:outline-none"
          style={{ width: fullWidth ? '100%' : undefined }}
        >
          {inner}
        </Link>
        {flyingIconNodes}
      </div>
    );
  }

  const { onClick, type = 'button' } = props as AsButtonProps;
  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={wrapperStyle}
      className={cn('select-none', className)}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="block focus-visible:outline-none disabled:cursor-not-allowed"
        style={{
          width: fullWidth ? '100%' : undefined,
          background: 'transparent',
          border: 'none',
          padding: 0,
        }}
      >
        {inner}
      </button>
      {flyingIconNodes}
    </div>
  );
});

export default FlyingIconsButton;
