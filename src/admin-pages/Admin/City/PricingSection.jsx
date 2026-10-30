import { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    X,
    Plus,
    Pencil,
    Trash2,
    MapPin,
    Monitor,
    Target,
    Users,
    Star,
    CheckCircle2,
} from "lucide-react";

const ICON_MAP = { Monitor, Target, Users, Star };
const ICON_OPTIONS = Object.keys(ICON_MAP);

const COLOR_OPTIONS = [
    { value: "pink", label: "Pink", swatch: "#ec4899" },
    { value: "purple", label: "Purple", swatch: "#a855f7" },
    { value: "gold", label: "Gold", swatch: "#eab308" },
];

const colorSwatch = (color) =>
    COLOR_OPTIONS.find((c) => c.value === color)?.swatch || "#a855f7";

const emptyPackage = () => ({
    icon: "Monitor",
    color: "pink",
    badge_label: "",
    title: "",
    price: "",
    price_suffix: "/Month",
    is_popular: false,
    view_package_url: "",
    whatsapp_number: "",
    features: [""],
});

function IconPreview({ name, className = "w-5 h-5" }) {
    const Icon = ICON_MAP[name] || Monitor;
    return <Icon className={className} />;
}

// Repeater for individual package features (simple string list)
function FeaturesRepeater({ features, onChange }) {
    const update = (i, val) => {
        const next = [...features];
        next[i] = val;
        onChange(next);
    };
    const add = () => onChange([...features, ""]);
    const remove = (i) => onChange(features.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <Label className="text-xs">Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={add}>
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Feature
                </Button>
            </div>
            {features.map((f, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <Input
                        value={f}
                        onChange={(e) => update(i, e.target.value)}
                        placeholder="e.g. One Page Static Website"
                        className="bg-white h-8 text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => remove(i)}
                        className="text-gray-400 hover:text-red-500 shrink-0"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
}

// Repeater for the 3 pricing package cards
function PackagesRepeater({ packages, onChange }) {
    const updatePkg = (index, field, value) => {
        const next = [...packages];
        next[index] = { ...next[index], [field]: value };
        onChange(next);
    };

    const addPkg = () => {
        if (packages.length >= 6) return;
        onChange([...packages, emptyPackage()]);
    };

    const removePkg = (index) => {
        onChange(packages.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <Label>Pricing Packages</Label>
                <Button type="button" variant="outline" size="sm" onClick={addPkg}>
                    <Plus className="w-4 h-4 mr-1" /> Add Package
                </Button>
            </div>
            <div className="space-y-4">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 relative bg-gray-50"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-500">
                                Package {String(index + 1).padStart(2, "0")}
                            </span>
                            <button
                                type="button"
                                onClick={() => removePkg(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <Label className="text-xs">Icon</Label>
                                <div className="flex gap-2 mt-1">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white shrink-0">
                                        <IconPreview name={pkg.icon} className="w-4 h-4 text-gray-700" />
                                    </div>
                                    <select
                                        value={pkg.icon}
                                        onChange={(e) => updatePkg(index, "icon", e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm bg-white"
                                    >
                                        {ICON_OPTIONS.map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs">Color Theme</Label>
                                <select
                                    value={pkg.color}
                                    onChange={(e) => updatePkg(index, "color", e.target.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm bg-white"
                                >
                                    {COLOR_OPTIONS.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <Label className="text-xs">Badge Label (pill button text)</Label>
                                <Input
                                    value={pkg.badge_label}
                                    onChange={(e) => updatePkg(index, "badge_label", e.target.value)}
                                    placeholder="e.g. Web Packages"
                                    className="bg-white mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Card Title</Label>
                                <Input
                                    value={pkg.title}
                                    onChange={(e) => updatePkg(index, "title", e.target.value)}
                                    placeholder="e.g. Web Designing Package"
                                    className="bg-white mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <Label className="text-xs">Price</Label>
                                <Input
                                    value={pkg.price}
                                    onChange={(e) => updatePkg(index, "price", e.target.value)}
                                    placeholder="e.g. Start From ~ ₹3,500"
                                    className="bg-white mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Price Suffix</Label>
                                <Input
                                    value={pkg.price_suffix}
                                    onChange={(e) => updatePkg(index, "price_suffix", e.target.value)}
                                    placeholder="/Month"
                                    className="bg-white mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <Label className="text-xs">View Package URL</Label>
                                <Input
                                    value={pkg.view_package_url}
                                    onChange={(e) => updatePkg(index, "view_package_url", e.target.value)}
                                    placeholder="/packages/web-designing"
                                    className="bg-white mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">WhatsApp Number</Label>
                                <Input
                                    value={pkg.whatsapp_number}
                                    onChange={(e) => updatePkg(index, "whatsapp_number", e.target.value)}
                                    placeholder="91XXXXXXXXXX"
                                    className="bg-white mt-1"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Checkbox
                                id={`popular_${index}`}
                                checked={pkg.is_popular}
                                onCheckedChange={(v) => updatePkg(index, "is_popular", !!v)}
                            />
                            <Label htmlFor={`popular_${index}`} className="text-xs cursor-pointer">
                                Mark as "Most Popular"
                            </Label>
                        </div>

                        <FeaturesRepeater
                            features={pkg.features || []}
                            onChange={(features) => updatePkg(index, "features", features)}
                        />
                    </div>
                ))}
                {packages.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No packages added yet. Click "Add Package" to create one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function PricingSection({ pricingSections, cities }) {
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
        packages: [],
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
            packages: item.packages || [],
        });
        setShowForm(true);
        document.getElementById("pricing-section-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(route("pricing-sections.update", editId), {
                onSuccess: () => closeForm(),
            });
        } else {
            post(route("pricing-sections.store"), {
                onSuccess: () => closeForm(),
            });
        }
    };

    const destroyItem = (id) => {
        if (!confirm("Are you sure you want to delete this Pricing section?")) return;
        router.delete(route("pricing-sections.destroy", id));
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Pricing Sections" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Service We Offer You</h1>
                    {!showForm && (
                        <Button onClick={openAddForm}>
                            <Plus className="w-4 h-4 mr-1" /> Add Pricing Section
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
                    <Card id="pricing-section-form" className="mb-8 border-2 border-gray-200">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {editId ? "Edit Pricing Section" : "Create New Pricing Section"}
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
                                        Badge Text (optional — default: "TRANSPARENT PRICING")
                                    </Label>
                                    <Input
                                        id="badge_text"
                                        value={data.badge_text}
                                        onChange={(e) => setData("badge_text", e.target.value)}
                                        className="mt-1"
                                        placeholder="TRANSPARENT PRICING"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="heading">
                                        Heading (optional — default: "Service We Offer You")
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        className="mt-1"
                                        placeholder="Service We Offer You"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="subheading">Subheading (optional)</Label>
                                    <Textarea
                                        id="subheading"
                                        value={data.subheading}
                                        onChange={(e) => setData("subheading", e.target.value)}
                                        className="mt-1"
                                        rows={2}
                                        placeholder="Expert digital marketing solutions to grow your business — straightforward monthly packages, no hidden costs."
                                    />
                                </div>

                                <PackagesRepeater
                                    packages={data.packages}
                                    onChange={(packages) => setData("packages", packages)}
                                />
                                {errors["packages"] && (
                                    <p className="text-red-500 text-sm">{errors["packages"]}</p>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pricingSections.map((ps) => {
                        const packages = ps.packages || [];
                        const heading = ps.heading || "Service We Offer You";
                        const badge = ps.badge_text || "TRANSPARENT PRICING";

                        return (
                            <Card
                                key={ps.id}
                                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {ps.city?.name || "No City"}
                                            </div>
                                            <Badge variant="outline" className="mb-2 text-[10px]">
                                                {badge}
                                            </Badge>
                                            <CardTitle className="text-lg leading-snug">
                                                {heading}
                                            </CardTitle>
                                            {ps.subheading && (
                                                <p className="text-xs text-gray-500 mt-1">{ps.subheading}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Button
                                                onClick={() => startEditing(ps)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                onClick={() => destroyItem(ps.id)}
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
                                    {packages.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {packages.map((pkg, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border p-3 relative"
                                                    style={{
                                                        borderColor: pkg.is_popular
                                                            ? colorSwatch(pkg.color)
                                                            : "#e5e7eb",
                                                        background: "#fafafa",
                                                    }}
                                                >
                                                    {pkg.is_popular && (
                                                        <span
                                                            className="absolute -top-2 left-3 text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                                                            style={{ background: colorSwatch(pkg.color) }}
                                                        >
                                                            MOST POPULAR
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-2 mb-1.5 mt-1">
                                                        <div
                                                            className="flex items-center justify-center w-8 h-8 rounded-md"
                                                            style={{
                                                                background: `${colorSwatch(pkg.color)}20`,
                                                                color: colorSwatch(pkg.color),
                                                            }}
                                                        >
                                                            <IconPreview name={pkg.icon} className="w-4 h-4" />
                                                        </div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {pkg.title || "Untitled Package"}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-700 mb-1">
                                                        {pkg.price} {pkg.price_suffix}
                                                    </p>
                                                    <ul className="text-xs text-gray-500 space-y-0.5">
                                                        {(pkg.features || []).slice(0, 4).map((f, fi) => (
                                                            <li key={fi} className="flex items-center gap-1">
                                                                <CheckCircle2
                                                                    className="w-3 h-3 shrink-0"
                                                                    style={{ color: colorSwatch(pkg.color) }}
                                                                />
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic py-2">
                                            No packages added yet for this city.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}

                    {pricingSections.length === 0 && !showForm && (
                        <div className="col-span-full text-center py-16 border border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 mb-4">No pricing sections yet.</p>
                            <Button onClick={openAddForm}>
                                <Plus className="w-4 h-4 mr-1" /> Add your first Pricing Section
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}