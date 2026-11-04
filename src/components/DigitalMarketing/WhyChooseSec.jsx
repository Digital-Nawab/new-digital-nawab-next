import { Button } from "@/components/ui/button";
import { ArrowUp, TrendingUp } from "lucide-react"; // For the upward arrow icon
import ColourfulText from "../../components/ui/colourful-text";
import WavyPattern from "../../components/WaveyPattern";

const WhyChooseSection = () => {
  return (
    <>
      <div className="relative  bg-black text-white  overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-4 left-4 w-6 h-6 bg-cyan-400 rotate-45 rounded-sm"></div>
        <div className="absolute top-4 right-20 w-4 h-4 bg-orange-500 rounded-sm"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-2 h-2 bg-orange-500 rounded-full"></div>

        {/* Main content container */}
        <div className="flex justify-center items-center">
          <div className="relative max-w-7xl flex items-center justify-between min-h-screen px-8 lg:px-16">
            {/* Left side - Image and stats */}
            <div className="relative flex-1 max-w-lg">
              {/* Main person image */}
              <div className="relative py-6">
                <img loading="lazy" decoding="async"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"
                  alt="Professional man pointing"
                  className="w-full max-w-md rounded-3xl object-cover"
                />

                {/* Stats overlay - Revenue */}
                <div className="absolute -left-8 top-2/3 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Revenue</span>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <ArrowUp className="w-3 h-3" />
                      <span>83%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-medium">
                        $462.22
                      </span>
                      <span className="text-xs text-gray-400">
                        23 Jun, 2021
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400 font-medium">$251.77</span>
                      <span className="text-xs text-gray-400">
                        22 Jun, 2021
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom decorative elements */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
            </div>

            {/* Right side - Content */}
            <div className="flex-1 max-w-xl pl-8 lg:pl-16">
              {/* Customer avatars section */}
              <div className="mb-8">
                <p className="text-gray-300 mb-4">Our Customers</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1494790108755-2616b9c5e643?w=40&h=40&fit=crop&crop=face"
                      alt="Customer 1"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Customer 2"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                      alt="Customer 3"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                      alt="Customer 4"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
                      alt="Customer 5"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  </div>
                  <span className="text-orange-400 font-bold ml-2">+25K</span>
                </div>
              </div>

              {/* Main heading */}
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Why{" "}
                <span className="text-white font-bold">
                  <ColourfulText text="Digital Nawab ?" />
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                diam nonumy eirmod tempor Lorem ipsum dolor sit amet consectetur
                adipiscing elit
              </p>

              {/* CTA Button */}
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full font-medium">
                Contact us
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
      </div>
      <WavyPattern backgroundColor="#0a0a0a" waveColor="#fff" />
    </>
  );
};

export default WhyChooseSection;
