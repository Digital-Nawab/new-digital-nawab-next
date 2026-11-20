'use client';

import React, { useState, useEffect } from "react";
import { Key, Search, Plus, Pencil, Trash2, X, LayoutGrid, Table as TableIcon, Shield } from "lucide-react";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/permissions");
      const json = await res.json();
      if (json.data) setPermissions(json.data);
    } catch (err) {
      console.error("Failed to load permissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setFormData({ name: "" });
    setShowModal(true);
  };

  const openEdit = (perm) => {
    setEditId(perm.id);
    setFormData({ name: perm.name || "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editId ? `/api/admin/permissions/${editId}` : "/api/admin/permissions";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: editId ? "Permission updated successfully" : "Permission created successfully",
        });
        setShowModal(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to save permission" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this permission?")) return;
    try {
      const res = await fetch(`/api/admin/permissions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Permission deleted successfully" });
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to delete permission" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredPermissions = permissions.filter(
    (p) =>
      (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.guard_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <Key className="w-9 h-9 text-emerald-600" />
              Permissions Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 mt-1">
              Define granular access keys and operation rights across the dashboard
            </p>
          </div>
          <button
            onClick={openCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create Permission
          </button>
        </div>

        {/* Search & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg border border-gray-200 dark:border-zinc-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition ${
                viewMode === "grid"
                  ? "bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition ${
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300"
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
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

      {/* Content Rendering */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPermissions.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <Key className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            No permissions found
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            {searchTerm
              ? "No permissions match your search query."
              : "Get started by defining your first permission."}
          </p>
          {!searchTerm && (
            <button
              onClick={openCreate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
            >
              Create First Permission
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        /* Card Grid View (exact from PermissionIndex.jsx) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPermissions.map((perm) => (
            <div
              key={perm.id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm hover:shadow-md transition border border-gray-200 dark:border-zinc-800 border-l-4 border-l-emerald-500 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 bg-emerald-50 dark:bg-zinc-800 rounded-lg text-emerald-600">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                    {perm.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    ID #{perm.id} • guard: {perm.guard_name || "web"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => openEdit(perm)}
                  className="p-1.5 text-gray-400 hover:text-emerald-600 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(perm.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-zinc-800 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4 w-[100px]">ID</th>
                <th className="px-6 py-4">Permission Name</th>
                <th className="px-6 py-4">Guard</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filteredPermissions.map((perm) => (
                <tr
                  key={perm.id}
                  className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition"
                >
                  <td className="px-6 py-4 font-mono font-medium text-gray-500">
                    #{perm.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-500" />
                    {perm.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-zinc-400">
                    {perm.guard_name || "web"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openEdit(perm)}
                        className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md text-xs font-medium transition flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(perm.id)}
                        className="px-3 py-1.5 border border-red-200 dark:border-red-900/50 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 text-red-600 rounded-md text-xs font-medium transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit Permission" : "Create New Permission"}
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
                  Permission Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. view-dashboard, edit-blogs"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
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
                  className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg shadow-sm transition"
                >
                  {processing ? "Saving..." : editId ? "Update Permission" : "Create Permission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
