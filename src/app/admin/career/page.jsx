'use client';

import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ExternalLink,
  Award,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Download,
} from "lucide-react";

// SingleInputArray for bullet points (responsibilities, requirements, benefits)
const SingleInputArray = ({ value = [], onChange, label, placeholder }) => {
  const [tempValue, setTempValue] = useState("");

  const handleAdd = () => {
    if (tempValue.trim() !== "") {
      onChange([...value, tempValue.trim()]);
      setTempValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {value.map((item, index) => (
          item?.trim() && (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              <span className="text-gray-800 flex-1">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 font-medium text-xs ml-3"
              >
                Remove
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const [careers, setCareers] = useState([]);
  const [careerForms, setCareerForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  // Selection & Modals
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLeadTarget, setDeleteLeadTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingCareer, setEditingCareer] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Alerts
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const initialForm = {
    desig: "",
    title: "",
    city: "",
    job_type: "full-time",
    work_mode: "onsite",
    about_role: "",
    responsibilities: [],
    requirements: [],
    benefits_perks: [],
  };

  const [formData, setFormData] = useState(initialForm);

  const showAlert = (msg, type = "success") => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
    }, 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [careersRes, appsRes] = await Promise.all([
        fetch("/api/admin/careers"),
        fetch("/api/admin/career-applications"),
      ]);
      const careersJson = await careersRes.json();
      const appsJson = await appsRes.json();

      if (careersJson.data) setCareers(careersJson.data);
      if (appsJson.data) setCareerForms(appsJson.data);
    } catch (err) {
      console.error("Failed to load careers data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const leadStats = {
    total: careerForms.length,
    new: careerForms.filter((l) => (l.status || "new") === "new").length,
    reviewed: careerForms.filter((l) => l.status === "reviewed").length,
    interviewed: careerForms.filter((l) => l.status === "interviewed").length,
    rejected: careerForms.filter((l) => l.status === "rejected").length,
  };

  const filteredLeads = careerForms.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof lead.skills === "string" && lead.skills.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || (lead.status || "new") === statusFilter;
    const matchesJob = jobFilter === "all" || String(lead.career_id) === String(jobFilter);

    return matchesSearch && matchesStatus && matchesJob;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "reviewed":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "interviewed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "new":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/career-applications/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCareerForms((prev) =>
          prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
        showAlert("Lead status updated!");
      }
    } catch (e) {
      showAlert("Failed to update status", "error");
    }
  };

  const executeDeleteLead = async () => {
    if (!deleteLeadTarget) return;
    try {
      const res = await fetch(`/api/admin/career-applications/${deleteLeadTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCareerForms((prev) => prev.filter((item) => item.id !== deleteLeadTarget.id));
        if (selectedLead?.id === deleteLeadTarget.id) setSelectedLead(null);
        showAlert("Application lead deleted successfully!");
      }
    } catch (e) {
      showAlert("Failed to delete lead", "error");
    } finally {
      setDeleteLeadTarget(null);
    }
  };

  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setActiveTab("jobs");

    const parseArr = (field) => {
      if (Array.isArray(field)) return field;
      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch (e) {
          return field.split(",").map((s) => s.trim());
        }
      }
      return [];
    };

    setFormData({
      desig: career.desig || "",
      title: career.title || "",
      city: career.city || "",
      job_type: career.job_type || "full-time",
      work_mode: career.work_mode || "onsite",
      about_role: career.about_role || "",
      responsibilities: parseArr(career.responsibilities),
      requirements: parseArr(career.requirements),
      benefits_perks: parseArr(career.benefits_perks),
    });

    setTimeout(() => {
      document.getElementById("careerForm")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingCareer(null);
  };

  const handleSubmitCareer = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        ...formData,
        responsibilities: JSON.stringify(formData.responsibilities),
        requirements: JSON.stringify(formData.requirements),
        benefits_perks: JSON.stringify(formData.benefits_perks),
      };

      let url = "/api/admin/careers";
      let method = "POST";
      if (editingCareer) {
        url = `/api/admin/careers/${editingCareer.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save job position");

      showAlert(editingCareer ? "Job opening updated!" : "New job opening created!");
      resetForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Failed to submit", "error");
    } finally {
      setProcessing(false);
    }
  };

  const executeDeleteCareer = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/careers/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showAlert("Job opening deleted!");
        fetchData();
      }
    } catch (e) {
      showAlert("Failed to delete job opening", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const parseSkills = (skillsField) => {
    if (Array.isArray(skillsField)) return skillsField;
    if (typeof skillsField === "string") {
      try {
        const parsed = JSON.parse(skillsField);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
      return skillsField.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Careers & Recruitment
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Manage job vacancies, track applicant resumes, and monitor candidate pipeline
          </p>
        </div>
      </div>

      {alertMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between ${
            alertType === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          <span className="text-sm font-medium">{alertMessage}</span>
          <button onClick={() => setAlertMessage("")} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          onClick={() => setActiveTab("leads")}
          className={`pb-3.5 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2.5 ${
            activeTab === "leads"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Career Leads / Applications</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-bold ${
              activeTab === "leads" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            {careerForms.length}
          </span>
          {leadStats.new > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500 text-white font-bold animate-pulse">
              {leadStats.new} New
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("jobs")}
          className={`pb-3.5 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2.5 ${
            activeTab === "jobs"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Postings ({careers.length})</span>
        </button>
      </div>

      {/* TAB 1: CAREER LEADS */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div
              onClick={() => setStatusFilter("all")}
              className={`cursor-pointer p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all ${
                statusFilter === "all" ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <span>Total Leads</span>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">{leadStats.total}</div>
            </div>

            <div
              onClick={() => setStatusFilter("new")}
              className={`cursor-pointer p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all ${
                statusFilter === "new" ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <span>New Leads</span>
                <AlertCircle className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-2">{leadStats.new}</div>
            </div>

            <div
              onClick={() => setStatusFilter("reviewed")}
              className={`cursor-pointer p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all ${
                statusFilter === "reviewed" ? "ring-2 ring-amber-500 border-amber-500" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-amber-600 text-xs font-semibold uppercase tracking-wider">
                <span>Reviewed</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-amber-600 mt-2">{leadStats.reviewed}</div>
            </div>

            <div
              onClick={() => setStatusFilter("interviewed")}
              className={`cursor-pointer p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all ${
                statusFilter === "interviewed" ? "ring-2 ring-purple-500 border-purple-500" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-purple-600 text-xs font-semibold uppercase tracking-wider">
                <span>Interviewed</span>
                <CheckCircle className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-2">{leadStats.interviewed}</div>
            </div>

            <div
              onClick={() => setStatusFilter("rejected")}
              className={`cursor-pointer p-4 rounded-xl border bg-white shadow-xs hover:shadow transition-all ${
                statusFilter === "rejected" ? "ring-2 ring-rose-500 border-rose-500" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-rose-600 text-xs font-semibold uppercase tracking-wider">
                <span>Rejected</span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-rose-600 mt-2">{leadStats.rejected}</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate, email, phone, skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Positions</option>
                {careers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.desig} ({c.title})
                  </option>
                ))}
              </select>

              {(searchTerm || statusFilter !== "all" || jobFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setJobFilter("all");
                  }}
                  className="px-3 py-2 text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Experience & Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Resume & Links
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const skills = parseSkills(lead.skills);
                      return (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-semibold text-gray-900 text-sm">{lead.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span>{lead.email}</span>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span>{lead.contact_number}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lead.desig || lead.job_title || `Job ID #${lead.career_id}`}
                            </div>
                            {lead.job_title && (
                              <div className="text-xs text-gray-500">{lead.job_title}</div>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded bg-slate-100 text-slate-700">
                              <Award className="w-3 h-3 text-slate-500" />
                              {lead.year_of_experience || "0"} yrs exp.
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1.5 max-w-[200px]">
                              {skills.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 text-[11px] bg-blue-50 text-blue-700 rounded border border-blue-100"
                                >
                                  {skill}
                                </span>
                              ))}
                              {skills.length > 3 && (
                                <span className="px-1.5 py-0.5 text-[10px] text-gray-500">
                                  +{skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="space-y-1.5">
                              {lead.resume ? (
                                <a
                                  href={`/${lead.resume}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Resume
                                  <Download className="w-3 h-3 ml-0.5" />
                                </a>
                              ) : (
                                <span className="text-xs text-gray-400 italic">No Resume</span>
                              )}

                              {lead.project_link && (
                                <div>
                                  <a
                                    href={lead.project_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline truncate max-w-[150px]"
                                    title={lead.project_link}
                                  >
                                    <Globe className="w-3 h-3" />
                                    Portfolio
                                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <select
                              value={lead.status || "new"}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusStyle(
                                lead.status
                              )}`}
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="interviewed">Interviewed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-600" />
                                View
                              </button>
                              <button
                                onClick={() => setDeleteLeadTarget(lead)}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: JOB OPENINGS & FORM */}
      {activeTab === "jobs" && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Current Job Postings</h3>
                <p className="text-gray-500 text-xs mt-0.5">Active job vacancies listed on your website</p>
              </div>
              <a
                href="#careerForm"
                onClick={() => resetForm()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                New Position
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location & Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      About Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {careers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                        No careers found. Fill the form below to create your first job posting.
                      </td>
                    </tr>
                  ) : (
                    careers.map((career) => (
                      <tr key={career.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{career.desig}</div>
                          <div className="text-xs text-gray-500">{career.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{career.city}</div>
                          <div className="text-xs text-gray-500 capitalize">
                            {career.job_type} • {career.work_mode}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-xs text-gray-600 line-clamp-2">{career.about_role}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                          {new Date(career.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditCareer(career)}
                              className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(career)}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form */}
          <div id="careerForm" className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              {editingCareer ? `Edit Job: ${editingCareer.desig}` : "Post a New Job Opening"}
            </h3>

            <form onSubmit={handleSubmitCareer} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    value={formData.desig}
                    onChange={(e) => setFormData((prev) => ({ ...prev, desig: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Internal Job Title / Department *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Technology & Engineering"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City / Location *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Lucknow, India"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                    <select
                      value={formData.job_type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, job_type: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Work Mode</label>
                    <select
                      value={formData.work_mode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, work_mode: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="onsite">Onsite</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">About Role *</label>
                <textarea
                  rows={3}
                  value={formData.about_role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, about_role: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description about the role..."
                  required
                />
              </div>

              <div className="space-y-5">
                <SingleInputArray
                  value={formData.responsibilities}
                  onChange={(val) => setFormData((prev) => ({ ...prev, responsibilities: val }))}
                  label="Key Responsibilities *"
                  placeholder="Add a key responsibility and click Add"
                />
                <SingleInputArray
                  value={formData.requirements}
                  onChange={(val) => setFormData((prev) => ({ ...prev, requirements: val }))}
                  label="Requirements & Qualifications *"
                  placeholder="Add a skill or experience requirement and click Add"
                />
                <SingleInputArray
                  value={formData.benefits_perks}
                  onChange={(val) => setFormData((prev) => ({ ...prev, benefits_perks: val }))}
                  label="Benefits & Perks *"
                  placeholder="Add an employee benefit or perk and click Add"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  {editingCareer ? "Cancel" : "Reset"}
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-xs disabled:opacity-50"
                >
                  {processing ? "Saving..." : editingCareer ? "Update Job Opening" : "Create Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW LEAD DETAILS */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-white">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{selectedLead.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusStyle(
                      selectedLead.status
                    )}`}
                  >
                    {(selectedLead.status || "new").toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Applied for: <span className="font-semibold text-gray-800">{selectedLead.desig || selectedLead.job_title || `Job ID #${selectedLead.career_id}`}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Email Address</span>
                  <div className="flex items-center gap-1.5 font-medium text-gray-900 mt-0.5">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Contact Number</span>
                  <div className="flex items-center gap-1.5 font-medium text-gray-900 mt-0.5">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    <a href={`tel:${selectedLead.contact_number}`} className="hover:underline">{selectedLead.contact_number}</a>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Experience</span>
                  <div className="flex items-center gap-1.5 font-medium text-gray-900 mt-0.5">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>{selectedLead.year_of_experience || "0"} Years</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Location</span>
                  <div className="flex items-center gap-1.5 font-medium text-gray-900 mt-0.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{selectedLead.address || "Not specified"}</span>
                  </div>
                </div>
              </div>

              {selectedLead.skills && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {parseSkills(selectedLead.skills).map((s, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cover Message</h4>
                  <p className="p-4 bg-gray-50 rounded-xl text-gray-700 text-xs leading-relaxed border border-gray-100 whitespace-pre-line">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {selectedLead.resume && (
                  <a
                    href={`/${selectedLead.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                )}
                {selectedLead.project_link && (
                  <a
                    href={selectedLead.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    View Live Portfolio
                  </a>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-2xl">
              <button
                onClick={() => setDeleteLeadTarget(selectedLead)}
                className="px-3 py-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Application
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE LEAD */}
      {deleteLeadTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-rose-100 rounded-full text-rose-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Application Lead?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to permanently delete the application for <strong>{deleteLeadTarget.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteLeadTarget(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteLead}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE JOB OPENING */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-100 rounded-full text-red-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Job Opening?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Are you sure you want to delete this job position?
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-xs mb-4 border border-gray-100 font-medium">
              {deleteTarget.desig} — {deleteTarget.title}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteCareer}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700"
              >
                Delete Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
