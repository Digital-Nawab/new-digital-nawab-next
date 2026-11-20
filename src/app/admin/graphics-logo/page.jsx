'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Upload,
  X,
} from 'lucide-react';

export default function GraphicsLogoPage() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fileInputRef = useRef(null);

  const fetchLogos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/graphics-logo');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setLogos(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const resetForm = () => {
    setName('');
    setUrl('');
    setImgFile(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (logo) => {
    setEditingId(logo.id);
    setName(logo.name || '');
    setUrl(logo.url || '');
    setImgFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a logo name');
      return;
    }
    if (!editingId && !imgFile) {
      alert('Please select an image file');
      return;
    }

    setProcessing(true);
    try {
      const body = new FormData();
      body.append('name', name);
      body.append('url', url || '');
      if (imgFile) body.append('img', imgFile);

      const endpoint = editingId
        ? `/api/admin/graphics-logo/${editingId}`
        : '/api/admin/graphics-logo';

      const res = await fetch(endpoint, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingId ? 'Logo updated successfully!' : 'Logo added successfully!');
        resetForm();
        fetchLogos();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving logo');
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/graphics-logo/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Logo deleted successfully');
        fetchLogos();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting logo');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
        Graphic Logo Gallery
      </h1>

      {alertMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center justify-between max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <span className="font-medium text-sm">{alertMessage}</span>
          </div>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 pb-2 border-b border-gray-100">
          {editingId ? 'Edit Graphic Logo' : 'Add New Graphic Logo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter logo name"
              className="w-full px-4 py-2.5 border border-indigo-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Logo Image {editingId && '(leave blank to keep current)'}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50"
            >
              <Upload className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to select or drag and drop an image here
              </p>
              <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, WEBP, SVG</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImgFile(e.target.files[0] || null)}
                className="hidden"
              />
              {imgFile && (
                <p className="mt-3 text-xs font-semibold text-indigo-600">
                  Selected: {imgFile.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">URL (optional)</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 border border-indigo-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {processing && <Loader2 className="w-4 h-4 animate-spin text-white" />}
              <span>{editingId ? 'Update Logo' : 'Create Logo'}</span>
            </button>
            {editingId && (
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

      {/* Grid of Logos */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Existing Logos ({logos.length})</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
            </div>
          ) : logos.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
              No logos added yet.
            </div>
          ) : (
            logos.map((logo) => (
              <div
                key={logo.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3 mb-3">
                    {logo.img ? (
                      <img
                        src={`/${logo.img.replace(/^\/+/, '')}`}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{logo.name}</h3>
                  {logo.url && (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 hover:underline flex items-center gap-1 truncate mb-3"
                    >
                      <span className="truncate">{logo.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(logo)}
                    className="flex-1 py-1.5 border border-gray-200 hover:bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(logo.id)}
                    className="py-1.5 px-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
                  Are you sure you want to delete this logo?
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
                Delete Logo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
