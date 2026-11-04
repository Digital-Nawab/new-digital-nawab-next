import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react"; // For the phone icon
import Image from 'next/image'
const FooterSection = () => {
  return (
    <div className="bg-white text-black min-h-[400px] flex items-center justify-center relative overflow-hidden">
      {/* Decorative SVG Elements */}
      <svg
        className="absolute top-10 left-1/3 w-6 h-6 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 22H22L12 2Z"
          fill="#F97316"
          stroke="#F97316"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute top-10 right-10 w-6 h-6 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          fill="#10B981"
        />
      </svg>
      <svg
        className="absolute bottom-10 right-1/4 w-6 h-6 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="#1F2937" />
      </svg>

      {/* Wave Pattern at the Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 text-gray-100"
        viewBox="0 0 1440 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C280,100 560,0 720,50 C880,100 1160,0 1440,50 V100 H0 V0 Z" />
      </svg>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left Side: Text and Buttons */}
        <div className="max-w-md space-y-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Creative Digital Marketing Agency
          </h2>
          <p className="text-gray-600">
            Lorem ip an dolos dt ahnet, sousetofer andyrweftag dim sonel annectetne oof votry saoy at anasans soripotetis tus emart parsethor sollyt soritr sarar.
          </p>
          <div className="flex items-center space-x-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2">
              Contact us
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>Or</span>
              <Phone className="w-5 h-5 text-green-500" />
              <span>48 9815 400 850</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image with SVG Overlay */}
        <div className="relative mt-8 md:mt-0 z-10 py-6 px-6">
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-50"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="150" r="150" fill="#92400E" />
            <circle cx="150" cy="150" r="140" fill="none" stroke="#92400E" strokeWidth="10" strokeDasharray="20 20" />
          </svg>
          <img loading="lazy" decoding="async"
            src="./assets/images/bg/man.png"
            alt="Person pointing"
            className="w-64 md:w-80 relative z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;