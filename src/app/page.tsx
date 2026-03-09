'use client';
import AboutSection from './components/section/AboutSection';
import ContactSection from './components/section/ContactSection';
import Hero from './components/section/HeroSection';
import ProductSection from './components/section/ProductSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
