import React from 'react';
import { Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Videos = () => {
  const weddingFilms = [
    {
      id: 1,
      title: 'Arjun & Priya - A Love Story',
      vimeoId: '123456789', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A beautiful celebration of love in the heart of Rajasthan',
      duration: '4:32',
      location: 'Jaipur, Rajasthan'
    },
    {
      id: 2,
      title: 'Rohit & Sneha - Forever Begins',
      vimeoId: '987654321', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional ceremonies meet modern romance in Mumbai',
      duration: '5:18',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 3,
      title: 'Vikram & Asha - Eternal Bond',
      vimeoId: '456789123', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A magical destination wedding in the hills of Himachal',
      duration: '6:45',
      location: 'Shimla, Himachal Pradesh'
    },
    {
      id: 4,
      title: 'Karan & Meera - Sacred Vows',
      vimeoId: '789123456', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'An intimate ceremony filled with heartfelt moments',
      duration: '3:56',
      location: 'Udaipur, Rajasthan'
    },
    {
      id: 5,
      title: 'Amit & Kavya - New Beginnings',
      vimeoId: '321654987', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A vibrant celebration of two souls becoming one',
      duration: '7:12',
      location: 'Goa'
    },
    {
      id: 6,
      title: 'Raj & Pooja - Timeless Love',
      vimeoId: '654987321', // Replace with actual Vimeo ID
      thumbnail: 'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Classic elegance meets contemporary style',
      duration: '5:03',
      location: 'Delhi'
    }
  ];

  const openVimeoVideo = (vimeoId: string) => {
    // Replace with actual Vimeo URLs when you have them
    window.open(`https://vimeo.com/${vimeoId}`, '_blank');
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

      {/* Featured Video */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Featured Film</h2>
          </div>
          
          <div className="relative">
            <div 
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => openVimeoVideo(weddingFilms[0].vimeoId)}
            >
              <img
                src={weddingFilms[0].thumbnail}
                alt={weddingFilms[0].title}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                  <Play className="h-10 w-10 text-gray-800 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-medium mb-2">{weddingFilms[0].title}</h3>
                <p className="text-white/90 mb-1">{weddingFilms[0].description}</p>
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <span>{weddingFilms[0].duration}</span>
                  <span>•</span>
                  <span>{weddingFilms[0].location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Videos Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">All Wedding Films</h2>
            <p className="text-gray-600">A collection of love stories told through moving pictures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Ready to Create Your Wedding Film?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can capture your special day in a cinematic way that you'll treasure forever.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Videos;