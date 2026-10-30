
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEOShowcase from './SEO';
import SocialMediaShowcase from './SocialMediaShowcase';
import ReelsSection from './ReelsSection';
import Banner from '../../components/Banner';
import PortfolioWebsite from './PortfolioWebsite';

const PortfolioShowcase = () => {
  const [data, setData] = useState({
    creatives: [],
    reels: [],
    websites: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/api/getproject',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.request(config);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load portfolio data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Banner
        title="Portfolio Showcase"
        subtitle="We'd love to hear from you!"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />
      {/* <SEOShowcase /> */}
      <PortfolioWebsite projects={data.websites} />
      <SocialMediaShowcase creatives={data.creatives} />
      <ReelsSection reels={data.reels} />
    </div>
  );
};

export default PortfolioShowcase;