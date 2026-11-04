import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn UI components
import { Button } from "@/components/ui/button"; // Shadcn UI button
import { motion } from "framer-motion"; // For animations (Aceternity UI style)

// Pricing data
const pricingPlans = [
  {
    title: "Starter Plan",
    price: "$499/month",
    features: [
      "Basic SEO Optimization",
      "Monthly Performance Reports",
      "Standard Social Media Management",
      "Email Marketing Setup",
    ],
  },
  {
    title: "Professional Plan",
    price: "$999/month",
    features: [
      "Advanced SEO & Content Marketing",
      "Bi-Weekly Performance Reports",
      "Enhanced Social Media Campaigns",
      "PPC Advertising Management",
      "Website Design & Optimization",
    ],
  },
  {
    title: "Premium Plan",
    price: "$1,499/month",
    features: [
      "Comprehensive SEO & Content Strategy",
      "Weekly Performance Reports",
      "Premium Social Media & PPC Management",
      "Conversion Rate Optimization",
      "Custom Branding & Design Solutions",
    ],
  },
];

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const PricingSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Invest in Your Growth</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12">
          Discover our competitively priced packages that offer comprehensive digital marketing solutions.
          Tailored to fit different needs and budgets, each plan is designed to maximize your growth.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whilehover="hover"
              transition={{ delay: index * 0.2 }}
            >
              <Card
                className={`relative bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl shadow-lg overflow-hidden ${
                  index === 1 ? "border-green-500 scale-105" : ""
                }`}
              >
                {/* Highlight for Professional Plan */}
                {index === 1 && (
                  <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-2">
                    Most Popular
                  </div>
                )}

                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-semibold text-white">{plan.title}</CardTitle>
                  <p className="text-3xl font-bold text-green-400 mt-2">{plan.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-400 mr-2">✔</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Get Started <span className="ml-2">→</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;