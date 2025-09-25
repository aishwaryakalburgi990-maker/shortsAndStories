import React from 'react';
import { Play } from 'lucide-react';

const WeddingCinemas = () => {
  const weddingFilms = [
    {
      id: 1,
      title: 'Arjun & Priya - A Love Story',
      vimeoId: '123456789', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A beautiful celebration of love in the heart of Rajasthan'
    },
    {
      id: 2,
      title: 'Rohit & Sneha - Forever Begins',
      vimeoId: '987654321', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional ceremonies meet modern romance in Mumbai'
    },
    {
      id: 3,
      title: 'Vikram & Asha - Eternal Bond',
      vimeoId: '456789123', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A magical destination wedding in the hills of Himachal'
    }
  ];

  const openVimeoVideo = (vimeoId: string) => {
    // Replace with actual Vimeo URLs when you have them
    window.open(`https://vimeo.com/${vimeoId}`, '_blank');
  };

  return (
    <section id="cinemas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Wedding Cinemas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Moving pictures that capture the essence of your special day. Each film is crafted with love, telling your unique story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {weddingFilms.map((film) => (
            <div key={film.id} className="group">
              <div 
                className="relative overflow-hidden rounded-lg cursor-pointer mb-4"
                onClick={() => openVimeoVideo(film.vimeoId)}
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
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{film.title}</h3>
              <p className="text-gray-600">{film.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingCinemas;