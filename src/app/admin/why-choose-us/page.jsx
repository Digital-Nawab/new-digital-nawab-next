'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, MapPin, CheckCircle2 } from "lucide-react";

const emptyReason = () => "";

function ReasonsRepeater({ id, reasons, onChange }) {
  const updateReason = (index, value) => {
    const next = [...reasons];
    next[index] = value;
    onChange(next);
  };

  const addReason = () => {
    if (reasons.length >= 12) return;
    onChange([...reasons, emptyReason()]);
  };

  const removeReason = (index) => {
    onChange(reasons.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">Reasons (checklist items)</label>
        <button
          type="button"
          onClick={addReason}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Reason
        </button>
      </div>
      <div className="space-y-2">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
            <input
              id={`${id}_reason_${index}`}
              value={reason}
              onChange={(e) => updateReason(index, e.target.value)}
              placeholder="e.g. 250+ Happy Clients across India"
              className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeReason(index)}
              className="text-gray-400 hover:text-red-500 shrink-0 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {reasons.length === 0 && (
          <p className="text-sm text-gray-500">
            No reasons added yet. Click &quot;Add Reason&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default function WhyChooseUsPage() {
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    city_id: "",
    heading: "",
    reasons: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wcRes, citRes] = await Promise.all([
        fetch("/api/admin/why-choose-us"),
        fetch("/api/admin/cities"),
      ]);
      const wcJson = await wcRes.json();
      const citJson = await citRes.json();

      if (wcJson.data) setWhyChooseUs(wcJson.data);
      if (citJson.data) setCities(citJson.data);
    } catch (err) {
      console.error("Failed to load why choose us", err);
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

  const cityName = (id) => cities.find((c) => c.id === Number(id))?.name || "";

  const openAddForm = () => {
    setFormData({
      city_id: "",
      heading: "",
      reasons: [],
    });
    setEditId(null);
    setShowForm(true);
  };

  const startEditing = (item) => {
    setEditId(item.id);
    let parsedReasons = [];
    if (Array.isArray(item.reasons)) {
      parsedReasons = item.reasons;
    } else if (typeof item.reasons === "string") {
      try {
        parsedReasons = JSON.parse(item.reasons);
      } catch (e) {
        parsedReasons = [];
      }
    }

    setFormData({
      city_id: item.city_id || "",
      heading: item.heading || "",
      reasons: parsedReasons,
    });
    setShowForm(true);
    document.getElementById("why-choose-us-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      city_id: "",
      heading: "",
      reasons: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        city_id: formData.city_id,
        heading: formData.heading,
        reasons: formData.reasons,
      };

      let url = "/api/admin/why-choose-us";
      let method = "POST";
      if (editId) {
        url = `/api/admin/why-choose-us/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save Why Choose Us section");

      showAlert(editId ? "Section updated successfully!" : "Section created successfully!");
      closeForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Error saving section", "error");
    } finally {
      setProcessing(false);
    }
  };

  const destroyItem = async (id) => {
    if (!confirm("Are you sure you want to delete this Why Choose Us section?")) return;
    try {
      const res = await fetch(`/api/admin/why-choose-us/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Section deleted successfully!");
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
          <h1 className="text-3xl font-bold text-gray-900">Why Choose Us</h1>
          <p className="text-sm text-gray-500 mt-1">Manage key proof points and checklist reasons per city</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Why Choose Us
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
        <div id="why-choose-us-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit Why Choose Us" : "Create New Why Choose Us"}
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
                  Heading (optional — default: &quot;Why Choose Digital Nawab in {cityName(formData.city_id) || "{City}"}?&quot;)
                </label>
                <input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Why Choose Digital Nawab in ${cityName(formData.city_id) || "Agra"}?`}
                />
              </div>

              <ReasonsRepeater
                id="reasons"
                reasons={formData.reasons}
                onChange={(reasons) => setFormData((prev) => ({ ...prev, reasons }))}
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
        {whyChooseUs.map((wc) => {
          let reasons = [];
          if (Array.isArray(wc.reasons)) reasons = wc.reasons;
          else if (typeof wc.reasons === "string") {
            try {
              reasons = JSON.parse(wc.reasons);
            } catch (e) {
              reasons = [];
            }
          }

          const city = cities.find((c) => c.id === wc.city_id);
          const heading = wc.heading || `Why Choose Digital Nawab in ${city?.name || ""}?`;

          return (
            <div
              key={wc.id}
              className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {city?.name || `City #${wc.city_id}`}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{heading}</h3>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(wc)}
                      className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyItem(wc.id)}
                      className="p-1.5 border border-gray-200 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {reasons.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {reasons.map((reason, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-700">{reason}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">
                    No reasons added yet for this city.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {whyChooseUs.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No &quot;Why Choose Us&quot; sections yet.</p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add your first Why Choose Us section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
