import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

async function getCities() {
  try {
    const res = await fetch("https://dashboard.digitalnawab.com/api/cities", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (json.status && Array.isArray(json.data)) {
      return json.data.filter((c) => c.is_active);
    }
  } catch (err) {
    console.error("Error fetching cities:", err);
  }
  return [];
}

export const metadata = {
  title: "Cities We Serve | Top Digital Marketing Agency | Digital Nawab",
  description:
    "Explore digital marketing, SEO, PPC, and web solutions tailored for businesses across India's top cities.",
};

export default async function CitiesDirectoryPage() {
  const cities = await getCities();

  return (
    <main className="bg-[#050507] text-white min-h-screen pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold mb-4">
            <MapPin className="w-4 h-4" />
            <span>Locations</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Cities We <span className="text-lime-400">Serve</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Choose your city to explore localized digital marketing services, custom growth strategies, and local case studies.
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No cities currently active. Please check back soon or contact us directly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.slug}`}
                className="group relative bg-[#13151f] p-8 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-lime-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View City <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors mb-2">
                  {city.name}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {city.description ||
                    `Premium digital marketing, SEO, and web development services in ${city.name}.`}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
