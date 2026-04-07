'use client';
import { PasikaLogo } from '@/app/components/PasikaLogo';
import { useCartStore } from "@/app/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Продукція", href: "#products" },
  { label: "Про пасіку", href: "#about" },
  { label: "Контакти", href: "#contacts" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // update `scrolled` state when the page is scrolled
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // check initial position in case the user reloads mid-page
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  // Показувати темний фон тільки на першій сторінці при скролу, інші сторінки - завжди темні
  const shouldShowDarkBg = isHomePage ? scrolled : true;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${shouldShowDarkBg ? 'bg-foreground/90 backdrop-blur-md' : 'bg-transparent'
      }`}>
      <div className="container max-w-6xl mx-auto flex items-center justify-between lg:px-4 px-2 py-3">
        <Link href="/" className="font-display text-xl font-bold text-cream flex-auto">
          <PasikaLogo size="sm" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8 mr-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-dd hover:text-cream text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            id="cart-button"
            onClick={toggleCart}
            className="relative text-dd hover:text-cream transition-colors"
            aria-label="Відкрити кошик"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-golden-gradient text-[#fff] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <Link
          href="/checkout"
          className="bg-golden-gradient text-white mr-15 text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Замовити
        </Link>

        {/* Burger Icon */}
        <div
          className="absolute right-5 flex flex-col justify-between w-6 h-4 lg:hidden cursor-pointer z-20"
          onClick={toggleMenu}>
          <span
            className={`block h-0.5 bg-dd transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""
              }`}></span>
          <span
            className={`block h-0.5 bg-dd transition-all duration-300 ${isOpen ? "opacity-0" : ""
              }`}></span>
          <span
            className={`block h-0.5 bg-dd transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[12px]" : ""
              }`}></span>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-foreground/90 backdrop-blur-md border-t border-cream/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-dd hover:text-cream text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/checkout"
            onClick={() => setIsOpen(false)}
            className="block mt-2 bg-golden-gradient text-white text-sm font-semibold px-5 py-2 rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Замовити
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
