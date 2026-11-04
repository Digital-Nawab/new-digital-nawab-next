import React from 'react';

export default function LatestWorkSection() {
  // Social Media SVG Icons
  const FacebookIcon = () => (
    <svg className="w-8 h-8" fill="blue" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-8 h-8" fill="black" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-8 h-8" fill="purple" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.297 0-4.163-1.866-4.163-4.163 0-2.297 1.866-4.163 4.163-4.163 2.297 0 4.163 1.866 4.163 4.163 0 2.297-1.866 4.163-4.163 4.163zm7.718 0c-2.297 0-4.163-1.866-4.163-4.163 0-2.297 1.866-4.163 4.163-4.163 2.297 0 4.163 1.866 4.163 4.163 0 2.297-1.866 4.163-4.163 4.163z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-8 h-8" fill="blue" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const YoutubeIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const projects = [
    {
      id: 1,
      title: "Artem - Digital Marketing campaign",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Mayhem - Search engine Optimization",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Basic - Pay per click (PPC)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="bg-white py-16 px-8 lg:px-16 relative overflow-hidden">
      {/* Background Social Media Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Facebook Icon */}
        <div className="absolute top-20 left-10 text-gray-100 opacity-50 rotate-12">
          <FacebookIcon />
        </div>
        
        {/* Twitter Icon */}
        {/* <div className="absolute top-32 right-20 text-gray-100 opacity-40 -rotate-12">
          <TwitterIcon />
        </div> */}
        
        {/* Instagram Icon */}
        {/* <div className="absolute bottom-40 left-16 text-gray-100 opacity-60 rotate-45">
          <InstagramIcon />
        </div> */}
        
        {/* LinkedIn Icon */}
        <div className="absolute top-1/2 right-10 text-gray-100 opacity-30 -rotate-6">
          <LinkedInIcon />
        </div>
        
        {/* YouTube Icon */}
        <div className="absolute bottom-20 right-32 text-gray-100 opacity-45 rotate-12">
          <YoutubeIcon />
        </div>
        
        {/* Additional scattered icons for more coverage */}
        <div className="absolute top-1/3 left-1/4 text-gray-100 opacity-25 rotate-90">
          <FacebookIcon />
        </div>
        
        <div className="absolute bottom-1/3 right-1/3 text-gray-100 opacity-35 -rotate-45">
          <TwitterIcon />
        </div>
        
        {/* <div className="absolute top-1/4 right-1/4 text-gray-100 opacity-20 rotate-180">
          <InstagramIcon />
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-16">
          Our latest work
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <img loading="lazy" decoding="async"
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-bold text-black leading-tight group-hover:text-gray-700 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}