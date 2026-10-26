import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function WebsiteDesignCornerstones() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchCornerstones = async () => {
      try {
        const res = await fetch(
          "https://dashboard.digitalnawab.com/api/getdev_cornerstone"
        );
        const json = await res.json();

        if (json?.data) {
          setApiData(json.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCornerstones();
  }, []);

  const colors = [
    { bg: "bg-blue-50 border-blue-200", icon: "text-blue-600" },
    { bg: "bg-green-50 border-green-200", icon: "text-green-600" },
    { bg: "bg-purple-50 border-purple-200", icon: "text-purple-600" },
    { bg: "bg-orange-50 border-orange-200", icon: "text-orange-600" },
  ];

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container xl:max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-white rounded-3xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-3 px-4 py-1.5 text-xs font-semibold"
          >
            Web Design Excellence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Cornerstones of a Powerful Website Design
          </h2>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" />
        </div>

        {/* Cornerstones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apiData.map((item, index) => {
            const colorSet = colors[index % colors.length];
            return (
              <Card
                key={index}
                className={`${colorSet.bg} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                      <div
                      className={`p-3 rounded-full bg-white shadow-lg ${item.icon}`}
                       ></div>
                    
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
                      {item.heading}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md border">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
