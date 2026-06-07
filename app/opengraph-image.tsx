import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GASPAR · Brand Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Accent gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(155,109,255,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom left blob */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '200px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(155,109,255,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '1px',
              background: '#9B6DFF',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9B6DFF',
              fontFamily: 'sans-serif',
              fontWeight: 600,
            }}
          >
            Brand Designer · Budapest
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '110px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: '32px',
            display: 'flex',
          }}
        >
          GASPAR
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '600px',
            display: 'flex',
          }}
        >
          Brands that feel before they speak.
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '100px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'sans-serif',
            letterSpacing: '0.06em',
            display: 'flex',
          }}
        >
          gasparstudio.hu
        </div>
      </div>
    ),
    { ...size }
  );
}
