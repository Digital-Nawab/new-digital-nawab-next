import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HowThisDone() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await fetch(
          "/api/getdevstep"
        );
        const json = await res.json();

        if (json?.data) {
          setSteps(json.data);
        }
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    };

    fetchSteps();
  }, []);

  const gradients = [
    "from-pink-100 to-rose-50 hover:from-pink-200 hover:to-rose-100",
    "from-yellow-100 to-orange-50 hover:from-yellow-200 hover:to-orange-100",
    "from-purple-100 to-violet-50 hover:from-purple-200 hover:to-violet-100",
    "from-blue-100 to-sky-50 hover:from-blue-200 hover:to-sky-100",
    "from-red-100 to-rose-50 hover:from-red-200 hover:to-rose-100",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            How is this done?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-2">
            Thousands of previously produced templates and themes make it easy
            to build a website—if you all want a simple, professional-looking
            website to give the company a fundamental start.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              className={`
                bg-gradient-to-br ${gradients[idx % gradients.length]}
                shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                transform transition-all duration-300 hover:-translate-y-2
                rounded-xl border border-white/60
              `}
            >
              <CardHeader>
                <CardTitle className="font-semibold text-gray-800 text-lg">
                    {step.heading}
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
