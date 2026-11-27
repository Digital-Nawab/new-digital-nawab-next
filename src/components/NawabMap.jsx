"use client";

import React, { useState } from "react";
import {
  Navigation,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  Compass,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const OFFICE_ADDRESS = "B12 A, L Road, Mahanagar, Lucknow, Uttar Pradesh 226006";

const NawabMap = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Opens Google Maps directions from user's current GPS location to the office address
  const handleGetDirections = () => {
    setIsLocating(true);

    const destination = encodeURIComponent(OFFICE_ADDRESS);

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;
          window.open(directionsUrl, "_blank", "noopener,noreferrer");
        },
        (error) => {
          setIsLocating(false);
          // If user denies location permission or request times out,
          // Google Maps directions with just destination will automatically ask for or use device location
          const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
          window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        },
        {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 0,
        }
      );
    } else {
      setIsLocating(false);
      const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Copy full office address
  const handleCopyAddress = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(OFFICE_ADDRESS);
      setCopied(true);
      toast.success("Office address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Open location directly in Google Maps
  const handleOpenGoogleMaps = () => {
    const destination = encodeURIComponent(OFFICE_ADDRESS);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${destination}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="w-full overflow-hidden bg-zinc-950 border-t border-zinc-800/80 shadow-2xl animate-fade-in-up">
      <Toaster position="bottom-center" />

      {/* Map iframe with precise single-marker pin on L Road, Mahanagar */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px]">
        <iframe
          title="Digital Nawab Office Location"
          src="https://maps.google.com/maps?q=Digital+Nawab%2C+B12+A%2C+L+Road%2C+Mahanagar%2C+Lucknow%2C+Uttar+Pradesh+226006&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          className="w-full h-full border-0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating office card top-left */}
        <div className="absolute top-4 left-4 z-20 flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-md border border-white/15 text-white shadow-2xl max-w-[340px]">
          <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <h3 className="font-bold text-white text-sm leading-tight">Digital Nawab Office</h3>
            </div>
            <div className="text-emerald-400 text-xs font-medium mt-0.5">Mahanagar Branch</div>
            <p className="text-gray-300 text-xs mt-1 leading-snug">
              B12 A, L Road, Mahanagar, Lucknow, Uttar Pradesh 226006
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Address Details & Get Location / Directions Button */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-800 px-4 py-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Address information */}
          <div className="flex items-start gap-3 w-full md:w-auto text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Digital Nawab Office
                </span>
                <span className="px-2 py-0.5 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Mahanagar Branch
                </span>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                {OFFICE_ADDRESS}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-stretch sm:justify-end">
            {/* Primary Action Button: Get Directions from current location */}
            <button
              onClick={handleGetDirections}
              disabled={isLocating}
              type="button"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-wait"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Getting Your Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-white fill-white" />
                  <span>Get Directions (From Current Location)</span>
                </>
              )}
            </button>

            {/* Secondary Action: Open in Maps */}
            <button
              onClick={handleOpenGoogleMaps}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
              title="Open address in Google Maps"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <span>Open in Maps</span>
            </button>

            {/* Action: Copy Address */}
            <button
              onClick={handleCopyAddress}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700/50 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
              title="Copy Office Address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NawabMap;
