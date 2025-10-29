import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroImages = [
    {
      src: "https://drive.google.com/thumbnail?id=1UUnxbCcS2u-hfS8rw2ZFycdTUr2UGBhU&sz=w1000" ,
      
      
      alt: 'Candid wedding moment - couple laughing together',
      title: 'Authentic Moments',
      subtitle: 'Capturing genuine emotions as they unfold'
    },
    {

      src:"https://drive.google.com/thumbnail?id=1DQic3t9ZKCQ2FRxkdzHtfTccmwxWGtyw&sz=w1000" ,
      alt: 'Traditional wedding ceremony',
      title: 'Sacred Traditions', 
      subtitle: 'Preserving cultural heritage and rituals'
    },
    {


      src:"https://drive.google.com/thumbnail?id=1aR9jRaWDSa4h0sWhG9MojacLPnHuKet8&sz=w1000" ,

      alt: 'Couple portrait in natural setting',
      title: 'Timeless Portraits',
      subtitle: 'Creating memories that last forever'
    },
    {
      src:"https://drive.google.com/thumbnail?id=1ZioN6kjYbOXg7QSHdkcKR4aZ0ibQr1WL&sz=w1000" ,
      alt: 'Wedding celebration and joy',
      title: 'Joyful Celebrations',
      subtitle: 'The happiness and energy of your special day'
    },
    {
      src: "https://drive.google.com/thumbnail?id=1RWQ2jwUltrhH4dvoajZqtx7lDDZ16Hgn&sz=w1000" ,
      alt: 'Intimate wedding details',
      title: 'Beautiful Details',
      subtitle: 'Every element tells part of your story'
    },
    {
      src:  "https://drive.google.com/thumbnail?id=1Yjlb6FKCDR5J4B6NKVdrv7tVUJHhrm33&sz=w1000",
      alt: 'Destination wedding scenery',
      title: 'Destination Dreams',
      subtitle: 'Love stories in breathtaking locations'
    },
    {
      src: "https://drive.google.com/thumbnail?id=17pNHnqdAVlfPUCiC-vl7nLhv7ICGv9Ic&sz=w1000" ,
      alt: 'Bridal preparations and emotions',
      title: 'Getting Ready',
      subtitle: 'The anticipation and excitement before the ceremony'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-light leading-tight">
            Hello, We Are
            <br />
            <span className="text-amber-600 font-semibold">Shots & Stories</span>
          </h1>
        </div>

        {/* Framed Slider */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border-4 border-amber-600 shadow-xl overflow-hidden">
          <div className="relative w-full h-[55vh] md:h-[65vh] bg-black">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))}

            {/* Arrows inside frame */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-amber-400 scale-110' : 'bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA below frame */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Discover My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;