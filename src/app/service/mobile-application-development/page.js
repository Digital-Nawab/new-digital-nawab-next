import MobileAppPage from "@/components/mobile/MobileAppPage";
import React from "react";

export const metadata = {
  title: "Mobile App Development Company in Lucknow | iOS & Android Experts | Digital Nawab",
  description:
    "Leading mobile app development company in Lucknow. Custom iOS, Android, Flutter & React Native app development for startups and enterprises. High performance, secure & scalable mobile applications.",
  alternates: {
    canonical: "https://www.digitalnawab.com/service/mobile-application-development",
  },
  openGraph: {
    title: "Mobile App Development Company in Lucknow | iOS & Android Apps | Digital Nawab",
    description:
      "Expert mobile application development services for iPhone, Android, and Cross-Platform Flutter/React Native. Build high-performing, user-centric mobile apps.",
    url: "https://www.digitalnawab.com/service/mobile-application-development",
    siteName: "Digital Nawab",
    type: "website",
  },
};

export default function Page() {
  return <MobileAppPage />;
}

