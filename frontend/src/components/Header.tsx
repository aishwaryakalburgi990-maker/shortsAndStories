import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="flex justify-between items-center py-4 h-16 relative overflow-visible">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <img
                src="/SHOTS.png"
                alt="Shots & Stories - Framing Emotions"
                className="h-40 w-auto mt-2"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-josefin font-medium text-gray-700 transition-colors duration-300 hover:text-amber-600"
            >
              Home
            </button>
            <Link
              to="/portfolio"
              className="text-sm font-josefin font-medium text-gray-700 transition-colors duration-300 hover:text-amber-600"
            >
              Portfolio
            </Link>
            <Link
              to="/videos"
              className="text-sm font-josefin font-medium text-gray-700 transition-colors duration-300 hover:text-amber-600"
            >
              Videos
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-josefin font-medium text-gray-700 transition-colors duration-300 hover:text-amber-600"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-josefin font-medium text-gray-700 transition-colors duration-300 hover:text-amber-600"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800 transition-colors duration-300"
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
                className="block w-full text-left px-4 py-2 font-josefin text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Home
              </button>
              <Link
                to="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 font-josefin text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Portfolio
              </Link>
              <Link
                to="/videos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 font-josefin text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Videos
              </Link>
               <button
              onClick={() => scrollToSection('about')}
               className="block w-full text-left px-4 py-2 font-josefin text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
            >
              About
            </button>
        
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 font-josefin text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
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
