import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

// Small reusable tag input for market_areas (add on Enter / button, remove with X)
function TagInput({ id, label, tags, onChange, placeholder }) {
    const [draft, setDraft] = useState("");

    const addTag = () => {
        const value = draft.trim();
        if (!value) return;
        if (tags.includes(value)) {
            setDraft("");
            return;
        }
        onChange([...tags, value]);
        setDraft("");
    };

    const removeTag = (index) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <div className="flex gap-2 mt-1">
                <Input
                    id={id}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                    Add
                </Button>
            </div>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <Badge
                            key={`${tag}-${index}`}
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="ml-1"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function City({ cities }) {
    const { flash } = usePage().props;
    const [showFormModal, setShowFormModal] = useState(false); // controls the popup

    // Tracks whether the user has manually edited the slug field —
    // if true, typing in Name will no longer auto-overwrite the slug.
    const [slugTouchedCreate, setSlugTouchedCreate] = useState(false);
    const [slugTouchedEdit, setSlugTouchedEdit] = useState(false);

    // Form for creating a new City record
    const {
        data: createData,
        setData: setCreateData,
        post,
        processing: createProcessing,
        errors: createErrors,
        reset,
    } = useForm({
        name: "",
        slug: "",
        badge_text: "",
        heading_prefix: "Grow Your",
        heading_suffix: "Business with",
        description: "",
        phone_number: "",
        whatsapp_number: "",
        meta_title: "",
        meta_description: "",
        is_active: true,
        stat_years_value: "",
        stat_campaigns_value: "",
        stat_clients_value: "",
        stat_retention_value: "",
        stat_support_value: "",
        stat_reporting_value: "",
        market_description: "",
        market_areas: [],
    });

    // Form for editing an existing City record
    const [editId, setEditId] = useState(null);
    const {
        data: editData,
        setData: setEditData,
        put: putEdit,
        processing: editProcessing,
        errors: editErrors,
        delete: deleteData,
        reset: resetEdit,
    } = useForm({
        name: "",
        slug: "",
        badge_text: "",
        heading_prefix: "",
        heading_suffix: "",
        description: "",
        phone_number: "",
        whatsapp_number: "",
        meta_title: "",
        meta_description: "",
        is_active: true,
        stat_years_value: "",
        stat_campaigns_value: "",
        stat_clients_value: "",
        stat_retention_value: "",
        stat_support_value: "",
        stat_reporting_value: "",
        market_description: "",
        market_areas: [],
    });

    // Open popup for creating a new record
    const openAddModal = () => {
        reset();
        setEditId(null);
        setSlugTouchedCreate(false);
        setShowFormModal(true);
    };

    // Handle create form submission
    const handleCreate = (e) => {
        e.preventDefault();
        post(route("city.store"), {
            onSuccess: () => {
                reset();
                setSlugTouchedCreate(false);
                setShowFormModal(false);
            },
        });
    };

    // Handle edit form submission
    // NOTE: City has no file inputs, so a plain Inertia put() works fine —
    // no forceFormData / _method spoofing trick needed here (unlike
    // DevCommerce, which uploads an image).
    const handleUpdate = (e) => {
        e.preventDefault();
        putEdit(route("city.update", editId), {
            onSuccess: () => {
                setEditId(null);
                resetEdit();
                setSlugTouchedEdit(false);
                setShowFormModal(false);
            },
        });
    };

    // Handle edit button click
    const startEditing = (city) => {
        setEditId(city.id);
        setEditData({
            name: city.name,
            slug: city.slug,
            badge_text: city.badge_text || "",
            heading_prefix: city.heading_prefix || "",
            heading_suffix: city.heading_suffix || "",
            description: city.description || "",
            phone_number: city.phone_number || "",
            whatsapp_number: city.whatsapp_number || "",
            meta_title: city.meta_title || "",
            meta_description: city.meta_description || "",
            is_active: city.is_active,
            stat_years_value: city.stat_years_value || "",
            stat_campaigns_value: city.stat_campaigns_value || "",
            stat_clients_value: city.stat_clients_value || "",
            stat_retention_value: city.stat_retention_value || "",
            stat_support_value: city.stat_support_value || "",
            stat_reporting_value: city.stat_reporting_value || "",
            market_description: city.market_description || "",
            market_areas: city.market_areas || [],
        });
        // reset so that editing the Name will auto-sync the slug again,
        // unless the admin manually edits the slug field in this session
        setSlugTouchedEdit(false);
        setShowFormModal(true);
    };

    const closeModal = () => {
        setShowFormModal(false);
        setEditId(null);
        reset();
        resetEdit();
        setSlugTouchedCreate(false);
        setSlugTouchedEdit(false);
    };

    // Handle delete
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this City?")) {
            deleteData(route("city.destroy", id), {
                onSuccess: () => setEditId(null),
            });
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="City Records" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">City Landing Pages</h1>
                    <Button onClick={openAddModal}>Add City</Button>
                </div>

                {/* Flash Messages */}
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

                {/* List of City Records */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Card key={city.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{city.name}</CardTitle>
                                    <Badge variant={city.is_active ? "default" : "secondary"}>
                                        {city.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-2">
                                    <strong>Slug:</strong> /{city.slug}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Badge:</strong> {city.badge_text}
                                </p>
                                <p className="text-gray-600 mb-2 line-clamp-3">
                                    <strong>Description:</strong> {city.description}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Phone:</strong> {city.phone_number || "—"}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>WhatsApp:</strong> {city.whatsapp_number || "—"}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Stats:</strong>{" "}
                                    {[
                                        city.stat_years_value,
                                        city.stat_campaigns_value,
                                        city.stat_clients_value,
                                        city.stat_retention_value,
                                        city.stat_support_value,
                                        city.stat_reporting_value,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ") || "—"}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>Areas:</strong>{" "}
                                    {(city.market_areas || []).join(", ") || "—"}
                                </p>
                                <div className="space-x-2">
                                    <Button
                                        onClick={() => startEditing(city)}
                                        variant="outline"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(city.id)}
                                        variant="destructive"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal (popup) */}
            {showFormModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editId ? "Edit City" : "Create New City"}
                                </h2>
                                <Button variant="ghost" onClick={closeModal}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {editId ? (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <Label htmlFor="edit_name">City Name</Label>
                                        <Input
                                            id="edit_name"
                                            value={editData.name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setEditData("name", value);
                                                if (!slugTouchedEdit) {
                                                    setEditData("slug", slugify(value));
                                                }
                                            }}
                                            className="mt-1"
                                        />
                                        {editErrors.name && (
                                            <p className="text-red-500 text-sm">{editErrors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="edit_slug">Slug (URL)</Label>
                                        <Input
                                            id="edit_slug"
                                            value={editData.slug}
                                            onChange={(e) => {
                                                setEditData("slug", e.target.value);
                                                setSlugTouchedEdit(true);
                                            }}
                                            className="mt-1"
                                            placeholder="agra"
                                        />
                                        {editErrors.slug && (
                                            <p className="text-red-500 text-sm">{editErrors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="edit_badge_text">Badge Text</Label>
                                        <Input
                                            id="edit_badge_text"
                                            value={editData.badge_text}
                                            onChange={(e) => setEditData("badge_text", e.target.value)}
                                            className="mt-1"
                                        />
                                        {editErrors.badge_text && (
                                            <p className="text-red-500 text-sm">{editErrors.badge_text}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="edit_heading_prefix">Heading Prefix</Label>
                                            <Input
                                                id="edit_heading_prefix"
                                                value={editData.heading_prefix}
                                                onChange={(e) => setEditData("heading_prefix", e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="edit_heading_suffix">Heading Suffix</Label>
                                            <Input
                                                id="edit_heading_suffix"
                                                value={editData.heading_suffix}
                                                onChange={(e) => setEditData("heading_suffix", e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="edit_description">Description</Label>
                                        <Textarea
                                            id="edit_description"
                                            value={editData.description}
                                            onChange={(e) => setEditData("description", e.target.value)}
                                            className="mt-1"
                                            rows={4}
                                        />
                                        {editErrors.description && (
                                            <p className="text-red-500 text-sm">{editErrors.description}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="edit_phone_number">Phone Number</Label>
                                            <Input
                                                id="edit_phone_number"
                                                value={editData.phone_number}
                                                onChange={(e) => setEditData("phone_number", e.target.value)}
                                                className="mt-1"
                                                placeholder="+91XXXXXXXXXX"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="edit_whatsapp_number">WhatsApp Number</Label>
                                            <Input
                                                id="edit_whatsapp_number"
                                                value={editData.whatsapp_number}
                                                onChange={(e) => setEditData("whatsapp_number", e.target.value)}
                                                className="mt-1"
                                                placeholder="91XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="edit_meta_title">Meta Title</Label>
                                        <Input
                                            id="edit_meta_title"
                                            value={editData.meta_title}
                                            onChange={(e) => setEditData("meta_title", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit_meta_description">Meta Description</Label>
                                        <Textarea
                                            id="edit_meta_description"
                                            value={editData.meta_description}
                                            onChange={(e) => setEditData("meta_description", e.target.value)}
                                            className="mt-1"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Stats section */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">Stats Bar</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="edit_stat_years_value">Years in Industry</Label>
                                                <Input
                                                    id="edit_stat_years_value"
                                                    value={editData.stat_years_value}
                                                    onChange={(e) => setEditData("stat_years_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="6+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit_stat_campaigns_value">Campaigns Delivered</Label>
                                                <Input
                                                    id="edit_stat_campaigns_value"
                                                    value={editData.stat_campaigns_value}
                                                    onChange={(e) => setEditData("stat_campaigns_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="1000+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit_stat_clients_value">Happy Clients</Label>
                                                <Input
                                                    id="edit_stat_clients_value"
                                                    value={editData.stat_clients_value}
                                                    onChange={(e) => setEditData("stat_clients_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="250+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit_stat_retention_value">Client Retention</Label>
                                                <Input
                                                    id="edit_stat_retention_value"
                                                    value={editData.stat_retention_value}
                                                    onChange={(e) => setEditData("stat_retention_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="98%"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit_stat_support_value">Support</Label>
                                                <Input
                                                    id="edit_stat_support_value"
                                                    value={editData.stat_support_value}
                                                    onChange={(e) => setEditData("stat_support_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="24x7"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="edit_stat_reporting_value">Transparent Reporting</Label>
                                                <Input
                                                    id="edit_stat_reporting_value"
                                                    value={editData.stat_reporting_value}
                                                    onChange={(e) => setEditData("stat_reporting_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="100%"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Market section */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Built for {editData.name || "City"}'s Market
                                        </h3>
                                        <div>
                                            <Label htmlFor="edit_market_description">Market Description</Label>
                                            <Textarea
                                                id="edit_market_description"
                                                value={editData.market_description}
                                                onChange={(e) => setEditData("market_description", e.target.value)}
                                                className="mt-1"
                                                rows={3}
                                                placeholder="From the hospitality and tourism businesses around..."
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <TagInput
                                                id="edit_market_areas"
                                                label="Local Areas (tags)"
                                                tags={editData.market_areas}
                                                onChange={(tags) => setEditData("market_areas", tags)}
                                                placeholder="e.g. Sadar Bazar"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="edit_is_active"
                                            checked={editData.is_active}
                                            onChange={(e) => setEditData("is_active", e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="edit_is_active">Active</Label>
                                    </div>
                                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={editProcessing}>
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div>
                                        <Label htmlFor="create_name">City Name</Label>
                                        <Input
                                            id="create_name"
                                            value={createData.name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCreateData("name", value);
                                                if (!slugTouchedCreate) {
                                                    setCreateData("slug", slugify(value));
                                                }
                                            }}
                                            className="mt-1"
                                            placeholder="Agra"
                                        />
                                        {createErrors.name && (
                                            <p className="text-red-500 text-sm">{createErrors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="create_slug">Slug (URL) — auto-generated, edit if needed</Label>
                                        <Input
                                            id="create_slug"
                                            value={createData.slug}
                                            onChange={(e) => {
                                                setCreateData("slug", e.target.value);
                                                setSlugTouchedCreate(true);
                                            }}
                                            className="mt-1"
                                            placeholder="agra"
                                        />
                                        {createErrors.slug && (
                                            <p className="text-red-500 text-sm">{createErrors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="create_badge_text">Badge Text</Label>
                                        <Input
                                            id="create_badge_text"
                                            value={createData.badge_text}
                                            onChange={(e) => setCreateData("badge_text", e.target.value)}
                                            className="mt-1"
                                            placeholder="Digital Marketing Agency, Agra"
                                        />
                                        {createErrors.badge_text && (
                                            <p className="text-red-500 text-sm">{createErrors.badge_text}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="create_heading_prefix">Heading Prefix</Label>
                                            <Input
                                                id="create_heading_prefix"
                                                value={createData.heading_prefix}
                                                onChange={(e) => setCreateData("heading_prefix", e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="create_heading_suffix">Heading Suffix</Label>
                                            <Input
                                                id="create_heading_suffix"
                                                value={createData.heading_suffix}
                                                onChange={(e) => setCreateData("heading_suffix", e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="create_description">Description</Label>
                                        <Textarea
                                            id="create_description"
                                            value={createData.description}
                                            onChange={(e) => setCreateData("description", e.target.value)}
                                            className="mt-1"
                                            rows={4}
                                        />
                                        {createErrors.description && (
                                            <p className="text-red-500 text-sm">{createErrors.description}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="create_phone_number">Phone Number</Label>
                                            <Input
                                                id="create_phone_number"
                                                value={createData.phone_number}
                                                onChange={(e) => setCreateData("phone_number", e.target.value)}
                                                className="mt-1"
                                                placeholder="+91XXXXXXXXXX"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="create_whatsapp_number">WhatsApp Number</Label>
                                            <Input
                                                id="create_whatsapp_number"
                                                value={createData.whatsapp_number}
                                                onChange={(e) => setCreateData("whatsapp_number", e.target.value)}
                                                className="mt-1"
                                                placeholder="91XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="create_meta_title">Meta Title</Label>
                                        <Input
                                            id="create_meta_title"
                                            value={createData.meta_title}
                                            onChange={(e) => setCreateData("meta_title", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="create_meta_description">Meta Description</Label>
                                        <Textarea
                                            id="create_meta_description"
                                            value={createData.meta_description}
                                            onChange={(e) => setCreateData("meta_description", e.target.value)}
                                            className="mt-1"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Stats section */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">Stats Bar</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="create_stat_years_value">Years in Industry</Label>
                                                <Input
                                                    id="create_stat_years_value"
                                                    value={createData.stat_years_value}
                                                    onChange={(e) => setCreateData("stat_years_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="6+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="create_stat_campaigns_value">Campaigns Delivered</Label>
                                                <Input
                                                    id="create_stat_campaigns_value"
                                                    value={createData.stat_campaigns_value}
                                                    onChange={(e) => setCreateData("stat_campaigns_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="1000+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="create_stat_clients_value">Happy Clients</Label>
                                                <Input
                                                    id="create_stat_clients_value"
                                                    value={createData.stat_clients_value}
                                                    onChange={(e) => setCreateData("stat_clients_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="250+"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="create_stat_retention_value">Client Retention</Label>
                                                <Input
                                                    id="create_stat_retention_value"
                                                    value={createData.stat_retention_value}
                                                    onChange={(e) => setCreateData("stat_retention_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="98%"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="create_stat_support_value">Support</Label>
                                                <Input
                                                    id="create_stat_support_value"
                                                    value={createData.stat_support_value}
                                                    onChange={(e) => setCreateData("stat_support_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="24x7"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="create_stat_reporting_value">Transparent Reporting</Label>
                                                <Input
                                                    id="create_stat_reporting_value"
                                                    value={createData.stat_reporting_value}
                                                    onChange={(e) => setCreateData("stat_reporting_value", e.target.value)}
                                                    className="mt-1"
                                                    placeholder="100%"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Market section */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Built for {createData.name || "City"}'s Market
                                        </h3>
                                        <div>
                                            <Label htmlFor="create_market_description">Market Description</Label>
                                            <Textarea
                                                id="create_market_description"
                                                value={createData.market_description}
                                                onChange={(e) => setCreateData("market_description", e.target.value)}
                                                className="mt-1"
                                                rows={3}
                                                placeholder="From the hospitality and tourism businesses around..."
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <TagInput
                                                id="create_market_areas"
                                                label="Local Areas (tags)"
                                                tags={createData.market_areas}
                                                onChange={(tags) => setCreateData("market_areas", tags)}
                                                placeholder="e.g. Sadar Bazar"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="create_is_active"
                                            checked={createData.is_active}
                                            onChange={(e) => setCreateData("is_active", e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="create_is_active">Active</Label>
                                    </div>
                                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={createProcessing}>
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}