import { ImageResponse } from 'next/og';

export const alt = 'agetolabs — Orchestrating Autonomous Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

// Symbol-only brand mark (A + arrow) — same paths as /icon.svg and
// /apple-icon, so social previews stay visually consistent with browser
// tabs and iOS home screen.
const MARK_PATH1 =
  'M281.772 5.81584C297.06 19.9125 373.682 163.796 393.02 194.289L358.614 235.341C337.13 204.543 302.171 139.288 281.882 103.74C257.743 149.772 228.249 198.826 202.119 244.172L86.2683 444.535L128.241 444.686C176.918 353.754 232.829 260.416 284.161 170.5C300.955 200.351 321.598 232.612 336.466 262.72C326.554 273.116 310.225 286.256 298.808 295.92C293.742 288.149 288.564 277.682 284.117 269.322C269.912 295.008 255.11 320.348 239.688 345.325C315.69 328.121 337.064 305.59 385.364 248.86C402.777 225.379 428.222 196.077 447.183 172.908C431.74 161.341 420.389 150.525 406.273 137.309C431.784 132.712 519.844 102.345 549.537 92.7549L523.34 240.591C511.016 228.872 496.989 216.692 484.288 205.143C393.02 315.603 361.402 381.852 211.257 396.714C193.976 429.719 173.909 461.414 156.164 495.185L0 494.924C32.9895 444.329 72.5948 369.889 103.925 315.397L281.772 5.81584Z';
const MARK_PATH2 =
  'M450.956 289.008C458.876 295.181 556.159 470.306 572 494.972L416.773 495.185C404.45 476.078 391.905 452.682 380.245 432.662C370.267 416.36 362.014 401.135 352.987 384.265C366.749 374.331 378.94 364.505 392.148 353.808C405.135 379.799 429.318 418.64 444.871 444.444L485.581 444.446C464.031 409.565 438.676 363.944 419.096 327.913C430.136 313.352 438.544 302.337 450.956 289.008Z';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#06060c',
          backgroundImage:
            'radial-gradient(120% 80% at 20% 0%, rgba(142,240,181,0.18) 0%, transparent 55%), radial-gradient(120% 80% at 90% 100%, rgba(168,85,247,0.22) 0%, transparent 55%)',
          color: '#fff',
          padding: 88,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'monospace',
            fontSize: 20,
            letterSpacing: 8,
            color: '#8EF0B5',
            textTransform: 'uppercase',
          }}
        >
          <svg width={32} height={32} viewBox="0 -36 572 572">
            <path d={MARK_PATH1} fill="#ffffff" />
            <path d={MARK_PATH2} fill="#ffffff" />
          </svg>
          agetolabs · technology
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #8EF0B5 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Orchestrating
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: '#fff',
            }}
          >
            Autonomous Intelligence.
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 28,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.66)',
              maxWidth: 920,
            }}
          >
            Autonomous AI ecosystems for enterprise operations — sales agents,
            content studios, e-commerce orchestration.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'monospace',
            fontSize: 18,
            letterSpacing: 4,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}
        >
          <div>agetolabs.com</div>
          <div style={{ color: '#8EF0B5' }}>· 7 products · 100+ projects</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
