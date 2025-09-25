import React, { useState } from 'react';
import { X } from 'lucide-react';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const portfolioImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Candid wedding moment'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding ceremony'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Reception celebration'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Couple portrait'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding details'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Family moments'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Traditional ceremony'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bridal portrait'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding preparation'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every wedding tells a unique story. Here's a glimpse into the beautiful moments I've had the privilege to capture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Portfolio image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;