import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const collageImages = [
    {
      src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Candid wedding moment',
      className: 'col-span-2 row-span-2'
    },
    {
      src: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Wedding ceremony',
      className: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Couple portrait',
      className: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Reception celebration',
      className: 'col-span-1 row-span-2'
    },
    {
      src: 'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Wedding details',
      className: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Traditional ceremony',
      className: 'col-span-2 row-span-1'
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-gray-900">
              Capturing Love
              <br />
              <span className="text-amber-600 font-medium">Unscripted</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 text-gray-600 max-w-xl mx-auto lg:mx-0">
              Candid wedding photography that preserves your most precious moments with authenticity and artistry
            </p>
            <button
              onClick={scrollToPortfolio}
              className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View Portfolio
            </button>
          </div>

          {/* Image Collage */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[500px] md:h-[600px]">
              {collageImages.map((image, index) => (
                <div
                  key={index}
                  className={`${image.className} relative overflow-hidden rounded-lg group cursor-pointer`}
                  onClick={scrollToPortfolio}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToPortfolio}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-300 animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;