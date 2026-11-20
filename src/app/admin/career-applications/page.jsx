'use client';

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  Trash2,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  X,
  FileText
} from "lucide-react";

export default function CareerApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/career-applications");
      const json = await res.json();
      if (json.data) {
        setApplications(json.data);
      }
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (formId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/career-applications/${formId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setAlert({ type: "success", message: `Status updated to ${newStatus}` });
        setApplications((prev) =>
          prev.map((app) => (app.id === formId ? { ...app, status: newStatus } : app))
        );
        if (selectedForm && selectedForm.id === formId) {
          setSelectedForm((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        setAlert({ type: "error", message: "Failed to update status" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/career-applications/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Application deleted successfully" });
        setDeleteId(null);
        fetchData();
      } else {
        setAlert({ type: "error", message: "Failed to delete" });
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "new":
        return "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200";
      case "reviewed":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200";
      case "interviewed":
        return "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200";
      case "rejected":
        return "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-200";
      default:
        return "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border-gray-200";
    }
  };

  const filteredForms = applications.filter((form) => {
    const matchesStatus =
      statusFilter === "all" || (form.status || "new").toLowerCase() === statusFilter.toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      (form.name || "").toLowerCase().includes(q) ||
      (form.email || "").toLowerCase().includes(q) ||
      (form.phone || "").toLowerCase().includes(q) ||
      (form.job_title || "").toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: applications.length,
    new: applications.filter((f) => (f.status || "new").toLowerCase() === "new").length,
    reviewed: applications.filter((f) => (f.status || "").toLowerCase() === "reviewed").length,
    interviewed: applications.filter((f) => (f.status || "").toLowerCase() === "interviewed").length,
    rejected: applications.filter((f) => (f.status || "").toLowerCase() === "rejected").length,
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Career Applications & Candidates
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review incoming job applications, download candidate resumes, and manage recruitment stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Users className="w-4 h-4" />
            {applications.length} Total Applicants
          </span>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            statusFilter === "all"
              ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 ring-2 ring-blue-500/20"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300"
          }`}
        >
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{statusCounts.all}</p>
        </div>

        <div
          onClick={() => setStatusFilter("new")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            statusFilter === "new"
              ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 ring-2 ring-blue-500/20"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">New</p>
            <AlertCircle className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{statusCounts.new}</p>
        </div>

        <div
          onClick={() => setStatusFilter("reviewed")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            statusFilter === "reviewed"
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/20"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Reviewed</p>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">{statusCounts.reviewed}</p>
        </div>

        <div
          onClick={() => setStatusFilter("interviewed")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            statusFilter === "interviewed"
              ? "bg-purple-50 dark:bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/20"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Interviewed</p>
            <CheckCircle className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">{statusCounts.interviewed}</p>
        </div>

        <div
          onClick={() => setStatusFilter("rejected")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            statusFilter === "rejected"
              ? "bg-red-50 dark:bg-red-950/40 border-red-400 ring-2 ring-red-500/20"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">Rejected</p>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">{statusCounts.rejected}</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, email, role..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses ({applications.length})</option>
            <option value="new">New ({statusCounts.new})</option>
            <option value="reviewed">Reviewed ({statusCounts.reviewed})</option>
            <option value="interviewed">Interviewed ({statusCounts.interviewed})</option>
            <option value="rejected">Rejected ({statusCounts.rejected})</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-zinc-800">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
            No Applications Found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            No candidate submissions matched your filter criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Applied Role</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {filteredForms.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm uppercase">
                          {(app.name || "A").substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {app.name}
                          </p>
                          <p className="text-xs text-gray-400">ID #{app.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600 dark:text-zinc-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {app.email}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-zinc-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {app.phone || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-zinc-200">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        {app.job_title || app.position || "General Candidate"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">
                      {app.experience ? `${app.experience} Yrs` : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={app.status || "new"}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none ${getStatusColor(
                          app.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-zinc-400">
                      {app.created_at
                        ? new Date(app.created_at).toLocaleDateString()
                        : "Recent"}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedForm(app)}
                          title="View Details"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {app.resume && (
                          <a
                            href={app.resume.startsWith("http") ? app.resume : `/${app.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            download
                            title="Download Resume"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => setDeleteId(app.id)}
                          title="Delete Application"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
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
        </div>
      )}

      {/* Candidate Details Modal */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-lg uppercase">
                  {(selectedForm.name || "A").substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedForm.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Applied on{" "}
                    {selectedForm.created_at
                      ? new Date(selectedForm.created_at).toLocaleString()
                      : "Recent"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedForm(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 mt-0.5">
                    {selectedForm.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 mt-0.5">
                    {selectedForm.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Applied Position</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {selectedForm.job_title || selectedForm.position || "General Candidate"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Total Experience</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 mt-0.5">
                    {selectedForm.experience ? `${selectedForm.experience} Years` : "N/A"}
                  </p>
                </div>
              </div>

              {selectedForm.current_ctc && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Current CTC</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 mt-0.5">
                      {selectedForm.current_ctc}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Expected CTC</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 mt-0.5">
                      {selectedForm.expected_ctc || "Negotiable"}
                    </p>
                  </div>
                </div>
              )}

              {selectedForm.cover_letter && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Cover Letter / Notes
                  </p>
                  <div className="p-3.5 bg-gray-50 dark:bg-zinc-800/50 rounded-lg text-sm text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed border border-gray-100 dark:border-zinc-800">
                    {selectedForm.cover_letter}
                  </div>
                </div>
              )}

              {selectedForm.portfolio && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Portfolio / GitHub Link
                  </p>
                  <a
                    href={selectedForm.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {selectedForm.portfolio}
                  </a>
                </div>
              )}

              {selectedForm.resume && (
                <div className="pt-2">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
                    Resume Document
                  </p>
                  <a
                    href={selectedForm.resume.startsWith("http") ? selectedForm.resume : `/${selectedForm.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium text-sm border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Download / View Resume
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Status:</span>
                  <select
                    value={selectedForm.status || "new"}
                    onChange={(e) => handleUpdateStatus(selectedForm.id, e.target.value)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedForm(null)}
                  className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-200 dark:border-zinc-800 text-center">
            <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Candidate Application?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              This action cannot be undone. All resume links and data will be removed.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
