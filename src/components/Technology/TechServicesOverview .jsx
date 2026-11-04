import React, { useState, useRef, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import {
  Monitor,
  Smartphone,
  Cloud,
  Code,
  ShoppingCart,
  Globe,
  Server,
  Palette,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { AuroraBackground } from "../../components/ui/aurora-background";

const TechServicesOverview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <AuroraBackground>
      <section
        ref={sectionRef}
        className="relative py-20 px-4 w-full  "
      >
        <div className="w-full h-full custom-bold">
          <div
            className={`text-center mb-6 transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium custom-bold text-slate-600">
                Technology Services
              </span>
            </div>

            <h2 className="text-4xl custom-bold md:text-6xl font-bold text-white mb-6">
              Comprehensive
              <span className="block custom-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Tech Solutions
              </span>
            </h2>

            <p className="text-xl text-slate-100 custom max-w-3xl mx-auto leading-relaxed">
              From custom websites to mobile apps and cloud solutions, we
              deliver cutting-edge technology services tailored to your business
              needs.
            </p>
          </div>
          <Carousel items={cards} />
        </div>
        {/* Aceternity UI Style Background Animation */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

          {/* Floating Dots Animation */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float-${
                  i + 1
                }`}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Subtle Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-70 animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full blur-3xl opacity-50 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </section>
    </AuroraBackground>
  );
};

const ServiceContent = ({ title, description, features, imageSrc }) => {
  return (
    <div className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h3>
      <p className="text-neutral-600 text-base md:text-lg font-sans max-w-2xl mb-6">
        {description}
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-neutral-700">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <img loading="lazy" decoding="async"
        src={imageSrc}
        alt={`${title} mockup`}
        height="400"
        width="400"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const data = [
  {
    category: "Custom Website Development",
    title: "Tailored Web Solutions",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <ServiceContent
        title="Custom Website Development"
        description="We build bespoke websites using modern technologies, ensuring high performance and scalability tailored to your business needs."
        features={[
          "ReactJS Development",
          "NodeJS Development",
          "PHP Development",
          "Custom UI/UX Design",
          "Website Maintenance & Support",
        ]}
        imageSrc="https://assets.aceternity.com/macbook.png"
      />
    ),
  },
  {
    category: "WordPress Development",
    title: "Powerful WordPress Websites",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: (
      <ServiceContent
        title="WordPress Website Development"
        description="We create robust and customizable WordPress websites, perfect for blogs, businesses, and portfolios."
        features={[
          "Custom Theme Development",
          "Plugin Development",
          "SEO Optimization",
          "WordPress Maintenance",
          "Secure Hosting Solutions",
        ]}
        imageSrc="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    ),
  },
  {
    category: "Shopify Development",
    title: "Scalable Shopify Stores",
    src: "https://images.unsplash.com/photo-1611162617210-7d15d84ac1b6?q=confirmForum",
    content: (
      <ServiceContent
        title="Shopify Website Development"
        description="We design and develop high-converting Shopify stores, optimized for e-commerce success."
        features={[
          "Custom Shopify Themes",
          "App Integration",
          "Payment Gateway Setup",
          "SEO & Marketing Tools",
          "Store Maintenance & Support",
        ]}
        imageSrc="https://images.unsplash.com/photo-1572569511254-108110756d1a?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    ),
  },
  {
    category: "E-commerce Development",
    title: "Robust E-commerce Platforms",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <ServiceContent
        title="E-commerce Website Development"
        description="We build powerful e-commerce platforms with seamless user experiences and advanced features."
        features={[
          "Custom E-commerce Solutions",
          "ReactJS & NodeJS Integration",
          "Secure Payment Systems",
          "Inventory Management",
          "Analytics & Reporting",
        ]}
        imageSrc="https://images.unsplash.com/photo-1557825906-663d6a87372d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    ),
  },
  {
    category: "Mobile App Development",
    title: "Intuitive Mobile Apps",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <ServiceContent
        title="Mobile App Development"
        description="From ideation to deployment, we build intuitive and feature-rich mobile apps for all platforms."
        features={[
          "iOS App Development",
          "Android App Development",
          "Flutter App Development",
          "Native App Development",
        ]}
        imageSrc="https://images.unsplash.com/photo-1617043983823-3282e687a1e1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    ),
  },
  {
    category: "Cloud Services",
    title: "Scalable Cloud Solutions",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <ServiceContent
        title="Cloud Services"
        description="Leverage cloud solutions for security, flexibility, and global scalability."
        features={[
          "Cloud Consulting",
          "AWS Managed Services",
          "Google Cloud Services",
        ]}
        imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0b2?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    ),
  },
];

export default TechServicesOverview;
