import React from 'react';
import { Camera, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amber-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center mx-auto mb-6 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/SHOTS.png" 
              alt="Shots & Stories - Framing Emotions" 
             className="h-24 w-auto filter brightness-0 invert"
            />
          </button>

          <p className="text-white mb-6 max-w-2xl mx-auto">
            Preserving your most precious moments with authenticity, artistry, and heart.
            Every frame tells a story, every story deserves to be remembered.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-white">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-amber-500" />
            <span>for couples in love</span>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-white">
            <p>&copy; 2025 Shots & Stories. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;