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

// Repeater for the approach cards (title + description each)
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
                <Label>Approach Cards</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-1" /> Add Card
                </Button>
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
                        <Input
                            id={`${id}_title_${index}`}
                            value={item.title}
                            onChange={(e) => updateItem(index, "title", e.target.value)}
                            placeholder="e.g. ROI-Focused Execution"
                            className="mb-2 bg-white"
                        />
                        <Textarea
                            id={`${id}_description_${index}`}
                            value={item.description}
                            onChange={(e) => updateItem(index, "description", e.target.value)}
                            placeholder="e.g. Every campaign is built and measured against one thing: return on your investment."
                            rows={2}
                            className="bg-white"
                        />
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No cards added yet. Click "Add Card" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Approach({ approaches, cities }) {
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
        heading: "",
        items: [],
    });

    const openAddForm = () => {
        reset();
        setEditId(null);
        setShowForm(true);
    };

    const startEditing = (approach) => {
        setEditId(approach.id);
        setData({
            city_id: approach.city_id,
            heading: approach.heading || "",
            items: approach.items || [],
        });
        setShowForm(true);
        document.getElementById("approach-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("approach.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("approach.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    // Delete uses Inertia's router directly (kept separate from the shared
    // useForm above so it doesn't touch the create/edit form state)
    const destroyApproach = (id) => {
        if (!confirm("Are you sure you want to delete this Approach section?")) return;
        router.delete(route("approach.destroy", id));
    };

    const cityName = (id) => cities.find((c) => c.id === Number(id))?.name || "";

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Approach Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Why Businesses Work With Us</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Approach
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

                {/* Inline form section — no popup/modal */}
                {showForm && (
                    <Card id="approach-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Approach" : "Create New Approach"}
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
                                    <Label htmlFor="heading">
                                        Heading (optional — leave blank for auto: "Why Businesses in{" "}
                                        {cityName(data.city_id) || "{City}"} Work With Us")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder={`Why Businesses in ${cityName(data.city_id) || "Agra"} Work With Us`}
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
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

                {/* List of Approach records — polished card display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {approaches.map((approach) => {
                        const items = approach.items || [];
                        const heading =
                            approach.heading ||
                            `Why Businesses in ${approach.city?.name || "this City"} Work With Us`;

                        return (
                            <Card
                                key={approach.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {approach.city?.name || "No City"}
                                            </div>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                            {!approach.heading && (
                                                <Badge variant="secondary" className="mt-2 text-[10px]">
                                                    Auto-generated heading
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(approach)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyApproach(approach.id)}
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
                                                    <span className="text-xs font-bold text-gray-300">
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
                                </CardContent>
                            </Card>
                        );
                    })}

                    {approaches.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">
                                No approach sections yet.
                            </p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first Approach
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}