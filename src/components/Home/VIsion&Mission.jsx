import React, { useEffect } from "react";
import { Target, Rocket } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BackgroundBeams } from "@/components/ui/background-beams";
import WaveyPattern from "../../components/WaveyPattern";
import useApi from "@/lib/url/useApi";

export default function VisionMissionSection() {
  const { data, loading, error, fetchData } = useApi();

  useEffect(() => {
    fetchData("/api/getvision_mission", "GET");
  }, [fetchData]);

  // Extract the first item from the API response data array
  const apiData = data?.data?.[0];

  return (
    <>
      <div>
        {/* <WaveyPattern backgroundColor="#000" waveColor="#fff" /> */}
      </div>
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl xl:container mx-auto">
          {/* Vision & Mission Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-8 group hover:shadow-lg transition-all duration-300">
            <div className="w-3 h-3 bg-gradient-to-r from-[#FF1F6D] to-[#C73673] rounded-full group-hover:scale-110 transition-transform"></div>
            <span className="text-gray-700 text-sm font-semibold">
              Vision & Mission
            </span>
          </div>

          {loading && <p className="text-gray-600 text-lg">Loading...</p>}
          {error && <p className="text-red-600 text-lg">Error: {error}</p>}
          {apiData && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Heading and Description */}
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl 2xl:text-5xl custom-bold text-gray-800 leading-tight">
                  {apiData.heading}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {apiData.para}
                </p>
              </div>

              {/* Right Column - Vision and Mission Cards */}
              <div className="space-y-6">
                {/* Vision Card */}
                <div className="bg-gradient-to-br from-[#FF1F6D] to-[#C73673] rounded-2xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex justify-between items-start relative">
                    <div className="flex-1">
                      <h2 className="text-2xl custom-bold text-white mb-4">
                        {apiData.vision_heading}
                      </h2>
                      <p className="text-white/90 text-base leading-relaxed pr-4">
                        {apiData.vision_description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                        <Target className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="bg-gray-900 rounded-2xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF1F6D]/10 to-[#C73673]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex justify-between items-start relative">
                    <div className="flex-1">
                      <h2 className="text-2xl custom-bold text-white mb-4">
                        {apiData.mission_heading}
                      </h2>
                      <p className="text-gray-300 text-base leading-relaxed pr-4">
                        {apiData.mission_description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#FF1F6D] to-[#C73673] rounded-2xl flex items-center justify-center">
                        <Rocket className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}