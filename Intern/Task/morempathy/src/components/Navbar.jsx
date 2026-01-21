import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center py-6 px-8 max-w-7xl mx-auto sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      {/* Logo */}
      <div 
        className="text-2xl font-bold tracking-tight cursor-pointer"
        onClick={() => scrollToSection('home')}
      >
        morempathy<span className="text-primary">.</span>
      </div>

      {/* Center Navigation - Desktop */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-2 py-1.5 shadow-sm">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === link.id
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right Action */}
      <button 
        onClick={() => scrollToSection('contact')}
        className="hidden md:flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-sm"
      >
        Contact Us
        <Heart className="w-4 h-4 fill-black text-black" />
      </button>

      {/* Mobile Menu Icon */}
      <button 
        className="md:hidden p-2 text-gray-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden py-4 px-6 border-t">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left py-3 px-4 rounded-lg mb-2 transition-colors ${
                activeSection === link.id
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full flex items-center justify-center gap-2 bg-primary px-6 py-3 rounded-full font-semibold text-sm mt-4"
          >
            Contact Us
            <Heart className="w-4 h-4 fill-black text-black" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
