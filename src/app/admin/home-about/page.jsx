'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  X,
  FileText,
  Link as LinkIcon,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function HomeAboutPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    tag: '',
    heading: '',
    sub_heading: '',
    content: '',
    button_text: '',
    button_url: '',
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/home-about');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setItems(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
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
      tag: '',
      heading: '',
      sub_heading: '',
      content: '',
      button_text: '',
      button_url: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowForm(false);
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

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    setFormData({
      tag: item.tag || '',
      heading: item.heading || '',
      sub_heading: item.sub_heading || '',
      content: item.content || '',
      button_text: item.button_text || '',
      button_url: item.button_url || '',
    });
    setImageFile(null);
    setImagePreview(item.image ? `/${item.image.replace(/^\/+/, '')}` : null);

    setTimeout(() => {
      document.getElementById('homeAboutForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCreate = () => {
    resetForm();
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('homeAboutForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('tag', formData.tag);
      body.append('heading', formData.heading);
      body.append('sub_heading', formData.sub_heading);
      body.append('content', formData.content);
      body.append('button_text', formData.button_text);
      body.append('button_url', formData.button_url);

      if (imageFile) {
        body.append('image', imageFile);
      }

      const url = editingItem
        ? `/api/admin/home-about/${editingItem.id}`
        : '/api/admin/home-about';

      const res = await fetch(url, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingItem ? 'Home About updated successfully!' : 'Home About created successfully!');
        resetForm();
        fetchItems();
      } else {
        showAlert(json.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showAlert('An error occurred while saving', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/home-about/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('Home About deleted successfully');
        fetchItems();
      } else {
        showAlert(json.message || 'Failed to delete item', 'error');
      }
    } catch (err) {
      showAlert('Error deleting item', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl space-y-6">
      {/* Header matching Inertia About.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home About Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your home about sections with images, badges, and marketing copy
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between border ${
            alertType === 'error'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-green-200 bg-green-50 text-green-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{alertMessage}</span>
          </div>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <div id="homeAboutForm" className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Home About' : 'Create New Home About'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {editingItem ? 'Update the home about information' : 'Add a new home about section with image'}
              </p>
            </div>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tag *</label>
                <input
                  type="text"
                  required
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Enter tag (e.g. About Our Agency)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Button Text *</label>
                <input
                  type="text"
                  required
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  placeholder="e.g. Explore More"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Heading *</label>
                <input
                  type="text"
                  required
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g. Driving Real Growth For Modern Businesses"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sub Heading *</label>
                <input
                  type="text"
                  required
                  value={formData.sub_heading}
                  onChange={(e) => setFormData({ ...formData, sub_heading: e.target.value })}
                  placeholder="Enter subheading"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Button URL *</label>
              <input
                type="text"
                required
                value={formData.button_url}
                onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                placeholder="e.g. /about-us or /contact-us"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image {editingItem ? '(leave blank to keep current)' : '*'}
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
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Content *</label>
              <textarea
                rows={4}
                required
                maxLength={1000}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter content (max 1000 characters)..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {formData.content.length}/1000 characters
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>{editingItem ? 'Update' : 'Create'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500 text-sm bg-white rounded-2xl border border-gray-200">
            No home about items found. Click &quot;Add New Item&quot; to create one.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {item.tag}
                  </span>
                </div>

                {item.image && (
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={`/${item.image.replace(/^\/+/, '')}`}
                      alt={item.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.heading}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.sub_heading}</p>

                <div className="flex items-start gap-2 text-xs text-gray-600 mb-4 line-clamp-3">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <span>{item.content}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-blue-600 font-medium truncate max-w-[150px]">
                  {item.button_text} →
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 border border-gray-200 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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
                  Are you sure you want to delete this Home About section?
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
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
