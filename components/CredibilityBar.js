'use client';

const LOGOS = [
  '/logos/cal.png',
  '/logos/ucberkeley.svg.png',
  '/logos/ucdavis.png',
  '/logos/davis.png',
  '/logos/purdue.png',
  '/logos/nhs.png',
  '/logos/ensigngroup.png',
];

export default function CredibilityBar() {
  return (
    <section
      className="relative border-t border-ink/10 overflow-hidden py-8 sm:py-12 px-4 pb-0"
      style={{
        background:
          'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 55%, #0A0A0B 100%)',
      }}
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
          {[...LOGOS, ...LOGOS].map((src, i) => (
            <div
              key={i}
              className="shrink-0 transition-transform duration-300 hover:scale-110"
              style={{
                height: '96px',
                width: 'auto',
                minWidth: '140px',
                maxWidth: '240px',
                marginRight: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
              }}
            >
              <img
                src={src}
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
