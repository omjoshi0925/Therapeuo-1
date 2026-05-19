'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Pre-order form.
 * Simple, single-column, opinionated. Captures:
 *  - Email
 *  - Patient or Clinician (radio)
 *  - Shoe size (optional)
 *
 * On submit, currently logs to console and shows a "you're in" state.
 * Replace the handleSubmit body with a real endpoint (Formspree, Resend,
 * an API route, Airtable, etc.) when you're ready.
 */
export default function PreOrder() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('patient');
  const [size, setSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to your backend / form service.
    // For now we just simulate success.
    console.log('Pre-order:', { name, email, role, size });
    setSubmitted(true);
  }

  return (
    <section id="preorder" className="relative bg-white pt-16 sm:pt-24 pb-32 sm:pb-40 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
          Pre-order now
        </div>
        <h2
          className="font-serif text-ink leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Reserve your <span className="italic">Therapeuo.</span>
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-base sm:text-lg text-ink/65">
          $50 deposit reserves your place in the first production batch.
          Fully refundable. Shipping Spring 2026.
        </p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          {submitted ? (
            <div className="float-card px-8 py-12">
              <div className="font-serif text-3xl text-ink">
                Thanks <span className="italic">{name}</span>, you're on the list.
              </div>
              <p className="mt-3 text-ink/65">
                We'll email <span className="font-medium text-ink">{email}</span> when
                deposits open.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="float-card px-6 sm:px-10 py-8 text-left space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-ink/50 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-xl text-ink placeholder-ink/30 focus:outline-none focus:border-ink/30 focus:bg-white transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-ink/50 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@clinic.com"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-xl text-ink placeholder-ink/30 focus:outline-none focus:border-ink/30 focus:bg-white transition-colors"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/50 mb-2">
                  I am a…
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'patient', label: 'Patient' },
                    { value: 'clinician', label: 'Clinician' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setRole(opt.value)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        role === opt.value
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white/60 text-ink/70 border-ink/10 hover:border-ink/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoe size */}
              <div>
                <label
                  htmlFor="size"
                  className="block text-xs uppercase tracking-wider text-ink/50 mb-2"
                >
                  Shoe size <span className="lowercase text-ink/35">(optional)</span>
                </label>
                <input
                  id="size"
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. US 10 / EU 43"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-xl text-ink placeholder-ink/30 focus:outline-none focus:border-ink/30 focus:bg-white transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-ink text-white rounded-full text-base font-medium shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all"
              >
                Reserve my Therapeuo
              </button>

              <p className="text-center text-xs text-ink/45">
                We'll only email you about your pre-order. No spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
