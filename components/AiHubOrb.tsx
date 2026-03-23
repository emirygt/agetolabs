'use client';

import { useEffect, useRef } from 'react';

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

function rotX(x: number, y: number, z: number, a: number) {
  return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
}
function rotY(x: number, y: number, z: number, a: number) {
  return { x: x * Math.cos(a) + z * Math.sin(a), y, z: -x * Math.sin(a) + z * Math.cos(a) };
}

function getGreatCircle(nx: number, ny: number, nz: number, count: number, R: number) {
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  nx /= len; ny /= len; nz /= len;
  let ux = 0, uy = 1, uz = 0;
  if (Math.abs(ny) > 0.9) { ux = 1; uy = 0; }
  const d = ux * nx + uy * ny + uz * nz;
  ux -= d * nx; uy -= d * ny; uz -= d * nz;
  const ul = Math.sqrt(ux * ux + uy * uy + uz * uz);
  ux /= ul; uy /= ul; uz /= ul;
  const vx = ny * uz - nz * uy;
  const vy = nz * ux - nx * uz;
  const vz = nx * uy - ny * ux;
  const pts: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    pts.push({ x: R * (ux * c + vx * s), y: R * (uy * c + vy * s), z: R * (uz * c + vz * s) });
  }
  return pts;
}

// Fixed logical canvas size — CSS scales it visually
const SIZE = 500;
const CX = 250, CY = 250;
const BASE_R = 190;
const FOV = 700;
const TILT_X = 0.2;

const orbitDefs: { nx: number; ny: number; nz: number; col: [number, number, number] }[] = [
  { nx: 0.0,   ny: 1.0,   nz: 0.15,  col: [168, 85, 247]  },
  { nx: 0.95,  ny: 0.1,   nz: 0.3,   col: [255, 255, 255] },
  { nx: 0.5,   ny: 0.5,   nz: 0.7,   col: [142, 240, 181] },
  { nx: -0.4,  ny: 0.6,   nz: 0.69,  col: [200, 160, 255] },
  { nx: 0.15,  ny: 0.35,  nz: 0.92,  col: [255, 255, 255] },
  { nx: 0.8,   ny: -0.45, nz: 0.4,   col: [168, 85, 247]  },
  { nx: -0.6,  ny: 0.75,  nz: 0.27,  col: [142, 240, 181] },
  { nx: 0.25,  ny: 0.85,  nz: -0.46, col: [255, 255, 255] },
];

const orbits = orbitDefs.map(o => getGreatCircle(o.nx, o.ny, o.nz, 300, BASE_R));

const particles: { x: number; y: number; z: number }[] = [];
for (let i = 0; i < 160; i++) {
  const theta = Math.acos(2 * Math.random() - 1);
  const phi = Math.random() * Math.PI * 2;
  const r = BASE_R * (0.97 + Math.random() * 0.06);
  particles.push({ x: r * Math.sin(theta) * Math.cos(phi), y: r * Math.sin(theta) * Math.sin(phi), z: r * Math.cos(theta) });
}

const nodes = [
  { x:  0.65, y: -0.55, z:  0.52, color: '#ffffff' },
  { x: -0.82, y:  0.38, z:  0.42, color: '#A855F7' },
  { x:  0.32, y:  0.82, z: -0.47, color: '#8EF0B5' },
  { x: -0.44, y: -0.72, z: -0.53, color: '#ffffff' },
  { x:  0.88, y:  0.12, z:  0.46, color: '#ffffff' },
  { x:  0.06, y:  0.95, z:  0.31, color: '#A855F7' },
  { x: -0.78, y: -0.20, z: -0.60, color: '#8EF0B5' },
  { x:  0.45, y: -0.70, z: -0.55, color: '#ffffff' },
].map(n => ({ x: n.x * BASE_R, y: n.y * BASE_R, z: n.z * BASE_R, color: n.color }));

function project3D(px: number, py: number, pz: number, angleY: number) {
  let p = rotX(px, py, pz, TILT_X);
  p = rotY(p.x, p.y, p.z, angleY);
  const persp = FOV / (FOV + p.z);
  return {
    sx: CX + p.x * persp,
    sy: CY + p.y * persp,
    depth: (p.z + BASE_R) / (2 * BASE_R),
  };
}

export function AiHubOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    let animId: number;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const angleY = ts * 0.00022;

      type Item = { sx: number; sy: number; depth: number; kind: 'orbit' | 'particle'; orbitIdx?: number };
      const items: Item[] = [];

      for (let oi = 0; oi < orbits.length; oi++) {
        for (const p of orbits[oi]) {
          items.push({ ...project3D(p.x, p.y, p.z, angleY), kind: 'orbit', orbitIdx: oi });
        }
      }
      for (const p of particles) {
        items.push({ ...project3D(p.x, p.y, p.z, angleY), kind: 'particle' });
      }

      items.sort((a, b) => a.depth - b.depth);

      for (const item of items) {
        const { sx, sy, depth, kind, orbitIdx } = item;

        if (kind === 'orbit' && orbitIdx !== undefined) {
          const col = orbitDefs[orbitIdx].col;
          const alpha = depth < 0.5 ? depth * 0.4 + 0.03 : (depth - 0.5) * 1.2 + 0.23;
          const dotR = Math.max(0.4, 0.3 + depth * 1.4);
          ctx.beginPath();
          ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
          ctx.fill();
        } else if (kind === 'particle') {
          const alpha = depth < 0.5 ? depth * 0.13 : (depth - 0.5) * 0.24 + 0.065;
          const dotR = Math.max(0.3, 0.18 + depth * 0.65);
          ctx.beginPath();
          ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      for (let ni = 0; ni < nodes.length; ni++) {
        const n = nodes[ni];
        const { sx, sy, depth } = project3D(n.x, n.y, n.z, angleY);
        const pulse = Math.sin(ts * 0.0018 + ni * 1.3) * 0.22 + 0.78;
        const bright = depth * 0.75 + 0.2;

        const r1 = 3.5;
        const r2 = 9 * pulse;
        const r3 = 22 * pulse;

        const g3 = ctx.createRadialGradient(sx, sy, 0, sx, sy, r3);
        g3.addColorStop(0, hexToRgba(n.color, bright * 0.4 * pulse));
        g3.addColorStop(1, hexToRgba(n.color, 0));
        ctx.beginPath(); ctx.arc(sx, sy, r3, 0, Math.PI * 2); ctx.fillStyle = g3; ctx.fill();

        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, r2);
        g2.addColorStop(0, hexToRgba(n.color, bright * 0.85));
        g2.addColorStop(1, hexToRgba(n.color, 0));
        ctx.beginPath(); ctx.arc(sx, sy, r2, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();

        ctx.beginPath(); ctx.arc(sx, sy, r1, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(n.color, bright); ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: '500px', maxWidth: '100%', aspectRatio: '1' }}>
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle at 28% 72%, rgba(139,92,246,0.35) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle at 72% 22%, rgba(142,240,181,0.18) 0%, transparent 50%)' }} />

      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      <div className="absolute z-10 text-center select-none pointer-events-none">
        <h2
          className="text-white font-bold tracking-tight"
          style={{
            fontSize: 'clamp(2rem, 10vw, 3.5rem)',
            textShadow: '0 0 30px rgba(255,255,255,0.6), 0 0 70px rgba(255,255,255,0.2)',
          }}
        >
          AI Hub
        </h2>
        <p
          className="text-gray-400 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 0.85rem)', marginTop: '0.3rem' }}
        >
          agetolabs
        </p>
      </div>
    </div>
  );
}
