'use client';

import Link from 'next/link';

/**
 * The floating navigation pill at the top of the hero.
 * Mirrors Dia's compact rounded nav with a brand mark + thin links.
 */
export default function Navbar() {
  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="float-card flex items-center gap-1 px-2 py-2 pr-5">
        {/* Brand mark — small circular tile */}
        <Link
          href="/"
          className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center font-serif italic text-lg leading-none"
          aria-label="Therapeuo home"
        >
          t
        </Link>

        <div className="hidden sm:flex items-center gap-5 pl-4 text-sm text-ink/80">
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

        {/* Mobile-only Pre-order shortcut */}
        <div className="flex sm:hidden pl-2 text-sm">
          <Link href="#preorder" className="text-ink/80">
            Pre-order
          </Link>
        </div>
      </div>
    </nav>
  );
}
