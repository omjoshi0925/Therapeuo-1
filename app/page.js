'use client';

import Hero from '@/components/Hero';
import CredibilityBar from '@/components/CredibilityBar';
import PreOrder from '@/components/PreOrder';
import Testimonial from '@/components/Testimonial';
import BottomGradient from '@/components/BottomGradient';
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
        <CredibilityBar />
        <PreOrder />
        <BottomGradient>
          <Testimonial />
          <Footer />
        </BottomGradient>
      </div>
    </main>
  );
}
