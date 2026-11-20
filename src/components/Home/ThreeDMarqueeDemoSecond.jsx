import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import WaveyPattern from "../../components/WaveyPattern";

export function ThreeDMarqueeDemoSecond() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = 'https://dashboard.digitalnawab.com/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/api/getcreatives',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.request(config);
        const imageUrls = response.data.data.map((item) => `${baseUrl}${item.image}`);
        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching creatives:', error);
        setError('Failed to load creative images.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-white">
        <div className="w-12 h-12 border-4 border-t-white border-gray-600 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Loading creatives...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">{error}</div>;
  }



  return (
    <>
      <WaveyPattern backgroundColor="#fff" waveColor="#0a0a0a" />
      <div className="mb-2 text-center">
        <h2 className="text-4xl custom-black md:text-5xl font-bold text-white mb-4">
          Ad Creative Services for Digital Marketing, <br /> Branding & Social Media
        </h2>
        <p className="text-white max-w-4xl mx-auto leading-relaxed">
          We create high-performing ad creatives that drive engagement, boost conversions, and elevate your brand presence. From social media ads and Google display ads to product banners and branding visuals, our creative team blends storytelling with strategy to deliver results-driven designs.
        </p>
      </div>
      <div className="relative bg-black mx-auto my-10 flex h-[500px] lg:h-screen w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
        <ThreeDMarquee className="absolute inset-0 h-full w-full" images={[...images,...images,...images]} />
      </div>
    </>
  );
}