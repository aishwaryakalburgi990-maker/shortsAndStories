import React from 'react';
import { Heart, Camera, Award, ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const achievements = [
    { icon: Heart, number: '500+', label: 'Couples Served' },
    { icon: Camera, number: '8+', label: 'Years Experience' },
    { icon: Award, number: '50+', label: 'Awards Won' }
  ];

  const philosophy = [
    {
      title: 'Authentic Moments',
      description: 'I believe the most beautiful photographs happen when you forget the camera is there. My approach is unobtrusive, capturing genuine emotions and spontaneous interactions.'
    },
    {
      title: 'Storytelling',
      description: 'Every wedding tells a unique story. I focus on documenting the narrative of your day - from the quiet moments of preparation to the joyous celebrations.'
    },
    {
      title: 'Timeless Artistry',
      description: 'My style blends photojournalistic storytelling with artistic composition, creating images that feel both contemporary and timeless.'
    }
  ];

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
              About Me
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A passionate storyteller dedicated to preserving the most precious moments of your journey together.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Photographer at work"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600 rounded-2xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-200 rounded-2xl"></div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
                Hello, I'm [Photographer Name]
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

              <div className="mt-12 flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <span>Based in Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <span>Available Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <div className="text-4xl font-light text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              My Photography Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three core principles that guide every wedding I photograph
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 text-center">
              Beyond the Camera
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                When I'm not behind the camera, you'll find me exploring new destinations, seeking inspiration in everyday moments, or spending time with my own family. I believe that experiencing life fully makes me a better storyteller for your special day.
              </p>
              <p>
                I understand that choosing a wedding photographer is about more than just technical skills - it's about trust, connection, and finding someone who truly understands your vision. I take pride in building genuine relationships with my couples, ensuring that your wedding day feels comfortable and authentic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            I'd love to hear about your wedding plans and discuss how we can capture your unique story.
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

export default About;