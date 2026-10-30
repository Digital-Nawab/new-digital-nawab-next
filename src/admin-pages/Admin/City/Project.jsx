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
import { Badge } from "@/components/ui/badge";
import { X, Plus, Pencil, Trash2, MapPin, ImagePlus } from "lucide-react";

const COLOR_OPTIONS = [
    { value: "pink", label: "Pink", swatch: "#ec4899" },
    { value: "purple", label: "Purple", swatch: "#a855f7" },
    { value: "gold", label: "Gold", swatch: "#eab308" },
];

const colorSwatch = (color) =>
    COLOR_OPTIONS.find((c) => c.value === color)?.swatch || "#ec4899";

export default function Project({ projects, cities }) {
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
        tag: "",
        heading: "",
        sub_heading: "",
        image: null,
        button_text: "View Project",
        button_url: "",
        color: "#ec4899",
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
            tag: item.tag || "",
            heading: item.heading || "",
            sub_heading: item.sub_heading || "",
            image: null,
            button_text: item.button_text || "View Project",
            button_url: item.button_url || "",
            color: item.color || "#ec4899",
            sort_order: item.sort_order || 0,
            _method: "put",
        });
        setPreview(`/${item.image}`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowForm(true);
        document.getElementById("city-project-form")?.scrollIntoView({ behavior: "smooth" });
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
        // Both create & update use POST with forceFormData (files need multipart);
        // update spoofs PUT via the _method field already set on data.
        const url = editId
            ? route("city-projects.update", editId)
            : route("city-projects.store");

        post(url, {
            forceFormData: true,
            onSuccess: () => closeForm(),
        });
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this Project?")) return;
        router.delete(route("city-projects.destroy", id));
    };

    const cityName = (id) => cities.find((c) => c.id === Number(id))?.name || "";

    // group projects by city for a cleaner listing
    const grouped = projects.reduce((acc, p) => {
        const key = p.city?.name || "No City";
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {});

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="City Projects" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Projects We Developed In Past</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Project
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
                    <Card id="city-project-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Project" : "Create New Project"}
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

                                <div>
                                    <Label htmlFor="tag">Tag (optional badge on card, e.g. Fabrication)</Label>
                                    <Input
                                        id="tag"
                                        value={data.tag}
                                        onChange={(e) => setData("tag", e.target.value)}
                                        className="mt-1"
                                        placeholder="e.g. Fabrication"
                                    />
                                    {errors.tag && <p className="text-red-500 text-sm">{errors.tag}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="heading">Project Title</Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder="e.g. Taj Heritage Hotels"
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="sub_heading">Description</Label>
                                    <Textarea
                                        id="sub_heading"
                                        value={data.sub_heading}
                                        onChange={(e) => setData("sub_heading", e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                        placeholder="A booking-focused hotel website built to convert Tajganj tourist traffic into direct room reservations..."
                                    />
                                    {errors.sub_heading && (
                                        <p className="text-red-500 text-sm">{errors.sub_heading}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="image">
                                        Project Image {editId && "(leave empty to keep current image)"}
                                    </Label>
                                    <div className="mt-1 flex items-start gap-3">
                                        <label
                                            htmlFor="image"
                                            className="flex items-center justify-center w-32 h-24 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer overflow-hidden shrink-0"
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
                                            JPG, PNG or WEBP. Max 500KB. Will be auto-converted to WEBP.
                                        </p>
                                    </div>
                                    {errors.image && (
                                        <p className="text-red-500 text-sm">{errors.image}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label htmlFor="button_text">Button Text</Label>
                                        <Input
                                            id="button_text"
                                            value={data.button_text}
                                            onChange={(e) => setData("button_text", e.target.value)}
                                            className="mt-1"
                                            placeholder="View Project"
                                        />
                                        {errors.button_text && (
                                            <p className="text-red-500 text-sm">{errors.button_text}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="color">Button Color</Label>
                                        <div className="mt-1 flex items-center gap-3">
                                            <input
                                                id="color"
                                                type="color"
                                                value={data.color}
                                                onChange={(e) => setData("color", e.target.value)}
                                                className="h-10 w-14 rounded-md border border-gray-300 cursor-pointer bg-white p-1"
                                            />
                                            <Input
                                                value={data.color}
                                                onChange={(e) => setData("color", e.target.value)}
                                                placeholder="#ec4899"
                                                className="flex-1"
                                            />
                                        </div>
                                        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="button_url">Button URL</Label>
                                    <Input
                                        id="button_url"
                                        value={data.button_url}
                                        onChange={(e) => setData("button_url", e.target.value)}
                                        className="mt-1"
                                        placeholder="https://example.com/project"
                                    />
                                    {errors.button_url && (
                                        <p className="text-red-500 text-sm">{errors.button_url}</p>
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
                        <p className="text-gray-500 mb-4">No projects yet.</p>
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add your first Project
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
                            {items.map((p) => (
                                <Card
                                    key={p.id}
                                    className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-40 bg-gray-100">
                                        <img
                                            src={`/${p.image}`}
                                            alt={p.heading}
                                            className="w-full h-full object-cover"
                                        />
                                        {p.tag && (
                                            <Badge className="absolute top-2 left-2 text-[10px]">
                                                {p.tag}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardContent className="pt-4">
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <p className="font-semibold text-gray-900">{p.heading}</p>
                                            <div className="flex gap-1 shrink-0">
                                                <Button
                                                    onClick={() => startEditing(p)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    onClick={() => destroyItem(p.id)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:border-red-300"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                            {p.sub_heading}
                                        </p>
                                        <span
                                            className="inline-block text-xs font-semibold text-white px-3 py-1.5 rounded-full"
                                            style={{ background: p.color || "#ec4899" }}
                                        >
                                            {p.button_text}
                                        </span>
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