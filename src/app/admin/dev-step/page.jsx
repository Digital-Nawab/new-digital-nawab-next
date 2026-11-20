'use client';

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, GitPullRequest, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DevStepPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
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
      const res = await fetch("/api/admin/dev-step");
      const json = await res.json();
      if (json.data) {
        setItems(json.data);
      }
    } catch (err) {
      console.error("Failed to load dev steps", err);
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
      icon: "",
      heading: "",
      description: "",
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      icon: item.icon || "",
      heading: item.heading || "",
      description: item.description || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Development Step?")) return;
    try {
      const res = await fetch(`/api/admin/dev-step/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Development Step deleted successfully" });
        fetchData();
      } else {
        setAlert({ type: "error", message: "Failed to delete" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editId ? `/api/admin/dev-step/${editId}` : "/api/admin/dev-step";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: editId
            ? "Development Step updated successfully"
            : "Development Step created successfully",
        });
        setModalOpen(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({
          type: "error",
          message: errJson.error || "Failed to save record",
        });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <GitPullRequest className="w-8 h-8 text-blue-600" />
            Development Steps & Workflow
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your development methodology roadmap, agile phases, and execution steps
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add New Step
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

      {/* List of Dev Step Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No Development Steps Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "+ Add New Step" to define your development process steps.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:shadow-md transition relative group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl p-2.5 bg-blue-50 dark:bg-zinc-800 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-zinc-700">
                    {item.icon || "⚙️"}
                  </span>
                  <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
                    Step #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {item.heading}
                </h3>

                <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-4">
                  {item.description}
                </p>
              </div>

              <div className="px-6 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  onClick={() => openEdit(item)}
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

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit Development Step" : "Create New Development Step"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Icon (Emoji or Icon Name)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g. 📋, 💻, or Deploy"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Heading *
                </label>
                <input
                  type="text"
                  required
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g. Discovery & System Architecture"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what is executed during this development stage..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition"
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
