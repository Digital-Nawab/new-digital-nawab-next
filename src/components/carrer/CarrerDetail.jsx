import React, { useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Share2,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import Banner from "../../components/Banner";
import { useLocation } from "react-router-dom";
import axios from "axios";

const JobDetailPage = () => {
  const benefits = [
    "Health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements",
    "Professional development budget",
    "25 days paid vacation",
    "Work from home allowance",
  ];

  const requirements = [
    "Bachelor's degree in Marketing, Business, or related field",
    "3+ years of experience in digital marketing",
    "Proficiency in Google Analytics, SEO tools, and social media platforms",
    "Strong analytical and problem-solving skills",
    "Excellent written and verbal communication skills",
    "Experience with content management systems",
  ];

  const responsibilities = [
    "Develop and execute comprehensive digital marketing strategies",
    "Manage and optimize paid advertising campaigns across multiple platforms",
    "Create engaging content for social media, blogs, and email campaigns",
    "Analyze campaign performance and provide data-driven insights",
    "Collaborate with cross-functional teams to align marketing efforts",
    "Stay up-to-date with industry trends and best practices",
  ];

  const location = useLocation();

  //   console.log(location.pathname.split('/')[2].replace("-"," "))

  const [job, setJob] = React.useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `/api/careerdetail/${
        location?.pathname?.split("/")[2]
      }`,
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
  }, []);

  console.log(job);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner
        title={job?.desig}
        subtitle="We'd love to hear from you!"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Career", href: "/career" },
        ]}
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {job?.title}{" "}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Posted 3 days ago</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold capitalize text-gray-900 mb-4">
                {job?.desig}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job?.city}</span>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <Clock className="w-4 h-4" />
                  <span>{job?.job_type}</span>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <Users className="w-4 h-4" />
                  <span>{job?.work_mode}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>$80,000 - $100,000</span>
                </div> */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                Apply Now
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Job Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Role
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                 {job?.about_role}
                </p>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Key Responsibilities
              </h2>
              <ul className="space-y-4">
                {job?.responsibilities?.filter((x)=>x!=null)?.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-4">
                {job?.requirements?.filter((x)=>x!=null)?.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Benefits & Perks
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {job?.benefits_perks?.filter((x)=>x!=null)?.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Ready to Apply?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our team and help us build amazing digital experiences that
                make a real impact.
              </p>
              <button className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors mb-4">
                Apply for This Position
              </button>
              <p className="text-sm text-gray-500 text-center">
                We typically respond within 2-3 business days
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                About Our Company
              </h3>
              <div className="space-y-4 text-gray-900 font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium">50-100 employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium ">Digital Marketing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">Los Angeles, CA</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Similar Positions
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900">SEO Analyst</h4>
                  <p className="text-sm text-gray-600">Full Time • Remote</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900">
                    Content Writer
                  </h4>
                  <p className="text-sm text-gray-600">Freelance • Remote</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Social Media Manager
                  </h4>
                  <p className="text-sm text-gray-600">Full Time • Onsite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
