import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { useCouple } from '../hooks/useCouples';

const CouplePortfolio = () => {
  const { coupleId } = useParams<{ coupleId: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const id = coupleId ? parseInt(coupleId, 10) : 0;
  const { data: coupleData, loading, error } = useCouple(id);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !coupleData?.couple) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            {error ? `Error: ${error}` : 'Portfolio not found'}
          </h1>
          <Link to="/portfolio" className="text-amber-600 hover:text-amber-700">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const couple = coupleData.couple;

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
              {couple.names}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              {couple.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>{couple.date}</span>
              <span>•</span>
              <span>{couple.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {couple.images && couple.images.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {couple.images
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid mb-6 transition-all duration-300 hover:shadow-xl"
                    onClick={() => setSelectedImage(image.imageUrl)}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`${couple.names} wedding photo ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No images available for this couple.</p>
            </div>
          )}
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
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Portfolio image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CouplePortfolio;