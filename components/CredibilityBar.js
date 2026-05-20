'use client';

const LOGOS = [
  { src: '/logos/cal.png', scale: 1.0 },
  { src: '/logos/purdue.png', scale: 1.0 },
  { src: '/logos/ucberkeley.svg.png', scale: 1.0 },
  { src: '/logos/ensigngroup.png', scale: 1.15 },
  { src: '/logos/davis.png', scale: 1.0 },
  { src: '/logos/nhs.png', scale: 1.0 },
  { src: '/logos/ucdavis.png', scale: 1.0 },
];

export default function CredibilityBar() {
  return (
    <section
      className="relative bg-white border-t border-ink/10 overflow-hidden py-8 sm:py-12 px-4 pb-0"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="text-center mb-6">
        <span className="text-sm uppercase tracking-wider text-ink/60">
          Designed by:
        </span>
      </div>

      <div className="overflow-x-hidden group" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div
          className="flex animate-marquee"
          style={{ animationDuration: '40s', width: 'fit-content' }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="shrink-0 transition-transform duration-300 hover:scale-110"
              style={{
                height: `${96 * logo.scale}px`,
                width: 'auto',
                minWidth: '180px',
                maxWidth: '320px',
                marginRight: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
              }}
            >
              <img
                src={logo.src}
                alt=""
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
