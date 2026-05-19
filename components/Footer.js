'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative py-8 px-4 pb-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/90 text-ink flex items-center justify-center font-serif italic">
            t
          </div>
          <span className="font-serif text-xl text-white/90">Therapeuo</span>
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
