'use client';

/**
 * Credibility bar with infinite-scrolling marquee.
 * Shows placeholder logos (represented as letter tiles) with centered "Designed by:" label.
 */
export default function CredibilityBar() {
  const tiles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <section className="relative border-y border-ink/10 bg-white overflow-hidden py-8 sm:py-12 px-4">
      {/* Centered "Designed by:" label */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-wider text-ink/60">
          Designed by:
        </span>
      </div>

      {/* Scrolling marquee track */}
      <div className="overflow-hidden group">
        <div
          className="flex gap-6 animate-marquee"
          style={{ animationDuration: '25s', width: 'fit-content' }}
        >
          {/* Items duplicated for seamless loop */}
          {[...tiles, ...tiles].map((letter, i) => (
            <div
              key={i}
              className="w-24 h-24 rounded-xl bg-ink/8 flex items-center justify-center text-sm font-semibold text-ink shrink-0 transition-transform duration-300 hover:scale-125"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
