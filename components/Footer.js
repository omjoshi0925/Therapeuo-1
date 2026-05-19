'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-ink/5 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-serif italic">
            t
          </div>
          <span className="font-serif text-xl text-ink">Therapeuo</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-ink/60">
          <Link href="#technology" className="hover:text-ink transition-colors">
            Technology
          </Link>
          <Link href="#preorder" className="hover:text-ink transition-colors">
            Pre-order
          </Link>
          <Link href="/contact" className="hover:text-ink transition-colors">
            Contact
          </Link>
        </div>

        <div className="text-xs text-ink/40">
          © {new Date().getFullYear()} Therapeuo · therapeuo.xyz
        </div>
      </div>
    </footer>
  );
}
