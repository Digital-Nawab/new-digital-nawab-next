'use client';

import React, { useState, useEffect } from "react";
import { ExternalLink, Mail, Globe, Eye, Trash2 } from "lucide-react";

const TRAFFIC_MAP = {
  Low: {
    displayName: "Low",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  Medium: {
    displayName: "Medium",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  High: {
    displayName: "High",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

export default function SeoFormsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-forms");
      const json = await res.json();
      if (json.data) setSubmissions(json.data);
    } catch (err) {
      console.error("Failed to load SEO form submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resolveImg = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`/api/admin/seo-forms/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Forms Dashboard</h1>
          <p className="text-gray-500 text-xs mt-1">Audit requests and SEO consultation inquiries submitted by visitors</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-base">SEO Form Submissions ({submissions.length})</h3>
        </div>

        <div className="overflow-x-auto">
          {submissions.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              No SEO form submissions found.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website URL</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Traffic</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((form) => {
                  const trafficInfo = TRAFFIC_MAP[form.current_traffic] || TRAFFIC_MAP.Low;
                  return (
                    <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.image ? (
                          <img
                            src={resolveImg(form.image)}
                            alt={form.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-medium">
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-sm">
                        {form.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {form.website_url ? (
                          <a
                            href={form.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          >
                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate max-w-[180px]">{form.website_url}</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <a href={`mailto:${form.email}`} className="hover:underline flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {form.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${trafficInfo.className}`}>
                          {trafficInfo.displayName}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div
                          className="text-xs text-gray-600 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: form.message }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                        <button
                          onClick={() => handleDelete(form.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
