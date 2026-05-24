import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B0C10 0%, #13151A 100%)',
          color: '#8EF0B5',
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
