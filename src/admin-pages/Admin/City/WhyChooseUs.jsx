import { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, Plus, Pencil, Trash2, MapPin, CheckCircle2 } from "lucide-react";

const emptyReason = () => "";

// Repeater for the checklist reasons (simple string list, shown 2-column)
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
                <Label>Reasons (checklist items)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addReason}>
                    <Plus className="w-4 h-4 mr-1" /> Add Reason
                </Button>
            </div>
            <div className="space-y-2">
                {reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        </div>
                        <Input
                            id={`${id}_reason_${index}`}
                            value={reason}
                            onChange={(e) => updateReason(index, e.target.value)}
                            placeholder="e.g. 250+ Happy Clients across India"
                            className="bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => removeReason(index)}
                            className="text-gray-400 hover:text-red-500 shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {reasons.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No reasons added yet. Click "Add Reason" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function WhyChooseUs({ whyChooseUs, cities }) {
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
        reasons: [],
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
            reasons: item.reasons || [],
        });
        setShowForm(true);
        document.getElementById("why-choose-us-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("why-choose-us.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("why-choose-us.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this Why Choose Us section?")) return;
        router.delete(route("why-choose-us.destroy", id));
    };

    const cityName = (id) => cities.find((c) => c.id === Number(id))?.name || "";

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Why Choose Us Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Why Choose Us</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Why Choose Us
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
                    <Card id="why-choose-us-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Why Choose Us" : "Create New Why Choose Us"}
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
                                        Heading (optional — default: "Why Choose Digital Nawab in{" "}
                                        {cityName(data.city_id) || "{City}"}?")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder={`Why Choose Digital Nawab in ${cityName(data.city_id) || "Agra"}?`}
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
                                    )}
                                </div>

                                <ReasonsRepeater
                                    id="reasons"
                                    reasons={data.reasons}
                                    onChange={(reasons) => setData("reasons", reasons)}
                                />
                                {errors["reasons"] && (
                                    <p className="text-red-500 text-sm">{errors["reasons"]}</p>
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
                    {whyChooseUs.map((wc) => {
                        const reasons = wc.reasons || [];
                        const heading =
                            wc.heading || `Why Choose Digital Nawab in ${wc.city?.name || ""}?`;

                        return (
                            <Card
                                key={wc.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {wc.city?.name || "No City"}
                                            </div>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(wc)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyItem(wc.id)}
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
                                    {reasons.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                            {reasons.map((reason, i) => (
                                                <div key={i} className="flex items-center gap-2">
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
                                </CardContent>
                            </Card>
                        );
                    })}

                    {whyChooseUs.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">
                                No "Why Choose Us" sections yet.
                            </p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first Why Choose Us section
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}