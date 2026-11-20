'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export default function GenericAdminManager({
  title,
  subtitle,
  icon: Icon,
  apiEndpoint, // e.g. '/api/admin/technologies'
  columns = [], // [{ key: 'heading', label: 'Title' }, { key: 'img', label: 'Image', type: 'image' }]
  fields = [], // [{ name: 'heading', label: 'Heading', type: 'text', required: true }]
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [filePreviews, setFilePreviews] = useState({});

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiEndpoint);
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
  }, [apiEndpoint]);

  const openCreate = () => {
    setEditingItem(null);
    const initial = {};
    for (const f of fields) {
      initial[f.name] = f.defaultValue !== undefined ? f.defaultValue : '';
    }
    setFormData(initial);
    setFiles({});
    setFilePreviews({});
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const initial = {};
    const previews = {};
    for (const f of fields) {
      initial[f.name] = item[f.name] !== undefined && item[f.name] !== null ? item[f.name] : '';
      if ((f.type === 'image' || f.type === 'file') && item[f.name]) {
        previews[f.name] = `/${String(item[f.name]).replace(/^\/+/, '')}`;
      }
    }
    setFormData(initial);
    setFiles({});
    setFilePreviews(previews);
    setError('');
    setModalOpen(true);
  };

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    if (!file) return;
    setFiles((prev) => ({ ...prev, [name]: file }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreviews((prev) => ({ ...prev, [name]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const hasFiles = Object.keys(files).length > 0;
      let body;
      let headers = {};

      if (hasFiles) {
        body = new FormData();
        for (const [k, v] of Object.entries(formData)) {
          if (v !== undefined && v !== null) {
            body.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
          }
        }
        for (const [k, f] of Object.entries(files)) {
          body.append(k, f);
        }
      } else {
        body = JSON.stringify(formData);
        headers['Content-Type'] = 'application/json';
      }

      const endpoint = editingItem
        ? `${apiEndpoint}/${editingItem.id}`
        : apiEndpoint;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers,
        body,
      });

      const resData = await res.json();
      if (!res.ok || !resData.status) {
        setError(resData.message || 'Operation failed');
        setSubmitting(false);
        return;
      }

      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.message || 'Error submitting form');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`${apiEndpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    const str = JSON.stringify(item).toLowerCase();
    return str.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {Icon && <Icon className="w-6 h-6 text-blue-600" />}
            <span>{title}</span>
          </h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Total: <span className="font-bold text-gray-900">{filtered.length}</span> records
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No records found. Click &quot;Add Record&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="py-3.5 px-4 font-semibold">{col.label}</th>
                  ))}
                  <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="py-3.5 px-4 text-gray-700">
                        {col.type === 'image' ? (
                          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
                            {item[col.key] ? (
                              <img
                                src={`/${String(item[col.key]).replace(/^\/+/, '')}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        ) : col.type === 'badge' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {String(item[col.key] || '')}
                          </span>
                        ) : (
                          <span className="truncate max-w-xs block font-medium text-gray-900">
                            {Array.isArray(item[col.key])
                              ? item[col.key].join(', ')
                              : String(item[col.key] !== null && item[col.key] !== undefined ? item[col.key] : '')}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg my-8 p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                <span>{editingItem ? `Edit ${title}` : `Add New ${title}`}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>

                  {f.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      required={f.required}
                      value={formData[f.name] || ''}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      placeholder={f.placeholder || ''}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : f.type === 'file' || f.type === 'image' ? (
                    <div>
                      <input
                        type="file"
                        accept={f.accept || 'image/*'}
                        onChange={(e) => handleFileChange(f.name, e.target.files[0])}
                        className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                      />
                      {filePreviews[f.name] && (
                        <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <img src={filePreviews[f.name]} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={f.type || 'text'}
                      required={f.required}
                      value={formData[f.name] || ''}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      placeholder={f.placeholder || ''}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{editingItem ? 'Save Changes' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
