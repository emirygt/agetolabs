import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B0C10 0%, #1f6b4a 100%)',
          color: '#8EF0B5',
          fontSize: 110,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
