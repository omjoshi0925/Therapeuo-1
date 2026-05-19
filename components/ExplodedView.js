'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function ExplodedView() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const layers = [
    { id: 0, num: '01', label: 'Top liner', desc: 'Antimicrobial fabric', fill: '#E2E8F0', stroke: '#94A3B8' },
    { id: 1, num: '02', label: 'Pressure array', desc: '256 capacitive points', fill: '#FED7AA', stroke: '#F97316' },
    { id: 2, num: '03', label: 'Flex PCB', desc: 'Polyimide circuit', fill: '#BBF7D0', stroke: '#16A34A' },
    { id: 3, num: '04', label: 'BLE module', desc: 'Bluetooth Low Energy 5.3', fill: '#BFDBFE', stroke: '#2563EB' },
    { id: 4, num: '05', label: 'Battery', desc: '120 mAh LiPo', fill: '#FBCFE8', stroke: '#DB2777' },
    { id: 5, num: '06', label: 'Base footbed', desc: 'Medical-grade silicone', fill: '#E5E7EB', stroke: '#6B7280' },
  ];

  // Target Y offsets: gravity-weighted, bottom layers move most
  const targetOffsets = [0, 40, 90, 150, 220, 300];

  // Layer Y transforms: only during 0-0.15 (explosion phase)
  const layerYs = targetOffsets.map((target) =>
    useTransform(scrollYProgress, [0, 0.15], [0, target])
  );

  // Active index derived from scroll progress
  const activeIndexMV = useTransform(scrollYProgress, (v) => {
    if (v < 0.15) return -1; // explosion phase
    if (v < 0.29) return 0;
    if (v < 0.43) return 1;
    if (v < 0.57) return 2;
    if (v < 0.71) return 3;
    if (v < 0.85) return 4;
    return 5;
  });

  useMotionValueEvent(activeIndexMV, 'change', (latest) => {
    setActiveIndex(latest);
  });

  return (
    <section ref={sectionRef} className="relative bg-white h-[500vh] pt-0">
      {/* Sticky viewport — pinned to screen */}
      <div className="sticky top-0 h-screen flex items-center px-4 sm:px-8 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* LEFT COLUMN: Stationary info card (fixed position, content swaps) */}
          <div className="relative h-full flex flex-col justify-center">
            {/* Section heading */}
            <div className="mb-12">
              <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
                The Technology
              </div>
              <h2 className="font-serif text-ink leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                Six layers, <span className="italic">one thin insole.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-ink/65">
                A pressure sensor array, BLE radio, and lithium-polymer battery — all under 3 mm of medical-grade silicone.
              </p>
            </div>

            {/* Info card: STATIONARY wrapper, content swaps */}
            <div className="relative h-48">
              <AnimatePresence mode="wait">
                {activeIndex >= 0 && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0"
                  >
                    <div className="float-card rounded-2xl p-6 w-80">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xs font-semibold text-ink/50">{layers[activeIndex].num}</span>
                        <span className="text-xs text-ink/30">/ 06</span>
                      </div>
                      <h3 className="text-sm font-semibold text-ink">{layers[activeIndex].label}</h3>
                      <p className="text-xs text-ink/60 mt-3">{layers[activeIndex].desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Insole stack (container stationary, layers translate Y) */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full max-w-sm h-full flex items-center justify-center">
              {layers.map((layer, i) => {
                const isActive = activeIndex === i;
                const anyActive = activeIndex >= 0;
                const opacity = anyActive ? (isActive ? 1 : 0.25) : 1;
                const scale = isActive ? 1.1 : 1;

                return (
                  <motion.div
                    key={layer.id}
                    style={{ y: layerYs[i] }}
                    animate={{ opacity, scale }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <InsoleSVG fill={layer.fill} stroke={layer.stroke} />
                  </motion.div>
                );
              })}
            </div>

            {/* Connector line: horizontal line from card to active layer */}
            {activeIndex >= 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <motion.line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#0A0A0B"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.circle
                  cx="100%"
                  cy="50%"
                  r="3"
                  fill="#0A0A0B"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Spec strip below viewport */}
      <div className="relative bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              ['< 3 mm', 'Total thickness'],
              ['BLE 5.3', 'Wireless protocol'],
              ['72 hr', 'Battery on a charge'],
              ['256 pts', 'Pressure resolution'],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl text-ink">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
