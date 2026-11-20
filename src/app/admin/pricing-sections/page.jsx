'use client';

import { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Monitor,
  Target,
  Users,
  Star,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

const ICON_MAP = { Monitor, Target, Users, Star };
const ICON_OPTIONS = ['Monitor', 'Target', 'Users', 'Star'];

const COLOR_OPTIONS = [
  { value: 'pink', label: 'Pink', swatch: '#ec4899' },
  { value: 'purple', label: 'Purple', swatch: '#a855f7' },
  { value: 'gold', label: 'Gold', swatch: '#eab308' },
];

const emptyPackage = () => ({
  icon: 'Monitor',
  color: 'pink',
  badge_label: '',
  title: '',
  price: '',
  price_suffix: '/Month',
  is_popular: false,
  view_package_url: '',
  whatsapp_number: '',
  features: [''],
});

function IconPreview({ name, className = 'w-5 h-5' }) {
  const Icon = ICON_MAP[name] || Monitor;
  return <Icon className={className} />;
}

export default function AdminPricingSectionsPage() {
  const [sections, setSections] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    city_id: '',
    badge_text: 'Transparent Pricing',
    heading: 'Service We Offer You',
    subheading: 'Expert digital marketing solutions to grow your business straightforward monthly packages, no hidden costs.',
    packages: [emptyPackage()],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [secRes, cityRes] = await Promise.all([
        fetch('/api/admin/pricing-sections').then((r) => r.json()),
        fetch('/api/admin/cities').then((r) => r.json()),
      ]);

      if (secRes.status && Array.isArray(secRes.data)) {
        setSections(secRes.data);
      }
      if (cityRes.status && Array.isArray(cityRes.data)) {
        setCities(cityRes.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      city_id: cities[0]?.id ? String(cities[0].id) : '',
      badge_text: 'Transparent Pricing',
      heading: 'Service We Offer You',
      subheading: 'Expert digital marketing solutions to grow your business straightforward monthly packages, no hidden costs.',
      packages: [emptyPackage()],
    });
    setShowModal(true);
  };

  const handleOpenEdit = (sec) => {
    setEditingItem(sec);
    let pkgs = [];
    try {
      pkgs = Array.isArray(sec.packages)
        ? sec.packages
        : typeof sec.packages === 'string'
        ? JSON.parse(sec.packages || '[]')
        : [];
    } catch (e) {
      pkgs = [];
    }

    setFormData({
      city_id: String(sec.city_id || ''),
      badge_text: sec.badge_text || '',
      heading: sec.heading || '',
      subheading: sec.subheading || '',
      packages: pkgs.length > 0 ? pkgs : [emptyPackage()],
    });
    setShowModal(true);
  };

  const handleUpdatePackage = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, packages: updated });
  };

  const handleAddPackage = () => {
    if (formData.packages.length >= 6) return;
    setFormData({ ...formData, packages: [...formData.packages, emptyPackage()] });
  };

  const handleRemovePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleUpdateFeature = (pkgIndex, featureIndex, value) => {
    const updated = [...formData.packages];
    const features = [...(updated[pkgIndex].features || [])];
    features[featureIndex] = value;
    updated[pkgIndex] = { ...updated[pkgIndex], features };
    setFormData({ ...formData, packages: updated });
  };

  const handleAddFeature = (pkgIndex) => {
    const updated = [...formData.packages];
    const features = [...(updated[pkgIndex].features || []), ''];
    updated[pkgIndex] = { ...updated[pkgIndex], features };
    setFormData({ ...formData, packages: updated });
  };

  const handleRemoveFeature = (pkgIndex, featureIndex) => {
    const updated = [...formData.packages];
    const features = (updated[pkgIndex].features || []).filter((_, i) => i !== featureIndex);
    updated[pkgIndex] = { ...updated[pkgIndex], features };
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.city_id) {
      alert('Please select a City');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        city_id: parseInt(formData.city_id, 10),
        badge_text: formData.badge_text,
        heading: formData.heading,
        subheading: formData.subheading,
        packages: formData.packages,
      };

      const url = editingItem
        ? `/api/admin/pricing-sections/${editingItem.id}`
        : '/api/admin/pricing-sections';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.status) {
        setShowModal(false);
        showAlert(editingItem ? 'Pricing section updated' : 'Pricing section created');
        fetchData();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving pricing section');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/pricing-sections/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteTarget(null);
        showAlert('Pricing section deleted');
        fetchData();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header matching Inertia PricingSection.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 px-6 sm:px-8 py-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">City Pricing Sections</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage packages and price cards for each target city landing page
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pricing Section</span>
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

      {/* Pricing Sections List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm bg-white rounded-2xl border border-gray-200">
            No pricing sections configured yet. Click &quot;Add Pricing Section&quot; to create one.
          </div>
        ) : (
          sections.map((sec) => {
            const city = cities.find((c) => String(c.id) === String(sec.city_id));
            let pkgs = [];
            try {
              pkgs = Array.isArray(sec.packages)
                ? sec.packages
                : typeof sec.packages === 'string'
                ? JSON.parse(sec.packages || '[]')
                : [];
            } catch (e) {
              pkgs = [];
            }

            return (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 bg-gray-50/70 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{city ? city.name : `City #${sec.city_id}`}</span>
                      <span className="text-gray-300">•</span>
                      <span>{sec.badge_text || 'Pricing'}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{sec.heading}</h2>
                    <p className="text-sm text-gray-500 mt-1 max-w-2xl">{sec.subheading}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(sec)}
                      className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(sec)}
                      className="px-3.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Package Cards Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pkgs.map((pkg, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 p-5 bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="p-2.5 rounded-xl bg-gray-100 text-gray-800">
                              <IconPreview name={pkg.icon} className="w-5 h-5" />
                            </span>
                            {pkg.badge_label && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {pkg.badge_label}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-base mb-1">{pkg.title}</h3>
                          {pkg.price ? (
                            <div className="text-xl font-extrabold text-gray-900 mb-3">
                              {pkg.price}
                              <span className="text-xs font-normal text-gray-500 ml-1">
                                {pkg.price_suffix || '/Month'}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400 italic mb-3">Custom Pricing</div>
                          )}

                          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-600">
                            {(pkg.features || []).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {pkg.view_package_url && (
                          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-600 truncate">
                            URL: {pkg.view_package_url}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full my-8 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit Pricing Section' : 'Create Pricing Section'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure city section details and multi-package cards
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Select City *
                  </label>
                  <select
                    required
                    value={formData.city_id}
                    onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select a City</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge_text}
                    onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                    placeholder="e.g. Transparent Pricing"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g. Service We Offer You"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subheading</label>
                <textarea
                  rows={2}
                  value={formData.subheading}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Package Repeater */}
              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900">
                    Packages ({formData.packages.length} / 6)
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddPackage}
                    disabled={formData.packages.length >= 6}
                    className="px-3.5 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Package</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.packages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 relative space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-600 uppercase">
                          Package #{idx + 1}
                        </span>
                        {formData.packages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePackage(idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Icon</label>
                          <select
                            value={pkg.icon}
                            onChange={(e) => handleUpdatePackage(idx, 'icon', e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white text-gray-900"
                          >
                            {ICON_OPTIONS.map((ico) => (
                              <option key={ico} value={ico}>
                                {ico}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Badge Label</label>
                          <input
                            type="text"
                            value={pkg.badge_label || ''}
                            onChange={(e) => handleUpdatePackage(idx, 'badge_label', e.target.value)}
                            placeholder="e.g. Web Packages"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Title *</label>
                          <input
                            type="text"
                            required
                            value={pkg.title}
                            onChange={(e) => handleUpdatePackage(idx, 'title', e.target.value)}
                            placeholder="Package Title"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">View Package URL</label>
                          <input
                            type="text"
                            value={pkg.view_package_url || ''}
                            onChange={(e) => handleUpdatePackage(idx, 'view_package_url', e.target.value)}
                            placeholder="/packages"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">WhatsApp Number</label>
                          <input
                            type="text"
                            value={pkg.whatsapp_number || ''}
                            onChange={(e) => handleUpdatePackage(idx, 'whatsapp_number', e.target.value)}
                            placeholder="8860757649"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Price (optional)</label>
                          <input
                            type="text"
                            value={pkg.price || ''}
                            onChange={(e) => handleUpdatePackage(idx, 'price', e.target.value)}
                            placeholder="Rs. 9,999"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 bg-white"
                          />
                        </div>
                      </div>

                      {/* Features Repeater */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-gray-700">Features</label>
                          <button
                            type="button"
                            onClick={() => handleAddFeature(idx)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                          >
                            + Add Feature
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {(pkg.features || []).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => handleUpdateFeature(idx, fIdx, e.target.value)}
                                placeholder="e.g. One Page Static Website"
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-900 bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(idx, fIdx)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <span>Save Pricing Section</span>
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
                <h3 className="text-lg font-bold text-gray-900">Delete Pricing Section?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this pricing section?
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
