import { ImageResponse } from 'next/og';

export const alt = 'agetolabs — Orchestrating Autonomous Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

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
          <div
            style={{
              width: 48,
              height: 2,
              background: '#8EF0B5',
            }}
          />
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
