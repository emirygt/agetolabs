'use client';

import { motion } from 'motion/react';

export function AiHubOrb() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
      {/* Background Glow (Optimized with radial gradient instead of blur) */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)' }}></div>
      
      {/* SVG Lines & Moving LEDs */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id="sphere-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="global-gradient" x1="0" y1="200" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#D8B4FE" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#A7F3D0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8EF0B5" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
            <stop offset="50%" stopColor="#D8B4FE" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="green-glow" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8EF0B5" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="white-glow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gray Sphere Background */}
        <circle cx="200" cy="200" r="190" fill="url(#sphere-bg)" />

        {/* Dotted Point Cloud - Inner Core (Reduced count) */}
        <g stroke="rgba(255, 255, 255, 0.2)" fill="none" strokeWidth="1.5" strokeDasharray="0.1 8" strokeLinecap="round" className="animate-[spin_120s_linear_infinite_reverse] origin-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={`core-${i}`} cx="200" cy="200" rx="130" ry="40" transform={`rotate(${i * 60} 200 200)`} />
          ))}
        </g>

        {/* Dotted Point Cloud - Outer Volume (Reduced count) */}
        <g stroke="rgba(200, 220, 255, 0.4)" fill="none" strokeWidth="1.5" strokeDasharray="0.1 10" strokeLinecap="round" className="animate-[spin_90s_linear_infinite] origin-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`out1-${i}`} cx="200" cy="200" rx="190" ry="70" transform={`rotate(${i * 30} 200 200)`} />
          ))}
        </g>

        {/* Base Wireframe Lines (Static, thin, colored) */}
        <g stroke="url(#global-gradient)" fill="none" strokeWidth="1.2" className="animate-[spin_60s_linear_infinite] origin-center">
          <ellipse cx="200" cy="200" rx="190" ry="70" transform="rotate(15 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="30" transform="rotate(-35 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="130" transform="rotate(65 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="50" transform="rotate(-80 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="160" transform="rotate(110 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="90" transform="rotate(-140 200 200)" />
          <ellipse cx="200" cy="200" rx="195" ry="195" stroke="rgba(255,255,255,0.1)" />
        </g>

        {/* Moving LED Lights (Removed expensive drop-shadows) */}
        <g className="animate-[spin_60s_linear_infinite] origin-center">
          <ellipse cx="200" cy="200" rx="190" ry="70" transform="rotate(15 200 200)" fill="none" stroke="url(#purple-glow)" strokeWidth="4" strokeDasharray="250 1200" className="animate-[dash_3s_linear_infinite]" strokeLinecap="round" />
          <ellipse cx="200" cy="200" rx="190" ry="30" transform="rotate(-35 200 200)" fill="none" stroke="url(#green-glow)" strokeWidth="4" strokeDasharray="300 1200" className="animate-[dash_4s_linear_infinite_reverse]" strokeLinecap="round" />
          <ellipse cx="200" cy="200" rx="190" ry="130" transform="rotate(65 200 200)" fill="none" stroke="url(#white-glow)" strokeWidth="3" strokeDasharray="200 1200" className="animate-[dash_2s_linear_infinite]" strokeLinecap="round" />
          <ellipse cx="200" cy="200" rx="190" ry="50" transform="rotate(-80 200 200)" fill="none" stroke="url(#purple-glow)" strokeWidth="4" strokeDasharray="280 1200" className="animate-[dash_5s_linear_infinite_reverse]" strokeLinecap="round" />
          <ellipse cx="200" cy="200" rx="190" ry="160" transform="rotate(110 200 200)" fill="none" stroke="url(#green-glow)" strokeWidth="4" strokeDasharray="350 1200" className="animate-[dash_4s_linear_infinite]" strokeLinecap="round" />
        </g>
      </svg>

      {/* Bright Flares at Intersections - Layer 1 (Forward Spin) - Reduced count */}
      <div className="absolute inset-0 animate-[spin_60s_linear_infinite] pointer-events-none">
        <div className="absolute top-[12%] left-[30%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_4px_#A855F7]"></div>
        <div className="absolute bottom-[18%] left-[22%] w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_20px_5px_#A855F7]"></div>
        <div className="absolute top-[22%] right-[18%] w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_20px_5px_#8EF0B5]"></div>
        <div className="absolute bottom-[12%] right-[32%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_4px_#8EF0B5]"></div>
        <div className="absolute top-[48%] left-[2%] w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_4px_#A855F7]"></div>
        <div className="absolute bottom-[42%] right-[2%] w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_4px_#8EF0B5]"></div>
      </div>

      {/* Center Text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1 className="text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          AI Hub
        </h1>
      </motion.div>
    </div>
  );
}
