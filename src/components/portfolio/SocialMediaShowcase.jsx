import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Users, Instagram, X } from 'lucide-react';

const SocialMediaShowcase = ({ creatives }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const designTools = [
    { name: 'Photoshop', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-500/20' },
    { name: 'Illustrator', color: 'from-orange-500 to-orange-700', bgColor: 'bg-orange-500/20' },
    { name: 'After Effects', color: 'from-purple-500 to-purple-700', bgColor: 'bg-purple-500/20' },
    { name: 'Figma', color: 'from-pink-500 to-pink-700', bgColor: 'bg-pink-500/20' },
    { name: 'CorelDRAW', color: 'from-green-500 to-green-700', bgColor: 'bg-green-500/20' },
    { name: 'Canva', color: 'from-cyan-500 to-cyan-700', bgColor: 'bg-cyan-500/20' },
    { name: 'Premiere Pro', color: 'from-indigo-500 to-indigo-700', bgColor: 'bg-indigo-500/20' },
    { name: 'InDesign', color: 'from-red-500 to-red-700', bgColor: 'bg-red-500/20' },
    { name: 'Adobe Photoshop', color: 'from-blue-600 to-blue-800', bgColor: 'bg-blue-600/20' },
    { name: 'Adobe Premier Pro', color: 'from-purple-600 to-purple-800', bgColor: 'bg-purple-600/20' },
  ];

  const additionalBadges = [
    { name: 'Creative', color: 'from-emerald-500 to-emerald-700', bgColor: 'bg-emerald-500/20' },
    { name: 'Premium', color: 'from-violet-500 to-violet-700', bgColor: 'bg-violet-500/20' },
    { name: 'Trending', color: 'from-rose-500 to-rose-700', bgColor: 'bg-rose-500/20' },
    { name: 'Featured', color: 'from-amber-500 to-amber-700', bgColor: 'bg-amber-500/20' },
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
  ];

  const getPlatformIcon = (platform) => {
    const platformData = platforms.find((p) => p.id === platform);
    return platformData ? platformData.icon : Instagram;
  };

  const getPlatformColor = (platform) => {
    const platformData = platforms.find((p) => p.id === platform);
    return platformData ? platformData.color : 'from-gray-500 to-gray-700';
  };

  const getTool = (tech) => {
    return (
      designTools.find((tool) => tool.name.toLowerCase() === tech.toLowerCase()) ||
      { name: tech, color: 'from-gray-500 to-gray-700', bgColor: 'bg-gray-500/20' }
    );
  };

  const filteredProjects = activeFilter === 'all' ? creatives : creatives.filter((project) => project.platform === activeFilter);

  const openModal = (project) => {
    setSelectedImage(project);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const LinePattern = () => (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="lines" patternUnits="userSpaceOnUse" width="20" height="20">
            <path
              d="M 0,20 l 20,-20 M -5,5 l 10,-10 M 15,25 l 10,-10"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    </div>
  );

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <LinePattern />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transform transition-all duration-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 mb-6 shadow-lg shadow-pink-500/25">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Social Media Creatives
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Visual storytelling that captivates and converts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const PlatformIcon = getPlatformIcon(project.platform || 'instagram');
            const tool = getTool(JSON.parse(project.tech_used)[0]);
            return (
              <div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openModal(project)}
              >
                <div className="relative overflow-hidden ">
                  <img loading="lazy" decoding="async"
                    src={`https://dashboard.digitalnawab.com/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div
                    className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getPlatformColor(
                      project.platform || 'instagram'
                    )} text-white text-sm font-medium shadow-lg`}
                  >
                    <PlatformIcon size={14} />
                    {project.platform ? project.platform.charAt(0).toUpperCase() + project.platform.slice(1) : 'Instagram'}
                  </div>
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${tool.color} text-white text-xs font-medium shadow-lg backdrop-blur-sm`}
                  >
                    {tool.name}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-lg">{project.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {additionalBadges.slice(0, 2).map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${badge.color} shadow-lg`}
                      >
                        {badge.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 z-10"
            >
              <X size={20} />
            </button>
            <img loading="lazy" decoding="async"
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaShowcase;