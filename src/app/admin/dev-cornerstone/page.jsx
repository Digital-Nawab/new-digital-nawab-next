'use client';

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function DevCornerstonePage() {
  const [cornerstones, setCornerstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    icon: "",
    heading: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dev-cornerstone");
      const json = await res.json();
      if (json.data) setCornerstones(json.data);
    } catch (err) {
      console.error("Failed to load Dev Cornerstones", err);
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

  const openAddModal = () => {
    setFormData({ icon: "", heading: "", description: "" });
    setEditId(null);
    setShowModal(true);
  };

  const startEditing = (item) => {
    setEditId(item.id);
    setFormData({
      icon: item.icon || "",
      heading: item.heading || "",
      description: item.description || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ icon: "", heading: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      let url = "/api/admin/dev-cornerstone";
      let method = "POST";
      if (editId) {
        url = `/api/admin/dev-cornerstone/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save record");

      showAlert(editId ? "Cornerstone updated!" : "Cornerstone created!");
      closeModal();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to save", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Development Cornerstone?")) return;
    try {
      const res = await fetch(`/api/admin/dev-cornerstone/${id}`, { method: "DELETE" });
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
          <h1 className="text-3xl font-bold text-gray-900">Development Cornerstones</h1>
          <p className="text-sm text-gray-500 mt-1">Manage core architectural tenets and development values</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Cornerstone
        </button>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cornerstones.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-xl shadow-xs border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon && <span className="text-xl font-mono text-blue-600">{item.icon}</span>}
              <h3 className="text-lg font-bold text-gray-900">{item.heading}</h3>
            </div>
            <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-3">
              {item.description}
            </p>
            <div className="flex space-x-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => startEditing(item)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {cornerstones.length === 0 && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-3">No cornerstones found</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Cornerstone
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {editId ? "Edit Development Cornerstone" : "Add Development Cornerstone"}
                </h2>
                <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Icon</label>
                  <input
                    value={formData.icon}
                    onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                    placeholder="e.g. Code2, Cpu, Shield"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Heading *</label>
                  <input
                    value={formData.heading}
                    onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                    placeholder="Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? "Saving..." : editId ? "Update" : "Create"}
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
