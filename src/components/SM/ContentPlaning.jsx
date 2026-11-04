import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Edit3, 
  BarChart2, 
  Clock, 
  Target, 
  MessageCircle, 
  Palette, 
  Layers,
  TrendingUp,
  Users,
  CheckCircle
} from "lucide-react";

const ContentPlaning = () => {
  const services = [
    {
      title: "Content Strategy Development",
      description: "Data-driven content planning aligned with your business goals and audience needs",
      icon: <Target className="w-6 h-6 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500"
    },
    {
      title: "Creative Design & Graphics",
      description: "Eye-catching visuals and graphics that enhance your brand message",
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=500"
    },
    {
      title: "Content Calendar Management",
      description: "Organized scheduling and planning of your content across platforms",
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500"
    },
    {
      title: "Copywriting & Editing",
      description: "Compelling copy that engages your audience and drives action",
      icon: <Edit3 className="w-6 h-6 text-red-600" />,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const features = [
    { icon: <Clock />, text: "Timely Content Delivery" },
    { icon: <TrendingUp />, text: "Performance Tracking" },
    { icon: <Users />, text: "Audience Analysis" },
    { icon: <CheckCircle />, text: "Quality Assurance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 space-y-6"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Strategic 
                <span className="text-blue-600"> Content Planning </span>
                & Creative Design
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your ideas into engaging content that resonates with your audience and drives results.
              </p>
              <div className="flex flex-wrap gap-4 py-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                    <span className="text-blue-600">{feature.icon}</span>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
                  Get Started
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-6 rounded-full text-lg">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Image Grid */}
            <div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 grid grid-cols-2 gap-4"
            >
              {services.map((service, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 rounded-xl"></div>
                  <img loading="lazy" decoding="async" 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            initial={{ opacity: 0, y: 20 }}
            //whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Content Planning Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive content solutions tailored to your brand's unique voice and objectives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                //whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-amber-400">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <div
            initial={{ opacity: 0, y: 20 }}
            //whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's create content that engages your audience and drives real results.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentPlaning;