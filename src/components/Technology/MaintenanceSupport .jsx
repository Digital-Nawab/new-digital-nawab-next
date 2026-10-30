import React, { useState, useEffect } from "react";
import {
  Shield,
  Clock,
  Wrench,
  Headphones,
  Zap,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Database,
  Lock,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const MaintenanceSupport = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [maintenanceServices, setMaintenanceServices] = useState([]);

  const iconMap = {
    "🛡": Shield,
    "🔄": RotateCcw,
    "🗄": Database,
    "📈": TrendingUp,
    "💻": Monitor,
    "🎧": Headphones,
    default: Shield,
  };

  const staticColors = ["blue", "green", "purple", "orange", "red", "indigo"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "/api/getdev_maintain"
        );
        const json = await res.json();
        if (json.data) {
          const formatted = json.data.map((item, idx) => ({
            icon: iconMap[item.icon] || iconMap.default,
            title: item.heading,
            description: item.description,
            features: item.features || [],
            priority: item.priority || "Medium",
            responseTime: item.availability || "24 Hours",
            color: staticColors[idx % staticColors.length],
          }));
          setMaintenanceServices(formatted);
        }
      } catch (err) {
        console.error("Error fetching maintenance services:", err);
      }
    };

    fetchData();
  }, []);
  const supportPlans = [
    {
      name: "Basic Care",
      price: "$99",
      period: "month",
      description: "Essential maintenance for small websites",
      features: [
        "Weekly security scans",
        "Monthly updates",
        "Daily backups",
        "Email support",
        "Basic performance monitoring",
      ],
      popular: false,
      color: "gray",
    },
    {
      name: "Professional",
      price: "$199",
      period: "month",
      description: "Comprehensive maintenance for growing businesses",
      features: [
        "Daily security monitoring",
        "Bi-weekly updates",
        "Real-time backups",
        "Priority phone support",
        "Advanced performance optimization",
        "Monthly reports",
      ],
      popular: true,
      color: "blue",
    },
    {
      name: "Enterprise",
      price: "$399",
      period: "month",
      description: "Premium maintenance for large-scale websites",
      features: [
        "24/7 security monitoring",
        "Immediate updates",
        "Continuous backups",
        "Dedicated support manager",
        "Custom performance solutions",
        "Weekly consultations",
        "Priority response guarantee",
      ],
      popular: false,
      color: "purple",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(
              (prev) => new Set([...prev, parseInt(entry.target.dataset.index)])
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % maintenanceServices.length);
    }, 4000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [maintenanceServices.length]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green:
        "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      purple:
        "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      orange:
        "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      indigo:
        "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      gray: "from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    };
    return colors[color] || colors.gray;
  };

  return (
    <section className="relative py-14 lg:py-18 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-200/25 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl xl:container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10 animate-on-scroll" data-index="0">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-5 py-1.5 mb-4 shadow-sm">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-wider">
              MAINTENANCE & SUPPORT
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Keep Your Website{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Running Smoothly
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Professional website maintenance and support services to ensure your
            online presence stays secure, fast, and always available for your
            customers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {maintenanceServices.map((service, index) => (
            <div
              key={index}
              data-index={index + 1}
              className={`animate-on-scroll group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${
                activeCard === index ? "ring-2 ring-blue-500 scale-105" : ""
              } ${
                visibleItems.has(index + 1)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(
                  service.color
                )} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Priority & Response Time */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                    service.priority
                  )}`}
                >
                  {service.priority} Priority
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.responseTime}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Support Plans */}
        <div className="animate-on-scroll" data-index="7">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Support Plan
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Flexible maintenance plans designed to fit your website's needs
              and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-sm mb-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/contact-us" className="block">
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support Banner */}
      </div>
    </section>
  );
};

export default MaintenanceSupport;
