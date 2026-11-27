'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Calendar,
  Briefcase,
  Upload,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function OurTeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    joining_date: '',
  });

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/our-team');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setTeamMembers(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 4000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      joining_date: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditingMember(null);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      designation: member.designation || '',
      joining_date: member.joining_date ? member.joining_date.split('T')[0] : '',
    });
    setImageFile(null);
    const cleanImg = member.img
      ? (member.img.startsWith('http') ? member.img : `/${member.img.replace(/^\/+/, '')}`)
      : '';
    setImagePreview(cleanImg);
    document.getElementById('teamForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      alert('Please fill in Name and Designation');
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('designation', formData.designation);
      body.append('joining_date', formData.joining_date || '');

      if (imageFile) {
        body.append('img', imageFile);
      }

      const url = editingMember
        ? `/api/admin/our-team/${editingMember.id}`
        : '/api/admin/our-team';

      const res = await fetch(url, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingMember ? 'Team member updated successfully!' : 'Team member added successfully!');
        resetForm();
        fetchTeam();
      } else {
        showAlert(json.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showAlert('Error saving team member', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/our-team/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Team member deleted successfully');
        fetchTeam();
      } else {
        showAlert(json.message || 'Failed to delete member', 'error');
      }
    } catch (err) {
      showAlert('Error deleting member', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl space-y-8">
      {/* Header matching OurTeam.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <span>Our Team Management</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your leadership, specialists, and team member profiles
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
          {teamMembers?.length || 0} Team Members
        </div>
      </div>

      {alertMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between border ${
            alertType === 'error'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-green-200 bg-green-50 text-green-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">{alertMessage}</span>
          </div>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form Card */}
      <div id="teamForm" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
          <Plus className="h-5 w-5 text-blue-600" />
          <span>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Senior SEO Strategist"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Joining Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.joining_date}
                  onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Photo {editingMember && '(leave empty to keep current)'}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-lg p-1.5"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shrink-0"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.triedRemote && editingMember?.img && !editingMember.img.startsWith('http')) {
                        e.currentTarget.dataset.triedRemote = 'true';
                        e.currentTarget.src = `https://dashboard.digitalnawab.com/${editingMember.img.replace(/^\/+/, '')}`;
                      } else if (!e.currentTarget.dataset.triedFallback) {
                        e.currentTarget.dataset.triedFallback = 'true';
                        e.currentTarget.src = '/assets/logo.png';
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
              <span>{editingMember ? 'Update Member' : 'Add Member'}</span>
            </button>
            {editingMember && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 text-sm">
            No team members added yet.
          </div>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center justify-between"
            >
              <div className="w-full flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 mb-4 shadow-xs">
                  {member.img ? (
                    <img
                      src={member.img.startsWith('http') ? member.img : `/${member.img.replace(/^\/+/, '')}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.triedRemote && member.img && !member.img.startsWith('http')) {
                          e.currentTarget.dataset.triedRemote = 'true';
                          e.currentTarget.src = `https://dashboard.digitalnawab.com/${member.img.replace(/^\/+/, '')}`;
                        } else if (!e.currentTarget.dataset.triedFallback) {
                          e.currentTarget.dataset.triedFallback = 'true';
                          e.currentTarget.src = '/assets/logo.png';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1">{member.name}</h3>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-3">
                  {member.designation}
                </span>

                {member.joining_date && (
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Joined:{' '}
                      {new Date(member.joining_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                )}
              </div>

              <div className="w-full flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(member.id)}
                  className="py-1.5 px-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
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
                <h3 className="text-lg font-bold text-gray-900">Delete Team Member?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to remove this team member?
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
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
