'use client';

import { useState, useEffect } from 'react';
import {
  Target,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Save,
  Compass,
  FileText,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function VisionMissionPage() {
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    heading: '',
    para: '',
    vision_heading: '',
    vision_description: '',
    mission_heading: '',
    mission_description: '',
  });

  const fetchVisions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/vision-mission');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setVisions(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisions();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      para: '',
      vision_heading: '',
      vision_description: '',
      mission_heading: '',
      mission_description: '',
    });
    setEditingId(null);
  };

  const handleEdit = (vision) => {
    setEditingId(vision.id);
    setFormData({
      heading: vision.heading || '',
      para: vision.para || '',
      vision_heading: vision.vision_heading || '',
      vision_description: vision.vision_description || '',
      mission_heading: vision.mission_heading || '',
      mission_description: vision.mission_description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const url = editingId ? `/api/admin/vision-mission/${editingId}` : '/api/admin/vision-mission';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingId ? 'Vision & Mission updated successfully!' : 'Vision & Mission added successfully!');
        resetForm();
        fetchVisions();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving vision & mission');
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/vision-mission/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Record deleted successfully');
        fetchVisions();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting record');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section matching Inertia VisionMissionPage.jsx */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Compass className="h-10 w-10 text-indigo-600" />
            <span>Vision & Mission Management</span>
          </h1>
          <p className="text-lg text-gray-600">
            Define and manage your organization&apos;s vision and mission statements
          </p>
        </div>

        {/* Flash Message */}
        {alertMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center justify-between max-w-4xl mx-auto shadow-sm">
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
            <div className="shadow-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  {editingId ? (
                    <>
                      <Edit3 className="h-5 w-5" />
                      <span>Edit Vision/Mission</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add Vision/Mission</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Main Section Heading *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.heading}
                      onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                      placeholder="e.g. Empowering Growth"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Main Paragraph *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.para}
                      onChange={(e) => setFormData({ ...formData, para: e.target.value })}
                      placeholder="Introduction paragraph..."
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-3">
                    <h3 className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>Our Vision</span>
                    </h3>
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.vision_heading}
                        onChange={(e) => setFormData({ ...formData, vision_heading: e.target.value })}
                        placeholder="Vision Heading (e.g. Our Vision)"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 mb-2"
                      />
                      <textarea
                        rows={2}
                        required
                        value={formData.vision_description}
                        onChange={(e) => setFormData({ ...formData, vision_description: e.target.value })}
                        placeholder="Vision statement details..."
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-3">
                    <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-indigo-600" />
                      <span>Our Mission</span>
                    </h3>
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.mission_heading}
                        onChange={(e) => setFormData({ ...formData, mission_heading: e.target.value })}
                        placeholder="Mission Heading (e.g. Our Mission)"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 mb-2"
                      />
                      <textarea
                        rows={2}
                        required
                        value={formData.mission_description}
                        onChange={(e) => setFormData({ ...formData, mission_description: e.target.value })}
                        placeholder="Mission statement details..."
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {processing ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      <span>{editingId ? 'Update Section' : 'Save Section'}</span>
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
          </div>

          {/* Visions List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Statements ({visions?.length || 0})
              </h2>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
              {loading ? (
                <div className="bg-white/80 rounded-2xl p-12 text-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                </div>
              ) : visions?.length === 0 ? (
                <div className="bg-white/80 rounded-2xl p-8 text-center shadow-md">
                  <p className="text-gray-600 text-base font-medium">No statements added yet</p>
                </div>
              ) : (
                visions.map((vision) => (
                  <div
                    key={vision.id}
                    className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{vision.heading}</h3>
                        <p className="text-xs text-gray-500 mt-1">{vision.para}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleEdit(vision)}
                          className="p-1.5 border border-gray-200 hover:bg-blue-50 rounded-lg text-gray-600 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(vision.id)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100">
                        <h4 className="text-xs font-bold text-blue-900 mb-1">{vision.vision_heading}</h4>
                        <p className="text-xs text-gray-600">{vision.vision_description}</p>
                      </div>
                      <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100">
                        <h4 className="text-xs font-bold text-indigo-900 mb-1">{vision.mission_heading}</h4>
                        <p className="text-xs text-gray-600">{vision.mission_description}</p>
                      </div>
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
                  Are you sure you want to delete this Vision &amp; Mission record?
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
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
