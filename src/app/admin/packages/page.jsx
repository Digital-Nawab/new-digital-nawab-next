'use client';

import { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Tag,
  DollarSign,
  Users,
  Info,
  CheckCircle2,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [showFeatures, setShowFeatures] = useState({});

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deleteFeatureId, setDeleteFeatureId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const packageTypes = ['SEO', 'SMM', 'SMO', 'Google_Ads', 'Development', 'Design'];

  // Package Form
  const [packageForm, setPackageForm] = useState({
    icon: '📦',
    package_for: '',
    package_name: '',
    price: '',
    description: '',
    label: '',
    audience: '',
  });

  // Feature Form
  const [featureForm, setFeatureForm] = useState({
    package_id: '',
    feature_key: '',
    feature_value: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, fRes] = await Promise.all([
        fetch('/api/admin/packages').then((r) => r.json()),
        fetch('/api/admin/package-features').then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      if (pRes.status && Array.isArray(pRes.data)) {
        setPackages(pRes.data);
      }
      if (fRes.status && Array.isArray(fRes.data)) {
        setFeatures(fRes.data);
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

  const packageCategories = ['all', ...packageTypes];

  const filteredPackages =
    selectedTab === 'all'
      ? packages
      : packages.filter((pkg) => pkg.package_for === selectedTab);

  const toggleFeatures = (pkgId) => {
    setShowFeatures((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId],
    }));
  };

  const handleOpenCreate = () => {
    setTypeDropdownOpen(false);
    setPackageForm({
      icon: '📦',
      package_for: '',
      package_name: '',
      price: '',
      description: '',
      label: '',
      audience: '',
    });
    setShowCreateModal(true);
  };

  // Package CRUD
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageForm),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setShowCreateModal(false);
        setPackageForm({
          icon: '📦',
          package_for: '',
          package_name: '',
          price: '',
          description: '',
          label: '',
          audience: '',
        });
        showAlert('Package created successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to create package');
      }
    } catch (err) {
      alert('Error creating package');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (pkg) => {
    setSelectedPackage(pkg);
    setTypeDropdownOpen(false);
    setPackageForm({
      icon: pkg.icon || '📦',
      package_for: pkg.package_for || '',
      package_name: pkg.package_name || '',
      price: pkg.price || '',
      description: pkg.description || '',
      label: pkg.label || '',
      audience: pkg.audience || '',
    });
    setShowEditModal(true);
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    if (!selectedPackage) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/packages/${selectedPackage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageForm),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setShowEditModal(false);
        setSelectedPackage(null);
        showAlert('Package updated successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to update package');
      }
    } catch (err) {
      alert('Error updating package');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeletePackage = async () => {
    if (!deletePackageId) return;
    try {
      const res = await fetch(`/api/admin/packages/${deletePackageId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeletePackageId(null);
        showAlert('Package deleted successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to delete package');
      }
    } catch (err) {
      alert('Error deleting package');
    }
  };

  // Feature CRUD
  const handleOpenAddFeature = (pkg) => {
    setSelectedPackage(pkg);
    setFeatureForm({
      package_id: pkg.id,
      feature_key: '',
      feature_value: '',
    });
    setShowFeatureModal(true);
  };

  const handleCreateFeature = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/package-features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(featureForm),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setShowFeatureModal(false);
        showAlert('Feature added successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to add feature');
      }
    } catch (err) {
      alert('Error adding feature');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteFeature = async () => {
    if (!deleteFeatureId) return;
    try {
      const res = await fetch(`/api/admin/package-features/${deleteFeatureId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteFeatureId(null);
        showAlert('Feature deleted successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to delete feature');
      }
    } catch (err) {
      alert('Error deleting feature');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
      {/* Header matching Package.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your service packages, deliverables, and granular feature pricing
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
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

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {packageCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              selectedTab === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 text-sm">
            No packages found in this category.
          </div>
        ) : (
          filteredPackages.map((pkg) => {
            const pkgFeatures = features.filter((f) => String(f.package_id) === String(pkg.id));
            const isFeaturesOpen = !!showFeatures[pkg.id];

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 bg-gray-50 rounded-xl border border-gray-100">
                      {pkg.icon || '📦'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize">
                      {pkg.package_for?.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-1">{pkg.package_name}</h3>
                  <div className="text-xl font-extrabold text-gray-900 mb-2">{pkg.price}</div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{pkg.description}</p>

                  <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3 mb-4">
                    {pkg.audience && (
                      <p className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>Audience: {pkg.audience}</span>
                      </p>
                    )}
                    {pkg.label && (
                      <p className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                        <span>Tier: {pkg.label}</span>
                      </p>
                    )}
                  </div>

                  {/* Features Toggle */}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleFeatures(pkg.id)}
                        className="text-xs font-bold text-gray-700 flex items-center gap-1 hover:text-blue-600 cursor-pointer"
                      >
                        <span>Features ({pkgFeatures.length})</span>
                        {isFeaturesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleOpenAddFeature(pkg)}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        + Add Feature
                      </button>
                    </div>

                    {isFeaturesOpen && (
                      <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {pkgFeatures.length === 0 ? (
                          <p className="text-xs text-gray-400 italic">No features configured.</p>
                        ) : (
                          pkgFeatures.map((feat) => (
                            <div
                              key={feat.id}
                              className="p-2 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-semibold text-gray-800">{feat.feature_key}: </span>
                                <span className="text-gray-600">{feat.feature_value}</span>
                              </div>
                              <button
                                onClick={() => setDeleteFeatureId(feat.id)}
                                className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer ml-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => handleOpenEdit(pkg)}
                    className="flex-1 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletePackageId(pkg.id)}
                    className="py-1.5 px-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Package Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full my-8 p-6 sm:p-8 space-y-5">
            <div className="flex justify-between items-start pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {showEditModal ? 'Edit Package' : 'Create New Package'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {showEditModal ? 'Update service package details' : 'Add a new service package to your portfolio'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={showEditModal ? handleUpdatePackage : handleCreatePackage} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={packageForm.icon}
                    onChange={(e) => setPackageForm({ ...packageForm, icon: e.target.value })}
                    placeholder="📦"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Package Type</label>
                  <button
                    type="button"
                    onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-shadow"
                  >
                    <span className={packageForm.package_for ? "text-gray-900 font-medium" : "text-gray-400"}>
                      {packageForm.package_for || "Select type"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${typeDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {typeDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setTypeDropdownOpen(false)}
                      />
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-1.5 space-y-0.5">
                        {packageTypes.map((type) => {
                          const isSelected = packageForm.package_for === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setPackageForm({ ...packageForm, package_for: type });
                                setTypeDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? "bg-gray-100 font-semibold text-gray-900"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span>{type}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={packageForm.package_name}
                    onChange={(e) => setPackageForm({ ...packageForm, package_name: e.target.value })}
                    placeholder="Basic SEO Package"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    required
                    value={packageForm.price}
                    onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                    placeholder="$99/month"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={packageForm.description}
                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                  placeholder="Describe your package..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={packageForm.label}
                    onChange={(e) => setPackageForm({ ...packageForm, label: e.target.value })}
                    placeholder="Popular, Premium, etc."
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={packageForm.audience}
                    onChange={(e) => setPackageForm({ ...packageForm, audience: e.target.value })}
                    placeholder="Small businesses, Startups, etc."
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                  }}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{showEditModal ? 'Update Package' : 'Create Package'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Feature Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Add Feature to {selectedPackage?.package_name}
              </h2>
              <button onClick={() => setShowFeatureModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFeature} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Feature Name / Key *</label>
                <input
                  type="text"
                  required
                  value={featureForm.feature_key}
                  onChange={(e) => setFeatureForm({ ...featureForm, feature_key: e.target.value })}
                  placeholder="e.g. Keyword Research"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Feature Value *</label>
                <input
                  type="text"
                  required
                  value={featureForm.feature_value}
                  onChange={(e) => setFeatureForm({ ...featureForm, feature_value: e.target.value })}
                  placeholder="e.g. Local Keyword Focus or Up to 10"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowFeatureModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Add Feature</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Package Confirmation */}
      {deletePackageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Package?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this package? All linked features will also be affected.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeletePackageId(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePackage}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Feature Confirmation */}
      {deleteFeatureId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Feature?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this feature from the package?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteFeatureId(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFeature}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete Feature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
