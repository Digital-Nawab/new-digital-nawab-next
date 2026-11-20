'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Calendar,
  Tag,
  User,
  AlertTriangle,
  RotateCcw,
  Globe,
  CheckCircle,
  Loader2,
  Search,
} from 'lucide-react';

const slugify = (text) => {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    meta_key: '',
    meta_desc: '',
    description: '',
    author: 'Admin',
    published: new Date().toISOString().split('T')[0],
    keyword: [],
  });
  const [tempKeyword, setTempKeyword] = useState('');
  const [cardImageFile, setCardImageFile] = useState(null);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState('');
  const [bannerImagePreview, setBannerImagePreview] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const cardImageRef = useRef(null);
  const bannerImageRef = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setBlogs(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showAlert = (msg, type = 'success') => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      url: '',
      meta_key: '',
      meta_desc: '',
      description: '',
      author: 'Admin',
      published: new Date().toISOString().split('T')[0],
      keyword: [],
    });
    setTempKeyword('');
    setCardImageFile(null);
    setBannerImageFile(null);
    setCardImagePreview('');
    setBannerImagePreview('');
    setFormErrors({});
    setShowForm(true);

    setTimeout(() => {
      document.getElementById('blogForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    let kws = [];
    try {
      kws = Array.isArray(blog.keyword)
        ? blog.keyword
        : typeof blog.keyword === 'string'
        ? JSON.parse(blog.keyword || '[]')
        : [];
    } catch (e) {
      kws = [];
    }

    setFormData({
      title: blog.title || '',
      url: blog.url || '',
      meta_key: blog.meta_key || blog.title || '',
      meta_desc: blog.meta_desc || '',
      description: blog.description || '',
      author: blog.author || 'Admin',
      published: blog.published ? blog.published.split('T')[0] : new Date().toISOString().split('T')[0],
      keyword: kws,
    });
    setTempKeyword('');
    setCardImageFile(null);
    setBannerImageFile(null);
    setCardImagePreview(blog.card_img ? `/${blog.card_img.replace(/^\/+/, '')}` : '');
    setBannerImagePreview(blog.banner_img ? `/${blog.banner_img.replace(/^\/+/, '')}` : '');
    setFormErrors({});
    setShowForm(true);

    setTimeout(() => {
      document.getElementById('blogForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormErrors({});
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      url: !editingBlog ? slugify(newTitle) : prev.url,
      meta_key: !prev.meta_key || prev.meta_key === prev.title ? newTitle : prev.meta_key,
    }));
  };

  const handleSyncUrlWithTitle = () => {
    setFormData((prev) => ({
      ...prev,
      url: slugify(prev.title),
    }));
  };

  const handleAddKeyword = () => {
    const trimmed = tempKeyword.trim();
    if (!trimmed) return;
    if (formData.keyword.includes(trimmed)) {
      setTempKeyword('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      keyword: [...prev.keyword, trimmed],
    }));
    setTempKeyword('');
  };

  const handleRemoveKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyword: prev.keyword.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (field === 'card_img') {
        setCardImageFile(file);
        setCardImagePreview(ev.target.result);
      } else {
        setBannerImageFile(file);
        setBannerImagePreview(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.url.trim()) errors.url = 'Slug / URL is required';
    if (!formData.description.trim()) errors.description = 'Description / Content is required';
    if (!editingBlog && !cardImageFile) errors.card_img = 'Card Image is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showAlert('Please fix the errors in the form', 'error');
      return;
    }

    setProcessing(true);
    setFormErrors({});

    try {
      const body = new FormData();
      body.append('title', formData.title);
      body.append('url', formData.url);
      body.append('meta_key', formData.meta_key || formData.title);
      body.append('meta_desc', formData.meta_desc || '');
      body.append('description', formData.description);
      body.append('author', formData.author || 'Admin');
      body.append('published', formData.published);
      body.append('keyword', JSON.stringify(formData.keyword || []));

      if (cardImageFile) body.append('card_img', cardImageFile);
      if (bannerImageFile) body.append('banner_img', bannerImageFile);

      const endpoint = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : '/api/admin/blogs';

      const res = await fetch(endpoint, {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
        setShowForm(false);
        fetchBlogs();
      } else {
        showAlert(json.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showAlert('An error occurred while saving the blog', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const requestDelete = (blog) => {
    setDeleteTarget(blog);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/blogs/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        showAlert('Blog deleted successfully');
        setDeleteTarget(null);
        fetchBlogs();
      } else {
        showAlert(json.message || 'Failed to delete blog', 'error');
      }
    } catch (err) {
      showAlert('Error deleting blog', 'error');
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      b.title?.toLowerCase().includes(term) ||
      b.author?.toLowerCase().includes(term) ||
      b.url?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-xs">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create, update, and manage your website blog articles
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Blog</span>
        </button>
      </div>

      {/* Alert Box */}
      {alertMessage && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between border ${
            alertType === 'success'
              ? 'bg-green-50 border-green-300 text-green-800'
              : 'bg-red-50 border-red-300 text-red-800'
          }`}
        >
          <span className="text-sm font-medium">{alertMessage}</span>
          <button onClick={() => setAlertMessage('')} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, or url..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Total: <span className="font-bold text-gray-900">{filteredBlogs.length}</span> articles
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-gray-500">
              <div className="text-lg font-semibold mb-1 text-gray-700">No blogs found</div>
              <div className="text-sm">Click &quot;Add Blog&quot; above to create your first blog article</div>
            </div>
          </div>
        ) : (
          filteredBlogs.map((blog) => {
            let keywords = [];
            try {
              keywords = Array.isArray(blog.keyword)
                ? blog.keyword
                : typeof blog.keyword === 'string'
                ? JSON.parse(blog.keyword || '[]')
                : [];
            } catch (e) {
              keywords = [];
            }

            return (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <img
                      src={`/${(blog.card_img || '').replace(/^\/+/, '')}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover bg-gray-100"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x250?text=No+Image';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 bg-blue-600/90 text-white rounded-full hover:bg-blue-700 transition-colors shadow cursor-pointer"
                        title="Edit Blog"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => requestDelete(blog)}
                        className="p-2 bg-red-600/90 text-white rounded-full hover:bg-red-700 transition-colors shadow cursor-pointer"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="text-xs text-blue-600 mb-2 flex items-center gap-1 font-mono">
                      <Globe className="w-3 h-3" />
                      /{blog.url}
                    </div>
                    <div
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: blog.meta_desc || blog.description?.replace(/<[^>]*>?/gm, '').slice(0, 140) || '',
                      }}
                    />
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      {blog.author || 'Admin'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {blog.published ? new Date(blog.published).toLocaleDateString() : 'Draft'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {keywords.slice(0, 3).map((kw, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        #{kw}
                      </span>
                    ))}
                    {keywords.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        +{keywords.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Blog Form */}
      {showForm && (
        <div id="blogForm" className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {editingBlog
                    ? 'Update the blog post details'
                    : 'Create a new blog article for your website'}
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                title="Close Form"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Display Form Errors */}
            {Object.keys(formErrors).length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  Please fix the following errors:
                </h3>
                <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5">
                  {Object.values(formErrors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    placeholder="e.g. 10 Tips for Effective Digital Marketing"
                  />
                  {formErrors.title && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Blog URL (Slug) *
                    </label>
                    {formData.title && (
                      <button
                        type="button"
                        onClick={handleSyncUrlWithTitle}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Auto Sync from Title
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      /
                    </span>
                    <input
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-gray-800"
                      placeholder="10-tips-for-effective-digital-marketing"
                    />
                  </div>
                  {formErrors.url && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.url}</p>
                  )}
                </div>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={formData.meta_key}
                    onChange={(e) => setFormData({ ...formData, meta_key: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900"
                    placeholder="SEO title tag"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    value={formData.meta_desc}
                    onChange={(e) => setFormData({ ...formData, meta_desc: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white resize-none text-gray-900"
                    placeholder="SEO meta description snippet"
                  />
                </div>
              </div>

              {/* Blog Description / Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Content / Description (HTML supported) *
                </label>
                <textarea
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Write or paste your article content (HTML or plain text)..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-gray-900"
                />
                {formErrors.description && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Author and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    placeholder="e.g. Digital Nawab Team"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keywords (Tags)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempKeyword}
                    onChange={(e) => setTempKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="Type keyword and press Add (e.g. SEO, Marketing)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {formData.keyword?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {formData.keyword.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium"
                      >
                        #{kw}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(i)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Image {editingBlog ? '(Leave empty to keep current)' : '*'} (400x400)
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={cardImageRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'card_img')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {cardImagePreview && (
                      <div className="relative">
                        <img
                          src={cardImagePreview}
                          alt="Card preview"
                          className="w-full h-36 object-cover rounded-lg border bg-gray-50"
                        />
                      </div>
                    )}
                    {formErrors.card_img && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.card_img}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Banner Image {editingBlog ? '(Leave empty to keep current)' : '*'} (1200x600)
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={bannerImageRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'banner_img')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {bannerImagePreview && (
                      <div className="relative">
                        <img
                          src={bannerImagePreview}
                          alt="Banner preview"
                          className="w-full h-36 object-cover rounded-lg border bg-gray-50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCloseForm}
                disabled={processing}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={processing}
                className="px-7 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {processing && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>
                  {processing
                    ? editingBlog
                      ? 'Updating...'
                      : 'Creating...'
                    : editingBlog
                    ? 'Update Blog'
                    : 'Create Blog'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Blog?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete
                  {deleteTarget.title ? ` "${deleteTarget.title}"` : ' this blog'}?
                  This will permanently remove the blog post.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
