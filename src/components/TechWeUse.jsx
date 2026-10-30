"use client";
import Image from 'next/image'

import React, { useState, useEffect } from "react";
import WaveyPattern from "./WaveyPattern";
import useApi from "@/lib/url/useApi";
const TechnologyCard = ({ tech }) => {
  const [error, setError] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="mb-4 flex justify-center">
        {!error ? (
          <img
            src={tech.logo}
            alt={tech.name}
            width={80}
            height={80}
            className="object-contain"
            onError={() => setError(true)}
          />
        ) : (
          <span className="text-xs font-bold text-gray-600">
            {tech.name.split(" ")[0]}
          </span>
        )}
      </div>
      <h3 className="text-gray-800 custom-bold font-semibold text-base lg:text-lg 2xl:text-xl">
        {tech.name}
      </h3>
    </div>
  );
};

const ToolsAndTechnologies = () => {
  const [showAllRows, setShowAllRows] = useState(false);
  const { data, loading, error, fetchData } = useApi();

  useEffect(() => {
    fetchData("/api/gettechnlogies", "GET");
  }, [fetchData]);

  // Group data into rows of 8
  const technologies = data?.data
    ? Array.from({ length: Math.ceil(data.data.length / 8) }, (_, i) =>
        data.data.slice(i * 8, (i + 1) * 8).map((item) => ({
          name: item.heading,
          logo: `https://dashboard.digitalnawab.com/${item.img}`,
        }))
      )
    : [];

  const rowsToShow = showAllRows ? technologies : technologies.slice(0, 1);

  return (
    <>
      <WaveyPattern />
      <div className="bg-white">
        <div className="max-w-7xl xl:container mx-auto text-black px-6 py-16 text-center">
          {/* Header */}
          <div className="mb-12">
            <p className="text-orange-500 text-sm font-semibold tracking-wider uppercase mb-4">
              WHAT WE USE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tools & Technologies
            </h2>
            <p className="max-w-4xl mx-auto leading-relaxed">
              We always try to keep ourselves updated with the latest tools and
              technologies. Currently, we are working on the following.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {loading && <p className="text-lg">Loading...</p>}
            {error && <p className="text-red-600 text-lg">Error: {error}</p>}

            {technologies.length > 0 && (
              <>
                {/* Desktop: all rows */}
                <div className="hidden lg:block">
                  {technologies.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-4 lg:grid-cols-8 gap-6 mt-6"
                    >
                      {row.map((tech, i) => (
                        <TechnologyCard key={i} tech={tech} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Mobile: load more */}
                <div className="block lg:hidden">
                  {rowsToShow.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-2 gap-6 mt-6"
                    >
                      {row.map((tech, i) => (
                        <TechnologyCard key={i} tech={tech} />
                      ))}
                    </div>
                  ))}

                  {technologies.length > 1 && (
                    <div className="mt-8">
                      {!showAllRows ? (
                        <button
                          onClick={() => setShowAllRows(true)}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
                        >
                          Load More
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowAllRows(false)}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsAndTechnologies;
