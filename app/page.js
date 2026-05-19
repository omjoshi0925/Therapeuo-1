'use client';

import Hero from '@/components/Hero';
import ExplodedView from '@/components/ExplodedView';
import PreOrder from '@/components/PreOrder';
import Footer from '@/components/Footer';
import GradientBackground from '@/components/GradientBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fixed gradient that fades away on scroll */}
      <GradientBackground />

      {/* Content sits above the gradient */}
      <div className="relative z-10">
        <Hero />
        <ExplodedView />
        <PreOrder />
        <Footer />
      </div>
    </main>
  );
}
