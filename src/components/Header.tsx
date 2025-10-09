import React, { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Camera className={`h-8 w-8 transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`} />
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Shots & Stories
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Home
            </button>
            <Link
              to="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/videos"
              className={`text-sm font-medium transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Videos
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors duration-300 hover:text-amber-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mx-4 mb-4">
            <div className="py-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Portfolio
              </button>
              <Link
                to="/videos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Videos
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                About
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;