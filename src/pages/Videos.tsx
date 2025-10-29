import React, { useState } from 'react';
import { Play, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const weddingFilms = [
    {
      id: 1,
      title: 'Arjun & Priya - A Love Story',
      driveId: '1WA0MBkXtDlYadLILHcmwCsN2INJFLn58', // replace with real ID
      thumbnail: "https://drive.google.com/thumbnail?id=1Yjlb6FKCDR5J4B6NKVdrv7tVUJHhrm33&sz=w1000",
      description: 'A beautiful celebration of love in the heart of Rajasthan',
      duration: '4:32',
      location: 'Jaipur, Rajasthan'
    },
    {
      id: 2,
      title: 'Rohit & Sneha - Forever Begins',
      driveId: '9Z8Y7X6W5V4U3T2S1R',
      thumbnail: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional ceremonies meet modern romance in Mumbai',
      duration: '5:18',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 3,
      title: 'Vikram & Asha - Eternal Bond',
      driveId: 'ABCDEFG1234567890',
      thumbnail: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A magical destination wedding in the hills of Himachal',
      duration: '6:45',
      location: 'Shimla, Himachal Pradesh'
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingFilms.map((film) => (
              <div key={film.id} className="group">
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer mb-4"
                  onClick={() => setSelectedVideo(film.driveId)}
                >
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                      <Play className="h-8 w-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {film.duration}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{film.title}</h3>
                <p className="text-gray-600 mb-2">{film.description}</p>
                <p className="text-sm text-gray-500">{film.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
         <div className="w-full h-screen p-2 sm:p-4 lg:p-16 rounded-lg">
            <iframe
              src={`https://drive.google.com/file/d/${selectedVideo}/preview`}
              width="100%"
  height="600"
  allow="autoplay"
  allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
            
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2"
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
