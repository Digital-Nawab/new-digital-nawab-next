'use client';

import React, { useState, useEffect } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";

export default function SeoProcessesPage() {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [createData, setCreateData] = useState({
    icon: "",
    heading: "",
    description: "",
  });

  const [updateData, setUpdateData] = useState({
    icon: "",
    heading: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-processes");
      const json = await res.json();
      if (json.data) setProcesses(json.data);
    } catch (err) {
      console.error("Failed to load SEO processes", err);
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
      const res = await fetch("/api/admin/seo-processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      if (!res.ok) throw new Error("Failed to create process");
      setCreateData({ icon: "", heading: "", description: "" });
      showAlert("SEO process created successfully!");
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
      const res = await fetch(`/api/admin/seo-processes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error("Failed to update process");
      setEditingId(null);
      setUpdateData({ icon: "", heading: "", description: "" });
      showAlert("SEO process updated successfully!");
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to update", "error");
    } finally {
      setProcessing(false);
    }
  };

  const startEditing = (process) => {
    setEditingId(process.id);
    setUpdateData({
      icon: process.icon || "",
      heading: process.heading || "",
      description: process.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this SEO process?")) return;
    try {
      const res = await fetch(`/api/admin/seo-processes/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("SEO process deleted successfully!");
        fetchData();
      }
    } catch (err) {
      showAlert("Failed to delete", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">SEO Processes Management</h1>
        <p className="text-sm text-gray-500 mt-1">Configure step-by-step technical SEO workflow processes</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Form */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Add New SEO Process
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Icon Name / Class</label>
              <input
                placeholder="e.g. Search, Target, or icon class"
                value={createData.icon}
                onChange={(e) => setCreateData((prev) => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Heading *</label>
              <input
                placeholder="Heading"
                value={createData.heading}
                onChange={(e) => setCreateData((prev) => ({ ...prev, heading: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description *</label>
              <textarea
                placeholder="Detailed description of this SEO process step..."
                value={createData.description}
                onChange={(e) => setCreateData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              disabled={processing}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs"
            >
              {processing ? "Creating..." : "Create Process"}
            </button>
          </form>
        </div>

        {/* Update Form */}
        {editingId ? (
          <div className="bg-white rounded-xl shadow-xs border border-blue-200 overflow-hidden p-6 ring-2 ring-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-600" />
                Edit SEO Process
              </h2>
              <button onClick={() => setEditingId(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Icon Name / Class</label>
                <input
                  placeholder="Icon (e.g., Search, Target)"
                  value={updateData.icon}
                  onChange={(e) => setUpdateData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Heading *</label>
                <input
                  placeholder="Heading"
                  value={updateData.heading}
                  onChange={(e) => setUpdateData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description *</label>
                <textarea
                  placeholder="Description"
                  value={updateData.description}
                  onChange={(e) => setUpdateData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? "Updating..." : "Update Process"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-50/50 rounded-xl border border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
            <Pencil className="w-8 h-8 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">Select a process from the list below to edit its content</p>
            <p className="text-xs text-gray-400 mt-1">Or use the form on the left to add a new process step</p>
          </div>
        )}
      </div>

      {/* Processes Table */}
      <div className="mt-8 bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-base">SEO Processes List ({processes.length})</h3>
        </div>
        <div className="overflow-x-auto">
          {processes.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">No SEO processes found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Heading</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processes.map((process) => (
                  <tr key={process.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                      {process.icon || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {process.heading}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 max-w-md">
                      {process.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEditing(process)}
                          className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(process.id)}
                          className="p-1.5 border border-gray-200 hover:bg-red-50 text-red-500 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
