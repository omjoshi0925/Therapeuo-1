'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/**
 * Technology section with sticky scroll-driven exploded view.
 *
 * Structure:
 * - Outer: h-[400vh] scroll runway
 * - Inner sticky: top-0 h-screen viewport
 *
 * Scroll stages (scrollYProgress 0 to 1):
 *   0.00–0.10: layers stacked
 *   0.10–0.20: layers explode apart
 *   0.20–0.32: layer 1 active
 *   0.32–0.44: layer 2 active
 *   0.44–0.56: layer 3 active
 *   0.56–0.68: layer 4 active
 *   0.68–0.80: layer 5 active
 *   0.80–1.00: layer 6 active
 */
export default function ExplodedView() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const layers = [
    { id: 0, label: '01 · Top liner', sub: 'Antimicrobial fabric', fill: '#E2E8F0', stroke: '#94A3B8' },
    { id: 1, label: '02 · Pressure array', sub: '256 capacitive points', fill: '#FED7AA', stroke: '#F97316' },
    { id: 2, label: '03 · Flex PCB', sub: 'Polyimide circuit', fill: '#BBF7D0', stroke: '#16A34A' },
    { id: 3, label: '04 · BLE module', sub: 'Bluetooth Low Energy 5.3', fill: '#BFDBFE', stroke: '#2563EB' },
    { id: 4, label: '05 · Battery', sub: '120 mAh LiPo', fill: '#FBCFE8', stroke: '#DB2777' },
    { id: 5, label: '06 · Base footbed', sub: 'Medical-grade silicone', fill: '#E5E7EB', stroke: '#6B7280' },
  ];

  // Exploded Y positions for each layer
  const explodedPositions = [-200, -120, -40, 40, 120, 200];

  // Determine active layer based on scroll progress
  const getActiveLayer = (progress) => {
    if (progress < 0.2) return -1; // stacking/exploding phase
    const layerIndex = Math.floor((progress - 0.2) / 0.12);
    return Math.min(layerIndex, 5);
  };

  // Create transforms for each layer
  const createLayerTransforms = (index) => {
    const explodedY = explodedPositions[index];

    return {
      // Y: move from stacked (0) to exploded position during 0.10-0.20
      y: useTransform(scrollYProgress, [0.1, 0.2], [0, explodedY]),

      // Opacity: active layer full, others dimmed to 30%
      opacity: useTransform(
        scrollYProgress,
        [
          0.2 + index * 0.12 - 0.03,
          0.2 + index * 0.12,
          0.2 + (index + 1) * 0.12,
          0.2 + (index + 1) * 0.12 + 0.03,
        ],
        [0.3, 1, 1, 0.3]
      ),

      // Scale: active layer 1.1x, others 1.0x
      scale: useTransform(
        scrollYProgress,
        [
          0.2 + index * 0.12 - 0.03,
          0.2 + index * 0.12,
          0.2 + (index + 1) * 0.12,
          0.2 + (index + 1) * 0.12 + 0.03,
        ],
        [1, 1.1, 1.1, 1]
      ),
    };
  };

  // Create transforms for info boxes (fade in/out with slide)
  const createInfoBoxTransforms = (index) => {
    const activeStart = 0.2 + index * 0.12;
    const activeEnd = 0.2 + (index + 1) * 0.12;

    return {
      opacity: useTransform(
        scrollYProgress,
        [
          activeStart - 0.03,
          activeStart,
          activeEnd,
          activeEnd + 0.03,
        ],
        [0, 1, 1, 0]
      ),
      y: useTransform(
        scrollYProgress,
        [
          activeStart - 0.03,
          activeStart,
          activeEnd,
          activeEnd + 0.03,
        ],
        [20, 0, 0, -20]
      ),
    };
  };

  // Connector line opacity
  const createConnectorOpacity = (index) => {
    const activeStart = 0.2 + index * 0.12;
    const activeEnd = 0.2 + (index + 1) * 0.12;

    return useTransform(
      scrollYProgress,
      [
        activeStart - 0.02,
        activeStart,
        activeEnd,
        activeEnd + 0.02,
      ],
      [0, 1, 1, 0]
    );
  };

  const layerTransforms = layers.map((_, i) => createLayerTransforms(i));
  const infoBoxTransforms = layers.map((_, i) => createInfoBoxTransforms(i));
  const connectorOpacities = layers.map((_, i) => createConnectorOpacity(i));

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative bg-white h-[400vh]"
    >
      {/* Sticky viewport — pinned at top of screen */}
      <div className="sticky top-0 h-screen flex items-center px-4 sm:px-8 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex gap-12 items-center h-full">
          {/* LEFT: Info boxes + section heading */}
          <div className="hidden lg:flex flex-col w-1/2 justify-center relative">
            {/* Section text */}
            <div className="mb-16">
              <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
                The Technology
              </div>
              <h2
                className="font-serif text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                Six layers, <span className="italic">one thin insole.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-ink/65">
                A pressure sensor array, BLE radio, and lithium-polymer battery —
                all under 3 mm of medical-grade silicone.
              </p>
            </div>

            {/* Info boxes container */}
            <div className="relative h-32">
              <AnimatePresence mode="wait">
                {layers.map((layer, i) => (
                  <motion.div
                    key={layer.id}
                    style={{
                      opacity: infoBoxTransforms[i].opacity,
                      y: infoBoxTransforms[i].y,
                    }}
                    className="absolute left-0 top-0"
                  >
                    <div className="bg-white border border-ink/10 rounded-2xl p-6 w-96">
                      <div className="text-xs font-semibold text-ink uppercase tracking-wider">
                        {layer.label}
                      </div>
                      <div className="text-xs text-ink/55 mt-2">{layer.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Insole stack + connector lines */}
          <div className="flex-1 flex justify-center items-center h-full relative">
            {/* Container for insoles */}
            <div className="relative w-full h-full max-w-sm flex items-center justify-center">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  style={{
                    y: layerTransforms[i].y,
                    opacity: layerTransforms[i].opacity,
                    scale: layerTransforms[i].scale,
                  }}
                  className="absolute"
                >
                  <InsoleSVG fill={layer.fill} stroke={layer.stroke} />
                </motion.div>
              ))}
            </div>

            {/* Connector lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: 'visible' }}
            >
              {layers.map((_, i) => (
                <motion.line
                  key={`connector-${i}`}
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#0A0A0B"
                  strokeWidth="1"
                  style={{
                    opacity: connectorOpacities[i],
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Spec strip below viewport */}
      <div className="relative bg-white pb-0">
        <div className="px-4 sm:px-8 py-24">
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
                  <div className="mt-1 text-xs uppercase tracking-wider text-ink/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Insole SVG silhouette
 */
function InsoleSVG({ fill, stroke }) {
  return (
    <svg
      width="280"
      height="100"
      viewBox="0 0 220 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <path
        d="M 25 40
           C 25 15, 50 8, 95 8
           C 145 8, 175 12, 195 22
           C 215 32, 215 48, 195 58
           C 175 68, 145 72, 95 72
           C 50 72, 25 65, 25 40 Z"
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
