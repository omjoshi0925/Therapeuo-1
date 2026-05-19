'use client';

import { useEffect, useState } from 'react';

const FloatingCard = ({ children, positionClass, offsetY = -8, innerClassName = 'px-4 py-3 w-64 flex flex-col' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [offsetYPos, setOffsetYPos] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const cycleDuration = 7000;

    const animate = () => {
      const elapsed = (Date.now() - startTime) % cycleDuration;
      const normalized = elapsed / cycleDuration;
      const sineWave = Math.sin(normalized * Math.PI * 2);
      setOffsetYPos(sineWave * offsetY);
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [offsetY]);

  return (
    <div
      className={`absolute ${positionClass} z-20 pointer-events-auto`}
      style={{ transform: `translateY(${offsetYPos}px)` }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`float-card ${innerClassName} cursor-pointer transition-transform duration-300 ease-out`}
        style={{
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function FloatingCards() {
  const [pct, setPct] = useState(45);

  useEffect(() => {
    const startTime = Date.now();
    const cycleDuration = 4500; // 4.5 seconds per oscillation

    const animate = () => {
      const elapsed = (Date.now() - startTime) % cycleDuration;
      const normalized = elapsed / cycleDuration;
      // Smooth sine wave: oscillates between 38% and 52% (center 45, amplitude 7)
      const sineWave = Math.sin(normalized * Math.PI * 2);
      const newPct = 45 + sineWave * 7;
      setPct(Math.round(newPct));
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const strokeDashoffset = 100 - pct;

  return (
    <>
      {/* TOP-LEFT — Live percent weight-bearing gauge */}
      <FloatingCard
        positionClass="top-32 left-4 sm:left-12 lg:left-24"
        offsetY={-10}
        innerClassName="px-4 py-3 w-56 flex items-center gap-3"
      >
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
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
            {pct}%
          </div>
        </div>
        <div className="text-left">
          <div className="text-[11px] uppercase tracking-wider text-ink/50">Left foot</div>
          <div className="text-sm font-medium text-ink">{pct}% body weight</div>
        </div>
      </FloatingCard>

      {/* TOP-RIGHT — Threshold alert */}
      <FloatingCard
        positionClass="top-44 right-4 sm:right-12 lg:right-24"
        offsetY={-8}
        innerClassName="px-4 py-3 w-64 flex flex-col"
      >
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse-glow" />
          <span className="text-sm font-semibold text-ink">Threshold exceeded</span>
        </div>
        <div className="mt-1 text-xs text-ink/60">
          Limit: 50 lbs · Detected: 63 lbs
        </div>
      </FloatingCard>

      {/* BOTTOM-LEFT — Today's session */}
      <FloatingCard
        positionClass="bottom-40 left-2 sm:left-8 lg:left-20"
        offsetY={-10}
        innerClassName="px-4 py-3 w-60 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
            <path d="M3 12h4l3-9 4 18 3-9h4" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-ink">Today's session</div>
          <div className="text-xs text-ink/60">2,341 steps · 4 alerts</div>
        </div>
      </FloatingCard>

      {/* BOTTOM-RIGHT — Clinician panel */}
      <FloatingCard
        positionClass="bottom-44 right-2 sm:right-8 lg:right-16"
        offsetY={-8}
        innerClassName="px-4 py-4 w-64 flex flex-col"
      >
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
      </FloatingCard>
    </>
  );
}
