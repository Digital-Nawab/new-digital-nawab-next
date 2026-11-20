'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  X,
  Tag,
  Upload,
  Globe,
  Hash,
  FileText,
  Link as LinkIcon,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keyword: '',
    page_url: '',
  });

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tags');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setTags(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
    }, 4000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      keyword: '',
      page_url: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditingTag(null);
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
    if (!formData.title || !formData.page_url) {
      showAlert('Please fill in Title and Page URL', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('title', formData.title);
      body.append('page_url', formData.page_url);
      body.append('keyword', formData.keyword || '');
      body.append('description', formData.description || '');

      if (imageFile) {
        body.append('image', imageFile);
      }

      const endpoint = editingTag
        ? `/api/admin/tags/${editingTag.id}`
        : '/api/admin/tags';
      const method = editingTag ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        body,
      });

      const resData = await res.json();
      if (!res.ok || !resData.status) {
        showAlert(resData.message || 'Operation failed', 'error');
        setSubmitting(false);
        return;
      }

      resetForm();
      showAlert(editingTag ? 'Tag updated successfully!' : 'Tag added successfully!');
      fetchTags();
    } catch (err) {
      showAlert('Failed to save tag', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    try {
      const res = await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.status) {
        showAlert('Tag deleted successfully!');
        fetchTags();
      } else {
        showAlert('Failed to delete tag.', 'error');
      }
    } catch (e) {
      showAlert('Failed to delete tag.', 'error');
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Alert Messages */}
        {alertMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              alertType === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-green-50 border-green-200 text-green-800'
            }`}
          >
            <span className="text-sm font-medium">{alertMessage}</span>
            <button
              onClick={() => setAlertMessage('')}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Add/Edit Form matching exact Inertia TagManagement */}
        <div id="tagForm" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            <span>{editingTag ? 'Edit Tag' : 'Add New Tag'}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter tag title"
                />
              </div>

              {/* Page URL Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.page_url}
                    onChange={(e) => setFormData({ ...formData, page_url: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/page or /service/name"
                  />
                </div>
              </div>

              {/* Keywords Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.keyword}
                    onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag Image
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-xs cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700">
                      <Upload className="h-4 w-4 text-gray-400 mr-2" />
                      <span>Choose Image</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-14 w-14 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer shadow-xs"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPEG, JPG, PNG, WebP. Images will be optimized.
                  </p>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Provide meta description for search engines and social cards..."
                  maxLength={500}
                />
              </div>
              <div className="flex justify-end items-center mt-1">
                <p className="text-xs text-gray-500">
                  {formData.description?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
              {editingTag && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>{editingTag ? 'Update Tag' : 'Add Tag'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tags List Table matching Inertia */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tags ({tags.length})</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : tags.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tags</h3>
              <p className="mt-1 text-xs text-gray-500">Get started by adding your first tag.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tag
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Page URL
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Keywords
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm">
                  {tags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 h-11 w-11">
                            {tag.image ? (
                              <img
                                className="h-11 w-11 rounded-lg object-cover border border-gray-100"
                                src={tag.image.startsWith('http') ? tag.image : `/${tag.image.replace(/^\/+/, '')}`}
                                alt={tag.title}
                              />
                            ) : (
                              <div className="h-11 w-11 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4 font-medium text-gray-900">{tag.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-blue-600 hover:text-blue-800">
                          <a
                            href={tag.page_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5"
                          >
                            <Globe className="h-4 w-4 shrink-0" />
                            <span className="truncate max-w-xs">{truncateText(tag.page_url, 35)}</span>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {tag.keyword ? (
                          <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                            {truncateText(tag.keyword, 25)}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">No keywords</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 text-xs max-w-xs">
                          {tag.description ? truncateText(tag.description, 60) : (
                            <span className="text-gray-400">No description</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Tag"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
