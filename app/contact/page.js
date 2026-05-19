'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Minimalist contact page.
 * Pure white background (no hero gradient on this route), a single
 * editorial heading, a short address-style block, and a simple form.
 */
export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to your email service of choice.
    console.log('Contact:', { name, email, message });
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white text-ink px-4 pt-10 pb-24">
      {/* Tiny home link */}
      <nav className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink/55 hover:text-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 10H5M9 6l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Therapeuo
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
            Contact
          </div>
          <h1
            className="font-serif text-ink leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Say <span className="italic">hello.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base sm:text-lg text-ink/65">
            Clinical inquiry, press, partnership, or just curious — we read every
            message.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-[1fr_2fr] gap-12">
          {/* Left column — address-style info */}
          <div className="space-y-8 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-ink/40 mb-2">
                Email
              </div>
              <a href="mailto:hello@therapeuo.xyz" className="text-ink hover:underline">
                hello@therapeuo.xyz
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink/40 mb-2">
                Clinical
              </div>
              <a href="mailto:clinical@therapeuo.xyz" className="text-ink hover:underline">
                clinical@therapeuo.xyz
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink/40 mb-2">
                Press
              </div>
              <a href="mailto:press@therapeuo.xyz" className="text-ink hover:underline">
                press@therapeuo.xyz
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-ink/10 pt-8"
              >
                <div className="font-serif text-3xl text-ink">
                  Message <span className="italic">received.</span>
                </div>
                <p className="mt-3 text-ink/65">
                  We'll get back to you at{' '}
                  <span className="text-ink font-medium">{email}</span> shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-0 py-3 bg-transparent border-b border-ink/15 text-ink focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
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
                    className="w-full px-0 py-3 bg-transparent border-b border-ink/15 text-ink focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-ink/50 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-ink/15 text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-white rounded-full text-sm font-medium hover:-translate-y-0.5 transition-transform"
                >
                  Send message
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
