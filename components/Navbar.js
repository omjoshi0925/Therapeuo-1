'use client';

export default function Navbar() {
  const scrollToPreorder = () => {
    document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="float-card flex items-center gap-6 px-4 py-2.5">
          <a
            href="mailto:contact@therapeuo.xyz"
            className="text-sm text-ink/80 hover:text-ink transition-colors"
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
              style={{ height: '40px', width: 'auto' }}
            />
          </button>

          <a
            href="https://www.youtube.com/@nithinaru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink/80 hover:text-ink transition-colors"
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
        <div className="float-card px-3 py-2.5">
          <button
            onClick={scrollToPreorder}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white bg-ink hover:-translate-y-0.5 transition-transform"
          >
            Preorder
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
