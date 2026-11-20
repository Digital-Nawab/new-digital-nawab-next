'use client';

import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X, ImagePlus } from "lucide-react";

const SingleInputArray = ({ value = [], onChange, label, placeholder }) => {
  const [tempValue, setTempValue] = useState("");

  const handleAdd = () => {
    if (tempValue?.trim() !== "") {
      onChange([...value, tempValue.trim()]);
      setTempValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {value.map(
          (item, index) =>
            item?.trim() && (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              >
                <span className="text-gray-800 flex-1">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-600 hover:text-red-800 text-xs font-medium ml-2"
                >
                  Remove
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default function SeoServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    image: null,
    heading: "",
    subheading: "",
    description: "",
    features: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-services");
      const json = await res.json();
      if (json.data) setServices(json.data);
    } catch (err) {
      console.error("Failed to load SEO services", err);
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
      subheading: "",
      description: "",
      features: [],
    });
    setEditingService(null);
    setImagePreview("");
    if (imageRef.current) imageRef.current.value = "";
  };

  const openAddModal = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    let parsedFeatures = [];
    if (Array.isArray(service.features)) {
      parsedFeatures = service.features;
    } else if (typeof service.features === "string") {
      try {
        parsedFeatures = JSON.parse(service.features);
      } catch (e) {
        parsedFeatures = service.features.split(",").map((s) => s.trim());
      }
    }

    setFormData({
      image: null,
      heading: service.heading || "",
      subheading: service.subheading || "",
      description: service.description || "",
      features: parsedFeatures,
    });
    setImagePreview(resolveImg(service.image));
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
      dataPayload.append("subheading", formData.subheading);
      dataPayload.append("description", formData.description);
      dataPayload.append("features", JSON.stringify(formData.features.filter((f) => f?.trim())));

      if (formData.image instanceof File) {
        dataPayload.append("image", formData.image);
      }

      let url = "/api/admin/seo-services";
      let method = "POST";
      if (editingService) {
        url = `/api/admin/seo-services/${editingService.id}`;
      }

      const res = await fetch(url, {
        method,
        body: dataPayload,
      });

      if (!res.ok) throw new Error("Failed to save SEO service");

      showAlert(editingService ? "SEO service updated successfully!" : "SEO service created successfully!");
      closeModal();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to save SEO service", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this SEO service?")) return;
    try {
      const res = await fetch(`/api/admin/seo-services/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("SEO service deleted successfully!");
        fetchData();
      } else {
        showAlert("Failed to delete SEO service.", "error");
      }
    } catch (e) {
      showAlert("Failed to delete SEO service.", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Services Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage core SEO service offerings and capability cards</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add SEO Service
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 text-lg mb-2">No SEO services found</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add SEO Service
            </button>
          </div>
        ) : (
          services.map((service) => {
            let featuresList = [];
            if (Array.isArray(service.features)) featuresList = service.features;
            else if (typeof service.features === "string") {
              try {
                featuresList = JSON.parse(service.features);
              } catch (e) {
                featuresList = service.features.split(",").map((s) => s.trim());
              }
            }

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={resolveImg(service.image)}
                    alt={service.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-lg">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded shadow-xs transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded shadow-xs transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                    {service.heading}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                    {service.subheading}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {featuresList
                      .filter((f) => f?.trim())
                      .slice(0, 3)
                      .map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {feature}
                        </span>
                      ))}
                    {featuresList.filter((f) => f?.trim()).length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                        +{featuresList.filter((f) => f?.trim()).length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Service Modal */}
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
                    {editingService ? "Edit SEO Service" : "Add New SEO Service"}
                  </h2>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {editingService ? "Update the SEO service details" : "Create a new SEO service card"}
                  </p>
                </div>
                <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Service Image {editingService && "(optional — leave blank to keep current)"}
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="service_img"
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
                      id="service_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">
                      Upload card banner image. Recommended ratio: 16:9. Max 2MB.
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
                    placeholder="e.g. Technical SEO Audit &amp; Optimization"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subheading</label>
                  <input
                    type="text"
                    value={formData.subheading}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subheading: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Maximize crawlability, site speed, and index coverage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Detailed description of the service..."
                  />
                </div>

                <SingleInputArray
                  value={formData.features}
                  onChange={(val) => setFormData((prev) => ({ ...prev, features: val }))}
                  label="Features / Key Deliverables"
                  placeholder="e.g. Core Web Vitals optimization"
                />

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
                    {processing ? "Saving..." : editingService ? "Update Service" : "Add Service"}
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
