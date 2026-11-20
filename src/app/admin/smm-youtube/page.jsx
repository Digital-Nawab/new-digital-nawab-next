'use client';

import React, { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Youtube, UploadCloud, Tag } from "lucide-react";

export default function SmmYoutubePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  // Create state
  const [createImage, setCreateImage] = useState(null);
  const [createPreview, setCreatePreview] = useState(null);
  const [createHeading, setCreateHeading] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createFeatures, setCreateFeatures] = useState([]);
  const [createFeatureInput, setCreateFeatureInput] = useState("");

  // Edit state
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editHeading, setEditHeading] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFeatures, setEditFeatures] = useState([]);
  const [editFeatureInput, setEditFeatureInput] = useState("");

  const createFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/smm-youtube");
      const json = await res.json();
      if (json.data) {
        setItems(
          json.data.map((item) => ({
            ...item,
            features: Array.isArray(item.features)
              ? item.features
              : typeof item.features === "string"
              ? JSON.parse(item.features || "[]")
              : [],
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load YouTube marketing items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateImage = (file) => {
    if (!file) return;
    setCreateImage(file);
    setCreatePreview(URL.createObjectURL(file));
  };

  const handleEditImage = (file) => {
    if (!file) return;
    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
  };

  const addCreateFeature = () => {
    if (!createFeatureInput.trim()) return;
    if (!createFeatures.includes(createFeatureInput.trim())) {
      setCreateFeatures([...createFeatures, createFeatureInput.trim()]);
    }
    setCreateFeatureInput("");
  };

  const removeCreateFeature = (feat) => {
    setCreateFeatures(createFeatures.filter((f) => f !== feat));
  };

  const addEditFeature = () => {
    if (!editFeatureInput.trim()) return;
    if (!editFeatures.includes(editFeatureInput.trim())) {
      setEditFeatures([...editFeatures, editFeatureInput.trim()]);
    }
    setEditFeatureInput("");
  };

  const removeEditFeature = (feat) => {
    setEditFeatures(editFeatures.filter((f) => f !== feat));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const fd = new FormData();
      if (createImage) fd.append("image", createImage);
      fd.append("heading", createHeading);
      fd.append("description", createDescription);
      fd.append("features", JSON.stringify(createFeatures));

      const res = await fetch("/api/admin/smm-youtube", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        setAlert({ type: "success", message: "YouTube marketing item created successfully" });
        setCreateImage(null);
        setCreatePreview(null);
        setCreateHeading("");
        setCreateDescription("");
        setCreateFeatures([]);
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
    setEditFeatures(Array.isArray(item.features) ? item.features : []);
    setEditImage(null);
    setEditPreview(item.image ? (item.image.startsWith("http") ? item.image : `/${item.image}`) : null);
    setShowCreate(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const fd = new FormData();
      if (editImage) fd.append("image", editImage);
      fd.append("heading", editHeading);
      fd.append("description", editDescription);
      fd.append("features", JSON.stringify(editFeatures));

      const res = await fetch(`/api/admin/smm-youtube/${editId}`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        setAlert({ type: "success", message: "YouTube marketing item updated successfully" });
        setEditId(null);
        setEditImage(null);
        setEditPreview(null);
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
    if (!confirm("Are you sure you want to delete this YouTube marketing service?")) return;
    try {
      const res = await fetch(`/api/admin/smm-youtube/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "YouTube marketing service deleted successfully" });
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
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <Youtube className="w-8 h-8 text-red-600" />
            YouTube Marketing & Growth
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage YouTube channel management, video SEO, shorts promotion, and subscribers boost
          </p>
        </div>
        {!showCreate && !editId && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add YouTube Service
          </button>
        )}
      </div>

      {/* Flash Messages */}
      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
            alert.type === "success"
              ? "bg-red-50 text-red-800 border border-red-200"
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
        <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border-t-4 border-red-600 p-6 border-x border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
            <h2 className="text-2xl font-bold text-red-600">Create YouTube Marketing Item</h2>
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
                Thumbnail / Media Image
              </label>
              <div
                onClick={() => createFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleCreateImage(e.dataTransfer.files[0]);
                }}
                className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-red-500 transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-800/40"
              >
                {createPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={createPreview}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg shadow mb-3"
                    />
                    <p className="text-sm text-red-600 font-medium">Click or drop to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-10 h-10 text-red-500 mb-2" />
                    <p className="text-gray-600 dark:text-zinc-300 font-medium text-sm">
                      Drag and drop an image here, or click to select
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                )}
                <input
                  ref={createFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && handleCreateImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Heading *
              </label>
              <input
                type="text"
                required
                value={createHeading}
                onChange={(e) => setCreateHeading(e.target.value)}
                placeholder="e.g. YouTube Video SEO & Tag Optimization"
                className="w-full px-4 py-2.5 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
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
                placeholder="Enter service details..."
                className="w-full px-4 py-2.5 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Features & Benefits
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={createFeatureInput}
                  onChange={(e) => setCreateFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCreateFeature();
                    }
                  }}
                  placeholder="e.g. Top Search Ranking, Organic Subscribers"
                  className="flex-1 px-4 py-2 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addCreateFeature}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                >
                  Add Feature
                </button>
              </div>

              {createFeatures.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {createFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-red-200 dark:border-red-900/50"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => removeCreateFeature(feat)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-50 transition"
              >
                {processing ? "Saving..." : "Create"}
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
        <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border-t-4 border-red-600 p-6 border-x border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
            <h2 className="text-2xl font-bold text-red-600">Edit YouTube Marketing Item</h2>
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
                Thumbnail / Media Image
              </label>
              <div
                onClick={() => editFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleEditImage(e.dataTransfer.files[0]);
                }}
                className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-red-500 transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-800/40"
              >
                {editPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={editPreview}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg shadow mb-3"
                    />
                    <p className="text-sm text-red-600 font-medium">Click or drop to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-10 h-10 text-red-500 mb-2" />
                    <p className="text-gray-600 dark:text-zinc-300 font-medium text-sm">
                      Drag and drop an image here, or click to select
                    </p>
                  </div>
                )}
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && handleEditImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Heading *
              </label>
              <input
                type="text"
                required
                value={editHeading}
                onChange={(e) => setEditHeading(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
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
                className="w-full px-4 py-2.5 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Features & Benefits
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={editFeatureInput}
                  onChange={(e) => setEditFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addEditFeature();
                    }
                  }}
                  placeholder="e.g. Monetization Guidance"
                  className="flex-1 px-4 py-2 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addEditFeature}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                >
                  Add Feature
                </button>
              </div>

              {editFeatures.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {editFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-red-200 dark:border-red-900/50"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => removeEditFeature(feat)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-50 transition"
              >
                {processing ? "Updating..." : "Update"}
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

      {/* Grid of YouTube Service Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No YouTube Services Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "+ Add YouTube Service" to create your first promotion card.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-red-600 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={
                      item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : `/${item.image}`
                        : "/assets/images/default.webp"
                    }
                    alt={item.heading}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/dc2626/ffffff?text=YouTube+Service";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-3 mb-3">
                    {item.description}
                  </p>

                  {item.features && item.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.features.map((feat, index) => (
                        <span
                          key={index}
                          className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-red-200 dark:border-red-900/40"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  onClick={() => startEditing(item)}
                  className="px-3 py-1.5 text-xs font-semibold border border-red-300 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-900/50 rounded-md transition flex items-center gap-1.5 border border-red-200 dark:border-red-900/50"
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
