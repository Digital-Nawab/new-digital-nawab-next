'use client';

import { useState, useEffect } from 'react';
import {
  Globe2,
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  X,
  ExternalLink,
  Phone,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const slugify = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function AdminCitiesPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    badge_text: '',
    heading_prefix: '',
    heading_suffix: '',
    description: '',
    phone_number: '',
    whatsapp_number: '',
    meta_title: '',
    meta_description: '',
    is_active: 1,
    stat_years_value: '7+',
    stat_campaigns_value: '1000+',
    stat_clients_value: '300+',
    stat_retention_value: '98+',
    stat_support_value: '24*7',
    stat_reporting_value: '100%',
    market_description: '',
    market_areas: [],
  });

  const [tagDraft, setTagDraft] = useState('');

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cities');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setCities(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const openCreate = () => {
    setEditingCity(null);
    setFormData({
      name: '',
      slug: '',
      badge_text: '',
      heading_prefix: 'Digital Marketing Agency',
      heading_suffix: 'for Business Growth',
      description: '',
      phone_number: '8860757649',
      whatsapp_number: '8860757649',
      meta_title: '',
      meta_description: '',
      is_active: 1,
      stat_years_value: '7+',
      stat_campaigns_value: '1000+',
      stat_clients_value: '300+',
      stat_retention_value: '98+',
      stat_support_value: '24*7',
      stat_reporting_value: '100%',
      market_description: '',
      market_areas: [],
    });
    setTagDraft('');
    setShowModal(true);
  };

  const openEdit = (city) => {
    setEditingCity(city);
    let areas = [];
    try {
      areas = Array.isArray(city.market_areas)
        ? city.market_areas
        : typeof city.market_areas === 'string'
        ? JSON.parse(city.market_areas || '[]')
        : [];
    } catch (e) {
      areas = [];
    }

    setFormData({
      name: city.name || '',
      slug: city.slug || '',
      badge_text: city.badge_text || '',
      heading_prefix: city.heading_prefix || '',
      heading_suffix: city.heading_suffix || '',
      description: city.description || '',
      phone_number: city.phone_number || '',
      whatsapp_number: city.whatsapp_number || '',
      meta_title: city.meta_title || '',
      meta_description: city.meta_description || '',
      is_active: city.is_active ?? 1,
      stat_years_value: city.stat_years_value || '7+',
      stat_campaigns_value: city.stat_campaigns_value || '1000+',
      stat_clients_value: city.stat_clients_value || '300+',
      stat_retention_value: city.stat_retention_value || '98+',
      stat_support_value: city.stat_support_value || '24*7',
      stat_reporting_value: city.stat_reporting_value || '100%',
      market_description: city.market_description || '',
      market_areas: areas,
    });
    setTagDraft('');
    setShowModal(true);
  };

  const handleNameChange = (val) => {
    const slug = `digital-marketing-agency-in-${slugify(val)}`;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: !editingCity ? slug : prev.slug,
      badge_text: !editingCity ? `Digital Marketing Agency in ${val}` : prev.badge_text,
      heading_suffix: !editingCity ? `in ${val} for Business Growth` : prev.heading_suffix,
    }));
  };

  const handleAddTag = () => {
    const val = tagDraft.trim();
    if (!val) return;
    if (formData.market_areas.includes(val)) {
      setTagDraft('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      market_areas: [...prev.market_areas, val],
    }));
    setTagDraft('');
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      market_areas: prev.market_areas.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) {
      alert('Please fill in City Name and Slug');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        market_areas: formData.market_areas,
      };

      const endpoint = editingCity
        ? `/api/admin/cities/${editingCity.id}`
        : '/api/admin/cities';
      const method = editingCity ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.status) {
        setShowModal(false);
        showAlert(editingCity ? 'City updated successfully' : 'City created successfully');
        fetchCities();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving city');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/cities/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteTarget(null);
        showAlert('City deleted successfully');
        fetchCities();
      } else {
        alert(json.message || 'Failed to delete city');
      }
    } catch (err) {
      alert('Error deleting city');
    }
  };

  const filteredCities = cities.filter((c) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return c.name?.toLowerCase().includes(term) || c.slug?.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 px-6 sm:px-8 py-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">City Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage city landing pages, market targeting, and local lead funnels
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New City</span>
        </button>
      </div>

      {alertMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium flex items-center justify-between">
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
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
            placeholder="Search by city name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Total: <span className="font-bold text-gray-900">{filteredCities.length}</span> cities
        </div>
      </div>

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500 text-sm bg-white rounded-2xl border border-gray-200">
            No cities found. Click &quot;Create New City&quot; to configure your first location.
          </div>
        ) : (
          filteredCities.map((city) => {
            let areas = [];
            try {
              areas = Array.isArray(city.market_areas)
                ? city.market_areas
                : typeof city.market_areas === 'string'
                ? JSON.parse(city.market_areas || '[]')
                : [];
            } catch (e) {
              areas = [];
            }

            return (
              <div
                key={city.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">{city.name}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        city.is_active
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {city.is_active ? 'Active' : 'Draft'}
                    </span>
                  </div>

                  <a
                    href={`/city/${city.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-mono mb-4"
                  >
                    <span>/city/{city.slug}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                    {city.description || 'No description provided.'}
                  </p>

                  <div className="text-xs text-gray-600 space-y-1 mb-4 border-t border-gray-100 pt-3">
                    <p>
                      <strong>Prefix:</strong> {city.heading_prefix || '—'}
                    </p>
                    <p>
                      <strong>Suffix:</strong> {city.heading_suffix || '—'}
                    </p>
                    <p>
                      <strong>Contact:</strong> {city.phone_number || '—'} / {city.whatsapp_number || '—'}
                    </p>
                    <p className="truncate">
                      <strong>Areas:</strong> {areas.join(', ') || '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openEdit(city)}
                    className="flex-1 py-2 px-3 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Edit City
                  </button>
                  <button
                    onClick={() => setDeleteTarget(city)}
                    className="py-2 px-3 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCity ? 'Edit City' : 'Create New City'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set up city landing page details and SEO configurations
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Lucknow"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Slug (URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="digital-marketing-agency-in-lucknow"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={formData.badge_text}
                  onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                  placeholder="e.g. Digital Marketing Agency in Lucknow"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Heading Prefix
                  </label>
                  <input
                    type="text"
                    value={formData.heading_prefix}
                    onChange={(e) => setFormData({ ...formData, heading_prefix: e.target.value })}
                    placeholder="e.g. Digital Marketing Agency"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Heading Suffix
                  </label>
                  <input
                    type="text"
                    value={formData.heading_suffix}
                    onChange={(e) => setFormData({ ...formData, heading_suffix: e.target.value })}
                    placeholder="e.g. in Lucknow for Business Growth"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="8860757649"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    placeholder="8860757649"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Market Areas Tags */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Key Market Localities / Areas
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagDraft}
                    onChange={(e) => setTagDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Hazratganj, Gomti Nagar"
                    className="flex-1 px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {formData.market_areas?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.market_areas.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(idx)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="city_active"
                  checked={!!formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="city_active" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Publish this city page (Active)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Save City</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete City?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete &quot;{deleteTarget.name}&quot;?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
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
