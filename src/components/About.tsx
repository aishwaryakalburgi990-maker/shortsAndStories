import React from 'react';
import { Heart, Camera, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                I'm a passionate candid wedding photographer based in India, dedicated to capturing the authentic emotions and spontaneous moments that make your wedding day truly special.
              </p>
              <p>
                With over 8 years of experience in wedding photography, I believe that the most beautiful moments happen when you're simply being yourself. My approach is unobtrusive, allowing you to enjoy your celebration while I document the real, unscripted moments that tell your unique love story.
              </p>
              <p>
                Every wedding is a new adventure, a new story to tell. I'm honored to be part of your journey and to preserve these precious memories for generations to come.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">500+</div>
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

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Photographer at work"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600 rounded-lg"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;