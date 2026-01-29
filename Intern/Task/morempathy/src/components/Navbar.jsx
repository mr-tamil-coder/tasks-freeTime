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
      <>
        <nav className="w-full flex justify-between items-center py-6 px-8 max-w-7xl mx-auto sticky top-0 bg-white/95 backdrop-blur-sm z-40">
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
        </nav>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
            <div 
              className="text-2xl font-bold tracking-tight cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              morempathy<span className="text-yellow-400">.</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-6 h-6 text-yellow-400" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col px-6 py-4 gap-4 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-lg font-medium w-full transition-colors ${
                    activeSection === link.id
                      ? 'text-black'
                      : 'text-gray-900 hover:text-yellow-500'
                  }`}
                >
                  {link.label}
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 mt-auto border-t border-gray-100">
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 px-6 py-4 rounded-full font-bold text-black hover:brightness-105 transition-all shadow-sm text-sm"
            >
              CONTACT US
              <Heart className="w-4 h-4 fill-white text-white" />
            </button>
          </div>
        </div>
      </>
    );
  };

  export default Navbar;
