'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [darkness, setDarkness] = useState(0);

  useEffect(() => {
    let ticking = false;

    function updateDarkness() {
      const techSection = document.getElementById('technology');
      if (!techSection) {
        setDarkness(0);
        ticking = false;
        return;
      }
      const rect = techSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrolled / maxScroll : 0));

      let d = 0;
      if (progress < 0.08) d = 0;
      else if (progress < 0.18) d = (progress - 0.08) / 0.10;
      else if (progress < 0.96) d = 1;
      else if (progress < 1.00) d = 1 - (progress - 0.96) / 0.04;
      else d = 0;

      setDarkness(d);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateDarkness);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateDarkness();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToPreorder = () => {
    document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const lightBg = 'rgba(255, 255, 255, 0.95)';
  const darkBg = 'rgba(255, 255, 255, 0.05)';
  const pillBg = mixRgba(lightBg, darkBg, darkness);

  const lightBorder = 'rgba(255, 255, 255, 0.6)';
  const darkBorder = 'rgba(255, 255, 255, 0.1)';
  const pillBorder = mixRgba(lightBorder, darkBorder, darkness);

  const textColor = mixHex('#0A0A0B', '#FFFFFF', darkness);

  const pillStyle = {
    height: '56px',
    backgroundColor: pillBg,
    borderColor: pillBorder,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '9999px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 4px 12px -4px rgba(0, 0, 0, 0.08)',
    transition: 'background-color 200ms linear, border-color 200ms linear',
  };

  const textStyle = {
    color: textColor,
    transition: 'color 200ms linear',
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-6 px-4"
          style={pillStyle}
        >
          <a
            href="mailto:contact@therapeuo.xyz"
            className="text-sm hover:opacity-100 transition-opacity"
            style={{ ...textStyle, opacity: 0.8 }}
          >
            Contact
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center"
            aria-label="Scroll to top"
          >
            <img
              src="/logos/Therapeuo.svg"
              alt="Therapeuo"
              style={{
                height: '32px',
                width: 'auto',
                filter: `invert(${darkness})`,
                transition: 'filter 200ms linear',
              }}
            />
          </button>

          <a
            href="https://www.youtube.com/@nithinaru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm hover:opacity-100 transition-opacity"
            style={{ ...textStyle, opacity: 0.8 }}
          >
            Learn More
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3H3V13H13V10" strokeLinecap="round" />
              <path d="M9 3H13V7" strokeLinecap="round" />
              <path d="M13 3L8 8" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </nav>

      <div className="fixed top-6 right-6 z-50">
        <div
          className="flex items-center px-4"
          style={pillStyle}
        >
          <button
            onClick={scrollToPreorder}
            className="text-sm hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0"
            style={{ ...textStyle, opacity: 0.8 }}
          >
            Preorder
          </button>
        </div>
      </div>
    </>
  );
}

function mixRgba(a, b, t) {
  const parse = (s) => s.match(/[\d.]+/g).map(Number);
  const [r1, g1, b1, a1] = parse(a);
  const [r2, g2, b2, a2] = parse(b);
  return `rgba(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)}, ${a1 + (a2 - a1) * t})`;
}

function mixHex(c1, c2, t) {
  const h2r = (h) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = h2r(c1);
  const [r2, g2, b2] = h2r(c2);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
}
