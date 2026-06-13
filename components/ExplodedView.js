'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const LAYER_SIZE_DESKTOP = 504;
const LAYER_SIZE_MOBILE = 220;
const COLLAPSED_GAP = 6;
const EXPANDED_GAP_DESKTOP = 80;
const EXPANDED_GAP_MOBILE = 30;

const LAYERS = [
  {
    id: 1,
    name: 'Top Liner',
    sub: 'Antimicrobial fabric',
    desc: 'Skin-side lining with medical grade silicone that wicks moisture and resists bacteria',
    src: '/insole%20mockup/layer-1-top_liner.png',
  },
  {
    id: 2,
    name: 'Pressure Array',
    sub: 'Tri-point Sensor Integration',
    desc: 'The core sensing layer. 3 distinct force resistive sensors maps every step',
    src: '/insole%20mockup/layer-2-pressure_array.png',
  },
  {
    id: 3,
    name: 'Comfort Core',
    sub: 'Ergonomic cushioning',
    desc: 'Absorbs impact and conforms naturally to the foot, with a soft, flexible material engineered for all-day comfort',
    src: '/insole%20mockup/layer-3-flex_pcb.png',
  },
  {
    id: 4,
    name: 'Battery',
    sub: '120 mAh LiPo',
    desc: 'Three full days of continuous use on a single charge.',
    src: '/insole%20mockup/layer-4-battery.png',
  },
  {
    id: 5,
    name: 'Flex PCB & BLE Module',
    sub: 'Polyimide circuit (with BLE 5.3)',
    desc: 'Routes sensor signals & streams weight-bearing data to companion app & Apple Health accessories.',
    src: '/insole%20mockup/layer-5-ble_module.png',
  },
  {
    id: 6,
    name: 'Base Footbed',
    sub: 'Medical-grade carbon fiber',
    desc: 'A thin carbon-fiber base. Slides into any standard shoe.',
    src: '/insole%20mockup/layer-6-base_footbed.png',
  },
];

const CENTER_INDEX = (LAYERS.length - 1) / 2;

export default function ExplodedView() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(-1);
  const [animPhase, setAnimPhase] = useState('settled');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const LAYER_SIZE = isMobile ? LAYER_SIZE_MOBILE : LAYER_SIZE_DESKTOP;
  const EXPANDED_GAP = isMobile ? EXPANDED_GAP_MOBILE : EXPANDED_GAP_DESKTOP;

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

  const expansionProgress = Math.max(0, Math.min((progress - 0.05) / 0.12, 1));
  const collapseProgress = Math.max(0, Math.min((progress - 0.89) / 0.08, 1));
  const effectiveExpansion = expansionProgress * (1 - collapseProgress);

  const layerTranslates = LAYERS.map((_, i) => {
    const collapsedY = (i - CENTER_INDEX) * COLLAPSED_GAP;
    const expandedY = (i - CENTER_INDEX) * EXPANDED_GAP;
    return collapsedY + (expandedY - collapsedY) * effectiveExpansion;
  });

  let activeIndex = -1;
  if (progress >= 0.17 && progress < 0.89) {
    if (progress < 0.29) activeIndex = 0;
    else if (progress < 0.41) activeIndex = 1;
    else if (progress < 0.53) activeIndex = 2;
    else if (progress < 0.65) activeIndex = 3;
    else if (progress < 0.77) activeIndex = 4;
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
    { at: 0.96, color: '#0A0A0B' },
    { at: 1.00, color: '#FFFFFF' },
  ]);

  const textColor = interpolateColor(progress, [
    { at: 0.00, color: '#0A0A0B' },
    { at: 0.08, color: '#0A0A0B' },
    { at: 0.18, color: '#FFFFFF' },
    { at: 0.96, color: '#FFFFFF' },
    { at: 1.00, color: '#0A0A0B' },
  ]);

  const cardBgAlpha = 0.05;
  const cardBorderAlpha = 0.10;

  const headerOpacity = Math.max(0, 1 - progress / 0.05);

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
            padding: isMobile ? '0 1rem' : '0 2rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '0.5rem' : '3rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT column: header + card overlapped, both anchored to vertical center */}
          <div
            style={{
              position: 'relative',
              height: isMobile ? 'auto' : '500px',
              minHeight: isMobile ? '240px' : '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              order: isMobile ? 1 : 1,
              width: '100%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: 'translateY(-50%)',
                opacity: headerOpacity,
                transition: 'opacity 200ms ease',
                textAlign: isMobile ? 'center' : 'left',
                color: textColor,
                pointerEvents: headerOpacity > 0 ? 'auto' : 'none',
                padding: isMobile ? '0 0.5rem' : 0,
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? '0.625rem' : '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  opacity: 0.4,
                  marginBottom: isMobile ? '0.5rem' : '1rem',
                }}
              >
                The Technology
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  fontWeight: 'normal',
                }}
              >
                <span className="sr-only">
                  Inside the Therapeuo smart insole — six engineered layers.{' '}
                </span>
                <span aria-hidden="true">
                  Six layers,{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 700 }}>one thin insole.</span>
                </span>
              </h2>
              <div
                style={{
                  fontSize: isMobile ? '0.8125rem' : '1rem',
                  opacity: 0.65,
                  marginTop: isMobile ? '0.75rem' : '1rem',
                  maxWidth: '28rem',
                  marginLeft: isMobile ? 'auto' : 0,
                  marginRight: isMobile ? 'auto' : 0,
                }}
              >
                A pressure sensory array, lithium-polymer battery, BLE radio – all wrapped under 3 milimeters of medical-grade silicone & carbon fiber.
              </div>
            </div>

            {displayedIndex >= 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: isMobile ? 0 : 'auto',
                  marginLeft: isMobile ? 'auto' : 0,
                  marginRight: isMobile ? 'auto' : 0,
                  transform: `translateY(calc(-50% + ${cardTranslateY}))`,
                  opacity: cardOpacity,
                  transition: cardUseTransition
                    ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, background-color 200ms linear, border-color 200ms linear'
                    : 'background-color 200ms linear, border-color 200ms linear',
                  backgroundColor: `rgba(255, 255, 255, ${cardBgAlpha})`,
                  borderColor: `rgba(255, 255, 255, ${cardBorderAlpha})`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  padding: isMobile ? '1.25rem' : '2rem',
                  maxWidth: isMobile ? 'calc(100vw - 2rem)' : '28rem',
                  width: isMobile ? '100%' : 'auto',
                  borderRadius: '1rem',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3)',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? '0.625rem' : '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: textColor,
                    opacity: 0.4,
                  }}
                >
                  0{LAYERS[displayedIndex].id} / 06
                </div>
                <h3
                  style={{
                    marginTop: '0.75rem',
                    marginBottom: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: isMobile ? '1.5rem' : '1.875rem',
                    fontWeight: 'normal',
                    color: textColor,
                  }}
                >
                  {LAYERS[displayedIndex].name}
                </h3>
                <div
                  style={{
                    marginTop: '0.25rem',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    color: textColor,
                    opacity: 0.55,
                  }}
                >
                  {LAYERS[displayedIndex].sub}
                </div>
                <div
                  style={{
                    marginTop: '0.75rem',
                    fontSize: isMobile ? '0.8125rem' : '0.875rem',
                    color: textColor,
                    opacity: 0.7,
                    lineHeight: 1.6,
                  }}
                >
                  {LAYERS[displayedIndex].desc}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT column: insole stack only */}
          <div
            style={{
              position: 'relative',
              height: isMobile ? `${LAYER_SIZE + CENTER_INDEX * EXPANDED_GAP * 2}px` : '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              order: isMobile ? 2 : 2,
            }}
          >
            <div style={{ position: 'relative', width: LAYER_SIZE, height: LAYER_SIZE, transition: 'width 200ms ease, height 200ms ease' }}>
              {LAYERS.map((layer, i) => (
                <LayerSilhouette
                  key={layer.id}
                  layer={layer}
                  translateY={layerTranslates[i]}
                  isActive={activeIndex === i}
                  anyActive={activeIndex >= 0}
                  zIndex={LAYERS.length - i}
                  size={LAYER_SIZE}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerSilhouette({ layer, translateY, isActive, anyActive, zIndex, size }) {
  const opacity = anyActive ? (isActive ? 1 : 0.3) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, calc(-50% + ${translateY}px))`,
        transition: 'transform 100ms linear',
        zIndex,
        width: size,
        height: size,
      }}
    >
      <Image
        src={layer.src}
        alt={`Therapeuo smart insole — ${layer.name} (${layer.sub})`}
        width={size}
        height={size}
        priority={layer.id === 1}
        draggable={false}
        sizes="(max-width: 768px) 60vw, 504px"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'contain',
          opacity,
          transition: 'opacity 300ms ease',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))',
        }}
      />
    </div>
  );
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function interpolateColor(progress, stops) {
  if (progress <= stops[0].at) return stops[0].color;
  if (progress >= stops[stops.length - 1].at) return stops[stops.length - 1].color;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (progress >= a.at && progress <= b.at) {
      const t = (progress - a.at) / (b.at - a.at);
      const ca = hexToRgb(a.color);
      const cb = hexToRgb(b.color);
      const r = Math.round(ca.r + (cb.r - ca.r) * t);
      const g = Math.round(ca.g + (cb.g - ca.g) * t);
      const bl = Math.round(ca.b + (cb.b - ca.b) * t);
      return `rgb(${r}, ${g}, ${bl})`;
    }
  }
  return stops[stops.length - 1].color;
}

