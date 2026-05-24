'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('[agetolabs] runtime error', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] bg-red-500/[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8EF0B5]/[0.05] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[560px] text-center">
        <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center bg-red-500/10 border border-red-500/25 text-red-400 mb-8">
          <AlertTriangle size={26} strokeWidth={1.8} />
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-red-400/80 mb-5">
          Unexpected failure
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          Something fell out of orbit.
        </h1>
        <p className="text-gray-400 leading-relaxed mb-10 text-base md:text-lg">
          A page in the agetolabs universe crashed unexpectedly. You can try
          again or head back to base.
        </p>

        {error?.digest && (
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 mb-8">
            ref · {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#8EF0B5] px-7 text-sm font-semibold text-black hover:bg-white transition-colors shadow-[0_0_24px_rgba(142,240,181,0.3)]"
          >
            <RefreshCw size={16} strokeWidth={2.4} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white hover:border-[#8EF0B5]/50 hover:bg-white/[0.08] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
