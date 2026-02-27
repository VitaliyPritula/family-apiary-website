'use client';
import Hero from './components/section/HeroSection';
import ProductSection from './components/section/ProductSection';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProductSection />
    </div>

  );
}
