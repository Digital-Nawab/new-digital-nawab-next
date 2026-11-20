'use client';

import React, { useState, useEffect } from "react";
import { Shield, Search, Plus, Pencil, Trash2, X, Users, Key, Check } from "lucide-react";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rRes, pRes] = await Promise.all([
        fetch("/api/admin/roles"),
        fetch("/api/admin/permissions"),
      ]);
      const rJson = await rRes.json();
      const pJson = await pRes.json();

      if (rJson.data) setRoles(rJson.data);
      if (pJson.data) setPermissions(pJson.data);
    } catch (err) {
      console.error("Failed to load roles", err);
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
      name: "",
      permissions: [],
    });
    setShowModal(true);
  };

  const openEdit = (role) => {
    setEditId(role.id);
    setFormData({
      name: role.name || "",
      permissions: Array.isArray(role.permissions) ? role.permissions : [],
    });
    setShowModal(true);
  };

  const handlePermissionToggle = (permName) => {
    if (formData.permissions.includes(permName)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permName),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permName],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editId ? `/api/admin/roles/${editId}` : "/api/admin/roles";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: editId ? "Role updated successfully" : "Role created successfully",
        });
        setShowModal(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to save role" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      const res = await fetch(`/api/admin/roles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Role deleted successfully" });
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to delete role" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredRoles = roles.filter(
    (r) =>
      (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.guard_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <Shield className="w-9 h-9 text-indigo-600" />
              Roles Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 mt-1">
              Configure system roles, access policies, and permission scopes
            </p>
          </div>
          <button
            onClick={openCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create New Role
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
          />
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

      {/* Roles Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredRoles.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            No roles found
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            {searchTerm
              ? "No roles match your search criteria. Try adjusting your search query."
              : "Get started by defining your first security role."}
          </p>
          {!searchTerm && (
            <button
              onClick={openCreate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
            >
              Create First Role
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-4 w-[80px]">ID</th>
                  <th className="px-6 py-4 min-w-[150px]">Role Name</th>
                  <th className="px-6 py-4 min-w-[120px]">Guard</th>
                  <th className="px-6 py-4 min-w-[300px]">Assigned Permissions</th>
                  <th className="px-6 py-4 text-right min-w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-gray-500">
                      #{role.id}
                    </td>

                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {role.name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-600 dark:text-zinc-300">
                        {role.guard_name || "web"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {role.permissions && role.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {role.permissions.map((perm, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            >
                              <Shield className="w-3 h-3 mr-1" />
                              {perm}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">No permissions assigned</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEdit(role)}
                          className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md text-xs font-medium transition flex items-center gap-1"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
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
        </div>
      )}

      {/* Create / Edit Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit Role" : "Create New Role"}
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
                  Role Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. content_editor, billing_admin"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  Assign Permissions
                </label>
                <div className="space-y-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 max-h-56 overflow-y-auto">
                  {permissions.map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2.5 text-sm text-gray-800 dark:text-zinc-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(p.name)}
                        onChange={() => handlePermissionToggle(p.name)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-medium">{p.name}</span>
                    </label>
                  ))}
                  {permissions.length === 0 && (
                    <span className="text-xs text-gray-400">No permissions found.</span>
                  )}
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
                  {processing ? "Saving..." : editId ? "Update Role" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
