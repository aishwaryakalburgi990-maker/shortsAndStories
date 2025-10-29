import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { couples } from '../data/couples';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Recent Weddings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every couple has a unique story. Explore some of the beautiful weddings I've had the privilege to document.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {couples.map((couple) => (
            <Link
              key={couple.id}
              to={`/portfolio/${couple.id}`}
              className="group block break-inside-avoid mb-6"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={couple.coverImage}
                  alt={`${couple.names} wedding`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-light text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {couple.names}
                </h3>
                <p className="text-gray-600 mb-2">{couple.title}</p>
                <p className="text-sm text-gray-500">{couple.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Want to see more of my work?
          </p>
          <Link
            to="/videos"
            className="inline-flex items-center px-6 py-3 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-full font-medium transition-all duration-300"
          >
            View Wedding Films
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
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