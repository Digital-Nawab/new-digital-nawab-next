import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPreviews = [
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "WEB DEV",
    date: "June 3, 2025",
    title: "Modern Web Development Trends",
    excerpt: "Explore the latest trends in web development and stay ahead of the curve."
  },
  {
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "SOCIAL",
    date: "June 2, 2025",
    title: "Social Media Marketing Tips",
    excerpt: "Boost your social media presence with proven strategies."
  },
  {
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "DESIGN",
    date: "June 1, 2025",
    title: "Creative Ad Design Principles",
    excerpt: "Learn how to create compelling ad designs that convert."
  }
];

export default function BlogSection() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-8 group hover:shadow-lg transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-[#FF1F6D] to-[#C73673] rounded-full animate-pulse"></div>
              <span className="text-gray-700 text-sm font-semibold tracking-wide">LATEST POSTS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl custom-bold text-gray-900 mb-4">
              From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1F6D] to-[#C73673]">Blog</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Explore the latest insights about digital marketing, web development, and industry trends.
            </p>
            <button className="bg-gradient-to-r from-[#FF1F6D] to-[#C73673] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mt-6 flex items-center gap-2">
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Get the latest articles and marketing insights delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF1F6D] text-sm"
                />
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Blog Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Feature Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-64">
              <img 
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="SEO Strategies"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF1F6D]/90"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">SEO</span>
                  <p className="text-2xl font-bold mt-2">Marketing Insights</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="p-8">
              <div className="text-[#FF1F6D] text-sm font-semibold mb-3">
                June 4, 2025
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                6 SEO strategies that will boost your rankings in 2025
              </h3>
              <button className="inline-flex items-center gap-2 text-[#C73673] font-semibold hover:gap-3 transition-all duration-200">
                Read more
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Company Journey Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-64">
              <img 
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Company Journey"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C73673]/90"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">Our Journey</p>
                  <p className="text-white/90">Success Story</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="p-8">
              <div className="text-[#FF1F6D] text-sm font-semibold mb-3">
                June 1, 2025
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Digital Nawab's journey: Celebrating milestones and looking ahead 🚀
              </h3>
              <button className="inline-flex items-center gap-2 text-[#C73673] font-semibold hover:gap-3 transition-all duration-200">
                Read more
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Blog Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {blogPreviews.map((blog, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <img 
                  loading="lazy"
                  decoding="async"
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {blog.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-400 text-xs font-medium mb-2">
                  {blog.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#FF1F6D] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center text-[#FF1F6D] text-sm font-semibold group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
