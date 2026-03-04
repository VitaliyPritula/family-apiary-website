'use client';
import Hero from './components/section/HeroSection';
import ProductSection from './components/section/ProductSection';
import AboutSection from './components/section/AboutSection';
import ContactSection from './components/section/ContactSection';

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
