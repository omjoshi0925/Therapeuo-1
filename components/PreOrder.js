'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [state, setState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const submitted = state === 'success';

  async function handleSubmit(e) {
    e.preventDefault();
    if (state === 'loading' || state === 'success') return;

    if (!name.trim() || !size.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please fill in name, valid email, and shoe size.');
      setState('error');
      return;
    }

    setState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, size, role }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Reservation failed');
      }
      setState('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 12000);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Try again.');
      setState('error');
    }
  }

  return (
    <section
      id="preorder"
      className="relative bg-white pt-32 sm:pt-48 pb-32 sm:pb-40 px-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
          reserve now
        </div>
        <h2
          className="font-serif text-ink leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Reserve your <span className="italic">insole.</span>
        </h2>

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
              <p className="mt-4 text-ink/65 leading-relaxed">
                A confirmation is on its way to{' '}
                <span className="font-medium text-ink">{email}</span> from{' '}
                <span className="font-medium text-ink">reservations@therapeuo.xyz</span>.
                If you don't see it shortly, check your spam folder.
              </p>
              <p className="mt-3 text-ink/65 leading-relaxed">
                Our team will follow up from{' '}
                <span className="font-medium text-ink">contact@therapeuo.xyz</span>{' '}
                within 24–48 hours.
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
                disabled={state === 'loading'}
                className="w-full px-6 py-4 bg-ink text-white rounded-full text-base font-medium shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
              >
                {state === 'loading' ? 'Reserving…' : 'Reserve my insole'}
              </button>

              {state === 'error' && errorMsg && (
                <p className="text-center text-xs text-red-600">{errorMsg}</p>
              )}

              <p className="text-center text-xs text-ink/45">
                We'll only email you about your pre-order. No spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Confirmation popup */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-5 right-5 left-5 sm:left-auto z-50 max-w-sm"
            role="status"
            aria-live="polite"
          >
            <div className="relative rounded-2xl bg-ink text-white shadow-[0_16px_40px_-8px_rgba(0,0,0,0.45)] px-5 py-4 pr-9 text-left">
              <button
                type="button"
                onClick={() => setShowToast(false)}
                aria-label="Dismiss"
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
              <div className="text-sm font-medium mb-1">Reservation received</div>
              <p className="text-sm text-white/70 leading-relaxed">
                You'll get a confirmation from{' '}
                <span className="text-white">reservations@therapeuo.xyz</span>.
                Our team will reach out from{' '}
                <span className="text-white">contact@therapeuo.xyz</span> within
                24–48 hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
