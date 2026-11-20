'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  ArrowLeft,
  Settings,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [subservices, setSubservices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddSubModalOpen, setIsAddSubModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteSubTarget, setDeleteSubTarget] = useState(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({ name: '', description: '' });
  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const [subServiceForm, setSubServiceForm] = useState({ name: '', description: '', service_id: null });
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, ssRes] = await Promise.all([
        fetch('/api/admin/services').then((r) => r.json()),
        fetch('/api/admin/subservices').then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      if (sRes.status && Array.isArray(sRes.data)) {
        setServices(sRes.data);
      }
      if (ssRes.status && Array.isArray(ssRes.data)) {
        setSubservices(ssRes.data);
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

  // Service CRUD
  const handleAddService = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('name', serviceForm.name);
      body.append('description', serviceForm.description || '');
      if (serviceImageFile) body.append('image', serviceImageFile);

      const res = await fetch('/api/admin/services', { method: 'POST', body });
      const json = await res.json();
      if (res.ok && json.status) {
        setIsAddModalOpen(false);
        setServiceForm({ name: '', description: '' });
        setServiceImageFile(null);
        showAlert('Service created successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to create service');
      }
    } catch (err) {
      alert('Error creating service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('name', serviceForm.name);
      body.append('description', serviceForm.description || '');
      if (serviceImageFile) body.append('image', serviceImageFile);

      const res = await fetch(`/api/admin/services/${editingService.id}`, { method: 'POST', body });
      const json = await res.json();
      if (res.ok && json.status) {
        setIsUpdateModalOpen(false);
        setEditingService(null);
        setServiceForm({ name: '', description: '' });
        setServiceImageFile(null);
        showAlert('Service updated successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to update service');
      }
    } catch (err) {
      alert('Error updating service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteTarget(null);
        showAlert('Service deleted successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to delete service');
      }
    } catch (err) {
      alert('Error deleting service');
    }
  };

  // Sub-Service CRUD
  const handleAddSubService = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/subservices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: subServiceForm.name,
          description: subServiceForm.description || '',
          service_id: currentServiceId,
        }),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setIsAddSubModalOpen(false);
        setSubServiceForm({ name: '', description: '', service_id: null });
        showAlert('Sub-service created successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to create sub-service');
      }
    } catch (err) {
      alert('Error creating sub-service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubService = async () => {
    if (!deleteSubTarget) return;
    try {
      const res = await fetch(`/api/admin/subservices/${deleteSubTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteSubTarget(null);
        showAlert('Sub-service deleted successfully');
        fetchData();
      } else {
        alert(json.message || 'Failed to delete sub-service');
      }
    } catch (err) {
      alert('Error deleting sub-service');
    }
  };

  const openUpdateModal = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name || '',
      description: service.description || '',
    });
    setServiceImageFile(null);
    setIsUpdateModalOpen(true);
  };

  const openAddSubServiceModal = (serviceId) => {
    setCurrentServiceId(serviceId);
    setSubServiceForm({ name: '', description: '', service_id: serviceId });
    setIsAddSubModalOpen(true);
  };

  const toggleSubServices = (serviceId) => {
    setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header Section matching Inertia Services.jsx */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white shadow-md">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
              <p className="text-gray-500 text-sm mt-1">
                Create and manage your service offerings and sub-categories
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setServiceForm({ name: '', description: '' });
                setServiceImageFile(null);
                setIsAddModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert message */}
      {alertMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium flex items-center justify-between">
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Services Overview</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Manage all your primary services and their specialized sub-categories
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No services found. Click &quot;Add Service&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-4 px-6">Service Title</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6">Image Preview</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service, index) => {
                  const serviceSubs = subservices.filter(
                    (ss) => String(ss.service_id) === String(service.id)
                  );
                  const isExpanded = expandedServiceId === service.id;

                  return (
                    <React.Fragment key={service.id}>
                      <tr
                        className={`transition-colors hover:bg-blue-50/40 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                        }`}
                      >
                        <td className="py-5 px-6">
                          <div className="font-semibold text-gray-900 text-base">
                            {service.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {serviceSubs.length} sub-services
                          </div>
                        </td>
                        <td className="py-5 px-6 max-w-xs">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {service.description || '—'}
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          {service.image ? (
                            <button
                              onClick={() => {
                                setSelectedImage(`/${service.image.replace(/^\/+/, '')}`);
                                setIsImageModalOpen(true);
                              }}
                              className="group relative overflow-hidden rounded-xl shadow-xs border border-gray-200 hover:shadow-md transition-all cursor-pointer block"
                            >
                              <img
                                src={`/${service.image.replace(/^\/+/, '')}`}
                                alt={service.name}
                                className="h-14 w-14 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-white" />
                              </div>
                            </button>
                          ) : (
                            <div className="h-14 w-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openUpdateModal(service)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(service)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                            <button
                              onClick={() => toggleSubServices(service.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  <EyeOff className="w-3.5 h-3.5" />
                                  <span>Hide</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Sub-services row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={4} className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 p-0">
                            <div className="p-6 sm:p-8 border-t border-b border-blue-100">
                              <div className="flex justify-between items-center mb-5">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                                    <span>Sub-Services for {service.name}</span>
                                  </h3>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Manage specialized services under this primary category
                                  </p>
                                </div>
                                <button
                                  onClick={() => openAddSubServiceModal(service.id)}
                                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Sub-Service</span>
                                </button>
                              </div>

                              <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
                                {serviceSubs.length === 0 ? (
                                  <div className="text-center py-8 text-gray-500 text-xs">
                                    No sub-services yet for this service.
                                  </div>
                                ) : (
                                  <table className="w-full text-left">
                                    <thead>
                                      <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase tracking-wider">
                                        <th className="py-3 px-5">Sub-Service Title</th>
                                        <th className="py-3 px-5">Description</th>
                                        <th className="py-3 px-5 text-right">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-xs">
                                      {serviceSubs.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-blue-50/30">
                                          <td className="py-3.5 px-5 font-semibold text-gray-800">
                                            {sub.name}
                                          </td>
                                          <td className="py-3.5 px-5 text-gray-600">
                                            {sub.description || '—'}
                                          </td>
                                          <td className="py-3.5 px-5 text-right">
                                            <button
                                              onClick={() => setDeleteSubTarget(sub)}
                                              className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                                              title="Delete Sub-Service"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Service</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="e.g. Search Engine Optimization"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Describe this service offering..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service Icon / Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setServiceImageFile(e.target.files[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Service</h2>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Change Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setServiceImageFile(e.target.files[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Update Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Sub-Service Modal */}
      {isAddSubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Sub-Service</h2>
              <button
                onClick={() => setIsAddSubModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sub-Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={subServiceForm.name}
                  onChange={(e) => setSubServiceForm({ ...subServiceForm, name: e.target.value })}
                  placeholder="e.g. Technical SEO Audit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={subServiceForm.description}
                  onChange={(e) => setSubServiceForm({ ...subServiceForm, description: e.target.value })}
                  placeholder="Details about this sub-service..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddSubModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Save Sub-Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImage} alt="Service Preview" className="max-h-[80vh] w-auto rounded-xl object-contain" />
          </div>
        </div>
      )}

      {/* Delete Service Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Service?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete &quot;{deleteTarget.name}&quot;? This will remove the service and may affect connected subservices.
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
                onClick={handleDeleteService}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Sub-Service Confirmation */}
      {deleteSubTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Sub-Service?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete &quot;{deleteSubTarget.name}&quot;?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteSubTarget(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubService}
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
