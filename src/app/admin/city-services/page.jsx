'use client';

import React, { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, MapPin } from "lucide-react";

const emptyItem = () => ({ title: "", description: "" });

function LetterAvatar({ title, className = "" }) {
  const letter = (title || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white shrink-0 ${className}`}
      style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
    >
      {letter}
    </div>
  );
}

function ItemsRepeater({ id, items, onChange }) {
  const updateItem = (index, field, value) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addItem = () => {
    if (items.length >= 12) return;
    onChange([...items, emptyItem()]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">Service Cards</label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <LetterAvatar title={item.title} className="w-7 h-7 text-xs" />
                <span className="text-xs font-semibold text-gray-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
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
              placeholder="e.g. Search Engine Optimization"
              className="w-full mb-2 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id={`${id}_description_${index}`}
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="e.g. Rank on page 1 of Google for the keywords your city's customers are searching for."
              rows={2}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-500">
            No services added yet. Click &quot;Add Service&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default function CityServicesPage() {
  const [cityServices, setCityServices] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    city_id: "",
    badge_text: "",
    heading: "",
    subheading: "",
    items: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [srvRes, citRes] = await Promise.all([
        fetch("/api/admin/city-services"),
        fetch("/api/admin/cities"),
      ]);
      const srvJson = await srvRes.json();
      const citJson = await citRes.json();

      if (srvJson.data) setCityServices(srvJson.data);
      if (citJson.data) setCities(citJson.data);
    } catch (err) {
      console.error("Failed to load city services", err);
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
      badge_text: "",
      heading: "",
      subheading: "",
      items: [],
    });
    setEditId(null);
    setShowForm(true);
  };

  const startEditing = (cs) => {
    setEditId(cs.id);
    let parsedItems = [];
    if (Array.isArray(cs.items)) {
      parsedItems = cs.items;
    } else if (typeof cs.items === "string") {
      try {
        parsedItems = JSON.parse(cs.items);
      } catch (e) {
        parsedItems = [];
      }
    }

    setFormData({
      city_id: cs.city_id || "",
      badge_text: cs.badge_text || "",
      heading: cs.heading || "",
      subheading: cs.subheading || "",
      items: parsedItems,
    });
    setShowForm(true);
    document.getElementById("city-services-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      city_id: "",
      badge_text: "",
      heading: "",
      subheading: "",
      items: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        city_id: formData.city_id,
        badge_text: formData.badge_text,
        heading: formData.heading,
        subheading: formData.subheading,
        items: formData.items,
      };

      let url = "/api/admin/city-services";
      let method = "POST";
      if (editId) {
        url = `/api/admin/city-services/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save services");

      showAlert(editId ? "Services section updated!" : "Services section created!");
      closeForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Error saving services", "error");
    } finally {
      setProcessing(false);
    }
  };

  const destroyItem = async (id) => {
    if (!confirm("Are you sure you want to delete this Services section?")) return;
    try {
      const res = await fetch(`/api/admin/city-services/${id}`, { method: "DELETE" });
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
          <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
          <p className="text-sm text-gray-500 mt-1">Manage localized services grid customized for each target city</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Services Section
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
        <div id="city-services-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit Services Section" : "Create New Services Section"}
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
                <label htmlFor="badge_text" className="block text-sm font-medium text-gray-700 mb-1">
                  Badge Text (optional)
                </label>
                <input
                  id="badge_text"
                  value={formData.badge_text}
                  onChange={(e) => setFormData((prev) => ({ ...prev, badge_text: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="OUR SERVICES"
                />
              </div>

              <div>
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading (optional — default: &quot;Our Services in {cityName(formData.city_id) || "{City}"}&quot;)
                </label>
                <input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Our Services in ${cityName(formData.city_id) || "Agra"}`}
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
                  placeholder="End-to-end digital solutions, tailored to your business goals."
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

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cityServices.map((cs) => {
          let items = [];
          if (Array.isArray(cs.items)) items = cs.items;
          else if (typeof cs.items === "string") {
            try {
              items = JSON.parse(cs.items);
            } catch (e) {
              items = [];
            }
          }

          const city = cities.find((c) => c.id === cs.city_id);
          const heading = cs.heading || `Our Services in ${city?.name || ""}`;
          const badge = cs.badge_text || "OUR SERVICES";
          const subheading =
            cs.subheading ||
            "End-to-end digital solutions, tailored to your business goals.";

          return (
            <div
              key={cs.id}
              className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {city?.name || `City #${cs.city_id}`}
                    </div>
                    <span className="inline-block mb-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-purple-100 text-purple-700 rounded border border-purple-200">
                      {badge}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{heading}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subheading}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(cs)}
                      className="p-1.5 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyItem(cs.id)}
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
                        <div className="flex items-center gap-2 mb-1.5">
                          <LetterAvatar title={item.title} className="w-7 h-7 text-xs" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{item.title || "Untitled"}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">
                    No services added yet for this city.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {cityServices.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No services sections yet.</p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add your first Services section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
