'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  {
    q: 'What is the Therapeuo smart insole?',
    a: "Therapeuo is the world's first smart insole engineered for physical therapy. It uses a tri-point pressure-sensor array to measure real-time weight-bearing on each foot, then streams that data over Bluetooth to a companion app so patients and clinicians can see exactly how much load is going through a recovering limb.",
  },
  {
    q: 'How does Therapeuo accelerate physical therapy recovery?',
    a: 'Clinicians typically prescribe a weight-bearing limit (for example, 50 lbs after surgery), but patients have no reliable way to know when they exceed it. Therapeuo gives instant haptic and visual feedback the moment a threshold is crossed, eliminating guesswork. Early field studies indicate this real-time feedback accelerates the healing process by nearly 2×.',
  },
  {
    q: 'Who designed Therapeuo?',
    a: 'Therapeuo was designed by engineers and clinicians from UC Berkeley, Purdue University, and the NHS, in collaboration with therapy partners including The Ensign Group and UC Davis Health.',
  },
  {
    q: 'How does the smart insole fit in my shoe?',
    a: 'Therapeuo is a thin medical-grade carbon-fiber insole under 3 millimeters thick. It slides into any standard shoe like a regular orthotic — no special footwear required.',
  },
  {
    q: 'How long does the battery last?',
    a: 'A 120 mAh lithium-polymer battery delivers up to three full days of continuous use on a single charge.',
  },
  {
    q: 'Does Therapeuo work with Apple Health?',
    a: 'Yes. The onboard BLE 5.3 module streams weight-bearing and gait data to the companion app and to Apple Health–compatible accessories.',
  },
  {
    q: 'When is Therapeuo shipping?',
    a: 'Therapeuo is shipping Fall 2026. The first production batch is limited — reserve your insole on this page to lock in early access.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="relative bg-white pt-24 sm:pt-32 pb-24 sm:pb-32 px-4"
      aria-labelledby="faq-heading"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
            FAQ
          </div>
          <h2
            id="faq-heading"
            className="font-serif text-ink leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Frequently asked <span className="italic">questions.</span>
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 divide-y divide-ink/10 border-t border-b border-ink/10">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between text-left py-6 gap-6 group"
                >
                  <h3 className="font-serif text-lg sm:text-xl text-ink m-0">
                    {item.q}
                  </h3>
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-ink/50 group-hover:text-ink transition-colors"
                    aria-hidden="true"
                    style={{
                      transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  hidden={!open}
                  className="pb-6 pr-10 text-ink/70 text-base leading-relaxed"
                >
                  {item.a}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
