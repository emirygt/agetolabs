'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 5000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pause when tab hidden OR canvas off-screen.
    let tabVisible = !document.hidden;
    let inView = true;
    const startLoop = () => {
      if (animId !== null) return;
      animId = requestAnimationFrame(draw);
    };
    const stopLoop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    const syncLoop = () => {
      if (tabVisible && inView) startLoop();
      else stopLoop();
    };
    const onVisibility = () => {
      tabVisible = !document.hidden;
      syncLoop();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}
