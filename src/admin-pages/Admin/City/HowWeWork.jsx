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

const emptyStep = () => ({ title: "", description: "" });

// Repeater for the numbered steps (01, 02, 03, 04...)
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
                <Label>Process Steps</Label>
                <Button type="button" variant="outline" size="sm" onClick={addStep}>
                    <Plus className="w-4 h-4 mr-1" /> Add Step
                </Button>
            </div>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className="text-lg font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                            >
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

                        <Input
                            id={`${id}_title_${index}`}
                            value={step.title}
                            onChange={(e) => updateStep(index, "title", e.target.value)}
                            placeholder="e.g. Discover"
                            className="mb-2 bg-white"
                        />
                        <Textarea
                            id={`${id}_description_${index}`}
                            value={step.description}
                            onChange={(e) => updateStep(index, "description", e.target.value)}
                            placeholder="e.g. We study your business, your city's competitors, and where your customers actually search."
                            rows={2}
                            className="bg-white"
                        />
                    </div>
                ))}
                {steps.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No steps added yet. Click "Add Step" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function HowWeWork({ howWeWorks, cities }) {
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
        subheading: "",
        steps: [],
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
            heading: item.heading || "",
            subheading: item.subheading || "",
            steps: item.steps || [],
        });
        setShowForm(true);
        document.getElementById("how-we-work-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("how-we-works.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("how-we-works.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this How We Work section?")) return;
        router.delete(route("how-we-works.destroy", id));
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="How We Work Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">How We Work</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add How We Work
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
                    <Card id="how-we-work-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit How We Work" : "Create New How We Work"}
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
                                        Heading (optional — default: "How We Work")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder="How We Work"
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="subheading">
                                        Subheading (optional — default: "A simple, transparent
                                        process from day one to ongoing growth.")
                                    </Label>
                                    <Textarea
                                        id="subheading"
                                        value={data.subheading}
                                        onChange={(e) => setData("subheading", e.target.value)}
                                        className="mt-1"
                                        rows={2}
                                        placeholder="A simple, transparent process from day one to ongoing growth."
                                    />
                                    {errors.subheading && (
                                        <p className="text-red-500 text-sm">{errors.subheading}</p>
                                    )}
                                </div>

                                <StepsRepeater
                                    id="steps"
                                    steps={data.steps}
                                    onChange={(steps) => setData("steps", steps)}
                                />
                                {errors["steps"] && (
                                    <p className="text-red-500 text-sm">{errors["steps"]}</p>
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

                <div className="grid grid-cols-1 gap-6">
                    {howWeWorks.map((hw) => {
                        const steps = hw.steps || [];
                        const heading = hw.heading || "How We Work";
                        const subheading =
                            hw.subheading ||
                            "A simple, transparent process from day one to ongoing growth.";

                        return (
                            <Card
                                key={hw.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {hw.city?.name || "No City"}
                                            </div>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                            <p className="text-xs text-gray-500 mt-1">{subheading}</p>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(hw)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyItem(hw.id)}
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
                                    {steps.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {steps.map((step, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border border-gray-100 bg-gray-50/60 p-3"
                                                >
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
                                </CardContent>
                            </Card>
                        );
                    })}

                    {howWeWorks.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">
                                No "How We Work" sections yet.
                            </p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first How We Work section
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}