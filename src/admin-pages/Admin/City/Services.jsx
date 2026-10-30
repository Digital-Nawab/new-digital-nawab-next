import { useState } from "react";
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
import { X, Plus, Pencil, Trash2, MapPin } from "lucide-react";

const emptyItem = () => ({ title: "", description: "" });

// Letter-avatar like in the design (first letter of the title, gradient circle)
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

// Repeater for the service cards (title + description each)
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
                <Label>Service Cards</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-1" /> Add Service
                </Button>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <LetterAvatar title={item.title} className="w-8 h-8 text-xs" />
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

                        <Input
                            id={`${id}_title_${index}`}
                            value={item.title}
                            onChange={(e) => updateItem(index, "title", e.target.value)}
                            placeholder="e.g. Search Engine Optimization"
                            className="mb-2 bg-white"
                        />
                        <Textarea
                            id={`${id}_description_${index}`}
                            value={item.description}
                            onChange={(e) => updateItem(index, "description", e.target.value)}
                            placeholder="e.g. Rank on page 1 of Google for the keywords your city's customers are searching for."
                            rows={2}
                            className="bg-white"
                        />
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No services added yet. Click "Add Service" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Services({ cityServices, cities }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        city_id: "",
        badge_text: "",
        heading: "",
        subheading: "",
        items: [],
    });

    const openAddForm = () => {
        reset();
        setEditId(null);
        setShowForm(true);
    };

    const startEditing = (item) => {
        setEditId(item.id);
        setData({
            city_id: item.city_id,
            badge_text: item.badge_text || "",
            heading: item.heading || "",
            subheading: item.subheading || "",
            items: item.items || [],
        });
        setShowForm(true);
        document.getElementById("city-services-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("city-services.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("city-services.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this Services section?")) return;
        router.delete(route("city-services.destroy", id));
    };

    const cityName = (id) => cities.find((c) => c.id === Number(id))?.name || "";

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Services Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Our Services</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Services Section
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

                {/* Inline form — no popup/modal */}
                {showForm && (
                    <Card id="city-services-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Services Section" : "Create New Services Section"}
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={closeForm}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                    <Label htmlFor="badge_text">
                                        Badge Text (optional)
                                    </Label>
                                    <Input
                                        id="badge_text"
                                        value={data.badge_text}
                                        onChange={(e) => setData("badge_text", e.target.value)}
                                        className="mt-1"
                                        placeholder="OUR SERVICES"
                                    />
                                    {errors.badge_text && (
                                        <p className="text-red-500 text-sm">{errors.badge_text}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="heading">
                                        Heading (optional — default: "Our Services in{" "}
                                        {cityName(data.city_id) || "{City}"}")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder={`Our Services in ${cityName(data.city_id) || "Agra"}`}
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="subheading">
                                        Subheading (optional — default: "End-to-end digital
                                        solutions, tailored to your business goals.")
                                    </Label>
                                    <Textarea
                                        id="subheading"
                                        value={data.subheading}
                                        onChange={(e) => setData("subheading", e.target.value)}
                                        className="mt-1"
                                        rows={2}
                                        placeholder="End-to-end digital solutions, tailored to your business goals."
                                    />
                                    {errors.subheading && (
                                        <p className="text-red-500 text-sm">{errors.subheading}</p>
                                    )}
                                </div>

                                <ItemsRepeater
                                    id="items"
                                    items={data.items}
                                    onChange={(items) => setData("items", items)}
                                />
                                {errors["items"] && (
                                    <p className="text-red-500 text-sm">{errors["items"]}</p>
                                )}

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

                {/* List — polished card display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {cityServices.map((cs) => {
                        const items = cs.items || [];
                        const heading = cs.heading || `Our Services in ${cs.city?.name || ""}`;
                        const badge = cs.badge_text || "OUR SERVICES";
                        const subheading =
                            cs.subheading ||
                            "End-to-end digital solutions, tailored to your business goals.";

                        return (
                            <Card
                                key={cs.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {cs.city?.name || "No City"}
                                            </div>
                                            <Badge variant="outline" className="mb-2 text-[10px]">
                                                {badge}
                                            </Badge>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                            <p className="text-xs text-gray-500 mt-1">{subheading}</p>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(cs)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyItem(cs.id)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4">
                                    {items.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {items.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border border-gray-100 bg-gray-50/60 p-3"
                                                >
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <LetterAvatar title={item.title} />
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">
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
                                            No services added yet for this city.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}

                    {cityServices.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">
                                No services sections yet.
                            </p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first Services section
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}