'use client';

/**
 * Bottom gradient wrapper — arch-shaped, peaks at bottom center.
 * Wraps Testimonial and Footer.
 */
export default function BottomGradient({ children }) {
  return (
    <div className="relative therapeuo-gradient-bottom grain">
      {children}
    </div>
  );
}
