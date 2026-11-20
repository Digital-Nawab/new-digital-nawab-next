'use client';

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Package, Check, Sparkles } from "lucide-react";

export default function PackageFeaturesPage() {
  const [features, setFeatures] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedPackageFilter, setSelectedPackageFilter] = useState("all");

  const [formData, setFormData] = useState({
    package_id: "",
    feature_key: "",
    feature_value: "Yes",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [featRes, pkgRes] = await Promise.all([
        fetch("/api/admin/package-features"),
        fetch("/api/admin/packages"),
      ]);
      const featJson = await featRes.json();
      const pkgJson = await pkgRes.json();

      if (featJson.data) setFeatures(featJson.data);
      if (pkgJson.data) setPackages(pkgJson.data);
    } catch (err) {
      console.error("Failed to load package features", err);
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
      package_id: packages.length > 0 ? packages[0].id : "",
      feature_key: "",
      feature_value: "Yes",
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      package_id: item.package_id || "",
      feature_key: item.feature_key || "",
      feature_value: item.feature_value || "Yes",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editId
        ? `/api/admin/package-features/${editId}`
        : "/api/admin/package-features";
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
            ? "Package feature updated successfully"
            : "Package feature created successfully",
        });
        setShowModal(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({
          type: "error",
          message: errJson.error || "Failed to save feature",
        });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;
    try {
      const res = await fetch(`/api/admin/package-features/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Feature deleted successfully" });
        fetchData();
      } else {
        setAlert({ type: "error", message: "Failed to delete" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredFeatures = features.filter((feat) => {
    if (selectedPackageFilter === "all") return true;
    return String(feat.package_id) === String(selectedPackageFilter);
  });

  const getPackageName = (id) => {
    const p = packages.find((pkg) => String(pkg.id) === String(id));
    return p ? p.name || p.title : `Package #${id}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-8 h-8 text-pink-600" />
            Package Features & Entitlements
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure line-item deliverables, limits, and inclusion matrix for each pricing plan
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Feature
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

      {/* Filter by Package */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
            Filter by Package:
          </span>
        </div>
        <select
          value={selectedPackageFilter}
          onChange={(e) => setSelectedPackageFilter(e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto"
        >
          <option value="all">All Packages ({features.length} features)</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name || p.title} ({p.package_for || "general"})
            </option>
          ))}
        </select>
      </div>

      {/* Features Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredFeatures.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No Package Features Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "+ Add Feature" to assign feature deliverables to a package.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Feature Name / Key</th>
                <th className="px-6 py-4">Value / Limit</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filteredFeatures.map((feat) => (
                <tr
                  key={feat.id}
                  className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50">
                      {getPackageName(feat.package_id)}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {feat.feature_key}
                  </td>

                  <td className="px-6 py-4">
                    {feat.feature_value === "Yes" || feat.feature_value === "true" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/50">
                        <Check className="w-3.5 h-3.5" /> Included
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-medium text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                        {feat.feature_value}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(feat)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-800 rounded-md transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(feat.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-md transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit Package Feature" : "Create New Package Feature"}
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
                  Target Package *
                </label>
                <select
                  required
                  value={formData.package_id}
                  onChange={(e) => setFormData({ ...formData, package_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="">Select Package</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || p.title} ({p.package_for || "general"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Feature Key / Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.feature_key}
                  onChange={(e) => setFormData({ ...formData, feature_key: e.target.value })}
                  placeholder="e.g. Keywords Researched"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Feature Value / Limit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.feature_value}
                  onChange={(e) => setFormData({ ...formData, feature_value: e.target.value })}
                  placeholder="e.g. Yes, 20 Keywords, Unlimited"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
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
                  className="px-5 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 disabled:opacity-50 rounded-lg shadow-sm transition"
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
