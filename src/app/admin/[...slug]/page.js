"use client";

import React, { use } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { AdminPageWrapper } from "@/lib/AdminPageWrapper";
import Layout from "@/Layouts/Layout";

// Dynamic imports for all Admin pages
const TagManagement = dynamic(() => import("@/Pages/Admin/Other/TagManagement"), { ssr: false });
const Leads = dynamic(() => import("@/Pages/Admin/Enquiry/Leads"), { ssr: false });
const Services = dynamic(() => import("@/Pages/Admin/Services/Services"), { ssr: false });
const Career = dynamic(() => import("@/Pages/Admin/Other/Career"), { ssr: false });
const Blog = dynamic(() => import("@/Pages/Admin/Other/Blog"), { ssr: false });
const ContactDetail = dynamic(() => import("@/Pages/Admin/Other/ContactDetail"), { ssr: false });
const OurTeam = dynamic(() => import("@/Pages/Admin/Other/OurTeam"), { ssr: false });
const Package = dynamic(() => import("@/Pages/Admin/Other/Package"), { ssr: false });
const Projects = dynamic(() => import("@/Pages/Admin/Other/Projects"), { ssr: false });
const HeroVideoPage = dynamic(() => import("@/Pages/Admin/HomePage/Hero"), { ssr: false });
const About = dynamic(() => import("@/Pages/Admin/HomePage/About"), { ssr: false });
const ToolsPage = dynamic(() => import("@/Pages/Admin/HomePage/ToolsPage"), { ssr: false });
const FAQPage = dynamic(() => import("@/Pages/Admin/HomePage/FAQPage"), { ssr: false });
const VisionMissionPage = dynamic(() => import("@/Pages/Admin/HomePage/VisionMissionPage"), { ssr: false });
const CreativesManager = dynamic(() => import("@/Pages/Admin/Other/CreativesManager"), { ssr: false });
const GraphicsLogo = dynamic(() => import("@/Pages/Admin/Other/GraphicsLogo"), { ssr: false });
const SeoService = dynamic(() => import("@/Pages/Admin/SEO/Service"), { ssr: false });
const Highlight = dynamic(() => import("@/Pages/Admin/SEO/Highlight"), { ssr: false });
const SEOForm = dynamic(() => import("@/Pages/Admin/SEO/SEOForm"), { ssr: false });
const SeoProcesses = dynamic(() => import("@/Pages/Admin/SEO/SeoProcesses"), { ssr: false });
const SeoDigital = dynamic(() => import("@/Pages/Admin/SEO/SeoDigital"), { ssr: false });
const SeoOptimization = dynamic(() => import("@/Pages/Admin/SEO/SeoOptimization"), { ssr: false });
const SeoStrategy = dynamic(() => import("@/Pages/Admin/SEO/SeoStrategy"), { ssr: false });
const DevCommerce = dynamic(() => import("@/Pages/Admin/Dev/DevCommerce"), { ssr: false });
const DevCornerstone = dynamic(() => import("@/Pages/Admin/Dev/DevCornerstone"), { ssr: false });
const DevInnovation = dynamic(() => import("@/Pages/Admin/Dev/DevInnovation"), { ssr: false });
const DevMaintain = dynamic(() => import("@/Pages/Admin/Dev/DevMaintain"), { ssr: false });
const DevStep = dynamic(() => import("@/Pages/Admin/Dev/DevStep"), { ssr: false });
const GoogleCampaigns = dynamic(() => import("@/Pages/Admin/Google/GoogleCampaigns"), { ssr: false });
const GoogleMedia = dynamic(() => import("@/Pages/Admin/Google/GoogleMedia"), { ssr: false });
const GooglePpc = dynamic(() => import("@/Pages/Admin/Google/GooglePpc"), { ssr: false });
const SmmFacebook = dynamic(() => import("@/Pages/Admin/SMM/SmmFacebook"), { ssr: false });
const SmmBenefit = dynamic(() => import("@/Pages/Admin/SMM/SmmBenefit"), { ssr: false });
const SmmYoutube = dynamic(() => import("@/Pages/Admin/SMM/SmmYoutube"), { ssr: false });
const SocialService = dynamic(() => import("@/Pages/Admin/SMM/SocialService"), { ssr: false });
const City = dynamic(() => import("@/Pages/Admin/City/City"), { ssr: false });
const Approach = dynamic(() => import("@/Pages/Admin/City/Approach"), { ssr: false });
const StrategicApproach = dynamic(() => import("@/Pages/Admin/City/StrategicApproach"), { ssr: false });
const CityServices = dynamic(() => import("@/Pages/Admin/City/Services"), { ssr: false });
const PricingSection = dynamic(() => import("@/Pages/Admin/City/PricingSection"), { ssr: false });
const HowWeWork = dynamic(() => import("@/Pages/Admin/City/HowWeWork"), { ssr: false });
const CityProject = dynamic(() => import("@/Pages/Admin/City/Project"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/Pages/Admin/City/WhyChooseUs"), { ssr: false });
const CityFaq = dynamic(() => import("@/Pages/Admin/City/Faq"), { ssr: false });
const CityTestimonial = dynamic(() => import("@/Pages/Admin/City/Testimonial"), { ssr: false });
const UserIndex = dynamic(() => import("@/Pages/Users/UserIndex"), { ssr: false });
const UserCreate = dynamic(() => import("@/Pages/Users/UserCreate"), { ssr: false });
const UserEdit = dynamic(() => import("@/Pages/Users/UserEdit"), { ssr: false });
const UserShow = dynamic(() => import("@/Pages/Users/UserShow"), { ssr: false });
const RoleIndex = dynamic(() => import("@/Pages/Roles/RoleIndex"), { ssr: false });
const RoleCreate = dynamic(() => import("@/Pages/Roles/RoleCreate"), { ssr: false });
const RoleEdit = dynamic(() => import("@/Pages/Roles/RoleEdit"), { ssr: false });
const RoleShow = dynamic(() => import("@/Pages/Roles/RoleShow"), { ssr: false });
const PermissionIndex = dynamic(() => import("@/Pages/Permissions/PermissionIndex"), { ssr: false });
const PermissionCreate = dynamic(() => import("@/Pages/Permissions/PermissionCreate"), { ssr: false });
const PermissionEdit = dynamic(() => import("@/Pages/Permissions/PermissionEdit"), { ssr: false });
const PermissionShow = dynamic(() => import("@/Pages/Permissions/PermissionShow"), { ssr: false });
const ProfileEdit = dynamic(() => import("@/Pages/Profile/Edit"), { ssr: false });
const ApplyForm = dynamic(() => import("@/Pages/Admin/Other/ApplyForm"), { ssr: false });

// Route configurations
const ROUTES = {
  tags: {
    Component: TagManagement,
    fetcher: async () => {
      const res = await axios.get("/api/tags");
      return { tags: res.data?.data || res.data || [] };
    },
  },
  enquiries: {
    Component: Leads,
    fetcher: async () => {
      const [eRes, sRes] = await Promise.all([
        axios.get("/api/enquiries"),
        axios.get("/api/services"),
      ]);
      const enquiries = eRes.data?.data || [];
      const services = Array.isArray(sRes.data) ? sRes.data : sRes.data?.data || [];
      return {
        dashboardData: {
          enquiries,
          services,
          stats: {
            totalEnquiries: enquiries.length,
            converted: enquiries.filter((e) => e.leadStatus === "converted").length,
            contacted: enquiries.filter((e) => e.leadStatus === "contacted").length,
            newLeads: enquiries.filter((e) => e.leadStatus === "new_lead").length,
            conversionRate:
              enquiries.length > 0
                ? (
                    (enquiries.filter((e) => e.leadStatus === "converted").length /
                      enquiries.length) *
                    100
                  ).toFixed(1)
                : 0,
          },
        },
      };
    },
  },
  services: {
    Component: Services,
    fetcher: async () => {
      const res = await axios.get("/api/services");
      return { services: Array.isArray(res.data) ? res.data : res.data?.data || [] };
    },
  },
  career: {
    Component: Career,
    fetcher: async () => {
      const res = await axios.get("/api/career");
      return { careers: res.data?.data || res.data || [] };
    },
  },
  blogs: {
    Component: Blog,
    fetcher: async () => {
      const res = await axios.get("/api/blogs");
      return { blogs: res.data?.data || res.data || [] };
    },
  },
  "contact-details": {
    Component: ContactDetail,
    fetcher: async () => {
      const res = await axios.get("/api/contact-details");
      return { contactDetails: res.data?.data || res.data || [] };
    },
  },
  "our-team": {
    Component: OurTeam,
    fetcher: async () => {
      const res = await axios.get("/api/our-team");
      const list = res.data?.data || res.data || [];
      return { ourTeams: list, teams: list };
    },
  },
  packages: {
    Component: Package,
    fetcher: async () => {
      const res = await axios.get("/api/packages");
      return {
        packages: res.data?.data || res.data || [],
        packageTypes: ["Google_Ads", "SEO", "SMO", "Development", "SMM", "Design"],
      };
    },
  },
  projects: {
    Component: Projects,
    fetcher: async () => {
      const res = await axios.get("/api/projects");
      return { projects: res.data?.data || res.data || [] };
    },
  },
  "hero-videos": {
    Component: HeroVideoPage,
    fetcher: async () => {
      const res = await axios.get("/api/hero-videos");
      const vids = res.data?.data || res.data || [];
      return { videos: vids, heros: vids };
    },
  },
  "home-about": {
    Component: About,
    fetcher: async () => {
      const res = await axios.get("/api/home_about");
      const list = res.data?.data || res.data || [];
      return { homeAbouts: list, abouts: list };
    },
  },
  technologies: {
    Component: ToolsPage,
    fetcher: async () => {
      const res = await axios.get("/api/technologies");
      return { technologies: res.data?.data || res.data || [] };
    },
  },
  faqs: {
    Component: FAQPage,
    fetcher: async () => {
      const res = await axios.get("/api/faqs");
      return { faqs: res.data?.data || res.data || [] };
    },
  },
  "vision-mission": {
    Component: VisionMissionPage,
    fetcher: async () => {
      const res = await axios.get("/api/vision-mission");
      return { visions: res.data?.data || res.data || [] };
    },
  },
  creatives: {
    Component: CreativesManager,
    fetcher: async () => {
      const res = await axios.get("/api/creatives");
      return { creatives: res.data?.data || res.data || [] };
    },
  },
  "graphics-logo": {
    Component: GraphicsLogo,
    fetcher: async () => {
      const res = await axios.get("/api/graphics-logo");
      const list = res.data?.data || res.data || [];
      return { graphicLogos: list, logos: list };
    },
  },
  "seo-services": {
    Component: SeoService,
    fetcher: async () => {
      const res = await axios.get("/api/seo-services");
      return { seoServices: res.data?.data || res.data || [] };
    },
  },
  "seo-highlights": {
    Component: Highlight,
    fetcher: async () => {
      const res = await axios.get("/api/seo-highlights");
      const list = res.data?.data || res.data || [];
      return { highlights: list, seoHighlights: list };
    },
  },
  "seo-forms": {
    Component: SEOForm,
    fetcher: async () => {
      const res = await axios.get("/api/seo-forms");
      return { seoForms: res.data?.data || res.data || [] };
    },
  },
  "seo-processes": {
    Component: SeoProcesses,
    fetcher: async () => {
      const res = await axios.get("/api/seo-processes");
      return { seoProcesses: res.data?.data || res.data || [] };
    },
  },
  "seo-digital": {
    Component: SeoDigital,
    fetcher: async () => {
      const res = await axios.get("/api/seo-digital");
      return { seoDigitals: res.data?.data || res.data || [] };
    },
  },
  "seo-optimization": {
    Component: SeoOptimization,
    fetcher: async () => {
      const res = await axios.get("/api/seo-optimization");
      return { seoOptimizations: res.data?.data || res.data || [] };
    },
  },
  "seo-strategy": {
    Component: SeoStrategy,
    fetcher: async () => {
      const res = await axios.get("/api/seo-strategy");
      return { seoStrategies: res.data?.data || res.data || [] };
    },
  },
  "dev-commerce": {
    Component: DevCommerce,
    fetcher: async () => {
      const res = await axios.get("/api/dev-commerce");
      return { devCommerces: res.data?.data || res.data || [] };
    },
  },
  "dev-cornerstone": {
    Component: DevCornerstone,
    fetcher: async () => {
      const res = await axios.get("/api/dev-cornerstone");
      return { devCornerstones: res.data?.data || res.data || [] };
    },
  },
  "dev-innovation": {
    Component: DevInnovation,
    fetcher: async () => {
      const res = await axios.get("/api/dev-innovation");
      return { devInnovations: res.data?.data || res.data || [] };
    },
  },
  "dev-maintain": {
    Component: DevMaintain,
    fetcher: async () => {
      const res = await axios.get("/api/dev-maintain");
      return { devMaintains: res.data?.data || res.data || [] };
    },
  },
  "dev-step": {
    Component: DevStep,
    fetcher: async () => {
      const res = await axios.get("/api/dev-step");
      return { devSteps: res.data?.data || res.data || [] };
    },
  },
  "google-campaigns": {
    Component: GoogleCampaigns,
    fetcher: async () => {
      const res = await axios.get("/api/google-campaigns");
      return { googleCampaigns: res.data?.data || res.data || [] };
    },
  },
  "google-media": {
    Component: GoogleMedia,
    fetcher: async () => {
      const res = await axios.get("/api/google-media");
      return { googleMedia: res.data?.data || res.data || [] };
    },
  },
  "google-ppc": {
    Component: GooglePpc,
    fetcher: async () => {
      const res = await axios.get("/api/google-ppc");
      return { googlePpc: res.data?.data || res.data || [] };
    },
  },
  "smm-facebook": {
    Component: SmmFacebook,
    fetcher: async () => {
      const res = await axios.get("/api/smm-facebook");
      return { smmFacebook: res.data?.data || res.data || [] };
    },
  },
  "smm-benefit": {
    Component: SmmBenefit,
    fetcher: async () => {
      const res = await axios.get("/api/smm-benefit");
      return { smmBenefits: res.data?.data || res.data || [] };
    },
  },
  "smm-youtube": {
    Component: SmmYoutube,
    fetcher: async () => {
      const res = await axios.get("/api/smm-youtube");
      return { smmYoutube: res.data?.data || res.data || [] };
    },
  },
  "social-service": {
    Component: SocialService,
    fetcher: async () => {
      const res = await axios.get("/api/social-service");
      return { socialServices: res.data?.data || res.data || [] };
    },
  },
  cities: {
    Component: City,
    fetcher: async () => {
      const res = await axios.get("/api/cities");
      return { cities: res.data?.data || res.data || [] };
    },
  },
  approaches: {
    Component: Approach,
    fetcher: async () => {
      const [aRes, cRes] = await Promise.all([
        axios.get("/api/approaches"),
        axios.get("/api/cities"),
      ]);
      return {
        approaches: aRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "strategic-approaches": {
    Component: StrategicApproach,
    fetcher: async () => {
      const [sRes, cRes] = await Promise.all([
        axios.get("/api/strategic-approaches"),
        axios.get("/api/cities"),
      ]);
      return {
        strategicApproaches: sRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "city-services": {
    Component: CityServices,
    fetcher: async () => {
      const [sRes, cRes] = await Promise.all([
        axios.get("/api/city-services"),
        axios.get("/api/cities"),
      ]);
      return {
        cityServices: sRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "pricing-sections": {
    Component: PricingSection,
    fetcher: async () => {
      const [pRes, cRes] = await Promise.all([
        axios.get("/api/pricing-sections"),
        axios.get("/api/cities"),
      ]);
      return {
        pricingSections: pRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "how-we-works": {
    Component: HowWeWork,
    fetcher: async () => {
      const [hRes, cRes] = await Promise.all([
        axios.get("/api/how-we-works"),
        axios.get("/api/cities"),
      ]);
      return {
        howWeWorks: hRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "city-projects": {
    Component: CityProject,
    fetcher: async () => {
      const [pRes, cRes] = await Promise.all([
        axios.get("/api/city-projects"),
        axios.get("/api/cities"),
      ]);
      return {
        projects: pRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "why-choose-us": {
    Component: WhyChooseUs,
    fetcher: async () => {
      const [wRes, cRes] = await Promise.all([
        axios.get("/api/why-choose-us"),
        axios.get("/api/cities"),
      ]);
      return {
        whyChooseUs: wRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "city-faqs": {
    Component: CityFaq,
    fetcher: async () => {
      const [fRes, cRes] = await Promise.all([
        axios.get("/api/city-faqs"),
        axios.get("/api/cities"),
      ]);
      return {
        cityFaqs: fRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  "city-testimonials": {
    Component: CityTestimonial,
    fetcher: async () => {
      const [tRes, cRes] = await Promise.all([
        axios.get("/api/city-testimonials"),
        axios.get("/api/cities"),
      ]);
      return {
        testimonials: tRes.data?.data || [],
        cities: cRes.data?.data || [],
      };
    },
  },
  users: {
    Component: UserIndex,
    fetcher: async () => {
      const res = await axios.get("/api/users");
      const list = res.data?.data || res.data || [];
      const arr = Array.isArray(list) ? list : (list.data || []);
      return { users: { data: arr } };
    },
  },
  "users/create": {
    Component: UserCreate,
    fetcher: async () => {
      const [rRes, pRes] = await Promise.all([
        axios.get("/api/roles"),
        axios.get("/api/permissions"),
      ]);
      const rList = rRes.data?.data || rRes.data || [];
      const pList = pRes.data?.data || pRes.data || [];
      return {
        roles: { data: Array.isArray(rList) ? rList : (rList.data || []) },
        permissions: { data: Array.isArray(pList) ? pList : (pList.data || []) },
      };
    },
  },
  roles: {
    Component: RoleIndex,
    fetcher: async () => {
      const [rRes, pRes] = await Promise.all([
        axios.get("/api/roles"),
        axios.get("/api/permissions"),
      ]);
      const rList = rRes.data?.data || rRes.data || [];
      const pList = pRes.data?.data || pRes.data || [];
      return {
        roles: { data: Array.isArray(rList) ? rList : (rList.data || []) },
        permissions: { data: Array.isArray(pList) ? pList : (pList.data || []) },
      };
    },
  },
  "roles/create": {
    Component: RoleCreate,
    fetcher: async () => {
      const res = await axios.get("/api/permissions");
      const list = res.data?.data || res.data || [];
      return { permissions: { data: Array.isArray(list) ? list : (list.data || []) } };
    },
  },
  permissions: {
    Component: PermissionIndex,
    fetcher: async () => {
      const res = await axios.get("/api/permissions");
      const list = res.data?.data || res.data || [];
      return { permissions: { data: Array.isArray(list) ? list : (list.data || []) } };
    },
  },
  "permissions/create": {
    Component: PermissionCreate,
    fetcher: async () => ({}),
  },
  profile: {
    Component: ProfileEdit,
    fetcher: async () => {
      const res = await axios.get("/api/profile");
      return {
        mustVerifyEmail: false,
        status: "",
        user: res.data?.data || {},
      };
    },
  },
  careerforms: {
    Component: ApplyForm,
    fetcher: async () => {
      const res = await axios.get("/api/careerforms");
      return { applyForms: res.data?.data || [] };
    },
  },
};

function resolveRouteConfig(slugParts) {
  const routeKey = slugParts.join("/").toLowerCase();
  if (ROUTES[routeKey]) return ROUTES[routeKey];

  // Dynamic matching:
  // users/:id/edit
  if (slugParts.length === 3 && slugParts[0] === "users" && slugParts[2] === "edit") {
    const id = slugParts[1];
    return {
      Component: UserEdit,
      fetcher: async () => {
        const [uRes, rRes, pRes] = await Promise.all([
          axios.get(`/api/users/${id}`),
          axios.get("/api/roles"),
          axios.get("/api/permissions"),
        ]);
        const userObj = uRes.data?.data || uRes.data;
        const rList = rRes.data?.data || rRes.data || [];
        const pList = pRes.data?.data || pRes.data || [];
        return {
          user: { data: userObj },
          roles: { data: Array.isArray(rList) ? rList : (rList.data || []) },
          permissions: { data: Array.isArray(pList) ? pList : (pList.data || []) },
        };
      },
    };
  }

  // roles/:id/edit
  if (slugParts.length === 3 && slugParts[0] === "roles" && slugParts[2] === "edit") {
    const id = slugParts[1];
    return {
      Component: RoleEdit,
      fetcher: async () => {
        const [rRes, pRes] = await Promise.all([
          axios.get(`/api/roles/${id}`),
          axios.get("/api/permissions"),
        ]);
        const roleObj = rRes.data?.data || rRes.data;
        const pList = pRes.data?.data || pRes.data || [];
        return {
          role: { data: roleObj },
          permissions: { data: Array.isArray(pList) ? pList : (pList.data || []) },
        };
      },
    };
  }

  // permissions/:id/edit
  if (slugParts.length === 3 && slugParts[0] === "permissions" && slugParts[2] === "edit") {
    const id = slugParts[1];
    return {
      Component: PermissionEdit,
      fetcher: async () => {
        const res = await axios.get(`/api/permissions/${id}`);
        const permObj = res.data?.data || res.data;
        return {
          permission: { data: permObj },
        };
      },
    };
  }

  // users/:id
  if (slugParts.length === 2 && slugParts[0] === "users") {
    const id = slugParts[1];
    return {
      Component: UserShow,
      fetcher: async () => {
        const res = await axios.get(`/api/users/${id}`);
        return { user: { data: res.data?.data || res.data } };
      },
    };
  }

  // roles/:id
  if (slugParts.length === 2 && slugParts[0] === "roles") {
    const id = slugParts[1];
    return {
      Component: RoleShow,
      fetcher: async () => {
        const res = await axios.get(`/api/roles/${id}`);
        return { role: { data: res.data?.data || res.data } };
      },
    };
  }

  // permissions/:id
  if (slugParts.length === 2 && slugParts[0] === "permissions") {
    const id = slugParts[1];
    return {
      Component: PermissionShow,
      fetcher: async () => {
        const res = await axios.get(`/api/permissions/${id}`);
        return { permission: { data: res.data?.data || res.data } };
      },
    };
  }

  return null;
}

export default function AdminCatchAllPage({ params }) {
  const resolved = use(params);
  const slugParts = resolved?.slug || [];
  const routeKey = slugParts.join("/").toLowerCase();

  const routeConfig = resolveRouteConfig(slugParts);

  if (!routeConfig) {
    return (
      <Layout>
        <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Section: {routeKey}</h2>
          <p className="text-gray-500 mb-4">
            This module is connected and available in the system.
          </p>
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </Layout>
    );
  }

  const { Component, fetcher, initialProps } = routeConfig;

  return (
    <AdminPageWrapper
      Component={Component}
      fetcher={fetcher}
      initialProps={initialProps}
    />
  );
}
