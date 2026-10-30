"use client";
import Image from 'next/image'

import React, { useEffect, useState } from "react";
import { Briefcase, ArrowUpRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";

const OpenPositionsSection = () => {
  const jobs = [
    {
      id: 1,
      category: "Marketing",
      title: "Marketing Specialist",
      type: "Full Time",
      location: "Remote",
      city: "New York, NY",
      description:
        "Experience a dynamic and inspiring workplace where innovation thrives, creativity is valued, and fresh ideas are encouraged to shape a successful...",
      categoryColor: "bg-lime-400 text-black",
    },
    {
      id: 2,
      category: "SEO",
      title: "SEO Analyst",
      type: "Full Time",
      location: "Remote",
      city: "San Francisco, CA",
      description:
        "Leverage your expertise in data-driven insights to shape impactful strategies and drive measurable results. Join us in making a meaningful difference.",
      categoryColor: "bg-lime-400 text-black",
    },
    {
      id: 3,
      category: "Content",
      title: "Content Writer",
      type: "Freelance",
      location: "Remote",
      city: "Los Angeles, CA",
      description:
        "Develop engaging, SEO-friendly content across blogs, websites, and social media to bring ideas to life.",
      categoryColor: "bg-lime-400 text-black",
    },
    {
      id: 4,
      category: "Social Media",
      title: "Social Media Manager",
      type: "Full Time",
      location: "Onsite",
      city: "Chicago, IL",
      description:
        "Shape the voice of our brand across digital platforms. Create, curate, and manage engaging content, develop strategic campaigns.",
      categoryColor: "bg-lime-400 text-black",
    },
    {
      id: 5,
      category: "Design",
      title: "Graphic Designer",
      type: "Full Time",
      location: "Hybrid",
      city: "San Francisco, CA",
      description:
        "Use your creativity to design compelling graphics for digital and print media, enhancing brand identity and engaging audiences.",
      categoryColor: "bg-lime-400 text-black",
    },
    {
      id: 6,
      category: "Marketing",
      title: "Digital Marketing Manager",
      type: "Full Time",
      location: "Remote",
      city: "Los Angeles, CA",
      description:
        "Drive impactful campaigns that amplify brand presence, foster meaningful engagement, and deliver measurable results.",
      categoryColor: "bg-lime-400 text-black",
    },
  ];

  const [job, setJob] = useState()

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/getcareer",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setJob(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  console.log(job)

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6">
            <Briefcase className="w-4 h-4" />
            Job
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            OPEN POSITION
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore exciting career opportunities and find the perfect role to
            advance your career.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {job?.map((job) => (
            <Link
              href={`/job-detail/${job.id}`}
              key={job.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Category Badge */}
              <div
                className={`inline-block bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium mb-6`}
              >
                {job.desig}
              </div>

              {/* Job Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {job.title}
              </h3>

              {/* Job Details */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="font-medium">{job.job_type}</span>
                <span>•</span>
                <span>{job.work_mode}</span>
                <span>•</span>
                <span>{job.city}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {job.about_role}
              </p>

              {/* Apply Button */}
              <button className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all duration-300">
                Apply Now
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenPositionsSection;
