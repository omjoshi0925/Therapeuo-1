import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  "Therapeuo — World's First Smart Insole for Physical Therapy";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(180deg, #4858EA 0%, #6B5BE5 30%, #B475D6 55%, #E89CC4 75%, #FFFFFF 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
          color: '#0A0A0B',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,11,0.7)',
          }}
        >
          THERAPEUO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: '#0A0A0B',
              maxWidth: 980,
            }}
          >
            World&apos;s First Smart Insole.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.3,
              color: 'rgba(10,10,11,0.75)',
              maxWidth: 900,
            }}
          >
            Real-time weight-bearing for physical therapy patients. Heal nearly
            2&times; faster.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            color: 'rgba(10,10,11,0.65)',
          }}
        >
          <div style={{ display: 'flex' }}>
            Designed by engineers from UC Berkeley · Purdue · NHS
          </div>
          <div style={{ display: 'flex' }}>therapeuo.xyz</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
