'use client';

import React, { useState, useEffect } from "react";
import { Users, Search, Plus, Pencil, Trash2, X, Shield, Lock, Mail, UserCheck } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, rRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/roles"),
      ]);
      const uJson = await uRes.json();
      const rJson = await rRes.json();

      if (uJson.data) setUsers(uJson.data);
      if (rJson.data) setRoles(rJson.data);
    } catch (err) {
      console.error("Failed to load users", err);
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
      email: "",
      password: "",
      roles: [],
    });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditId(user.id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      roles: Array.isArray(user.roles) ? user.roles : [],
    });
    setShowModal(true);
  };

  const handleRoleToggle = (roleName) => {
    if (formData.roles.includes(roleName)) {
      setFormData({
        ...formData,
        roles: formData.roles.filter((r) => r !== roleName),
      });
    } else {
      setFormData({
        ...formData,
        roles: [...formData.roles, roleName],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editId ? `/api/admin/users/${editId}` : "/api/admin/users";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: editId ? "User updated successfully" : "User created successfully",
        });
        setShowModal(false);
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to save user" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "User deleted successfully" });
        fetchData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setAlert({ type: "error", message: errJson.message || "Failed to delete user" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <Users className="w-9 h-9 text-blue-600" />
              Users Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 mt-1">
              Manage system administrators, editors, and user account access
            </p>
          </div>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create New User
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
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

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            No users found
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            {searchTerm
              ? "No users match your search criteria. Try adjusting your search query."
              : "Get started by creating your first system user."}
          </p>
          {!searchTerm && (
            <button
              onClick={openCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
            >
              Create First User
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
                  <th className="px-6 py-4 min-w-[150px]">Name</th>
                  <th className="px-6 py-4 min-w-[200px]">Email</th>
                  <th className="px-6 py-4 min-w-[200px]">Assigned Roles</th>
                  <th className="px-6 py-4 text-right min-w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-gray-500">
                      #{user.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs uppercase">
                          {(user.name || "U").substring(0, 2)}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      {user.roles && user.roles.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {user.roles.map((role, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            >
                              <Users className="w-3 h-3 mr-1" />
                              {role}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">No roles assigned</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEdit(user)}
                          className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md text-xs font-medium transition flex items-center gap-1"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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

      {/* Create / Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editId ? "Edit User Account" : "Create New User"}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. admin@digitalnawab.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Password {editId ? "(Leave blank to keep unchanged)" : "*"}
                </label>
                <input
                  type="password"
                  required={!editId}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editId ? "••••••••" : "Minimum 6 characters"}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  Assign Roles
                </label>
                <div className="space-y-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 max-h-40 overflow-y-auto">
                  {roles.map((r) => (
                    <label
                      key={r.id}
                      className="flex items-center gap-2.5 text-sm text-gray-800 dark:text-zinc-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(r.name)}
                        onChange={() => handleRoleToggle(r.name)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium">{r.name}</span>
                    </label>
                  ))}
                  {roles.length === 0 && (
                    <span className="text-xs text-gray-400">No roles available.</span>
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
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition"
                >
                  {processing ? "Saving..." : editId ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
