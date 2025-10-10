import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, X, Calendar, MapPin, Clock } from 'lucide-react';
import { couples } from '../data/couples';

const CouplePortfolio = () => {
  const { coupleId } = useParams<{ coupleId: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const couple = couples.find(c => c.id === coupleId);

  if (!couple) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Portfolio not found</h1>
          <Link to="/" className="text-amber-600 hover:text-amber-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const openVimeoVideo = () => {
    if (couple.vimeoId) {
      window.open(`https://vimeo.com/${couple.vimeoId}`, '_blank');
    }
  };

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
              {couple.names}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {couple.description}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {couple.gallery.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${couple.names} wedding photo ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Love What You See?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create beautiful memories for your special day too.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>

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
    </div>
  );
};

export default CouplePortfolio;