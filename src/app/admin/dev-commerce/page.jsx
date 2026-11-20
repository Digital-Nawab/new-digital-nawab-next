'use client';

import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X, ImagePlus } from "lucide-react";

export default function DevCommercePage() {
  const [commerces, setCommerces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommerce, setEditingCommerce] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    tag: "",
    image: null,
    heading: "",
    description: "",
    skills: [],
    label: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dev-commerce");
      const json = await res.json();
      if (json.data) setCommerces(json.data);
    } catch (err) {
      console.error("Failed to load dev commerce records", err);
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
      tag: "",
      image: null,
      heading: "",
      description: "",
      skills: [],
      label: "",
    });
    setEditingCommerce(null);
    setImagePreview("");
    if (imageRef.current) imageRef.current.value = "";
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingCommerce(item);
    let parsedSkills = [];
    if (Array.isArray(item.skills)) {
      parsedSkills = item.skills;
    } else if (typeof item.skills === "string") {
      try {
        parsedSkills = JSON.parse(item.skills);
      } catch (e) {
        parsedSkills = item.skills.split(",").map((s) => s.trim());
      }
    }

    setFormData({
      tag: item.tag || "",
      image: null,
      heading: item.heading || "",
      description: item.description || "",
      skills: parsedSkills,
      label: item.label || "",
    });
    setImagePreview(resolveImg(item.image));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      dataPayload.append("tag", formData.tag);
      dataPayload.append("heading", formData.heading);
      dataPayload.append("description", formData.description);
      dataPayload.append("label", formData.label);
      dataPayload.append("skills", JSON.stringify(formData.skills.filter(Boolean)));

      if (formData.image instanceof File) {
        dataPayload.append("image", formData.image);
      }

      let url = "/api/admin/dev-commerce";
      let method = "POST";
      if (editingCommerce) {
        url = `/api/admin/dev-commerce/${editingCommerce.id}`;
      }

      const res = await fetch(url, {
        method,
        body: dataPayload,
      });

      if (!res.ok) throw new Error("Failed to save dev commerce record");

      showAlert(editingCommerce ? "Record updated successfully!" : "Record created successfully!");
      closeModal();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to save record", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Dev Commerce?")) return;
    try {
      const res = await fetch(`/api/admin/dev-commerce/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Record deleted successfully!");
        fetchData();
      }
    } catch (err) {
      showAlert("Failed to delete", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dev Commerce Records</h1>
          <p className="text-sm text-gray-500 mt-1">Manage e-commerce development features and platform capabilities</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Dev Commerce
        </button>
      </div>

      {alertMessage && (
        <div
          className={`mb-4 p-4 rounded-lg flex justify-between items-center ${
            alertType === "error"
              ? "bg-red-50 border border-red-200 text-red-700"
              : "bg-green-50 border border-green-200 text-green-700"
          }`}
        >
          <span className="text-sm font-medium">{alertMessage}</span>
          <button onClick={() => setAlertMessage("")} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commerces.map((devCommerce) => {
          let skillsList = [];
          if (Array.isArray(devCommerce.skills)) skillsList = devCommerce.skills;
          else if (typeof devCommerce.skills === "string") {
            try {
              skillsList = JSON.parse(devCommerce.skills);
            } catch (e) {
              skillsList = devCommerce.skills.split(",").map((s) => s.trim());
            }
          }

          return (
            <div
              key={devCommerce.id}
              className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={resolveImg(devCommerce.image)}
                  alt={devCommerce.heading}
                  className="w-full h-full object-cover"
                />
                {devCommerce.tag && (
                  <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                    {devCommerce.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{devCommerce.heading}</h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-3 leading-relaxed">
                  {devCommerce.description}
                </p>

                {skillsList && skillsList.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {skillsList.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {devCommerce.label && (
                  <p className="text-xs text-gray-500 mb-4 font-medium">
                    Label: <span className="text-gray-800">{devCommerce.label}</span>
                  </p>
                )}

                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(devCommerce)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(devCommerce.id)}
                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {commerces.length === 0 && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 text-base mb-3">No Dev Commerce records found</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Dev Commerce
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCommerce ? "Edit Dev Commerce" : "Create New Dev Commerce"}
                </h2>
                <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tag</label>
                  <input
                    value={formData.tag}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                    placeholder="e.g. SHOPIFY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Image {editingCommerce && "(leave blank to keep current)"}
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="dev_commerce_img"
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
                      id="dev_commerce_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">
                      Upload feature image. Max 2MB. Click box to choose file.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Heading *</label>
                  <input
                    value={formData.heading}
                    onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                    placeholder="Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Skills (comma-separated)</label>
                  <input
                    value={formData.skills.join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      }))
                    }
                    placeholder="e.g. Liquid, React, Stripe, GraphQL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Label</label>
                  <input
                    value={formData.label}
                    onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g. Enterprise E-Commerce"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {processing ? "Saving..." : editingCommerce ? "Update Record" : "Create Record"}
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
