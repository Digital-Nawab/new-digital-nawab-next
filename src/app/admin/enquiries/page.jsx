'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  MessageSquare,
  Plus,
  Filter,
  MoreVertical,
  XCircle,
  Settings,
  X,
  Loader2,
} from 'lucide-react';

const STATUS_MAP = {
  new_lead: {
    displayName: 'New Lead',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Clock,
  },
  contacted: {
    displayName: 'Contacted',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Users,
  },
  converted: {
    displayName: 'Converted',
    className: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  lost: {
    displayName: 'Lost',
    className: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
};

const ADDED_BY_OPTIONS = ['User', 'Ujjwal Porwal', 'Sharad Verma', 'Punit Shukla'];
const SOURCE_OPTIONS = ['Website', 'Call', 'WhatsApp'];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [pendingStatus, setPendingStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    name: '',
    addedBy: 'all',
    source: 'all',
  });

  // Create Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    service_id: '',
    subservice_id: '',
    message: '',
    addedBy: 'User',
    source: 'Website',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, svcRes] = await Promise.all([
        fetch('/api/admin/enquiries').then((r) => r.json()),
        fetch('/api/admin/services').then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      if (enqRes.status && Array.isArray(enqRes.data)) {
        setEnquiries(enqRes.data);
      }
      if (svcRes.status && Array.isArray(svcRes.data)) {
        setServices(svcRes.data);
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

  // Update subservices dropdown when service_id changes
  useEffect(() => {
    if (formData.service_id) {
      const selected = services.find((s) => String(s.id) === String(formData.service_id));
      setSubServices(selected?.subservices || []);
    } else {
      setSubServices([]);
    }
  }, [formData.service_id, services]);

  const handleCreateEnquiry = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.status) {
        setShowCreateForm(false);
        setFormData({
          name: '',
          email: '',
          number: '',
          city: '',
          service_id: '',
          subservice_id: '',
          message: '',
          addedBy: 'User',
          source: 'Website',
        });
        fetchData();
      } else {
        alert(data.message || 'Failed to create enquiry');
      }
    } catch (err) {
      alert('Error creating enquiry');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusChangeRequest = (id, newStatus) => {
    setSelectedEnquiryId(id);
    setPendingStatus(newStatus);
    setActiveDropdown(null);
    setIsDialogOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedEnquiryId || !pendingStatus) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: pendingStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === selectedEnquiryId ? { ...e, status: pendingStatus, leadStatus: pendingStatus } : e
          )
        );
      }
    } catch (e) {
      alert('Failed to update status');
    } finally {
      setIsProcessing(false);
      setIsDialogOpen(false);
      setSelectedEnquiryId(null);
      setPendingStatus('');
    }
  };

  const handleDelete = async (id) => {
    setActiveDropdown(null);
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (e) {
      alert('Failed to delete enquiry');
    }
  };

  const clearFilters = () => {
    setFilters({ name: '', addedBy: 'all', source: 'all' });
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesName = (enquiry.name || '')
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesAddedBy =
      filters.addedBy !== 'all' ? (enquiry.addedBy || 'User') === filters.addedBy : true;
    const matchesSource =
      filters.source !== 'all' ? (enquiry.source || 'Website') === filters.source : true;

    return matchesName && matchesAddedBy && matchesSource;
  });

  const convertedCount = enquiries.filter(
    (e) => (e.status || e.leadStatus) === 'converted'
  ).length;
  const contactedCount = enquiries.filter(
    (e) => (e.status || e.leadStatus) === 'contacted'
  ).length;
  const newLeadsCount = enquiries.filter(
    (e) =>
      (e.status || e.leadStatus) === 'new_lead' ||
      (e.status || e.leadStatus) === 'new' ||
      !(e.status || e.leadStatus)
  ).length;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return String(dateString);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header matching Inertia Leads.jsx */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enquiry Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and track customer enquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Enquiry</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards matching exact Inertia border styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 border-l-4 border-l-blue-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{enquiries.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-200 border-l-4 border-l-green-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Converted</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{convertedCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-200 border-l-4 border-l-purple-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{contactedCount}</p>
            </div>
            <Phone className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-200 border-l-4 border-l-amber-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{newLeadsCount}</p>
            </div>
            <Clock className="h-8 w-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Add Enquiry Form matching Leads.jsx */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden">
          <div className="bg-blue-50/70 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Add New Enquiry</span>
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleCreateEnquiry} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>Phone *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>City *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Service Category</span>
                </label>
                <select
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select service category</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name || svc.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Added By</span>
                </label>
                <select
                  value={formData.addedBy}
                  onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ADDED_BY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Source</span>
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SOURCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span>Message</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter customer message or inquiry details..."
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>Create Enquiry</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Panel matching Inertia */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3.5 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>Filter Enquiries</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Search by Name
              </label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                placeholder="Enter name to search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Added By
              </label>
              <select
                value={filters.addedBy}
                onChange={(e) => setFilters({ ...filters, addedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users</option>
                {ADDED_BY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sources</option>
                {SOURCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiries Table matching Inertia */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">
            Enquiries ({filteredEnquiries.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium text-base">No enquiries found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Details</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEnquiries.map((enquiry) => {
                  const statusKey = (enquiry.status || enquiry.leadStatus || 'new_lead').toLowerCase();
                  const statusInfo =
                    STATUS_MAP[statusKey] ||
                    (statusKey === 'new' ? STATUS_MAP.new_lead : STATUS_MAP.new_lead);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={enquiry.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Customer */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{enquiry.name || 'Anonymous'}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{enquiry.city || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-xs font-medium text-gray-900 gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            <span>{enquiry.number || enquiry.phone || 'No phone'}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            <span>{enquiry.email || 'No email'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-xs text-gray-900">
                          {enquiry.service_name || enquiry.service || 'Website Development'}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {enquiry.subservice_name || enquiry.message || 'Custom Website Design'}
                        </div>
                      </td>

                      {/* Details */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-xs">
                          <div className="flex items-center text-gray-600 gap-1">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>By:</span>
                            <span className="font-medium text-gray-900 ml-0.5">
                              {enquiry.addedBy || 'user'}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 gap-1">
                            <Settings className="h-3 w-3 text-gray-400" />
                            <span>Via:</span>
                            <span className="ml-0.5">{enquiry.source || 'website'}</span>
                          </div>
                          <div className="flex items-center text-gray-400 text-[11px] gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span>{formatDate(enquiry.created_at || enquiry.createdAt)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${statusInfo.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          <span>{statusInfo.displayName}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-center relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === enquiry.id ? null : enquiry.id)
                          }
                          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {activeDropdown === enquiry.id && (
                          <div
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="absolute right-4 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs text-left"
                          >
                            <button
                              onClick={() => handleStatusChangeRequest(enquiry.id, 'contacted')}
                              className="w-full px-3.5 py-2 text-purple-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Users className="h-3.5 w-3.5" />
                              <span>Mark as Contacted</span>
                            </button>
                            <button
                              onClick={() => handleStatusChangeRequest(enquiry.id, 'converted')}
                              className="w-full px-3.5 py-2 text-green-700 hover:bg-green-50 flex items-center gap-2 cursor-pointer"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Mark as Converted</span>
                            </button>
                            <button
                              onClick={() => handleStatusChangeRequest(enquiry.id, 'lost')}
                              className="w-full px-3.5 py-2 text-amber-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Mark as Lost</span>
                            </button>
                            <div className="border-t border-gray-100 my-1" />
                            <button
                              onClick={() => handleDelete(enquiry.id)}
                              className="w-full px-3.5 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Delete Enquiry</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog matching Inertia AlertDialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Confirm Status Change</span>
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to mark this enquiry as{' '}
              <strong className="text-gray-900">
                {STATUS_MAP[pendingStatus]?.displayName || pendingStatus}
              </strong>
              ? This action will update the lead progress.
            </p>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmStatusChange}
                disabled={isProcessing}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>Confirm Change</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
