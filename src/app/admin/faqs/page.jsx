'use client';

import { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Save,
  MessageCircleQuestion,
  FileText,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs');
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        setFaqs(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setEditingId(null);
  };

  const handleEdit = (faq) => {
    setEditingId(faq.id);
    setQuestion(faq.question || '');
    setAnswer(faq.answer || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert('Please fill in both Question and Answer');
      return;
    }

    setProcessing(true);
    try {
      const url = editingId ? `/api/admin/faqs/${editingId}` : '/api/admin/faqs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });

      const json = await res.json();
      if (res.ok && json.status) {
        showAlert(editingId ? 'FAQ updated successfully!' : 'FAQ added successfully!');
        resetForm();
        fetchFaqs();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving FAQ');
    } finally {
      setProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/faqs/${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setDeleteId(null);
        showAlert('FAQ deleted successfully');
        fetchFaqs();
      } else {
        alert(json.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting FAQ');
    }
  };

  const isFormValid = question.trim() && answer.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section matching Inertia FAQPage.jsx */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <HelpCircle className="h-10 w-10 text-purple-600" />
            <span>FAQ Management</span>
          </h1>
          <p className="text-lg text-gray-600">
            Create and manage frequently asked questions for your website visitors
          </p>
        </div>

        {/* Flash Message */}
        {alertMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center justify-between max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-sm">{alertMessage}</span>
            </div>
            <button onClick={() => setAlertMessage('')} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="shadow-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  {editingId ? (
                    <>
                      <Edit3 className="h-5 w-5" />
                      <span>Edit FAQ</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add New FAQ</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MessageCircleQuestion className="h-4 w-4 text-purple-600" />
                      <span>Question *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g. How does your digital marketing package work?"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-pink-600" />
                      <span>Answer *</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Provide a clear and helpful explanation..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={processing || !isFormValid}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {processing ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      <span>{editingId ? 'Update FAQ' : 'Add FAQ'}</span>
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>FAQ Tips</span>
              </h3>
              <p className="text-xs text-pink-100 leading-relaxed">
                Anticipate real questions that clients ask regarding contract duration, reporting cycles, package scopes, and payment procedures.
              </p>
            </div>
          </div>

          {/* FAQs List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                FAQs List ({faqs?.length || 0})
              </h2>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
              {loading ? (
                <div className="bg-white/80 rounded-2xl p-12 text-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                </div>
              ) : faqs?.length === 0 ? (
                <div className="bg-white/80 rounded-2xl p-8 text-center shadow-md">
                  <p className="text-gray-600 text-base font-medium">No FAQs added yet</p>
                </div>
              ) : (
                faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 shrink-0">
                          Q{index + 1}
                        </span>
                        <h3 className="font-bold text-gray-900 text-base">{faq.question}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-1.5 border border-gray-200 hover:bg-purple-50 rounded-lg text-gray-600 transition-colors cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(faq.id)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 pl-8 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
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
                  Are you sure you want to delete this FAQ?
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
                Delete FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
