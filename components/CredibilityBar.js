'use client';

import Image from 'next/image';

const LOGOS = [
  { src: '/logos/cal.png', scale: 1.0, alt: 'California Golden Bears (UC Berkeley Athletics) logo' },
  { src: '/logos/purdue.png', scale: 1.0, alt: 'Purdue University logo' },
  { src: '/logos/ucberkeley.svg.png', scale: 1.0, alt: 'UC Berkeley logo' },
  { src: '/logos/ensigngroup.png', scale: 1.15, alt: 'The Ensign Group logo' },
  { src: '/logos/davis.png', scale: 1.0, alt: 'UC Davis logo' },
  { src: '/logos/nhs.png', scale: 1.0, alt: 'NHS (UK National Health Service) logo' },
  { src: '/logos/ucdavis.png', scale: 1.0, alt: 'UC Davis Health logo' },
];

export default function CredibilityBar() {
  return (
    <section
      className="relative bg-white border-t border-ink/10 overflow-hidden py-8 sm:py-12 px-4 pb-0"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="text-center mb-6">
        <h2 className="text-sm uppercase tracking-wider text-ink/60 font-normal m-0">
          <span className="sr-only">
            Therapeuo smart insole engineered by researchers and clinicians from:{' '}
          </span>
          <span aria-hidden="true">Designed by:</span>
        </h2>
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
              <Image
                src={logo.src}
                alt={logo.alt}
                width={320}
                height={96}
                sizes="(max-width: 768px) 40vw, 320px"
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
