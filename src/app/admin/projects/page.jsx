'use client';

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Globe, Calendar, Code, ImageIcon, Upload, Play, ExternalLink } from "lucide-react";

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
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {value.map((item, index) => (
          item?.trim() && (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              <span className="text-gray-800 flex-1">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 transition-colors font-medium text-sm"
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

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  const d = new Date(dateString);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
};

const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start) || isNaN(end) || end < start) return "";

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const days = diffDays % 30;

  let duration = "";
  if (months > 0) duration += `${months} month${months > 1 ? "s" : ""}`;
  if (days > 0) duration += `${months > 0 ? ", " : ""}${days} day${days > 1 ? "s" : ""}`;
  return duration || "0 days";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const initialForm = {
    type: "",
    title: "",
    image: null,
    video: null,
    description: "",
    starting_date: "",
    ending_date: "",
    tech_used: [],
    url: "",
    duration: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 4000);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      const json = await res.json();
      if (json.data) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData(initialForm);
    setEditingProject(null);
    setImagePreview("");
    setVideoPreview("");
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("projectForm")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);

    let parsedTech = [];
    if (Array.isArray(project.tech_used)) {
      parsedTech = project.tech_used;
    } else if (typeof project.tech_used === "string") {
      try {
        parsedTech = JSON.parse(project.tech_used);
      } catch (e) {
        parsedTech = project.tech_used.split(",").map((s) => s.trim());
      }
    }

    setFormData({
      type: project.type || "",
      title: project.title || "",
      image: null,
      video: null,
      description: project.description || "",
      starting_date: formatDateForInput(project.starting_date),
      ending_date: formatDateForInput(project.ending_date),
      tech_used: parsedTech,
      url: project.url || "",
      duration: project.duration || "",
    });

    const resolveUrl = (src) => {
      if (!src) return "";
      if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
      return `/${src}`;
    };

    setImagePreview(resolveUrl(project.image));
    setVideoPreview(resolveUrl(project.video));

    setTimeout(() => {
      document.getElementById("projectForm")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setVideoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (formData.starting_date && formData.ending_date) {
      const dur = calculateDuration(formData.starting_date, formData.ending_date);
      setFormData((prev) => ({ ...prev, duration: dur }));
    }
  }, [formData.starting_date, formData.ending_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", formData.type);
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("starting_date", formData.starting_date || "");
      formPayload.append("ending_date", formData.ending_date || "");
      formPayload.append("duration", formData.duration || "");
      formPayload.append("url", formData.url || "");
      formPayload.append("tech_used", JSON.stringify(formData.tech_used));

      if (formData.image instanceof File) {
        formPayload.append("image", formData.image);
      }
      if (formData.video instanceof File) {
        formPayload.append("video", formData.video);
      }

      let url = "/api/admin/projects";
      let method = "POST";
      if (editingProject) {
        url = `/api/admin/projects/${editingProject.id}`;
      }

      const res = await fetch(url, {
        method,
        body: formPayload,
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save project");
      }

      showAlert(editingProject ? "Project updated successfully!" : "Project added successfully!");
      resetForm();
      fetchProjects();
    } catch (err) {
      showAlert(err.message || "Failed to save project. Please check the form.", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showAlert("Project deleted successfully!");
        fetchProjects();
      } else {
        showAlert("Failed to delete project.", "error");
      }
    } catch (err) {
      showAlert("Failed to delete project.", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const resolveMedia = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Projects</h1>
            <p className="text-gray-600">Manage and showcase your company's projects</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Add Project
            </button>
          )}
        </div>

        {projects && projects.length > 0 && (
          <div className="my-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{projects.filter((p) => p.url).length}</div>
                <div className="text-sm text-gray-600">Live Projects</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{projects.filter((p) => p.video).length}</div>
                <div className="text-sm text-gray-600">With Videos</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {[...new Set(projects.map((p) => p.type))].length}
                </div>
                <div className="text-sm text-gray-600">Project Types</div>
              </div>
            </div>
          </div>
        )}

        {alertMessage && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              alertType === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-green-50 border-green-200 text-green-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{alertMessage}</span>
              <button onClick={() => setAlertMessage("")} className="text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8" id="projectForm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="website">Website</option>
                    <option value="creatives">Creative</option>
                    <option value="reel">Reel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Date *</label>
                  <input
                    type="date"
                    value={formData.starting_date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, starting_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ending Date *</label>
                  <input
                    type="date"
                    value={formData.ending_date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ending_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <SingleInputArray
                    value={formData.tech_used}
                    onChange={(val) => setFormData((prev) => ({ ...prev, tech_used: val }))}
                    label="Technologies Used *"
                    placeholder="Type a technology and press Enter or Add"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Describe the project..."
                    rows="4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Image {editingProject ? "(optional — leave empty to keep existing)" : "(Optional)"}
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload image</span>
                          </p>
                          <p className="text-xs text-gray-500">JPG, JPEG, PNG, WEBP (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Video {editingProject ? "(optional — leave empty to keep existing)" : "(Optional)"}
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Play className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload video</span>
                          </p>
                          <p className="text-xs text-gray-500">WEBM (MAX. 5MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="video/webm,video/*" onChange={handleVideoChange} />
                      </label>
                    </div>
                    {videoPreview && (
                      <div className="relative">
                        <video src={videoPreview} className="w-full h-32 object-cover rounded-lg" controls />
                        <button
                          type="button"
                          onClick={() => {
                            setVideoPreview("");
                            setFormData((prev) => ({ ...prev, video: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {processing ? "Processing..." : editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project) => {
              const techList = Array.isArray(project.tech_used)
                ? project.tech_used
                : typeof project.tech_used === "string"
                ? (() => {
                    try {
                      return JSON.parse(project.tech_used);
                    } catch (e) {
                      return project.tech_used.split(",").map((s) => s.trim());
                    }
                  })()
                : [];

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {project.image && (
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={resolveMedia(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.video && (
                        <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                          <Play className="h-3 w-3" />
                          Video
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium mb-2 capitalize">
                          {project.type}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <div className="space-y-2 mb-4">
                      {project.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Duration: {project.duration}</span>
                        </div>
                      )}
                      {techList && techList.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Code className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>Tech: {Array.isArray(techList) ? techList.join(", ") : techList}</span>
                        </div>
                      )}
                      {project.url && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          >
                            Visit Project <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    {project.video && !project.image && (
                      <div className="mt-4">
                        <video
                          src={resolveMedia(project.video)}
                          className="w-full h-32 object-cover rounded-lg"
                          controls
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <span>Created {formatDate(project.created_at)}</span>
                      {project.updated_at && project.updated_at !== project.created_at && (
                        <span>Updated {formatDate(project.updated_at)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first project.</p>
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Your First Project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
