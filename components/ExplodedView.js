'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * The Technology section.
 *
 * As the user scrolls through this section, the insole's six layers
 * separate vertically (an "exploded view"), revealing the stack:
 *
 *   1. Top fabric / patient-side liner
 *   2. Pressure sensor array  (← the core IP)
 *   3. Flex PCB
 *   4. BLE module
 *   5. Battery
 *   6. Base footbed
 *
 * Each layer is a tinted rounded SVG silhouette. As scrollYProgress
 * goes from 0 → 1, each layer translates Y by an offset proportional
 * to its index, with the top layer rising and the base sinking.
 */
export default function ExplodedView() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Each layer translates by a different amount. We map scrollYProgress
  // through a range that "explodes" between 30% and 70% of the section.
  // Outside that range, layers stack neatly.
  const layer1Y = useTransform(scrollYProgress, [0.2, 0.6], [0, -180]);
  const layer2Y = useTransform(scrollYProgress, [0.2, 0.6], [0, -100]);
  const layer3Y = useTransform(scrollYProgress, [0.2, 0.6], [0, -20]);
  const layer4Y = useTransform(scrollYProgress, [0.2, 0.6], [0, 60]);
  const layer5Y = useTransform(scrollYProgress, [0.2, 0.6], [0, 140]);
  const layer6Y = useTransform(scrollYProgress, [0.2, 0.6], [0, 220]);

  // Section copy fades in as you enter
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative bg-white py-32 sm:py-48 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="text-center mb-16 sm:mb-24"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
            The Technology
          </div>
          <h2
            className="font-serif text-ink leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Six layers, <span className="italic">one thin insole.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-ink/65">
            A pressure sensor array, BLE radio, and lithium-polymer battery —
            all under 3 mm of medical-grade silicone. Slides into any shoe.
          </p>
        </motion.div>

        {/* The exploded stack */}
        <div className="relative h-[520px] sm:h-[640px] flex items-center justify-center">
          <ExplodedStack
            transforms={[layer1Y, layer2Y, layer3Y, layer4Y, layer5Y, layer6Y]}
          />
        </div>

        {/* Spec strip */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The actual stack of six SVG insole-shaped silhouettes.
 * Drawn as overlapping rounded teardrops. Each gets its own
 * Y-transform driven by scroll.
 */
function ExplodedStack({ transforms }) {
  const layers = [
    { label: '01 · Top liner', sub: 'Antimicrobial fabric', fill: '#E2E8F0', stroke: '#94A3B8' },
    { label: '02 · Pressure array', sub: '256 capacitive points', fill: '#FED7AA', stroke: '#F97316' },
    { label: '03 · Flex PCB', sub: 'Polyimide circuit', fill: '#BBF7D0', stroke: '#16A34A' },
    { label: '04 · BLE module', sub: 'Bluetooth Low Energy 5.3', fill: '#BFDBFE', stroke: '#2563EB' },
    { label: '05 · Battery', sub: '120 mAh LiPo', fill: '#FBCFE8', stroke: '#DB2777' },
    { label: '06 · Base footbed', sub: 'Medical-grade silicone', fill: '#E5E7EB', stroke: '#6B7280' },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          style={{ y: transforms[i] }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex items-center gap-6">
            {/* The insole silhouette */}
            <InsoleSVG fill={layer.fill} stroke={layer.stroke} />

            {/* Label */}
            <div className="hidden sm:block whitespace-nowrap">
              <div className="text-xs font-semibold text-ink uppercase tracking-wider">
                {layer.label}
              </div>
              <div className="text-xs text-ink/55 mt-0.5">{layer.sub}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * A simple stylized insole shape — narrow at the heel, wider at the ball,
 * tapered at the toes. Drawn with an SVG path. Top-down view.
 */
function InsoleSVG({ fill, stroke }) {
  return (
    <svg
      width="220"
      height="80"
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
      {/* A few small dots to suggest sensor points */}
      <circle cx="60" cy="40" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="90" cy="30" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="90" cy="50" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="130" cy="35" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="130" cy="50" r="1.5" fill={stroke} opacity="0.5" />
      <circle cx="170" cy="40" r="1.5" fill={stroke} opacity="0.5" />
    </svg>
  );
}
