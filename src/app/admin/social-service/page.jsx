'use client';

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Share2, Sparkles } from "lucide-react";

export default function SocialServicePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [createHeading, setCreateHeading] = useState("");
  const [createDescription, setCreateDescription] = useState("");

  const [editHeading, setEditHeading] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/social-service");
      const json = await res.json();
      if (json.data) {
        setItems(json.data);
      }
    } catch (err) {
      console.error("Failed to load social services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/social-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: createHeading,
          description: createDescription,
        }),
      });

      if (res.ok) {
        setAlert({ type: "success", message: "Social service created successfully" });
        setCreateHeading("");
        setCreateDescription("");
        setShowCreate(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.error || "Failed to create" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const startEditing = (item) => {
    setEditId(item.id);
    setEditHeading(item.heading || "");
    setEditDescription(item.description || "");
    setShowCreate(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch(`/api/admin/social-service/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: editHeading,
          description: editDescription,
        }),
      });

      if (res.ok) {
        setAlert({ type: "success", message: "Social service updated successfully" });
        setEditId(null);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.error || "Failed to update" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Social Media Service?")) return;
    try {
      const res = await fetch(`/api/admin/social-service/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Social Media Service deleted successfully" });
        fetchData();
      } else {
        setAlert({ type: "error", message: "Failed to delete" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <Share2 className="w-8 h-8 text-purple-600" />
            Social Media Offerings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage comprehensive multi-platform social media marketing packages & strategies
          </p>
        </div>
        {!showCreate && !editId && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add Offering
          </button>
        )}
      </div>

      {/* Flash Messages */}
      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
            alert.type === "success"
              ? "bg-purple-50 text-purple-800 border border-purple-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span className="text-sm font-medium">{alert.message}</span>
          <button
            onClick={() => setAlert(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Create Form */}
      {showCreate && (
        <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border-t-4 border-purple-600 p-6 border-x border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
            <h2 className="text-2xl font-bold text-purple-600">Create Social Media Service</h2>
            <button
              onClick={() => setShowCreate(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Heading *
              </label>
              <input
                type="text"
                required
                value={createHeading}
                onChange={(e) => setCreateHeading(e.target.value)}
                placeholder="e.g. Influencer Outreach & Brand Partnerships"
                className="w-full px-4 py-2.5 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                required
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                placeholder="Enter detailed description of the social media capability..."
                className="w-full px-4 py-2.5 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-50 transition"
              >
                {processing ? "Saving..." : "Create Service"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {editId && (
        <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border-t-4 border-purple-600 p-6 border-x border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
            <h2 className="text-2xl font-bold text-purple-600">Edit Social Media Service</h2>
            <button
              onClick={() => setEditId(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Heading *
              </label>
              <input
                type="text"
                required
                value={editHeading}
                onChange={(e) => setEditHeading(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                required
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-50 transition"
              >
                {processing ? "Updating..." : "Update Service"}
              </button>
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Social Service Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No Social Media Services Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "+ Add Offering" to add your first social media solution.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border-t-4 border-purple-600 border-x border-b border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:shadow-xl transition"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600 dark:text-purple-400">
                    <Share2 className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {item.heading}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="px-6 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  onClick={() => startEditing(item)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md border border-gray-300 dark:border-zinc-700 transition flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900/50 transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
