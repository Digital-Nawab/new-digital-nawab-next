'use client';

import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Pencil, Trash2, MapPin, ImagePlus, Quote } from "lucide-react";

export default function CityTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    city_id: "",
    name: "",
    designation: "",
    quote: "",
    image: null,
    sort_order: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tRes, cRes] = await Promise.all([
        fetch("/api/admin/city-testimonials"),
        fetch("/api/admin/cities"),
      ]);
      const tJson = await tRes.json();
      const cJson = await cRes.json();

      if (tJson.data) setTestimonials(tJson.data);
      if (cJson.data) setCities(cJson.data);
    } catch (err) {
      console.error("Failed to load testimonials", err);
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

  const resolveImg = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  const openAddForm = () => {
    setFormData({
      city_id: "",
      name: "",
      designation: "",
      quote: "",
      image: null,
      sort_order: 0,
    });
    setEditId(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(true);
  };

  const startEditing = (item) => {
    setEditId(item.id);
    setFormData({
      city_id: item.city_id || "",
      name: item.name || "",
      designation: item.designation || "",
      quote: item.quote || "",
      image: null,
      sort_order: item.sort_order || 0,
    });
    setPreview(resolveImg(item.image));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(true);
    document.getElementById("city-testimonial-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const dataPayload = new FormData();
      dataPayload.append("city_id", formData.city_id);
      dataPayload.append("name", formData.name);
      dataPayload.append("designation", formData.designation);
      dataPayload.append("quote", formData.quote);
      dataPayload.append("sort_order", formData.sort_order);

      if (formData.image instanceof File) {
        dataPayload.append("image", formData.image);
      }

      let url = "/api/admin/city-testimonials";
      let method = "POST";
      if (editId) {
        url = `/api/admin/city-testimonials/${editId}`;
      }

      const res = await fetch(url, {
        method,
        body: dataPayload,
      });

      if (!res.ok) throw new Error("Failed to save testimonial");

      showAlert(editId ? "Testimonial updated!" : "Testimonial created!");
      closeForm();
      fetchData();
    } catch (err) {
      showAlert(err.message || "Error saving testimonial", "error");
    } finally {
      setProcessing(false);
    }
  };

  const destroyItem = async (id) => {
    if (!confirm("Are you sure you want to delete this Testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/city-testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Testimonial deleted successfully!");
        fetchData();
      }
    } catch (e) {
      showAlert("Failed to delete", "error");
    }
  };

  // Group testimonials by city
  const grouped = testimonials.reduce((acc, t) => {
    const city = cities.find((c) => c.id === t.city_id);
    const key = city?.name || `City #${t.city_id}` || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Client&apos;s Voice</h1>
          <p className="text-sm text-gray-500 mt-1">Manage localized testimonials and client reviews per city</p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
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
        <div id="city-testimonial-form" className="mb-8 border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit Testimonial" : "Create New Testimonial"}
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Sarah Chen"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => setFormData((prev) => ({ ...prev, designation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Product Manager at TechFlow"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData((prev) => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="The attention to detail and innovative features have completely transformed our workflow..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Photo {editId && "(leave empty to keep current image)"}
                </label>
                <div className="mt-1 flex items-start gap-3">
                  <label
                    htmlFor="client_image"
                    className="flex items-center justify-center w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer overflow-hidden shrink-0 hover:bg-gray-100 transition-colors"
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="w-6 h-6 text-gray-400" />
                    )}
                  </label>
                  <input
                    ref={fileInputRef}
                    id="client_image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or WEBP. Max 2MB. Click on the box to select or replace photo.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order (lower shows first)
                </label>
                <input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                />
              </div>

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

      {Object.keys(grouped).length === 0 && !showForm && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl bg-white">
          <p className="text-gray-500 mb-4">No testimonials yet.</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add your first Testimonial
          </button>
        </div>
      )}

      {Object.entries(grouped).map(([city, items]) => (
        <div key={city} className="mb-8">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{city}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t) => (
              <div
                key={t.id}
                className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={resolveImg(t.image)}
                    alt={t.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                    {t.designation && (
                      <p className="text-xs text-gray-500 truncate">{t.designation}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditing(t)}
                      className="p-1 border border-gray-200 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => destroyItem(t.id)}
                      className="p-1 border border-gray-200 hover:bg-red-50 text-red-500 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <Quote className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
                  <p className="line-clamp-4">{t.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
