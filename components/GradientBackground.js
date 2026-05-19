'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Fixed full-viewport gradient. As the user scrolls past the hero,
 * the gradient's opacity fades from 1 → 0, revealing the white page beneath.
 * This mirrors the second screenshot's blue/purple/pink wash that
 * "disappears and turns white" as you scroll.
 */
export default function GradientBackground() {
  const { scrollY } = useScroll();

  // Fade out from full opacity at the top to 0 by ~1600px of scroll
  const opacity = useTransform(scrollY, [0, 1600], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="therapeuo-gradient grain fixed inset-0 z-0 pointer-events-none"
    />
  );
}
