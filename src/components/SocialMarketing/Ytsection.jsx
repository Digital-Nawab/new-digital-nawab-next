import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  
 useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/getsmmService");
        const json = await res.json();
        if (json?.data) {
          const formattedServices = json.data.map((item) => ({
            title: item.heading,
            description: item.description,
          }));
          setServices(formattedServices);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  const contactInfo = {
    title: "Are you looking for Youtube Marketing Companies in Lucknow?",
    phone: "+91 9008504821",
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="group bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-700/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 leading-tight">
                z{contactInfo.title}
              </h3>

              <div className="border-t border-white/30 pt-6">
                <p className="text-white/90 mb-4 font-medium">Call us at:</p>
                <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                  <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold tracking-wide">
                    {contactInfo.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-1 h-1 bg-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  );
};

export default ServicesSection;
