'use client';

import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X, ImagePlus } from "lucide-react";

export default function SeoHighlightsPage() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    image: null,
    heading: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-highlights");
      const json = await res.json();
      if (json.data) setHighlights(json.data);
    } catch (err) {
      console.error("Failed to load SEO highlights", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 4000);
  };

  const resolveImg = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  const resetForm = () => {
    setFormData({
      image: null,
      heading: "",
      description: "",
    });
    setEditingHighlight(null);
    setImagePreview("");
    if (imageRef.current) imageRef.current.value = "";
  };

  const openAddModal = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (highlight) => {
    setEditingHighlight(highlight);
    setFormData({
      image: null,
      heading: highlight.heading || "",
      description: highlight.description || "",
    });
    setImagePreview(resolveImg(highlight.image));
    setShowFormModal(true);
  };

  const closeModal = () => {
    setShowFormModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const dataPayload = new FormData();
      dataPayload.append("heading", formData.heading);
      dataPayload.append("description", formData.description);

      if (formData.image instanceof File) {
        dataPayload.append("image", formData.image);
      }

      let url = "/api/admin/seo-highlights";
      let method = "POST";
      if (editingHighlight) {
        url = `/api/admin/seo-highlights/${editingHighlight.id}`;
      }

      const res = await fetch(url, {
        method,
        body: dataPayload,
      });

      if (!res.ok) throw new Error("Failed to save SEO highlight");

      showAlert(editingHighlight ? "SEO highlight updated successfully!" : "SEO highlight created successfully!");
      closeModal();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to save SEO highlight", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this SEO highlight?")) return;
    try {
      const res = await fetch(`/api/admin/seo-highlights/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("SEO highlight deleted successfully!");
        fetchData();
      } else {
        showAlert("Failed to delete SEO highlight.", "error");
      }
    } catch (err) {
      showAlert("Failed to delete SEO highlight.", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Highlights Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage performance highlights, statistics, and impact cards</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add SEO Highlight
        </button>
      </div>

      {alertMessage && (
        <div
          className={`mb-4 p-4 rounded-lg flex justify-between items-center ${
            alertType === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <span className="text-sm font-medium">{alertMessage}</span>
          <button onClick={() => setAlertMessage("")} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {highlights.length === 0 ? (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 text-lg mb-2">No SEO highlights found</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add SEO Highlight
            </button>
          </div>
        ) : (
          highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {highlight.image && (
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={resolveImg(highlight.image)}
                    alt={highlight.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-lg">
                    <button
                      onClick={() => handleEdit(highlight)}
                      className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded shadow-xs transition-colors"
                      title="Edit Highlight"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(highlight.id)}
                      className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded shadow-xs transition-colors"
                      title="Delete Highlight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                    {highlight.heading}
                  </h3>
                  {!highlight.image && (
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleEdit(highlight)}
                        className="p-1 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(highlight.id)}
                        className="p-1 border border-gray-200 hover:bg-red-50 text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div
                  className="text-gray-600 text-xs line-clamp-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlight.description }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingHighlight ? "Edit SEO Highlight" : "Add New SEO Highlight"}
                  </h2>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {editingHighlight ? "Update the highlight details" : "Create a new highlight card"}
                  </p>
                </div>
                <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Highlight Image {editingHighlight && "(optional — leave blank to keep current)"}
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="highlight_img"
                      className="flex items-center justify-center w-28 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer overflow-hidden shrink-0"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImagePlus className="w-6 h-6 text-gray-400" />
                      )}
                    </label>
                    <input
                      ref={imageRef}
                      id="highlight_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">
                      Upload image. Max 2MB. Click box to choose file.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Heading *</label>
                  <input
                    type="text"
                    value={formData.heading}
                    onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 300% Organic Traffic Growth"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Detailed description of the highlight..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? "Saving..." : editingHighlight ? "Update Highlight" : "Add Highlight"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
