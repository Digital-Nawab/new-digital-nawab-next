'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  CheckCircle2,
  Save,
  Upload,
  Image as ImageIcon,
  Monitor,
  Code,
  Cpu,
  Database,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function ToolsPage() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchTechnologies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/technologies');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setTechnologies(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const resetForm = () => {
    setHeading('');
    setImgFile(null);
    setImagePreview(null);
    setEditingId(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (tool) => {
    setEditingId(tool.id);
    setHeading(tool.heading || '');
    setImgFile(null);
    setImagePreview(tool.img ? `/${tool.img.replace(/^\/+/, '')}` : null);

    setTimeout(() => {
      document.getElementById('techForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading.trim()) {
      alert('Please enter a technology name');
      return;
    }
    if (!editingId && !imgFile) {
      alert('Please select an icon / image');
      return;
    }

    setProcessing(true);
    try {
      const body = new FormData();
      body.append('heading', heading);
      if (imgFile) {
        body.append('img', imgFile);
      }

      const url = editingId
        ? `/api/admin/technologies/${editingId}`
        : '/api/admin/technologies';

      const res = await fetch(url, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingId ? 'Technology updated successfully!' : 'Technology added successfully!');
        resetForm();
        fetchTechnologies();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving technology');
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/technologies/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Technology deleted successfully');
        fetchTechnologies();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting technology');
    }
  };

  const getTechIcon = (techHeading) => {
    const lower = (techHeading || '').toLowerCase();
    if (lower.includes('database') || lower.includes('sql') || lower.includes('mongo')) {
      return <Database className="h-4 w-4" />;
    } else if (lower.includes('react') || lower.includes('vue') || lower.includes('angular') || lower.includes('js')) {
      return <Code className="h-4 w-4" />;
    } else if (lower.includes('server') || lower.includes('node') || lower.includes('api')) {
      return <Cpu className="h-4 w-4" />;
    } else {
      return <Monitor className="h-4 w-4" />;
    }
  };

  const isFormValid = (imgFile || editingId) && heading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section matching Inertia ToolsPage.jsx */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Settings className="h-10 w-10 text-cyan-600" />
            <span>Technologies & Tools</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your technology stack and development tools displayed on the homepage
          </p>
        </div>

        {/* Alert message */}
        {alertMessage && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center justify-between max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-sm">{alertMessage}</span>
            </div>
            <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <div
              id="techForm"
              className="shadow-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  {editingId ? (
                    <>
                      <Edit3 className="h-5 w-5" />
                      <span>Edit Technology</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add Technology</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Technology Heading */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Code className="h-4 w-4 text-cyan-600" />
                      <span>Technology Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      placeholder="e.g. Next.js, React, Node.js"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Icon Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Upload className="h-4 w-4 text-blue-600" />
                      <span>Icon / Image {editingId && '(optional — leave empty to keep current)'}</span>
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-100 file:text-cyan-800 hover:file:bg-cyan-200 border border-gray-200 rounded-lg p-1.5"
                    />

                    {imagePreview && (
                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center gap-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-contain bg-white rounded-lg p-2 border"
                        />
                        <span className="text-xs text-gray-500">Image selected</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={processing || !isFormValid}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {processing ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      <span>{editingId ? 'Update Technology' : 'Add Technology'}</span>
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span>Showcase Guidelines</span>
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Use square SVG or transparent PNG logos (100x100px recommended). These logos are displayed on the home page interactive tools carousel.
              </p>
            </div>
          </div>

          {/* Technologies List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Technologies ({technologies?.length || 0})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-1">
              {loading ? (
                <div className="col-span-full bg-white/80 rounded-2xl p-12 text-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mx-auto" />
                </div>
              ) : technologies?.length === 0 ? (
                <div className="col-span-full bg-white/80 rounded-2xl p-8 text-center shadow-md">
                  <p className="text-gray-600 text-base font-medium">No technologies added yet</p>
                </div>
              ) : (
                technologies.map((tool) => (
                  <div
                    key={tool.id}
                    className="shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-cyan-700 font-semibold text-sm">
                          {getTechIcon(tool.heading)}
                          <span className="truncate max-w-[120px]">{tool.heading}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEdit(tool)}
                            className="p-1.5 border border-gray-200 hover:bg-cyan-50 rounded-lg text-gray-600 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(tool.id)}
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="w-full h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3 mb-2">
                        {tool.img ? (
                          <img
                            src={`/${tool.img.replace(/^\/+/, '')}`}
                            alt={tool.heading}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span>ID #{tool.id}</span>
                      <span>Active</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this technology?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete Technology
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
