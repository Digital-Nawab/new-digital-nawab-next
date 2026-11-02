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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.558359578144!2d80.9474055!3d26.8781754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd9af7a6c9cf%3A0x2a177e11f1dc6954!2sL%20Rd%2C%20Mahanagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226006!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="w-full h-full border-0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating badge top-left on desktop */}
        <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/10 text-white text-xs font-medium shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Head Office • Mahanagar, Lucknow</span>
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
