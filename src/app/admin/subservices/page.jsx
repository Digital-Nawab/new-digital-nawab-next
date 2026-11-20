'use client';

import React, { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Layers, ImagePlus, UploadCloud, FolderTree } from "lucide-react";

export default function SubservicesPage() {
  const [subservices, setSubservices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState("all");

  const [formData, setFormData] = useState({
    service_id: "",
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, serRes] = await Promise.all([
        fetch("/api/admin/subservices"),
        fetch("/api/admin/services"),
      ]);
      const subJson = await subRes.json();
      const serJson = await serRes.json();

      if (subJson.data) setSubservices(subJson.data);
      if (serJson.data) setServices(serJson.data);
    } catch (err) {
      console.error("Failed to load subservices", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setFormData({
      service_id: services.length > 0 ? services[0].id : "",
      name: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      service_id: item.service_id || "",
      name: item.name || "",
      description: item.description || "",
    });
    setImageFile(null);
    setImagePreview(
      item.image ? (item.image.startsWith("http") ? item.image : `/${item.image}`) : null
    );
    setShowModal(true);
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const fd = new FormData();
      fd.append("service_id", formData.service_id);
      fd.append("name", formData.name);
      fd.append("description", formData.description || "");
      if (imageFile) fd.append("image", imageFile);

      const url = editId
        ? `/api/admin/subservices/${editId}`
        : "/api/admin/subservices";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: fd,
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: editId
            ? "Subservice updated successfully"
            : "Subservice created successfully",
        });
        setShowModal(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({
          type: "error",
          message: errJson.error || "Failed to save subservice",
        });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subservice?")) return;
    try {
      const res = await fetch(`/api/admin/subservices/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Subservice deleted successfully" });
        fetchData();
      } else {
        setAlert({ type: "error", message: "Failed to delete" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredSubservices = subservices.filter((sub) => {
    if (selectedServiceFilter === "all") return true;
    return String(sub.service_id) === String(selectedServiceFilter);
  });

  const getServiceName = (id) => {
    const s = services.find((serv) => String(serv.id) === String(id));
    return s ? s.title || s.name : `Service #${id}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-8 h-8 text-indigo-600" />
            Subservices Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize child services, specialized offerings, and category deliverables under parent services
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Subservice
        </button>
      </div>

      {/* Flash Messages */}
      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
            alert.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
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

      {/* Filter by Parent Service */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
            Filter by Parent Service:
          </span>
        </div>
        <select
          value={selectedServiceFilter}
          onChange={(e) => setSelectedServiceFilter(e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <option value="all">All Services ({subservices.length})</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title || s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subservices Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredSubservices.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No Subservices Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "+ Add Subservice" to create your first child service.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubservices.map((sub) => (
            <div
              key={sub.id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {sub.image ? (
                  <div className="h-40 bg-gray-100 dark:bg-zinc-800 overflow-hidden relative">
                    <img
                      src={sub.image.startsWith("http") ? sub.image : `/${sub.image}`}
                      alt={sub.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                      {getServiceName(sub.service_id)}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-indigo-50/50 dark:bg-zinc-800/60 border-b border-indigo-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                      {getServiceName(sub.service_id)}
                    </span>
                    <span className="text-xs text-gray-400">ID #{sub.id}</span>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {sub.name}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                    {sub.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  onClick={() => openEdit(sub)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md border border-gray-300 dark:border-zinc-700 transition flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sub.id)}
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

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit Subservice" : "Create New Subservice"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Parent Service *
                </label>
                <select
                  required
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select Parent Service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title || s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Subservice Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Technical SEO Audit"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what is included in this subservice..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Icon / Subservice Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-4 text-center hover:border-indigo-500 transition cursor-pointer bg-gray-50 dark:bg-zinc-800/40"
                >
                  {imagePreview ? (
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg shadow"
                      />
                      <span className="text-xs text-indigo-600 font-medium">Click to replace</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImagePlus className="w-8 h-8 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">Click to upload subservice image</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition"
                >
                  {processing ? "Saving..." : editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
