'use client';

import { motion } from 'framer-motion';

/**
 * Testimonial section with quote, attribution, and avatar.
 */
export default function Testimonial() {
  return (
    <section className="pt-32 sm:pt-64 pb-20 sm:pb-32 px-4" aria-labelledby="testimonial-heading">
      <div className="max-w-2xl mx-auto text-center">
        <h2 id="testimonial-heading" className="sr-only">
          What clinicians say about the Therapeuo smart insole
        </h2>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-xl sm:text-3xl text-ink leading-relaxed italic"
        >
          “A novel solution that accelerates physical healing process by 2x”
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          {/* Circular avatar */}
          <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-ink/60"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Attribution */}
          <div className="text-left">
            <div className="text-xs sm:text-sm font-medium text-ink">
              — Gauri Joshi, Therapy Resource @ The Ensign Group
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
