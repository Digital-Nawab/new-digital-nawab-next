"use client";
import Image from 'next/image'

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

// CloseIcon Component
const CloseIcon = () => {
  return (
    <svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

// Process Data
const processCards = [
  {
    description: "Step 01/06",
    title: "Strategy",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#strategy",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>Segmented and Personalized Emails</li>
        <li>Drip Campaigns, Trigger or Interactive Campaigns</li>
        <li>
          Fixing Approaches - Selective or Multiple (Awareness, Engagement,
          Choice, Retention/Growth, Promotion by Testimonials etc.)
        </li>
      </ul>
    ),
  },
  {
    description: "Step 02/06",
    title: "Database Audit",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#database-audit",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Collate mailing list(s) of subscribed recipients and Build Mail Lists
          - LEAD GENERATION
        </li>
        <li>Re-format your mailing list and load it up</li>
        <li>Audit and cleanse of pertinent account and contact data</li>
      </ul>
    ),
  },
  {
    description: "Step 03/06",
    title: "Design Emails",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#design-emails",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Plan and Design an Omni platform responsive email which supports both
          desktop and mobile
        </li>
        <li>
          Building an easy readable, crisp and relevant content which also
          labels the brand
        </li>
        <li>
          Integrate necessary media (Image, Clips, GIFs etc.) and Attachments
          whenever required
        </li>
      </ul>
    ),
  },
  {
    description: "Step 04/06",
    title: "Set Campaigns",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#set-campaigns",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Assesses best day and send time for your campaign, list segment
          approved scope for personalization
        </li>
        <li>
          Draft & finalize the email campaign calendar, which usually is monthly
          or quarterly exercise (based on the volume)
        </li>
      </ul>
    ),
  },
  {
    description: "Step 05/06",
    title: "Monitor",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#monitor",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Monitor the open i.e. CTR (click-through rate), Bounce,
          subscribed/unsubscribed, Forwards, Conversion rate (form fills,
          Downloads, Link Opens), Customer Conversion, Email list growth, Geo
          Statistics, Traffic inflow for web page after each campaign
        </li>
      </ul>
    ),
  },
  {
    description: "Step 06/06",
    title: "Report",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
    ctaText: "Learn More",
    ctaLink: "#report",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Measure the statistics from the email campaigns and the parameters in
          the monitoring phase with a custom report which helps align the sales
          and marketing team efforts/ROI
        </li>
        <li>
          Reports help new campaign models and A/B testing in email designs
        </li>
      </ul>
    ),
  },
//   {
//     description: "Step 06/06",
//     title: "Analyze",
//     src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60",
//     ctaText: "Learn More",
//     ctaLink: "#analyze",
//     content: () => (
//       <ul className="list-disc pl-5 space-y-2">
//         <li>
//           Breakdown the what worked and what did not give the anticipated
//           results
//         </li>
//         <li>
//           Connect with the customer to discuss current and past results and road
//           ahead
//         </li>
//       </ul>
//     ),
//   },
];

// OurProcessSection Component
const OurProcessSection = () => {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <HeroHighlight
      containerClassName={
        "bg-gradient-to-r from-[rgba(5,5,5,1)] via-[#050946] to-black h-full"
      }
    >
      <section className="py-20 relative ">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-5 text-gray-900">
            <span className="border-b-2 custom-bold text-4xl text-white border-red-500 pb-1">
              Our Process
            </span>
          </h3>
          <p className="text-lg text-white text-center mt-2 mb-8">
            Get a FREE SEO Audit – See What’s Holding Your Website Back.
          </p>
          {/* Expandable Card Component */}
          <>
            <AnimatePresence>
              {active && typeof active === "object" && (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 h-full w-full z-10"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {active && typeof active === "object" ? (
                <div className="fixed inset-0 grid place-items-center z-[100]">
                  <button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </button>
                  <div
                    layoutId={`card-${active.title}-${id}`}
                    ref={ref}
                    className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                  >
                    <div layoutId={`image-${active.title}-${id}`}>
                      <img loading="lazy" decoding="async"
                        width={200}
                        height={200}
                        src={active.src}
                        alt={active.title}
                        className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-start p-4">
                        <div>
                          <h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                          >
                            {active.title}
                          </h3>
                          <p
                            layoutId={`description-${active.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-base"
                          >
                            {active.description}
                          </p>
                        </div>
                        <a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.ctaLink}
                          className="px-4 py-3 text-sm rounded-full font-bold bg-red-500 text-white"
                        >
                          {active.ctaText}
                        </a>
                      </div>
                      <div className="pt-4 relative px-4">
                        <div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                        >
                          {typeof active.content === "function"
                            ? active.content()
                            : active.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </AnimatePresence>
            <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
              {processCards.map((card, index) => (
                <div
                  layoutId={`card-${card.title}-${id}`}
                  key={card.title}
                  onClick={() => setActive(card)}
                  className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                >
                  <div className="flex gap-4 flex-col w-full">
                    <div layoutId={`image-${card.title}-${id}`}>
                      <img loading="lazy" decoding="async"
                        width={100}
                        height={100}
                        src={card.src}
                        alt={card.title}
                        className="h-60 w-full rounded-lg object-cover object-top"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col">
                      <h3
                        layoutId={`title-${card.title}-${id}`}
                        className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                      >
                        {card.title}
                      </h3>
                      <p
                        layoutId={`description-${card.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </>
        </div>
      </section>
    </HeroHighlight>
  );
};

export default OurProcessSection;
