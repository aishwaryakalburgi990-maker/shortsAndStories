import { useState } from 'react';
import { Play, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCouplesWithVideos } from '../hooks/useCouples';

const Videos = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const { data: couplesData, loading, error } = useCouplesWithVideos();

  const couples = couplesData?.couples || [];

  const openVideo = (videoUrl: string) => {
    // Handle Google Drive video ID
    let embedUrl = videoUrl;
    
    // If it's just a Google Drive ID (not a full URL)
    if (videoUrl && !videoUrl.includes('http')) {
      embedUrl = `https://drive.google.com/file/d/${videoUrl}/preview`;
    } else if (videoUrl.includes('drive.google.com')) {
      // Extract ID from Google Drive URL if full URL is provided
      const match = videoUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const driveId = match[1];
        embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;
      }
    }
    
    setSelectedVideoUrl(embedUrl);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wedding films...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load wedding films</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 relative">
      {/* Header */}
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
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
              Wedding Cinemas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every wedding has its own rhythm, its own story. These films capture the essence of love, 
              laughter, and the beautiful chaos that makes each celebration unique.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {couples.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No wedding films available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for beautiful wedding stories!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {couples.map((couple) => (
                <div key={couple.id} className="group">
                  <div
                    className="relative overflow-hidden rounded-lg cursor-pointer mb-4"
                    onClick={() => couple.videoUrl && openVideo(couple.videoUrl)}
                  >
                    <img
                      src={couple.coverImageUrl}
                      alt={couple.names}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{couple.names}</h3>
                  <p className="text-gray-600 mb-2">{couple.title}</p>
                  {couple.location && (
                    <p className="text-sm text-gray-500">{couple.location}</p>
                  )}
                  {couple.date && (
                    <p className="text-sm text-gray-500">{couple.date}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl aspect-video relative">
            <iframe
              src={selectedVideoUrl}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0 rounded-lg"
            ></iframe>
            
            <button
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute -top-12 right-0 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
