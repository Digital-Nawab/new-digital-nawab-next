import PackagesPage from "@/components/packages/PackagesPage";
import React from "react";

export const metadata = {
  title: "Digital Marketing Packages & Pricing in India | Digital Nawab",
  description:
    "Explore digital marketing packages for SEO, social media, Google Ads and business growth. Compare services and get a customised quote from Digital Nawab.",
  alternates: {
    canonical: "https://www.digitalnawab.com/packages",
  },
  openGraph: {
    title: "Digital Marketing Packages & Pricing in India | Digital Nawab",
    description:
      "Explore digital marketing packages for SEO, social media, Google Ads and business growth. Compare services and get a customised quote from Digital Nawab.",
    url: "https://www.digitalnawab.com/packages",
    siteName: "Digital Nawab",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Packages & Pricing in India | Digital Nawab",
    description:
      "Explore digital marketing packages for SEO, social media, Google Ads and business growth. Compare services and get a customised quote from Digital Nawab.",
  },
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.digitalnawab.com/packages#webpage",
  url: "https://www.digitalnawab.com/packages",
  name: "Digital Marketing Packages & Pricing in India | Digital Nawab",
  description:
    "Explore digital marketing packages for SEO, social media, Google Ads and business growth. Compare services and get a customised quote from Digital Nawab.",
  breadcrumb: "https://www.digitalnawab.com/packages#breadcrumb",
  publisher: {
    "@type": "Organization",
    name: "Digital Nawab",
    url: "https://www.digitalnawab.com/",
    logo: "https://www.digitalnawab.com/logo.png",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.digitalnawab.com/packages#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.digitalnawab.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Packages",
      item: "https://www.digitalnawab.com/packages",
    },
  ],
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Packages",
  provider: {
    "@type": "LocalBusiness",
    name: "Digital Nawab",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B12 A, L. Road, Mahanagar",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226006",
      addressCountry: "IN",
    },
    telephone: "+918860757649",
    email: "wedigitalnawab@gmail.com",
    url: "https://www.digitalnawab.com/",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description:
    "Comprehensive digital marketing packages including SEO, Google Ads, Social Media Marketing, and custom business growth solutions across India.",
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which digital marketing package is best for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For small businesses, our Starter Growth package or dedicated local SEO packages are generally the most cost-effective starting points. They focus on foundational search visibility, Google Business Profile optimisation, and essential social media setup to generate consistent local enquiries without stretching your budget.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a customised digital marketing package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While our packaged plans suit many common business stages, we frequently build bespoke digital marketing plans tailored to specific goals, budgets, multi-location requirements, or niche industries. Contact our team to design a custom scope.",
      },
    },
    {
      "@type": "Question",
      name: "Are advertising budgets included in the package price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Package fees cover our professional management, campaign setup, ad creative design, copywriting, monitoring, A/B testing, and performance reporting. Your ad spend (media budget) is paid directly to advertising platforms like Google Ads and Meta Ads so you maintain complete control and transparency over your billing.",
      },
    },
    {
      "@type": "Question",
      name: "How soon can I expect results from digital marketing packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timelines vary by channel: Paid advertising campaigns (Google Ads, Meta Ads) can deliver initial traffic and leads within the first 1 to 2 weeks of campaign launch. Search Engine Optimisation (SEO) and organic strategies typically take 3 to 6 months to build sustainable authority, top rankings, and compounded organic traffic.",
      },
    },
    {
      "@type": "Question",
      name: "Do you require long-term contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We believe in earning your business through demonstrable performance. Our retainer packages are structured on monthly renewal agreements with a minimum recommended engagement of 3 months to allow SEO and performance campaigns adequate runway to optimise. We do not lock you into rigid multi-year commitments.",
      },
    },
    {
      "@type": "Question",
      name: "What reporting and communication will I receive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All package clients receive regular performance dashboards, detailed monthly analytical reports, and dedicated account management. Depending on your package tier, you will also have bi-weekly or monthly strategic review calls covering progress, KPIs, lead attribution, and upcoming initiatives.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade, downgrade, or switch my package later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, your digital marketing engagement can scale alongside your business. You can transition between package tiers or add individual service modules (such as adding PPC to an ongoing SEO package) at the start of any monthly billing cycle with prior notice.",
      },
    },
    {
      "@type": "Question",
      name: "Do you guarantee first-page Google rankings or specific lead numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No ethical agency can guarantee specific algorithmic search rankings or exact lead volumes, as search engine ranking formulas, competitor movements, and market demand are continuously fluctuating. What Digital Nawab does guarantee is 100% white-hat best practices, transparent work logs, rigorous CRO execution, and data-driven optimisation aimed at maximizing your return on investment.",
      },
    },
    {
      "@type": "Question",
      name: "Which digital marketing package is right for ecommerce stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ecommerce businesses typically achieve the highest ROI by combining Ecommerce SEO (product schema, collection page optimization) with Shopping Ads, Google Performance Max campaigns, and Meta catalogue sales ads. We recommend our Advanced Performance plan or a customized Ecommerce Marketing package tailored to your SKU catalogue and average order value.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with Digital Nawab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Getting started is simple: reach out via our contact form, call us directly at 08860757649, or email wedigitalnawab@gmail.com. We begin with a complimentary initial consultation and digital audit of your current web presence, after which we recommend the best-suited package or custom proposal for your goals.",
      },
    },
    {
      "@type": "Question",
      name: "What services can be combined into a multi-channel package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We frequently combine Search Engine Optimisation (SEO), Google Search & Display Ads, Meta Ads (Facebook & Instagram), Social Media Management, Content Marketing, and Website Conversion Optimisation into unified growth retainers so that every channel reinforces the others.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with businesses outside Lucknow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While Digital Nawab is headquartered in Mahanagar, Lucknow, we manage digital marketing campaigns for startups, D2C brands, B2B companies, and service enterprises across all major Indian cities and international markets. All meetings, reporting, and campaign reviews are seamlessly conducted via video conferencing and real-time client dashboards.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <PackagesPage />
    </>
  );
}
