'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, MapPin } from "lucide-react";

const emptyItem = () => ({ title: "", description: "" });

function ItemsRepeater({ id, items, onChange }) {
  const updateItem = (index, field, value) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addItem = () => {
    if (items.length >= 8) return;
    onChange([...items, emptyItem()]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">Approach Cards</label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Card
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              id={`${id}_title_${index}`}
              value={item.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
              placeholder="e.g. ROI-Focused Execution"
              className="w-full mb-2 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id={`${id}_description_${index}`}
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="e.g. Every campaign is built and measured against one thing: return on your investment."
              rows={2}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-500">
            No cards added yet. Click &quot;Add Card&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default function ApproachesPage() {
  const [approaches, setApproaches] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    city_id: "",
    heading: "",
    items: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, citRes] = await Promise.all([
        fetch("/api/admin/approaches"),
        fetch("/api/admin/cities"),
      ]);
      const appJson = await appRes.json();
      const citJson = await citRes.json();

      if (appJson.data) setApproaches(appJson.data);
      if (citJson.data) setCities(citJson.data);
    } catch (err) {
      console.error("Failed to load approaches", err);
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
    setFormData({ city_id: "", heading: "", items: [] });
    setEditId(null);
    setShowForm(true);
  };

  const startEditing = (approach) => {
    setEditId(approach.id);
    let parsedItems = [];
    if (Array.isArray(approach.items)) {
      parsedItems = approach.items;
    } else if (typeof approach.items === "string") {
      try {
        parsedItems = JSON.parse(approach.items);
      } catch (e) {
        parsedItems = [];
      }
    }

    setFormData({
      city_id: approach.city_id || "",
      heading: approach.heading || "",
      items: parsedItems,
    });
    setShowForm(true);
    document.getElementById("approach-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ city_id: "", heading: "", items: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        city_id: formData.city_id,
        heading: formData.heading,
        items: formData.items,
      };

      let url = "/api/admin/approaches";
      let method = "POST";
      if (editId) {
        url = `/api/admin/approaches/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save approach");

      showAlert(editId ? "Approach updated successfully!" : "Approach created successfully!");
      closeForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Error saving approach", "error");
    } finally {
      setProcessing(false);
    }
  };

  const destroyApproach = async (id) => {
    if (!confirm("Are you sure you want to delete this Approach section?")) return;
    try {
      const res = await fetch(`/api/admin/approaches/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Approach section deleted successfully!");
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
          <h1 className="text-3xl font-bold text-gray-900">Why Businesses Work With Us</h1>
          <p className="text-sm text-gray-500 mt-1">Manage city-specific approach cards and value propositions</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Approach
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
        <div id="approach-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit Approach" : "Create New Approach"}
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
                  Heading (optional — leave blank for auto: &quot;Why Businesses in{" "}
                  {cityName(formData.city_id) || "{City}"} Work With Us&quot;)
                </label>
                <input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Why Businesses in ${cityName(formData.city_id) || "Agra"} Work With Us`}
                />
              </div>

              <ItemsRepeater
                id="items"
                items={formData.items}
                onChange={(items) => setFormData((prev) => ({ ...prev, items }))}
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

      {/* Grid of Approach Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {approaches.map((approach) => {
          let items = [];
          if (Array.isArray(approach.items)) items = approach.items;
          else if (typeof approach.items === "string") {
            try {
              items = JSON.parse(approach.items);
            } catch (e) {
              items = [];
            }
          }

          const city = cities.find((c) => c.id === approach.city_id);
          const heading =
            approach.heading ||
            `Why Businesses in ${city?.name || "this City"} Work With Us`;

          return (
            <div
              key={approach.id}
              className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {city?.name || `City #${approach.city_id}`}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{heading}</h3>
                    {!approach.heading && (
                      <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-medium bg-gray-200 text-gray-700 rounded">
                        Auto-generated heading
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(approach)}
                      className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyApproach(approach.id)}
                      className="p-1.5 border border-gray-200 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((item, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                        <span className="text-xs font-bold text-gray-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {item.title || "Untitled"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">
                    No cards added yet for this city.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {approaches.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No approach sections yet.</p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add your first Approach
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
