'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative py-8 px-4 pb-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/logos/Therapeuo.svg"
            alt="Therapeuo"
            style={{ height: '28px', width: 'auto' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontStyle: 'normal',
              color: '#0A0A0B',
              fontSize: '1.15rem',
            }}
          >
            Therapeuo
          </span>
        </div>

        <div className="text-sm text-ink/70">
          contact@therapeuo.xyz
        </div>

        <div className="text-xs text-ink/50">
          © {new Date().getFullYear()} Therapeuo · therapeuo.xyz
        </div>
      </div>
    </footer>
  );
}
