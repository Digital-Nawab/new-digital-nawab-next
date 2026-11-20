'use client';

import { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  CheckCircle2,
  XCircle,
  Save,
  Upload,
  Monitor,
  Smartphone,
  Play,
  Film,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function HeroVideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoType, setVideoType] = useState('desktop');
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hero');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setVideos(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoType('desktop');
    setEditingId(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (video) => {
    setEditingId(video.id);
    setVideoType(video.video_type || 'desktop');
    setVideoFile(null);
    setVideoPreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoType) {
      alert('Please select a video type');
      return;
    }
    if (!editingId && !videoFile) {
      alert('Please select a video file');
      return;
    }

    setProcessing(true);
    try {
      const body = new FormData();
      body.append('video_type', videoType);
      if (videoFile) {
        body.append('video', videoFile);
      }

      const url = editingId ? `/api/admin/hero/${editingId}` : '/api/admin/hero';
      const res = await fetch(url, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingId ? 'Hero video updated successfully!' : 'Hero video uploaded successfully!');
        resetForm();
        fetchVideos();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving hero video');
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/hero/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Hero video deleted successfully');
        fetchVideos();
      } else {
        alert(json.message || 'Failed to delete video');
      }
    } catch (err) {
      alert('Error deleting video');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isFormValid = (videoFile || editingId) && videoType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-100 -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section matching Inertia Hero.jsx */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Video className="h-10 w-10 text-violet-600" />
            <span>Hero Video Management</span>
          </h1>
          <p className="text-lg text-gray-600">
            Upload and manage hero videos for desktop and mobile displays
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
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  {editingId ? (
                    <>
                      <Edit3 className="h-5 w-5" />
                      <span>Edit Hero Video</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Upload Hero Video</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Video Upload */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Film className="h-4 w-4 text-violet-600" />
                      <span>Video File {editingId && '(optional — leave empty to keep existing)'}</span>
                    </label>

                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-800 hover:file:bg-violet-200 file:cursor-pointer cursor-pointer transition-all duration-200 border border-gray-200 rounded-lg p-1.5"
                      />

                      {videoPreview && (
                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white">
                              Video Selected
                            </span>
                            {videoFile && (
                              <span className="text-sm text-gray-600">
                                Size: {formatFileSize(videoFile.size)}
                              </span>
                            )}
                          </div>
                          <video
                            src={videoPreview}
                            controls
                            className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                            style={{
                              aspectRatio: videoType === 'mobile' ? '9/16' : '16/9',
                            }}
                          />
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Preview of your selected video
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-purple-600" />
                      <span>Video Type</span>
                    </label>
                    <select
                      value={videoType}
                      onChange={(e) => setVideoType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                    >
                      <option value="desktop">Desktop (16:9 - Landscape)</option>
                      <option value="mobile">Mobile (9:16 - Portrait)</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={processing || !isFormValid}
                      className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {processing ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      <span>
                        {processing
                          ? 'Processing...'
                          : editingId
                          ? 'Update Video'
                          : 'Upload Video'}
                      </span>
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
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

            {/* Video Guidelines Card */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                <span>Video Guidelines</span>
              </h3>
              <div className="space-y-3 text-sm opacity-95">
                <div className="flex items-start gap-2">
                  <Monitor className="h-4 w-4 mt-0.5 shrink-0" />
                  <div>
                    <strong>Desktop:</strong> 1920x1080 (16:9 aspect ratio)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 mt-0.5 shrink-0" />
                  <div>
                    <strong>Mobile:</strong> 1080x1920 (9:16 aspect ratio)
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20 text-xs space-y-1">
                  <p>• Supported formats: MP4, WebM, QuickTime</p>
                  <p>• Recommended max size: 50MB</p>
                  <p>• Duration: 10-30 seconds for best performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Videos List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Hero Videos ({videos?.length || 0})
              </h2>
            </div>

            <div className="space-y-5 max-h-[800px] overflow-y-auto pr-1">
              {loading ? (
                <div className="bg-white/80 rounded-2xl p-12 text-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto" />
                </div>
              ) : videos?.length === 0 ? (
                <div className="bg-white/80 rounded-2xl p-8 text-center shadow-md">
                  <div className="text-gray-400 mb-4">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">No hero videos uploaded</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Upload your first hero video using the form on the left
                  </p>
                </div>
              ) : (
                videos.map((video, index) => {
                  const videoSrc = `/${(video.video || '').replace(/^\/+/, '')}`;
                  const isMobile = video.video_type === 'mobile';

                  return (
                    <div
                      key={video.id}
                      className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {isMobile ? (
                              <Smartphone className="h-5 w-5 text-violet-600" />
                            ) : (
                              <Monitor className="h-5 w-5 text-purple-600" />
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                isMobile
                                  ? 'bg-violet-100 text-violet-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {video.video_type}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            Video #{index + 1}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(video)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 text-gray-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteId(video.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <div className="relative">
                          <video
                            key={videoSrc}
                            controls
                            className="w-full max-w-sm mx-auto rounded-xl shadow-md bg-black"
                            style={{
                              aspectRatio: isMobile ? '9/16' : '16/9',
                            }}
                            preload="metadata"
                          >
                            <source src={videoSrc} />
                            Your browser does not support the video tag.
                          </video>

                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-mono">
                              <Play className="h-3 w-3 mr-1 fill-white" />
                              {isMobile ? '9:16' : '16:9'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>
                            Uploaded:{' '}
                            {new Date(video.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded border border-gray-200 text-gray-600 font-medium">
                          {isMobile ? 'Portrait' : 'Landscape'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
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
                  Are you sure you want to delete this hero video? This action cannot be undone.
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
                Delete Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
