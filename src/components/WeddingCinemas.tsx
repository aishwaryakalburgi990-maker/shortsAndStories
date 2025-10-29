import React, { useState } from "react";
import { Play, X } from "lucide-react";

const WeddingCinemas = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Replace `driveLink` values with your client's actual Google Drive URLs
  const weddingFilms = [
    {
      id: 1,
      title: "Arjun & Priya - A Love Story",
      driveLink: "https://drive.google.com/file/d/1WA0MBkXtDlYadLILHcmwCsN2INJFLn58/view?usp=sharing",
      thumbnail:
        "https://drive.google.com/thumbnail?id=1Yjlb6FKCDR5J4B6NKVdrv7tVUJHhrm33&sz=w1000",
      description: "A beautiful celebration of love in the heart of Rajasthan",
    },
    {
      id: 2,
      title: "Rohit & Sneha - Forever Begins",
      driveLink: "https://drive.google.com/file/d/9Z8Y7X6W5V4U3T2S1/view?usp=sharing",
      thumbnail:
        "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Traditional ceremonies meet modern romance in Mumbai",
    },
    {
      id: 3,
      title: "Vikram & Asha - Eternal Bond",
      driveLink: "https://drive.google.com/file/d/7F6E5D4C3B2A1Z0X9/view?usp=sharing",
      thumbnail:
        "https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A magical destination wedding in the hills of Himachal",
    },
  ];

  // Extract file ID from Google Drive link
  const getFileId = (link: string) => {
    const match = link.match(/\/d\/(.*?)\//);
    return match ? match[1] : "";
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
          {weddingFilms.map((film) => {
            const fileId = getFileId(film.driveLink);
            const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

            return (
              <div key={film.id} className="group">
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer mb-4"
                  onClick={() => setActiveVideo(embedUrl)}
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
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {film.title}
                </h3>
                <p className="text-gray-600">{film.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for playing video */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={activeVideo}
              allow="autoplay"
              allowFullScreen
              className="w-full h-full rounded-lg"
              title="Wedding Video"
            ></iframe>

            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WeddingCinemas;
