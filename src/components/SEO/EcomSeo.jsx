"use client";
import Image from 'next/image'

import React , { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations (Aceternity UI often uses Framer Motion)
import { Button } from "@/components/ui/button"; // Shadcn Button component

const SeoPlanningProcess = () => {
  const [steps, setSteps] = useState([]);
  useEffect(() => {
      const fetchSteps = async () => {
        try {
          const response = await fetch("/api/getseostrategy");
          const result = await response.json();
          if (result?.data) {
            const formatted = result.data.map((item, index) => ({
              id: item.id,
              image: item.image?.startsWith("http")
                ? item.image
                : `https://dashboard.digitalnawab.com/${item.image}`,
              title: item.heading,
              description: item.description,
            }));
            setSteps(formatted);
          }
        } catch (error) {
          console.error("Error fetching steps:", error);
        }
      };

      fetchSteps();
    }, []);

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gradient-to-r from-[rgba(5,5,5,1)] via-[#183a32] to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          initial="hidden"
          
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Our SEO Strategy for E-commerce Websites That Drive Conversions
          </h2>
          <p className=" text-gray-200 mt-4 lg:max-w-5xl mx-auto">
            Here at Digital Nawab, we offer e-commerce SEO services in India that include product page optimisation, user experience optimisation and enhancement, and transactional keyword targeting. Our Pay-Per-Click (PPC) advertising services approach enables businesses to achieve high-quality traffic, increased search visibility, and maximised conversion rates through major online shopping platforms available in India.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              initial="hidden"
              
              viewport={{ once: true }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Placeholder for Image */}
              <div className="lg:w-1/2 w-full">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-64 w-full object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Step Content */}
              <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D4FF66] text-black rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p
                  className="mt-4 text-gray-200"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />

                {/* <Button
                  className="mt-4 bg-[#D4FF66] text-black hover:bg-[#C0E55A]"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoPlanningProcess;