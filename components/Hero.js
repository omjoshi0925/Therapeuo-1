'use client';

import { motion } from 'framer-motion';
import Navbar from './Navbar';
import FloatingCards from './FloatingCards';

/**
 * Hero — mirrors Dia's editorial layout:
 *  - Floating nav pill at top
 *  - Surrounding UI cards (re-themed for clinical PT context)
 *  - Massive serif headline (Instrument Serif italic accents)
 *  - Short value-prop subtitle
 *  - Black "Preorder" CTA pill
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      <Navbar />
      <FloatingCards />

      {/* Centered editorial content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center min-h-[80vh] mt-12 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-serif text-ink leading-[0.95] tracking-tight"
          style={{
            fontSize: 'clamp(2.75rem, 9vw, 7.5rem)',
          }}
        >
          Every step,
          <br />
          <span className="italic">measured.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 max-w-xl text-base sm:text-lg text-ink/70 leading-relaxed"
        >
          Therapeuo is a smart insole that gives physical therapy patients real-time
          weight-bearing feedback — and gives clinicians peace of mind.
          <br />
          <span className="text-ink/55">No guesswork. No delay.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10"
        >
          <a
            href="#preorder"
            className="group inline-flex items-center justify-center px-10 py-4 bg-ink text-white rounded-full text-base font-medium shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto"
          >
            Preorder
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Small subscript like Dia's tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/40"
        >
          Shipping Spring 2026 · Limited first batch
        </motion.p>
      </div>
    </section>
  );
}
