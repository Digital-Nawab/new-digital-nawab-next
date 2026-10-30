"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script"; 

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import AutoPopup from "@/components/AutoPopup";
import { ThemeProvider } from "@/components/theme-provider.jsx";

import "./globals.css";
import "./app.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminOrAuth = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PP86R4MT');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP86R4MT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {!isAdminOrAuth && (
            <>
              <div className="lg:block hidden">
                <NavBar />
              </div>
              <div className="lg:hidden block">
                <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center p-1"></div>
                <FloatingDock />
              </div>
            </>
          )}

          {children}

          {!isAdminOrAuth && (
            <>
              <Footer />
              <AutoPopup />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
