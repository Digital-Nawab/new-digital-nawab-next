import { useState, useRef, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Layout from "@/Layouts/Layout"; // Adjust path to your layout
import ShowImg from "@/Pages/utils/ShowImg";

// Quill Rich Text Editor Component (from reference)
const QuillEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!document.querySelector("#quill-css")) {
            const link = document.createElement("link");
            link.id = "quill-css";
            link.rel = "stylesheet";
            link.href =
                "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
            document.head.appendChild(link);
        }

        if (!window.Quill) {
            const script = document.createElement("script");
            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
            script.onload = initializeQuill;
            document.head.appendChild(script);
        } else {
            initializeQuill();
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    const initializeQuill = () => {
        if (window.Quill && editorRef.current && !quillRef.current) {
            quillRef.current = new window.Quill(editorRef.current, {
                theme: "snow",
                placeholder: placeholder,
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ font: [] }],
                        [{ size: ["small", false, "large", "huge"] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }, { background: [] }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ direction: "rtl" }],
                        [{ align: [] }],
                        ["link", "image", "video"],
                        ["blockquote", "code-block"],
                        ["clean"],
                    ],
                },
            });

            if (value) {
                quillRef.current.root.innerHTML = value;
            }

            quillRef.current.on("text-change", () => {
                const html = quillRef.current.root.innerHTML;
                onChange(html);
            });
        }
    };

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value || "";
        }
    }, [value]);

    return (
        <div className="quill-wrapper">
            <div ref={editorRef} style={{ minHeight: "200px" }} />
        </div>
    );
};

// Single Input Array Component for Features (adapted from reference)
const SingleInputArray = ({ form, field, label, placeholder }) => {
    const [tempValue, setTempValue] = useState("");

    const handleAdd = () => {
        if (tempValue?.trim() !== "") {
            form.setData({
                ...form.data,
                [field]: [...form.data[field], tempValue.trim()],
            });
            setTempValue("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (index) => {
        const updated = form.data[field].filter((_, i) => i !== index);
        form.setData({
            ...form.data,
            [field]: updated,
        });
    };

    return (
        <div className="space-y-3">
            <Label className="block text-sm font-semibold text-gray-700">
                {label}
            </Label>
            <div className="flex gap-3">
                <Input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="flex-1"
                />
                <Button type="button" onClick={handleAdd}>
                    Add
                </Button>
            </div>
            <div className="space-y-2">
                {form.data[field].map(
                    (item, index) =>
                        item?.trim() && (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                            >
                                <span className="text-gray-800 flex-1">
                                    {item}
                                </span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemove(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        )
                )}
            </div>
            {form.errors[field] && (
                <p className="text-sm text-red-600">{form.errors[field]}</p>
            )}
        </div>
    );
};

export default function Service() {
    const { props } = usePage();
    const { seo_services, flash } = props;
    const [editingService, setEditingService] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [showFormModal, setShowFormModal] = useState(false); // controls the popup
    const imageRef = useRef(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        transform,
    } = useForm({
        image: null,
        heading: "",
        subheading: "",
        description: "",
        // Start as an empty array, not [""] — a seeded blank string used to
        // travel all the way to the backend and rendered as an empty first
        // badge on the cards.
        features: [],
    });

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage("");
            setAlertType("");
        }, 4000);
    };

    const resetForm = () => {
        reset();
        setData({
            image: null,
            heading: "",
            subheading: "",
            description: "",
            features: [],
        });
        clearErrors();
        setEditingService(null);
        setImagePreview("");
        if (imageRef.current) imageRef.current.value = "";
    };

    // Open popup for creating a new service
    const openAddModal = () => {
        resetForm();
        setShowFormModal(true);
    };

    // Open popup for editing an existing service
    const handleEdit = (service) => {
        setEditingService(service);
        setData({
            image: null,
            heading: service.heading,
            subheading: service.subheading,
            description: service.description,
            features:
                service.features && service.features.length > 0
                    ? service.features
                    : [],
        });
        setImagePreview(`/${service.image}`);
        clearErrors();
        setShowFormModal(true);
    };

    const closeModal = () => {
        setShowFormModal(false);
        resetForm();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // IMPORTANT BUG FIX:
        // PHP only parses multipart/form-data bodies (needed for file
        // uploads) for POST requests. A real PUT request with
        // forceFormData/multipart body is NEVER parsed by PHP — so on
        // edit, the uploaded image (and every other field) arrived as
        // null on the backend, and the record silently kept its old
        // image/values. That's why "edit image" looked broken.
        //
        // Fix: always submit via POST. For edits, spoof the method with a
        // `_method: "put"` field via transform() — Laravel detects this
        // field and routes the request to the PUT handler, while the
        // request itself stays a real POST, which PHP parses correctly.
        if (editingService) {
            transform((formData) => ({
                ...formData,
                features: formData.features.filter((f) => f?.trim()),
                _method: "put",
            }));
        } else {
            // make sure no leftover _method from a previous edit sticks around
            transform((formData) => ({
                ...formData,
                features: formData.features.filter((f) => f?.trim()),
            }));
        }

        const options = {
            forceFormData: true,
            onSuccess: () => {
                setShowFormModal(false);
                resetForm();
                showAlert(
                    editingService
                        ? "SEO service updated successfully!"
                        : "SEO service created successfully!"
                );
            },
            onError: () => {
                showAlert(
                    editingService
                        ? "Failed to update SEO service. Please check the form."
                        : "Failed to create SEO service. Please check the form.",
                    "error"
                );
            },
        };

        if (editingService) {
            post(route("seo-services.update", editingService.id), options);
        } else {
            post(route("seo-services.store"), options);
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this SEO service?")) {
            router.delete(route("seo-services.destroy", id), {
                onSuccess: () => showAlert("SEO service deleted successfully!"),
                onError: () =>
                    showAlert("Failed to delete SEO service.", "error"),
            });
        }
    };

    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        SEO Services Management
                    </h1>
                    <div className="flex items-center gap-3">
                        <ShowImg img="/assets/refImg/SEOservice.png" />
                        <Button onClick={openAddModal}>
                            <Plus className="w-4 h-4 mr-2" /> Add SEO Service
                        </Button>
                    </div>
                </div>

                {/* Alerts */}
                {alertMessage && (
                    <div
                        className={`mb-4 p-4 rounded-lg ${
                            alertType === "success"
                                ? "bg-green-100 border border-green-400 text-green-700"
                                : "bg-red-100 border border-red-400 text-red-700"
                        }`}
                    >
                        {alertMessage}
                    </div>
                )}
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {flash.error}
                    </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {seo_services.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg mb-2">
                                No SEO services found
                            </p>
                            <p className="text-sm">
                                Click "Add SEO Service" to create one
                            </p>
                        </div>
                    ) : (
                        seo_services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative">
                                    <img
                                        src={`/${service.image}`}
                                        alt={service.heading}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button
                                            size="icon"
                                            onClick={() => handleEdit(service)}
                                            title="Edit Service"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(service.id)
                                            }
                                            title="Delete Service"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                        {service.heading}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {service.subheading}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {service.features
                                            .filter((f) => f?.trim())
                                            .slice(0, 3)
                                            .map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        {service.features.filter((f) => f?.trim())
                                            .length > 3 && (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                +
                                                {service.features.filter(
                                                    (f) => f?.trim()
                                                ).length - 3}{" "}
                                                more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add/Edit Service Modal (popup) */}
            {showFormModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                        // close only when the dark backdrop itself is clicked,
                        // not when clicking inside the modal card
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingService
                                            ? "Edit SEO Service"
                                            : "Add New SEO Service"}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {editingService
                                            ? "Update the SEO service details"
                                            : "Create a new SEO service"}
                                    </p>
                                </div>
                                <Button variant="ghost" onClick={closeModal}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Form Errors */}
                            {Object.keys(errors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h3 className="text-sm font-medium text-red-800 mb-2">
                                        Please fix the following errors:
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                        {Object.values(errors).map(
                                            (error, index) => (
                                                <li key={index}>{error}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Form Fields */}
                            <div className="space-y-6">
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Image * (400x400)
                                    </Label>
                                    <Input
                                        ref={imageRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-32 object-cover rounded-lg border"
                                            />
                                        </div>
                                    )}
                                    {errors.image && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Heading *
                                    </Label>
                                    <Input
                                        value={data.heading}
                                        onChange={(e) =>
                                            setData("heading", e.target.value)
                                        }
                                        placeholder="SEO service heading"
                                    />
                                    {errors.heading && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.heading}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subheading *
                                    </Label>
                                    <Input
                                        value={data.subheading}
                                        onChange={(e) =>
                                            setData(
                                                "subheading",
                                                e.target.value
                                            )
                                        }
                                        placeholder="SEO service subheading"
                                    />
                                    {errors.subheading && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.subheading}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </Label>
                                    <QuillEditor
                                        value={data.description}
                                        onChange={(content) =>
                                            setData("description", content)
                                        }
                                        placeholder="Write a compelling description..."
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <SingleInputArray
                                    form={{ data, setData, errors }}
                                    field="features"
                                    label="Features *"
                                    placeholder="Add a feature"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                                <Button
                                    variant="outline"
                                    onClick={closeModal}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    {processing
                                        ? editingService
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingService
                                        ? "Update Service"
                                        : "Create Service"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}