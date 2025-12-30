import React from 'react';
import { Heart, Camera, Award, Users, MapPin } from 'lucide-react';
import { useAbout } from '../hooks/useAbout';

const About = () => {
  const { data: aboutData, loading, error } = useAbout();

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('About data error:', error);
  }

  // Fallback data if API fails
  const fallbackData = {
    authorName: 'Sujay',
    description: `I am your photographer friend specialized to create art in beautiful chaos. 
        With a passion for storytelling through images, I strive to preserve precious 
        moments and showcase the beauty of diverse cultures and landscapes worldwide.
        
        Whether documenting the intimacy of weddings or the adventures, my goal is to 
        create evocative images that resonate with authenticity and emotion.
        
        Let me capture your special day with creativity — creating lifelong memories!`,
    yearsExperience: 8,
    couplesServed: 520,
    awardsCount: 50,
    profileImageUrl: null,
    location: 'Mumbai, India'
  };

  const aboutMe = aboutData?.aboutMe || fallbackData;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Hi, I'm {aboutMe.authorName}!
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              {aboutMe.description?.split('\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">{aboutMe.couplesServed}+</div>
                <div className="text-sm text-gray-600">Couples Served</div>
              </div>
              <div className="text-center">
                <Camera className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">{aboutMe.yearsExperience}+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-gray-900">{aboutMe.awardsCount}+</div>
                <div className="text-sm text-gray-600">Awards Won</div>
              </div>
            </div>

            {aboutMe.location && (
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                <span className="text-gray-600">Based in {aboutMe.location}</span>
              </div>
            )}
          </div>

          {/* IMAGE SIDE */}
          <div className="relative flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md w-full">
              <img
                src={aboutMe.profileImageUrl || "https://drive.google.com/thumbnail?id=1uRgs8_9hKfsUCTP9yjR3kwt_djOEHbhp&sz=w1000"}
                alt={`${aboutMe.authorName} at work`}
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
