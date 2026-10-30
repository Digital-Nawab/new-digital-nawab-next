import { useState, useRef } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, Plus, Pencil, Trash2, MapPin, ImagePlus, Quote } from "lucide-react";

export default function Testimonial({ testimonials, cities }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        city_id: "",
        name: "",
        designation: "",
        quote: "",
        image: null,
        sort_order: 0,
        _method: "post",
    });

    const openAddForm = () => {
        reset();
        setData("_method", "post");
        setEditId(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowForm(true);
    };

    const startEditing = (item) => {
        setEditId(item.id);
        setData({
            city_id: item.city_id,
            name: item.name || "",
            designation: item.designation || "",
            quote: item.quote || "",
            image: null,
            sort_order: item.sort_order || 0,
            _method: "put",
        });
        setPreview(`/${item.image}`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowForm(true);
        document.getElementById("city-testimonial-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        setPreview(null);
        reset();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData("image", file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editId
            ? route("city-testimonials.update", editId)
            : route("city-testimonials.store");

        post(url, {
            forceFormData: true,
            onSuccess: () => closeForm(),
        });
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this Testimonial?")) return;
        router.delete(route("city-testimonials.destroy", id));
    };

    // group testimonials by city for a cleaner listing
    const grouped = testimonials.reduce((acc, t) => {
        const key = t.city?.name || "No City";
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
    }, {});

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Client Testimonials" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Our Client's Voice</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Testimonial
                        </Button>
                    )}
                </div>

                {flash?.success && (
                    <Alert className="mb-4">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                {flash?.error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                {showForm && (
                    <Card id="city-testimonial-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Testimonial" : "Create New Testimonial"}
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={closeForm}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                <div>
                                    <Label htmlFor="city_id">City</Label>
                                    <select
                                        id="city_id"
                                        value={data.city_id}
                                        onChange={(e) => setData("city_id", e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">Select a city</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.city_id && (
                                        <p className="text-red-500 text-sm">{errors.city_id}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label htmlFor="name">Client Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g. Sarah Chen"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input
                                            id="designation"
                                            value={data.designation}
                                            onChange={(e) => setData("designation", e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g. Product Manager at TechFlow"
                                        />
                                        {errors.designation && (
                                            <p className="text-red-500 text-sm">{errors.designation}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="quote">Testimonial Quote</Label>
                                    <Textarea
                                        id="quote"
                                        value={data.quote}
                                        onChange={(e) => setData("quote", e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                        placeholder="The attention to detail and innovative features have completely transformed our workflow..."
                                    />
                                    {errors.quote && (
                                        <p className="text-red-500 text-sm">{errors.quote}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="image">
                                        Client Photo {editId && "(leave empty to keep current image)"}
                                    </Label>
                                    <div className="mt-1 flex items-start gap-3">
                                        <label
                                            htmlFor="image"
                                            className="flex items-center justify-center w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer overflow-hidden shrink-0"
                                        >
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ImagePlus className="w-6 h-6 text-gray-400" />
                                            )}
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            id="image"
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            JPG, PNG or WEBP. Min 10KB, Max 500KB. Auto-converted to WEBP.
                                        </p>
                                    </div>
                                    {errors.image && (
                                        <p className="text-red-500 text-sm">{errors.image}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="sort_order">Sort Order (lower shows first)</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData("sort_order", e.target.value)}
                                        className="mt-1"
                                        min={0}
                                    />
                                </div>

                                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                                    <Button type="button" variant="secondary" onClick={closeForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {editId ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {Object.keys(grouped).length === 0 && !showForm && (
                    <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500 mb-4">No testimonials yet.</p>
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add your first Testimonial
                        </Button>
                    </div>
                )}

                {Object.entries(grouped).map(([city, items]) => (
                    <div key={city} className="mb-8">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-3">
                            <MapPin className="w-4 h-4" />
                            {city}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {items.map((t) => (
                                <Card
                                    key={t.id}
                                    className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="pt-4">
                                        <div className="flex items-start gap-3 mb-3">
                                            <img
                                                src={`/${t.image}`}
                                                alt={t.name}
                                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{t.name}</p>
                                                {t.designation && (
                                                    <p className="text-xs text-gray-500">{t.designation}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                <Button
                                                    onClick={() => startEditing(t)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    onClick={() => destroyItem(t.id)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:border-red-300"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5 text-xs text-gray-500">
                                            <Quote className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
                                            <p className="line-clamp-4">{t.quote}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}