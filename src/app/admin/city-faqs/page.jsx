'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, MapPin, HelpCircle } from "lucide-react";

const emptyFaq = () => ({ question: "", answer: "" });

function FaqsRepeater({ id, faqs, onChange }) {
  const updateFaq = (index, field, value) => {
    const next = [...faqs];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addFaq = () => {
    if (faqs.length >= 20) return;
    onChange([...faqs, emptyFaq()]);
  };

  const removeFaq = (index) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">FAQ Items</label>
        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add FAQ
        </button>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500">
                Q{String(index + 1).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              id={`${id}_question_${index}`}
              value={faq.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
              placeholder="e.g. Which is the best digital marketing agency in Agra?"
              className="w-full mb-2 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id={`${id}_answer_${index}`}
              value={faq.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              placeholder="e.g. Digital Nawab is a trusted digital marketing agency serving Agra businesses, with 250+ clients..."
              rows={2}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {faqs.length === 0 && (
          <p className="text-sm text-gray-500">
            No FAQs added yet. Click &quot;Add FAQ&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default function CityFaqsPage() {
  const [cityFaqs, setCityFaqs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    city_id: "",
    heading: "",
    faqs: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [faqRes, citRes] = await Promise.all([
        fetch("/api/admin/city-faqs"),
        fetch("/api/admin/cities"),
      ]);
      const faqJson = await faqRes.json();
      const citJson = await citRes.json();

      if (faqJson.data) setCityFaqs(faqJson.data);
      if (citJson.data) setCities(citJson.data);
    } catch (err) {
      console.error("Failed to load city faqs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const openAddForm = () => {
    setFormData({
      city_id: "",
      heading: "",
      faqs: [],
    });
    setEditId(null);
    setShowForm(true);
  };

  const startEditing = (item) => {
    setEditId(item.id);
    let parsedFaqs = [];
    if (Array.isArray(item.faqs)) {
      parsedFaqs = item.faqs;
    } else if (typeof item.faqs === "string") {
      try {
        parsedFaqs = JSON.parse(item.faqs);
      } catch (e) {
        parsedFaqs = [];
      }
    }

    setFormData({
      city_id: item.city_id || "",
      heading: item.heading || "",
      faqs: parsedFaqs,
    });
    setShowForm(true);
    document.getElementById("city-faq-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      city_id: "",
      heading: "",
      faqs: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        city_id: formData.city_id,
        heading: formData.heading,
        faqs: formData.faqs,
      };

      let url = "/api/admin/city-faqs";
      let method = "POST";
      if (editId) {
        url = `/api/admin/city-faqs/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save city FAQ section");

      showAlert(editId ? "FAQ section updated!" : "FAQ section created!");
      closeForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Error saving FAQs", "error");
    } finally {
      setProcessing(false);
    }
  };

  const destroyItem = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ section?")) return;
    try {
      const res = await fetch(`/api/admin/city-faqs/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("FAQ section deleted successfully!");
        fetchData();
      }
    } catch (e) {
      showAlert("Failed to delete", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage localized FAQ questions &amp; answers by target city</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add FAQ Section
          </button>
        )}
      </div>

      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl border flex justify-between items-center ${
            alert.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          <span className="text-sm font-medium">{alert.message}</span>
          <button onClick={() => setAlert(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showForm && (
        <div id="city-faq-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit FAQ Section" : "Create New FAQ Section"}
            </h2>
            <button
              onClick={closeForm}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="city_id" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <select
                  id="city_id"
                  value={formData.city_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city_id: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading (optional — default: &quot;Frequently Asked Questions&quot;)
                </label>
                <input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Frequently Asked Questions"
                />
              </div>

              <FaqsRepeater
                id="faqs"
                faqs={formData.faqs}
                onChange={(faqs) => setFormData((prev) => ({ ...prev, faqs }))}
              />

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? "Saving..." : editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6">
        {cityFaqs.map((cf) => {
          let faqs = [];
          if (Array.isArray(cf.faqs)) faqs = cf.faqs;
          else if (typeof cf.faqs === "string") {
            try {
              faqs = JSON.parse(cf.faqs);
            } catch (e) {
              faqs = [];
            }
          }

          const city = cities.find((c) => c.id === cf.city_id);
          const heading = cf.heading || "Frequently Asked Questions";

          return (
            <div
              key={cf.id}
              className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {city?.name || `City #${cf.city_id}`}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{heading}</h3>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(cf)}
                      className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyItem(cf.id)}
                      className="p-1.5 border border-gray-200 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {faqs.length > 0 ? (
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {faq.question || "Untitled question"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">
                    No FAQs added yet for this city.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {cityFaqs.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No FAQ sections yet.</p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add your first FAQ section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
