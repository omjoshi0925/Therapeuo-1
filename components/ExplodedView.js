'use client';

import { useRef, useState, useEffect } from 'react';

const LAYERS = [
  { id: 1, name: 'Top Liner',      sub: 'Antimicrobial fabric',     desc: 'Skin-side cover that wicks moisture and resists bacteria.',       fill: '#E2E8F0', stroke: '#94A3B8', yOffset: 0   },
  { id: 2, name: 'Pressure Array', sub: '256 capacitive points',    desc: 'The core sensing layer. 256 capacitive sensors map every step.', fill: '#FED7AA', stroke: '#F97316', yOffset: 40  },
  { id: 3, name: 'Flex PCB',       sub: 'Polyimide circuit',        desc: 'Routes sensor signals through a thin, flexible printed circuit.', fill: '#BBF7D0', stroke: '#16A34A', yOffset: 90  },
  { id: 4, name: 'BLE Module',     sub: 'Bluetooth Low Energy 5.3', desc: 'Streams weight-bearing data to the companion app in real time.', fill: '#BFDBFE', stroke: '#2563EB', yOffset: 150 },
  { id: 5, name: 'Battery',        sub: '120 mAh LiPo',             desc: 'Three full days of continuous use on a single charge.',          fill: '#FBCFE8', stroke: '#DB2777', yOffset: 220 },
  { id: 6, name: 'Base Footbed',   sub: 'Medical-grade silicone',   desc: 'A thin silicone base. Slides into any standard shoe.',           fill: '#E5E7EB', stroke: '#6B7280', yOffset: 300 },
];

function mixHex(c1, c2, t) {
  const h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = h2r(c1);
  const [r2, g2, b2] = h2r(c2);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
}

function interpolateColor(t, stops) {
  if (t <= stops[0].at) return stops[0].color;
  if (t >= stops[stops.length - 1].at) return stops[stops.length - 1].color;
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].at && t <= stops[i + 1].at) {
      const localT = (t - stops[i].at) / (stops[i + 1].at - stops[i].at);
      return mixHex(stops[i].color, stops[i + 1].color, localT);
    }
  }
  return stops[stops.length - 1].color;
}

export default function ExplodedView() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(-1);
  const [animPhase, setAnimPhase] = useState('settled');

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      if (!sectionRef.current) {
        ticking = false;
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - windowHeight;
      const raw = maxScroll > 0 ? scrolled / maxScroll : 0;
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const explosionProgress = Math.min(progress / 0.15, 1);
  const layerTranslates = LAYERS.map((layer) => layer.yOffset * explosionProgress);

  let activeIndex = -1;
  if (progress >= 0.15) {
    if (progress < 0.29) activeIndex = 0;
    else if (progress < 0.43) activeIndex = 1;
    else if (progress < 0.57) activeIndex = 2;
    else if (progress < 0.71) activeIndex = 3;
    else if (progress < 0.85) activeIndex = 4;
    else activeIndex = 5;
  }

  useEffect(() => {
    if (activeIndex === displayedIndex) return;

    setAnimPhase('exit-up');
    const t1 = setTimeout(() => {
      setDisplayedIndex(activeIndex);
      setAnimPhase('enter-from-below');
      const t2 = setTimeout(() => setAnimPhase('settled'), 20);
      return () => clearTimeout(t2);
    }, 300);

    return () => clearTimeout(t1);
  }, [activeIndex, displayedIndex]);

  let cardOpacity = 1;
  let cardTranslateY = '0px';
  let cardUseTransition = true;
  if (animPhase === 'exit-up') {
    cardOpacity = 0;
    cardTranslateY = '-30px';
  } else if (animPhase === 'enter-from-below') {
    cardOpacity = 0;
    cardTranslateY = '30px';
    cardUseTransition = false;
  }

  const bgColor = interpolateColor(progress, [
    { at: 0.00, color: '#FFFFFF' },
    { at: 0.08, color: '#FFFFFF' },
    { at: 0.18, color: '#0A0A0B' },
    { at: 0.88, color: '#0A0A0B' },
    { at: 1.00, color: '#FFFFFF' },
  ]);

  const textColor = interpolateColor(progress, [
    { at: 0.00, color: '#0A0A0B' },
    { at: 0.08, color: '#0A0A0B' },
    { at: 0.18, color: '#FFFFFF' },
    { at: 0.88, color: '#FFFFFF' },
    { at: 1.00, color: '#0A0A0B' },
  ]);

  const cardBgAlpha = progress >= 0.18 && progress <= 0.88 ? 0.05 : 0.95;
  const cardBorderAlpha = progress >= 0.18 && progress <= 0.88 ? 0.10 : 0.60;

  return (
    <section
      ref={sectionRef}
      id="technology"
      style={{
        position: 'relative',
        width: '100%',
        height: '500vh',
        backgroundColor: bgColor,
        transition: 'background-color 200ms linear',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {displayedIndex >= 0 && (
              <div
                style={{
                  transform: `translateY(${cardTranslateY})`,
                  opacity: cardOpacity,
                  transition: cardUseTransition
                    ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, background-color 200ms linear, border-color 200ms linear'
                    : 'background-color 200ms linear, border-color 200ms linear',
                  backgroundColor: `rgba(255, 255, 255, ${cardBgAlpha})`,
                  borderColor: `rgba(255, 255, 255, ${cardBorderAlpha})`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  padding: '2rem',
                  maxWidth: '28rem',
                  borderRadius: '1rem',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: textColor,
                    opacity: 0.4,
                  }}
                >
                  0{LAYERS[displayedIndex].id} / 06
                </div>
                <div
                  style={{
                    marginTop: '0.75rem',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.875rem',
                    color: textColor,
                  }}
                >
                  {LAYERS[displayedIndex].name}
                </div>
                <div
                  style={{
                    marginTop: '0.25rem',
                    fontSize: '0.875rem',
                    color: textColor,
                    opacity: 0.55,
                  }}
                >
                  {LAYERS[displayedIndex].sub}
                </div>
                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                    color: textColor,
                    opacity: 0.7,
                    lineHeight: 1.625,
                  }}
                >
                  {LAYERS[displayedIndex].desc}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {LAYERS.map((layer, i) => (
              <LayerSilhouette
                key={layer.id}
                layer={layer}
                translateY={layerTranslates[i]}
                isActive={activeIndex === i}
                anyActive={activeIndex >= 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerSilhouette({ layer, translateY, isActive, anyActive }) {
  const opacity = anyActive ? (isActive ? 1 : 0.25) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          opacity,
          transition: 'opacity 300ms ease',
        }}
      >
        <InsoleSVG fill={layer.fill} stroke={layer.stroke} />
      </div>
    </div>
  );
}

function InsoleSVG({ fill, stroke }) {
  return (
    <svg width="280" height="100" viewBox="0 0 220 80" fill="none">
      <path
        d="M 25 40 C 25 15, 50 8, 95 8 C 145 8, 175 12, 195 22 C 215 32, 215 48, 195 58 C 175 68, 145 72, 95 72 C 50 72, 25 65, 25 40 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <circle cx="60" cy="40" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="90" cy="30" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="90" cy="50" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="130" cy="35" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="130" cy="50" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="170" cy="40" r="1.5" fill={stroke} opacity="0.5" />
    </svg>
  );
}
