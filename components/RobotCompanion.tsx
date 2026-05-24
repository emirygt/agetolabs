'use client';

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Application } from '@splinetool/runtime';
import { ChatBubble } from '@/components/ChatBubble';
import { ChatPanel } from '@/components/ChatPanel';

const Spline = lazy(() => import('@splinetool/react-spline'));

const DEFAULT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

type Props = {
  scene?: string;
  revealDelay?: number;
  bubbleDelay?: number;
  width?: number;
  height?: number;
  canvasSize?: number;
  canvasOffsetX?: number;
  canvasOffsetY?: number;
};

export function RobotCompanion({
  scene = DEFAULT_SCENE,
  revealDelay = 350,
  bubbleDelay = 5500,
  width = 220,
  height = 200,
  canvasSize = 440,
  canvasOffsetX = -40,
  canvasOffsetY = -30,
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dismissed) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onMove = () => {
      timer = setTimeout(() => setRevealed(true), revealDelay);
      window.removeEventListener('mousemove', onMove);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (timer) clearTimeout(timer);
    };
  }, [revealDelay, dismissed]);

  useEffect(() => {
    if (!revealed || bubbleDismissed || chatOpen) {
      setBubbleVisible(false);
      return;
    }
    const t = setTimeout(() => setBubbleVisible(true), bubbleDelay);
    return () => clearTimeout(t);
  }, [revealed, bubbleDismissed, chatOpen, bubbleDelay]);

  useEffect(() => {
    if (!revealed) return;
    const forward = (e: PointerEvent) => {
      const canvas = wrapperRef.current?.querySelector('canvas');
      if (!canvas) return;
      try {
        canvas.dispatchEvent(
          new PointerEvent('pointermove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            pointerType: 'mouse',
            isPrimary: true,
            pointerId: 1,
          })
        );
      } catch {
        canvas.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
          })
        );
      }
    };
    window.addEventListener('pointermove', forward);
    return () => window.removeEventListener('pointermove', forward);
  }, [revealed]);

  const handleSplineLoad = useCallback((app: Application) => {
    try {
      app.setBackgroundColor('rgba(0,0,0,0)');
    } catch {
      // older runtimes may not expose this — silently ignore
    }
  }, []);

  const openChat = () => {
    setChatOpen(true);
    setBubbleVisible(false);
  };

  if (dismissed) return null;

  return (
    <>
      <AnimatePresence>
        {revealed && !chatOpen && (
          <motion.div
            ref={wrapperRef}
            initial={{ x: '40%', y: '40%', opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: '40%', y: '40%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 95, damping: 16, mass: 1 }}
            style={{ width, height }}
            className="hidden md:block fixed bottom-4 right-10 z-[60] pointer-events-none"
          >
            <div className="absolute right-0 bottom-full mb-3 z-[2] pointer-events-none">
              <ChatBubble
                visible={bubbleVisible && !chatOpen}
                onClick={openChat}
                onDismiss={() => setBubbleDismissed(true)}
              />
            </div>

            <motion.div
              animate={{ y: [0, -3, 0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <button
                type="button"
                onClick={openChat}
                aria-label="Open chat"
                className="absolute inset-0 z-[1] pointer-events-auto cursor-pointer focus:outline-none"
              />

              <div className="absolute inset-0 overflow-hidden">
                <div
                  style={{
                    width: canvasSize,
                    height: canvasSize,
                    transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px)`,
                  }}
                  className="relative [&_canvas]:!pointer-events-none"
                >
                  <Suspense
                    fallback={
                      <div
                        style={{ width, height }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-7 h-7 rounded-full border-2 border-[#8EF0B5]/30 border-t-[#8EF0B5] animate-spin" />
                      </div>
                    }
                  >
                    <Spline scene={scene} onLoad={handleSplineLoad} />
                  </Suspense>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 0%, rgba(11,12,16,0.45) 40%, rgba(11,12,16,0.92) 100%)',
                  }}
                />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Hide companion"
              className="pointer-events-auto absolute top-1 left-1 w-5 h-5 rounded-full bg-[#13151A]/70 backdrop-blur border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#13151A] transition-colors text-xs leading-none z-[2]"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
