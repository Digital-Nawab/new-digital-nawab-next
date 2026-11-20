'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, MapPin } from "lucide-react";

const emptyStep = () => ({ title: "", description: "" });

function StepsRepeater({ id, steps, onChange }) {
  const updateStep = (index, field, value) => {
    const next = [...steps];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addStep = () => {
    if (steps.length >= 8) return;
    onChange([...steps, emptyStep()]);
  };

  const removeStep = (index) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">Process Steps</label>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Step
        </button>
      </div>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              id={`${id}_title_${index}`}
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
              placeholder="e.g. Discover"
              className="w-full mb-2 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id={`${id}_description_${index}`}
              value={step.description}
              onChange={(e) => updateStep(index, "description", e.target.value)}
              placeholder="e.g. We study your business, your city's competitors, and where your customers actually search."
              rows={2}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {steps.length === 0 && (
          <p className="text-sm text-gray-500">
            No steps added yet. Click &quot;Add Step&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default function HowWeWorkPage() {
  const [howWeWorks, setHowWeWorks] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    city_id: "",
    heading: "",
    subheading: "",
    steps: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hwRes, citRes] = await Promise.all([
        fetch("/api/admin/how-we-works"),
        fetch("/api/admin/cities"),
      ]);
      const hwJson = await hwRes.json();
      const citJson = await citRes.json();

      if (hwJson.data) setHowWeWorks(hwJson.data);
      if (citJson.data) setCities(citJson.data);
    } catch (err) {
      console.error("Failed to load how we works", err);
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
      subheading: "",
      steps: [],
    });
    setEditId(null);
    setShowForm(true);
  };

  const startEditing = (hw) => {
    setEditId(hw.id);
    let parsedSteps = [];
    if (Array.isArray(hw.steps)) {
      parsedSteps = hw.steps;
    } else if (typeof hw.steps === "string") {
      try {
        parsedSteps = JSON.parse(hw.steps);
      } catch (e) {
        parsedSteps = [];
      }
    }

    setFormData({
      city_id: hw.city_id || "",
      heading: hw.heading || "",
      subheading: hw.subheading || "",
      steps: parsedSteps,
    });
    setShowForm(true);
    document.getElementById("how-we-work-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      city_id: "",
      heading: "",
      subheading: "",
      steps: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        city_id: formData.city_id,
        heading: formData.heading,
        subheading: formData.subheading,
        steps: formData.steps,
      };

      let url = "/api/admin/how-we-works";
      let method = "POST";
      if (editId) {
        url = `/api/admin/how-we-works/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save how-we-work section");

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
    if (!confirm("Are you sure you want to delete this How We Work section?")) return;
    try {
      const res = await fetch(`/api/admin/how-we-works/${id}`, { method: "DELETE" });
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
          <h1 className="text-3xl font-bold text-gray-900">How We Work</h1>
          <p className="text-sm text-gray-500 mt-1">Manage 4-step execution and working methodology per city</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add How We Work
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
        <div id="how-we-work-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit How We Work" : "Create New How We Work"}
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
                  Heading (optional — default: &quot;How We Work&quot;)
                </label>
                <input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How We Work"
                />
              </div>

              <div>
                <label htmlFor="subheading" className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading (optional)
                </label>
                <textarea
                  id="subheading"
                  value={formData.subheading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subheading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="A simple, transparent process from day one to ongoing growth."
                />
              </div>

              <StepsRepeater
                id="steps"
                steps={formData.steps}
                onChange={(steps) => setFormData((prev) => ({ ...prev, steps }))}
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

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {howWeWorks.map((hw) => {
          let steps = [];
          if (Array.isArray(hw.steps)) steps = hw.steps;
          else if (typeof hw.steps === "string") {
            try {
              steps = JSON.parse(hw.steps);
            } catch (e) {
              steps = [];
            }
          }

          const city = cities.find((c) => c.id === hw.city_id);
          const heading = hw.heading || "How We Work";
          const subheading =
            hw.subheading ||
            "A simple, transparent process from day one to ongoing growth.";

          return (
            <div
              key={hw.id}
              className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {city?.name || `City #${hw.city_id}`}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{heading}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subheading}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(hw)}
                      className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyItem(hw.id)}
                      className="p-1.5 border border-gray-200 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {steps.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                        <span className="text-lg font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {step.title || "Untitled"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">
                    No steps added yet for this city.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {howWeWorks.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No &quot;How We Work&quot; sections yet.</p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add your first How We Work section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
