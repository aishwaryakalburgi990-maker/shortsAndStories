import React from 'react';
import { Heart, Camera, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Hi, I'm Sujay!
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                I am your photographer friend specialized to create art in beautiful chaos. 
                With a passion for storytelling through images, I strive to preserve precious 
                moments and showcase the beauty of diverse cultures and landscapes worldwide.
              </p>
              <p>
                Whether documenting the intimacy of weddings or the adventures, my goal is to 
                create evocative images that resonate with authenticity and emotion.
              </p>
              <p>
                Let me capture your special day with creativity — creating lifelong memories!
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Couples Served</div>
              </div>
              <div className="text-center">
                <Camera className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">8+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Awards Won</div>
              </div>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md w-full">
              <img
                src="https://drive.google.com/thumbnail?id=1uRgs8_9hKfsUCTP9yjR3kwt_djOEHbhp&sz=w1000" 
                alt="Photographer at work"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600 rounded-2xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
