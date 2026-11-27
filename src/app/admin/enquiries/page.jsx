'use client';

import { useState, useEffect, useMemo } from 'react';
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
  Download,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
} from 'lucide-react';

const STATUS_MAP = {
  new_lead: {
    displayName: 'New Lead',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Clock,
  },
  new: {
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

const ADDED_BY_OPTIONS = ['User', 'Website', 'Ujjwal Porwal', 'Sharad Verma', 'Punit Shukla'];
const SOURCE_OPTIONS = ['Website', 'Call', 'WhatsApp', 'Admin Panel'];

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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    addedBy: 'all',
    source: 'all',
    datePreset: 'all', // all, today, yesterday, last7, this_month, last_month, month, custom
    selectedMonth: '', // YYYY-MM
    startDate: '', // YYYY-MM-DD
    endDate: '', // YYYY-MM-DD
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
        fetch(`/api/admin/enquiries?t=${Date.now()}`, { cache: 'no-store' }).then((r) => r.json()),
        fetch(`/api/admin/services?t=${Date.now()}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
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
    setFilters({
      search: '',
      status: 'all',
      addedBy: 'all',
      source: 'all',
      datePreset: 'all',
      selectedMonth: '',
      startDate: '',
      endDate: '',
    });
    setCurrentPage(1);
  };

  // Helper date parsing
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Filtered enquiries logic
  const filteredEnquiries = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return enquiries.filter((enquiry) => {
      // 1. Search Query
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matches =
          (enquiry.name || '').toLowerCase().includes(query) ||
          (enquiry.email || '').toLowerCase().includes(query) ||
          (enquiry.number || enquiry.phone || '').toLowerCase().includes(query) ||
          (enquiry.city || '').toLowerCase().includes(query) ||
          (enquiry.service_name || enquiry.service || '').toLowerCase().includes(query) ||
          (enquiry.message || '').toLowerCase().includes(query);
        if (!matches) return false;
      }

      // 2. Added By
      if (filters.addedBy !== 'all') {
        const addedBy = (enquiry.addedBy || 'User').toLowerCase();
        if (addedBy !== filters.addedBy.toLowerCase()) return false;
      }

      // 3. Source
      if (filters.source !== 'all') {
        const source = (enquiry.source || 'Website').toLowerCase();
        if (source !== filters.source.toLowerCase()) return false;
      }

      // 4. Status
      if (filters.status !== 'all') {
        const status = (enquiry.status || enquiry.leadStatus || 'new_lead').toLowerCase();
        if (filters.status === 'new_lead' && (status === 'new' || status === 'new_lead')) {
          // matches
        } else if (status !== filters.status.toLowerCase()) {
          return false;
        }
      }

      // 5. Date Filters
      if (filters.datePreset !== 'all') {
        const rawDate = enquiry.created_at || enquiry.createdAt;
        if (!rawDate) return false;
        const enqDate = new Date(rawDate);

        if (isNaN(enqDate.getTime())) return false;

        if (filters.datePreset === 'today') {
          if (!isSameDay(enqDate, today)) return false;
        } else if (filters.datePreset === 'yesterday') {
          if (!isSameDay(enqDate, yesterday)) return false;
        } else if (filters.datePreset === 'last7') {
          if (enqDate < sevenDaysAgo) return false;
        } else if (filters.datePreset === 'this_month') {
          if (
            enqDate.getFullYear() !== now.getFullYear() ||
            enqDate.getMonth() !== now.getMonth()
          ) {
            return false;
          }
        } else if (filters.datePreset === 'last_month') {
          const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          if (
            enqDate.getFullYear() !== lastMonthDate.getFullYear() ||
            enqDate.getMonth() !== lastMonthDate.getMonth()
          ) {
            return false;
          }
        } else if (filters.datePreset === 'month' && filters.selectedMonth) {
          const [yr, mo] = filters.selectedMonth.split('-').map(Number);
          if (
            enqDate.getFullYear() !== yr ||
            enqDate.getMonth() + 1 !== mo
          ) {
            return false;
          }
        } else if (filters.datePreset === 'custom') {
          if (filters.startDate) {
            const start = new Date(filters.startDate);
            start.setHours(0, 0, 0, 0);
            if (enqDate < start) return false;
          }
          if (filters.endDate) {
            const end = new Date(filters.endDate);
            end.setHours(23, 59, 59, 999);
            if (enqDate > end) return false;
          }
        }
      }

      return true;
    });
  }, [enquiries, filters]);

  // Reset pagination when filter results change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination Slicing
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage) || 1;
  const paginatedEnquiries = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredEnquiries.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredEnquiries, currentPage, itemsPerPage]);

  // Stats Counters
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

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      return `${d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } catch (e) {
      return String(dateString);
    }
  };

  // CSV Export Function
  const exportToCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert('No enquiries to export with the current filter.');
      return;
    }

    const headers = [
      'Enquiry ID',
      'Date & Time',
      'Customer Name',
      'Phone Number',
      'Email',
      'City',
      'Service',
      'Subservice',
      'Source',
      'Status',
      'Added By',
      'Message',
    ];

    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = filteredEnquiries.map((e) => [
      e.id,
      escapeCsv(formatDateTime(e.created_at || e.createdAt)),
      escapeCsv(e.name || ''),
      escapeCsv(e.number || e.phone || ''),
      escapeCsv(e.email || ''),
      escapeCsv(e.city || ''),
      escapeCsv(e.service_name || e.service || ''),
      escapeCsv(e.subservice_name || ''),
      escapeCsv(e.source || 'Website'),
      escapeCsv(e.status || e.leadStatus || 'New Lead'),
      escapeCsv(e.addedBy || 'User'),
      escapeCsv(e.message || ''),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `enquiries_export_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Enquiry Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Manage, filter, track and export customer enquiries</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            title="Export filtered enquiries to CSV"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Enquiry</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
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

      {/* Add Enquiry Form Modal/Card */}
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

      {/* Advanced Filter Panel */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3.5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>Filter Enquiries ({filteredEnquiries.length} matching)</span>
          </h2>
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Row 1: Search, Status, Source, Added By */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Search (Name, Phone, Email, City)
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Type to search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Lead Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="new_lead">New Lead</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
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

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Added By
              </label>
              <select
                value={filters.addedBy}
                onChange={(e) => setFilters({ ...filters, addedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users / Sources</option>
                {ADDED_BY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Date & Month Filters */}
          <div className="pt-2 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <CalendarRange className="w-3.5 h-3.5 text-blue-600" />
                  <span>Date Preset Filter</span>
                </label>
                <select
                  value={filters.datePreset}
                  onChange={(e) => setFilters({ ...filters, datePreset: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7">Last 7 Days</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="month">Specific Month</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>

              {/* Specific Month Selector */}
              {filters.datePreset === 'month' && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                    Select Month (YYYY-MM)
                  </label>
                  <input
                    type="month"
                    value={filters.selectedMonth}
                    onChange={(e) => setFilters({ ...filters, selectedMonth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Custom Date Range: Start Date */}
              {filters.datePreset === 'custom' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      From Date (Start)
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      To Date (End)
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Clear Button */}
              {filters.datePreset !== 'custom' && filters.datePreset !== 'month' && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiries Table Card */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        {/* Table Top Bar */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-800">
              Enquiries List ({filteredEnquiries.length})
            </h2>
            {filteredEnquiries.length !== enquiries.length && (
              <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                Filtered from {enquiries.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium text-base">No enquiries found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or date range</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-gray-500">#</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Service & Message</th>
                    <th className="py-3.5 px-4">Origin / Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedEnquiries.map((enquiry, index) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                    const statusKey = (enquiry.status || enquiry.leadStatus || 'new_lead').toLowerCase();
                    const statusInfo =
                      STATUS_MAP[statusKey] ||
                      (statusKey === 'new' ? STATUS_MAP.new_lead : STATUS_MAP.new_lead);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={enquiry.id} className="hover:bg-gray-50/70 transition-colors">
                        {/* Row Index */}
                        <td className="py-4 px-4 text-xs font-mono text-gray-400">
                          {rowNumber}
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">{enquiry.name || 'Anonymous'}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>{enquiry.city || 'Lucknow'}</span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-xs font-medium text-gray-900 gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              <a
                                href={`tel:${enquiry.number || enquiry.phone}`}
                                className="hover:text-blue-600 hover:underline"
                              >
                                {enquiry.number || enquiry.phone || 'No phone'}
                              </a>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 gap-1.5">
                              <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              <a
                                href={`mailto:${enquiry.email}`}
                                className="hover:text-blue-600 hover:underline truncate max-w-[180px]"
                              >
                                {enquiry.email || 'No email'}
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* Service & Message */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-medium text-xs text-gray-900">
                            {enquiry.service_name || enquiry.service || 'Website / Marketing'}
                          </div>
                          {enquiry.subservice_name && (
                            <div className="text-[11px] text-blue-600 font-medium">
                              {enquiry.subservice_name}
                            </div>
                          )}
                          {enquiry.message && (
                            <div
                              className="text-xs text-gray-500 mt-1 line-clamp-2"
                              title={enquiry.message}
                            >
                              {enquiry.message}
                            </div>
                          )}
                        </td>

                        {/* Origin / Date */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5 text-xs">
                            <div className="flex items-center text-gray-600 gap-1">
                              <User className="h-3 w-3 text-gray-400" />
                              <span>By:</span>
                              <span className="font-medium text-gray-900 ml-0.5">
                                {enquiry.addedBy || 'Website'}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-500 gap-1">
                              <Settings className="h-3 w-3 text-gray-400" />
                              <span>Via:</span>
                              <span className="ml-0.5">{enquiry.source || 'Website'}</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-[11px] gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span title={formatDateTime(enquiry.created_at || enquiry.createdAt)}>
                                {formatDate(enquiry.created_at || enquiry.createdAt)}
                              </span>
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

            {/* Pagination Controls */}
            <div className="bg-gray-50/70 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-700">
                  {filteredEnquiries.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-gray-700">
                  {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)}
                </span>{' '}
                of <span className="font-semibold text-gray-700">{filteredEnquiries.length}</span> entries
              </div>

              <div className="flex items-center gap-1.5">
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs font-medium cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Page Numbers Indicator */}
                <span className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs font-medium cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
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
