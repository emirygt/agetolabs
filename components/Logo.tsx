export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="100%" 
      height="100%" 
      viewBox="0 0 480 96" 
      preserveAspectRatio="xMinYMid meet"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hOrbit1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8EF0B5" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#8EF0B5" />
        </linearGradient>
        <linearGradient id="hOrbit2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#8EF0B5" />
        </linearGradient>
        <linearGradient id="hOrbit3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8EF0B5" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="hCoreBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d2015" />
          <stop offset="100%" stopColor="#060f09" />
        </radialGradient>
        <radialGradient id="hCoreRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(142,240,181,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="hTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8EF0B5" />
          <stop offset="40%" stopColor="#a3f0c2" />
          <stop offset="70%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="hSepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="#8EF0B5" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#8EF0B5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* ══ CSS ANIMATIONS ══ */}
      <style>{`
        @keyframes dashAnim1 {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: -200; }
        }
        @keyframes pulseRot {
          0% { transform: rotate(0deg); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: rotate(360deg); opacity: 0.4; }
        }
        @keyframes hCoreIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hNetworkIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .h-orbit-path {
          stroke-dasharray: 200;
          animation: dashAnim1 3s linear infinite;
        }
        .h-orbit1 { animation-delay: 0s; }
        .h-orbit2 { animation-delay: -1s; }
        .h-orbit3 { animation-delay: -2s; }
        
        .h-head1 { animation: headSpin1 3s linear infinite; transform-origin: 52px 48px; }
        .h-head2 { animation: headSpin2 3s linear infinite; transform-origin: 52px 48px; }
        .h-head3 { animation: headSpin3 3s linear infinite; transform-origin: 52px 48px; }

        @keyframes headSpin1 { 0% { transform: rotate(35deg) rotate(0deg) translate(42px,0); } 100% { transform: rotate(35deg) rotate(360deg) translate(42px,0); } }
        
        .h-dotted-ring {
          transform-origin: 52px 48px;
          animation: pulseRot 20s linear infinite;
        }

        .h-core {
          transform-origin: 52px 48px;
          animation: hCoreIn 1s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .h-network {
          opacity: 0;
          animation: hNetworkIn 1s ease 0.5s forwards;
        }
      `}</style>

      {/* Dotted faintly visible outer ring */}
      <circle cx="52" cy="48" r="41" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 4" fill="none" className="h-dotted-ring" />

      {/* Orbit ring 1 — green, ~35° tilt */}
      <ellipse cx="52" cy="48" rx="42" ry="17" stroke="url(#hOrbit1)" strokeWidth="2" fill="none"
        transform="rotate(35 52 48)" filter="url(#glow1)" className="h-orbit-path h-orbit1" opacity="0.8" />
      
      {/* Orbit ring 2 — purple, ~-25° tilt */}
      <ellipse cx="52" cy="48" rx="42" ry="17" stroke="url(#hOrbit2)" strokeWidth="2" fill="none"
        transform="rotate(-25 52 48)" filter="url(#glow1)" className="h-orbit-path h-orbit2" opacity="0.8" />
        
      {/* Orbit ring 3 — vertical green */}
      <ellipse cx="52" cy="48" rx="17" ry="42" stroke="url(#hOrbit3)" strokeWidth="1.5" fill="none"
        filter="url(#glow1)" className="h-orbit-path h-orbit3" opacity="0.8" />

      {/* Glowing tip dots, carefully placed to match paths */}
      <circle cx="21" cy="74"  r="2.5" fill="#a855f7" filter="url(#glow1)" />
      <circle cx="91" cy="62"  r="2.5" fill="#8EF0B5" filter="url(#glow1)" />
      <circle cx="16" cy="27"  r="2.5" fill="#8EF0B5" filter="url(#glow1)" />
      
      <circle cx="52" cy="7"   r="3"   fill="#8EF0B5" filter="url(#glow1)" />
      <circle cx="52" cy="89"  r="2.5" fill="#8EF0B5" filter="url(#glow1)" />

      {/* Center object */}
      <g className="h-core">
        {/* Soft glow behind center */}
        <circle cx="52" cy="48" r="26" fill="url(#hCoreRing)" />
        {/* Inner dark center with bright stroke */}
        <circle cx="52" cy="48" r="15" fill="url(#hCoreBg)" />
        <circle cx="52" cy="48" r="16" stroke="#8EF0B5" strokeWidth="1" fill="none" opacity="0.9" filter="url(#glow1)" />
        <circle cx="52" cy="48" r="17" stroke="rgba(142,240,181,0.2)" strokeWidth="1" fill="none" />
      </g>

      {/* Network graph inside center */}
      <g className="h-network">
        {/* Edges */}
        <line x1="52" y1="40" x2="43.5" y2="46" stroke="#8EF0B5" strokeWidth="0.8" opacity="0.8" />
        <line x1="52" y1="40" x2="60.5" y2="46" stroke="#c084fc" strokeWidth="0.8" opacity="0.8" />
        
        <line x1="43.5" y1="46" x2="46.5" y2="55" stroke="#8EF0B5" strokeWidth="0.8" opacity="0.7" />
        <line x1="60.5" y1="46" x2="57.5" y2="55" stroke="#c084fc" strokeWidth="0.8" opacity="0.7" />
        <line x1="46.5" y1="55" x2="57.5" y2="55" stroke="#c084fc" strokeWidth="0.8" opacity="0.5" />
        
        <line x1="43.5" y1="46" x2="60.5" y2="46" stroke="#8EF0B5" strokeWidth="0.6" opacity="0.5" />
        <line x1="43.5" y1="46" x2="57.5" y2="55" stroke="#8EF0B5" strokeWidth="0.6" opacity="0.4" />
        <line x1="52" y1="40" x2="46.5" y2="55" stroke="#8EF0B5" strokeWidth="0.3" opacity="0.4" />
        <line x1="52" y1="40" x2="57.5" y2="55" stroke="#a855f7" strokeWidth="0.3" opacity="0.4" />

        {/* Hollow Nodes */}
        <circle cx="52" cy="40" r="2" stroke="#ffffff" strokeWidth="1.2" fill="#060f09" />
        <circle cx="43.5" cy="46" r="2" stroke="#8EF0B5" strokeWidth="1.2" fill="#060f09" />
        <circle cx="60.5" cy="46" r="2" stroke="#c084fc" strokeWidth="1.2" fill="#060f09" />
        <circle cx="46.5" cy="55" r="2" stroke="#8EF0B5" strokeWidth="1.2" fill="#060f09" />
        <circle cx="57.5" cy="55" r="2" stroke="#c084fc" strokeWidth="1.2" fill="#060f09" />
      </g>

      {/* === VERTICAL SEPARATOR — always visible === */}
      <line x1="108" y1="8" x2="108" y2="88" stroke="url(#hSepGrad)" strokeWidth="1" />

      {/* === TEXT — always visible === */}
      <text
        x="128" y="54"
        fontSize="28"
        fontFamily="'Inter', 'SF Pro Display', sans-serif"
        fontWeight="700"
        letterSpacing="8"
        fill="url(#hTextGrad)"
      >AGENTOLABS</text>

      <text
        x="130" y="70"
        fontSize="9"
        fontFamily="'Inter', monospace"
        fontWeight="400"
        letterSpacing="5"
        fill="#8EF0B5"
        opacity="0.6"
      >AUTONOMOUS AI PLATFORM</text>
    </svg>
  );
}
