import React, { useState } from 'react';
import { Mail, Phone, Instagram, MessageCircle, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message! I will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Let's Create Magic Together
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'd love to hear about your special day and discuss how I can help capture your beautiful moments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell me about your wedding
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Wedding date, venue, number of guests, and any special requests..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@shotsandstories.com"
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>hello@shotsandstories.com</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors group"
                >
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>+91 98765 43210</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Connect on Social Media</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/shotsandstories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Quick Response Time</h4>
              <p className="text-gray-600">
                I typically respond to inquiries within 24 hours. For urgent requests, feel free to call or WhatsApp me directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;