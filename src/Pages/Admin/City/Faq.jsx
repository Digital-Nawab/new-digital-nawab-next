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
import { X, Plus, Pencil, Trash2, MapPin, HelpCircle } from "lucide-react";

const emptyFaq = () => ({ question: "", answer: "" });

// Repeater for FAQ question/answer pairs
function FaqsRepeater({ id, faqs, onChange }) {
    const updateFaq = (index, field, value) => {
        const next = [...faqs];
        next[index] = { ...next[index], [field]: value };
        onChange(next);
    };

    const addFaq = () => {
        if (faqs.length >= 20) return;
        onChange([...faqs, emptyFaq()]);
    };

    const removeFaq = (index) => {
        onChange(faqs.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <Label>FAQ Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                    <Plus className="w-4 h-4 mr-1" /> Add FAQ
                </Button>
            </div>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-500">
                                Q{String(index + 1).padStart(2, "0")}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <Input
                            id={`${id}_question_${index}`}
                            value={faq.question}
                            onChange={(e) => updateFaq(index, "question", e.target.value)}
                            placeholder="e.g. Which is the best digital marketing agency in Agra?"
                            className="mb-2 bg-white font-medium"
                        />
                        <Textarea
                            id={`${id}_answer_${index}`}
                            value={faq.answer}
                            onChange={(e) => updateFaq(index, "answer", e.target.value)}
                            placeholder="e.g. Digital Nawab is a trusted digital marketing agency serving Agra businesses, with 250+ clients..."
                            rows={2}
                            className="bg-white"
                        />
                    </div>
                ))}
                {faqs.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No FAQs added yet. Click "Add FAQ" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Faq({ cityFaqs, cities }) {
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
        faqs: [],
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
            faqs: item.faqs || [],
        });
        setShowForm(true);
        document.getElementById("city-faq-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("city-faqs.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("city-faqs.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this FAQ section?")) return;
        router.delete(route("city-faqs.destroy", id));
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="FAQ Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add FAQ Section
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
                    <Card id="city-faq-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit FAQ Section" : "Create New FAQ Section"}
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
                                        Heading (optional — default: "Frequently Asked Questions")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder="Frequently Asked Questions"
                                    />
                                    {errors.heading && (
                                        <p className="text-red-500 text-sm">{errors.heading}</p>
                                    )}
                                </div>

                                <FaqsRepeater
                                    id="faqs"
                                    faqs={data.faqs}
                                    onChange={(faqs) => setData("faqs", faqs)}
                                />
                                {errors["faqs"] && (
                                    <p className="text-red-500 text-sm">{errors["faqs"]}</p>
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
                    {cityFaqs.map((cf) => {
                        const faqs = cf.faqs || [];
                        const heading = cf.heading || "Frequently Asked Questions";

                        return (
                            <Card
                                key={cf.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {cf.city?.name || "No City"}
                                            </div>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(cf)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyItem(cf.id)}
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
                                    {faqs.length > 0 ? (
                                        <div className="space-y-3">
                                            {faqs.map((faq, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border border-gray-100 bg-gray-50/60 p-3"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <HelpCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {faq.question || "Untitled question"}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic py-2">
                                            No FAQs added yet for this city.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}

                    {cityFaqs.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">No FAQ sections yet.</p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first FAQ section
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}