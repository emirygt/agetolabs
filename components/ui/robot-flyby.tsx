'use client';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  /**
   * Spline scene URL. Defaults to the original community scene.
   * Replace with your own scene URL when ready.
   */
  src?: string;
  /** Hide the iframe border/shadow chrome when used as a background. */
  bare?: boolean;
  /**
   * When true (default), the iframe ignores pointer/scroll events so the
   * surrounding page can still scroll over it. Set to false if you want the
   * Spline scene to be directly interactive.
   */
  passthrough?: boolean;
};

export const RobotFlyby = ({
  className,
  src = 'https://my.spline.design/untitled-rv0hx3zVdoM6t2ydngxuS7zi/',
  bare = false,
  passthrough = true,
}: Props) => {
  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center bg-black',
        className
      )}
    >
      <div
        className={cn(
          'w-full h-full overflow-hidden',
          !bare && 'max-w-5xl rounded-xl border border-gray-700 shadow-2xl'
        )}
      >
        <iframe
          src={src}
          className={cn(
            'w-full h-full',
            passthrough && 'pointer-events-none'
          )}
          frameBorder={0}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

// Original 21st.dev export name kept for compatibility
export const Component = RobotFlyby;
export default RobotFlyby;
