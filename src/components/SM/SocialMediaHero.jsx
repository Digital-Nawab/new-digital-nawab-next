import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, TrendingUp, Users, BarChart, Target } from 'lucide-react';

const SocialIcon = ({ Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm hover:scale-110 transition-transform duration-300 ${color}`}
  >
    <Icon className="w-6 h-6 text-white" />
  </motion.div>
);

const StatsCard = ({ Icon, stat, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center gap-4"
  >
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h4 className="text-2xl font-bold text-white">{stat}</h4>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  </motion.div>
);

const SocialMediaHero = () => {
  const socialIcons = [
    { Icon: Instagram, color: 'bg-gradient-to-br from-purple-600 to-pink-600', delay: 0.2 },
    { Icon: Facebook, color: 'bg-gradient-to-br from-blue-600 to-blue-700', delay: 0.3 },
    { Icon: Twitter, color: 'bg-gradient-to-br from-blue-400 to-blue-500', delay: 0.4 },
    { Icon: Linkedin, color: 'bg-gradient-to-br from-blue-700 to-blue-800', delay: 0.5 }
  ];

  const stats = [
    { Icon: TrendingUp, stat: '300%', label: 'Average Growth', delay: 0.3 },
    { Icon: Users, stat: '1M+', label: 'Followers Gained', delay: 0.4 },
    { Icon: BarChart, stat: '85%', label: 'Engagement Rate', delay: 0.5 },
    { Icon: Target, stat: '95%', label: 'Client Satisfaction', delay: 0.6 }
  ];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
      alt: 'Social Media Marketing',
      className: 'rounded-2xl shadow-lg w-full h-64 object-cover'
    },
    {
      src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&q=80',
      alt: 'Social Media Strategy',
      className: 'rounded-2xl shadow-lg w-full h-48 object-cover mt-12'
    },
    {
      src: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&q=80',
      alt: 'Content Creation',
      className: 'rounded-2xl shadow-lg w-full h-48 object-cover'
    },
    {
      src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&q=80',
      alt: 'Analytics Dashboard',
      className: 'rounded-2xl shadow-lg w-full h-64 object-cover -mt-12'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      
      {/* Floating Social Icons */}
      <div className="absolute top-20 right-20 space-y-4">
        {socialIcons.map((social, index) => (
          <SocialIcon key={index} {...social} />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Boost Your Social
              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Media Presence
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-lg mb-8 max-w-xl"
            >
              Transform your brand's social media presence with our data-driven strategies. 
              We help you connect with your audience, drive engagement, and achieve measurable results.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Get Started
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {images.map((image, index) => (
                <img loading="lazy" decoding="async" 
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={image.className}
                />
              ))}
            </motion.div>

            {/* Decorative Gradient Blobs */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gray-800"
          />
        </svg>
      </div>
    </div>
  );
};

export default SocialMediaHero;