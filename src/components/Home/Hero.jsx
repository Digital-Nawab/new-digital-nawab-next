import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PhotoCards from "./PhotoCards";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { cn } from "@/lib/utils";
import axios from "axios";

const HeroSection = () => {
  const [Hero, setHero] = useState({ mobile: "", desktop: "" });

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/gethero",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const data = response?.data?.data;
        const heroData = {
          mobile: data.find(item => item.video_type === "mobile")?.video || "",
          desktop: data.find(item => item.video_type === "desktop")?.video || "",
        };
        setHero(heroData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(Hero);

  return (
    <>
      <div className="relative hidden lg:flex pt-[120px] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <div className="relative z-20 w-full">
          <div className="overflow-hidden w-full">
            <MacbookScroll
              title={
                <div className="mx-auto text-center h-full flex flex-col items-center justify-center gap-6">
                  {/* Logo-style Header */}
                  <h1 className="text-4xl sm:text-5xl font-bold flex flex-wrap items-center justify-center gap-2">
                    <span className="bg-lime-400 px-4 py-1 custom-black rounded-md text-black font-bold">
                      DIGITAL
                    </span>
                    <span className="text-white custom-black">NAWAB</span>
                  </h1>

                  {/* Subheading */}
                  <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">
                    India Based Digital Marketing Agency
                  </h2>
                </div>
              }
              badge={
                <a href="">
                  {/* <Badge className="h-10 w-10 transform -rotate-12" /> */}
                </a>
              }
              src={Hero.desktop ? `https://dashboard.digitalnawab.com/${Hero.desktop}` : "/assets/images/bg/video.webm"}
              showGradient={false}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden block">
        <video
          src={Hero.mobile ? `https://dashboard.digitalnawab.com/${Hero.mobile}` : "/assets/logo/hero1.webm"}
          fetchPriority="high"
          muted
          autoPlay
          loop
          alt="Digital Nawab Hero Video"
          className="h-screen w-full rounded-lg object-cover"
        ></video>
      </div>
      
    </>
  );
};

export default HeroSection;