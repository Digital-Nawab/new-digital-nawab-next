'use client';

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function SeoOptimizationPage() {
  const [optimizations, setOptimizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [createData, setCreateData] = useState({
    icon: "",
    heading: "",
    description: "",
  });

  const [editData, setEditData] = useState({
    icon: "",
    heading: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-optimization");
      const json = await res.json();
      if (json.data) setOptimizations(json.data);
    } catch (err) {
      console.error("Failed to load SEO optimizations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/seo-optimization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      if (!res.ok) throw new Error("Failed to create record");
      setCreateData({ icon: "", heading: "", description: "" });
      showAlert("SEO optimization card created!");
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to create", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch(`/api/admin/seo-optimization/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Failed to update record");
      setEditId(null);
      setEditData({ icon: "", heading: "", description: "" });
      showAlert("SEO optimization card updated!");
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to update", "error");
    } finally {
      setProcessing(false);
    }
  };

  const startEditing = (item) => {
    setEditId(item.id);
    setEditData({
      icon: item.icon || "",
      heading: item.heading || "",
      description: item.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this optimization card?")) return;
    try {
      const res = await fetch(`/api/admin/seo-optimization/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Card deleted successfully!");
        fetchData();
      }
    } catch (err) {
      showAlert("Failed to delete", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">SEO Optimization Management</h1>
        <p className="text-sm text-gray-500 mt-1">Configure technical, on-page, and off-page optimization pillars</p>
      </div>

      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl border flex justify-between items-center ${
            alert.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          <span className="text-sm font-medium">{alert.message}</span>
          <button onClick={() => setAlert(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Create / Edit Card */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-xs border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editId ? "Edit Optimization Card" : "Add New Optimization Card"}
        </h2>
        <form onSubmit={editId ? handleUpdate : handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Icon</label>
              <input
                type="text"
                value={editId ? editData.icon : createData.icon}
                onChange={(e) =>
                  editId
                    ? setEditData((prev) => ({ ...prev, icon: e.target.value }))
                    : setCreateData((prev) => ({ ...prev, icon: e.target.value }))
                }
                placeholder="e.g. Zap, Code, Shield"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Heading *</label>
              <input
                type="text"
                value={editId ? editData.heading : createData.heading}
                onChange={(e) =>
                  editId
                    ? setEditData((prev) => ({ ...prev, heading: e.target.value }))
                    : setCreateData((prev) => ({ ...prev, heading: e.target.value }))
                }
                placeholder="Heading"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description *</label>
            <textarea
              value={editId ? editData.description : createData.description}
              onChange={(e) =>
                editId
                  ? setEditData((prev) => ({ ...prev, description: e.target.value }))
                  : setCreateData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={processing}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? "Saving..." : editId ? "Update Card" : "Create Card"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {optimizations.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-xl shadow-xs border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <h3 className="text-lg font-bold text-gray-900">{item.heading}</h3>
            </div>
            <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-3">
              {item.description}
            </p>
            <div className="flex space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => startEditing(item)}
                className="px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded hover:bg-amber-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
