'use client';

import { motion } from 'framer-motion';

/**
 * The floating UI cards that surround the hero headline — mirroring
 * Dia's "Design Show & Tell", "Morning Brief", "Spring Planning" cards.
 * Here they're reframed for Therapeuo:
 *  - Live weight % gauge (clinical, glanceable)
 *  - Threshold alert (the core safety moment)
 *  - Patient progress mini-chart
 *  - Today's session card
 */
export default function FloatingCards() {
  return (
    <>
      {/* TOP-LEFT — Live percent weight-bearing gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-32 left-4 sm:left-12 lg:left-24 z-10"
      >
        <div className="float-card animate-float-slow px-4 py-3 flex items-center gap-3 w-56">
          <div className="relative w-10 h-10 shrink-0">
            <svg viewBox="0 0 40 40" className="w-10 h-10 -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4" />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset="58"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
              42%
            </div>
          </div>
          <div className="text-left">
            <div className="text-[11px] uppercase tracking-wider text-ink/50">Left foot</div>
            <div className="text-sm font-medium text-ink">42% body weight</div>
          </div>
        </div>
      </motion.div>

      {/* TOP-RIGHT — Threshold alert (the "red moment") */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-44 right-4 sm:right-12 lg:right-24 z-10"
      >
        <div className="float-card animate-float-slower px-4 py-3 w-64">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-ink">Threshold exceeded</span>
          </div>
          <div className="mt-1 text-xs text-ink/60">
            Limit: 50 lbs · Detected: 63 lbs
          </div>
        </div>
      </motion.div>

      {/* BOTTOM-LEFT — Today's session card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-40 left-2 sm:left-8 lg:left-20 z-10"
      >
        <div className="float-card animate-float-slow px-4 py-3 flex items-center gap-3 w-60">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
              <path d="M3 12h4l3-9 4 18 3-9h4" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-ink">Today's session</div>
            <div className="text-xs text-ink/60">2,341 steps · 4 alerts</div>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM-RIGHT — Clinician panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-44 right-2 sm:right-8 lg:right-16 z-10"
      >
        <div className="float-card animate-float-slower px-4 py-4 w-64">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-ink">🩺 Clinician panel</div>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-ink/70">Threshold set to 50 lbs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-ink/70">Patient: J. Rivera (Post-op wk 3)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-ink/70">Adherence: 87%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
