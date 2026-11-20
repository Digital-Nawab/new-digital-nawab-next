'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Trash2,
  Eye,
  Plus,
  X,
  Search,
  Grid,
  List,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Image as ImageIcon,
} from 'lucide-react';

export default function CreativesPage() {
  const [creatives, setCreatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [previewModalImg, setPreviewModalImg] = useState(null);

  const fileInputRef = useRef(null);

  const fetchCreatives = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/creatives');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setCreatives(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatives();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files);
    const newPreviews = [];

    newFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push({
            file,
            url: e.target.result,
            name: file.name,
            size: file.size,
          });

          if (newPreviews.length === newFiles.length) {
            setPreviews((prev) => [...prev, ...newPreviews]);
            setSelectedFiles((prev) => [...prev, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setUploading(true);
    try {
      for (const file of selectedFiles) {
        const body = new FormData();
        body.append('image', file);
        await fetch('/api/admin/creatives', {
          method: 'POST',
          body,
        });
      }

      showAlert('Creatives uploaded successfully!');
      setSelectedFiles([]);
      setPreviews([]);
      setShowUploadSection(false);
      fetchCreatives();
    } catch (err) {
      showAlert('Error uploading creatives');
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(`/api/admin/creatives/${deleteConfirm.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteConfirm(null);
        showAlert('Creative deleted successfully');
        fetchCreatives();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting creative');
    }
  };

  const filteredCreatives = creatives.filter((c) => {
    if (!searchQuery) return true;
    return (c.image || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl space-y-6">
      {/* Header matching CreativesManager.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Creatives &amp; Design Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload, preview, and organize social media creatives and advertising banners
          </p>
        </div>
        <button
          onClick={() => setShowUploadSection(!showUploadSection)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Creatives</span>
        </button>
      </div>

      {alertMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <span className="font-medium text-sm">{alertMessage}</span>
          </div>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Section */}
      {showUploadSection && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Upload New Creatives</h2>
            <button
              onClick={() => setShowUploadSection(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-300 hover:border-blue-400 bg-gray-50/50'
            }`}
          >
            <Upload className="w-10 h-10 mx-auto text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-gray-700">
              Drop creative images here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-gray-700">
                Selected Images ({previews.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {previews.map((prev, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden border border-gray-200 aspect-square group bg-gray-50"
                  >
                    <img src={prev.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles([]);
                    setPreviews([]);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{uploading ? 'Uploading...' : `Upload ${previews.length} Images`}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter / Search & View controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search creatives by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg border cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-blue-50 border-blue-300 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg border cursor-pointer ${
              viewMode === 'list'
                ? 'bg-blue-50 border-blue-300 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Creatives Gallery */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
        </div>
      ) : filteredCreatives.length === 0 ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 text-sm">
          No creatives found. Click &quot;Upload Creatives&quot; to add images.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredCreatives.map((creative) => {
            const imgSrc = `/${(creative.image || '').replace(/^\/+/, '')}`;
            return (
              <div
                key={creative.id}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewModalImg(imgSrc)}
                      className="p-2 bg-white/90 text-gray-900 rounded-full hover:bg-white transition-colors cursor-pointer"
                      title="View Full Size"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(creative)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white text-xs text-gray-500 truncate border-t border-gray-100 flex items-center justify-between">
                  <span className="truncate">{creative.image?.split('/').pop() || `Creative #${creative.id}`}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">#{creative.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-6">Preview</th>
                <th className="py-3 px-6">File Path</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCreatives.map((creative) => {
                const imgSrc = `/${(creative.image || '').replace(/^\/+/, '')}`;
                return (
                  <tr key={creative.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <img src={imgSrc} alt="" className="w-12 h-12 object-cover rounded-lg border" />
                    </td>
                    <td className="py-3 px-6 text-xs text-gray-700 font-mono truncate max-w-md">
                      {creative.image}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => setDeleteConfirm(creative)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Zoom Modal */}
      {previewModalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewModalImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={previewModalImg} alt="" className="max-w-full max-h-[85vh] rounded-xl object-contain" />
            <button
              onClick={() => setPreviewModalImg(null)}
              className="absolute -top-3 -right-3 bg-white text-gray-900 p-1.5 rounded-full shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Creative?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this creative asset? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete Creative
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
