'use client';

import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function ContactDetailPage() {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    location: '',
    email: [''],
    phone_no: [''],
    whatsapp_no: [''],
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact-details');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setContactDetails(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setFormData({
      location: '',
      email: [''],
      phone_no: [''],
      whatsapp_no: [''],
    });
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    const emails = Array.isArray(contact.email) ? contact.email : JSON.parse(contact.email || '[]');
    const phones = Array.isArray(contact.phone_no) ? contact.phone_no : JSON.parse(contact.phone_no || '[]');
    const whatsapps = Array.isArray(contact.whatsapp_no) ? contact.whatsapp_no : JSON.parse(contact.whatsapp_no || '[]');

    setFormData({
      location: contact.location || '',
      email: emails.length > 0 ? emails : [''],
      phone_no: phones.length > 0 ? phones : [''],
      whatsapp_no: whatsapps.length > 0 ? whatsapps : [''],
    });
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const updateItem = (field, index, value) => {
    const list = [...formData[field]];
    list[index] = value;
    setFormData({ ...formData, [field]: list });
  };

  const addItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeItem = (field, index) => {
    const list = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: list.length > 0 ? list : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        location: formData.location,
        email: formData.email.map((x) => x.trim()).filter(Boolean),
        phone_no: formData.phone_no.map((x) => x.trim()).filter(Boolean),
        whatsapp_no: formData.whatsapp_no.map((x) => x.trim()).filter(Boolean),
      };

      const url = editingContact
        ? `/api/admin/contact-details/${editingContact.id}`
        : '/api/admin/contact-details';
      const method = editingContact ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingContact ? 'Contact details updated!' : 'Contact details created!');
        setShowForm(false);
        fetchContacts();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving contact details');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/contact-details/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteTarget(null);
        showAlert('Contact details deleted');
        fetchContacts();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting contact details');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
      {/* Header matching ContactDetail.jsx */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Details Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Configure official office addresses, inquiry phone numbers, and WhatsApp gateways
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact Details</span>
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

      {/* Form Card */}
      {showForm && (
        <div id="contactForm" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              {editingContact ? 'Edit Contact Details' : 'Add New Contact Details'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Office Location / Address *</span>
              </label>
              <textarea
                rows={2}
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Numbers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>Phone Numbers</span>
                </label>
                <button
                  type="button"
                  onClick={() => addItem('phone_no')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  + Add Phone
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formData.phone_no.map((phone, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => updateItem('phone_no', idx, e.target.value)}
                      placeholder="+91 8860757649"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem('phone_no', idx)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Numbers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span>WhatsApp Numbers</span>
                </label>
                <button
                  type="button"
                  onClick={() => addItem('whatsapp_no')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  + Add WhatsApp
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formData.whatsapp_no.map((wa, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={wa}
                      onChange={(e) => updateItem('whatsapp_no', idx, e.target.value)}
                      placeholder="9335621987"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem('whatsapp_no', idx)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Addresses */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span>Email Addresses</span>
                </label>
                <button
                  type="button"
                  onClick={() => addItem('email')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  + Add Email
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formData.email.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateItem('email', idx, e.target.value)}
                      placeholder="hello@digitalnawab.com"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem('email', idx)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>Save Contact Details</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : contactDetails.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 text-sm">
            No contact details configured yet.
          </div>
        ) : (
          contactDetails.map((contact) => {
            const emails = Array.isArray(contact.email) ? contact.email : JSON.parse(contact.email || '[]');
            const phones = Array.isArray(contact.phone_no) ? contact.phone_no : JSON.parse(contact.phone_no || '[]');
            const whatsapps = Array.isArray(contact.whatsapp_no) ? contact.whatsapp_no : JSON.parse(contact.whatsapp_no || '[]');

            return (
              <div
                key={contact.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 space-y-5"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Office Location</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{contact.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="p-1.5 border border-gray-200 hover:bg-gray-100 rounded-lg text-gray-700 cursor-pointer"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(contact)}
                      className="p-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
                  <div>
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      <span>Phone Numbers:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {phones.map((p, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>WhatsApp Numbers:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {whatsapps.map((w, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-500" />
                      <span>Email Addresses:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {emails.map((m, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Delete Contact Details?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete this contact detail record?
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
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
