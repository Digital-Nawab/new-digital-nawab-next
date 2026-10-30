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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function GooglePpc({ googlePpc }) {
    const { flash } = usePage().props;

    // Form for creating a new Google PPC record
    const [createOpen, setCreateOpen] = useState(false);
    const {
        data: createData,
        setData: setCreateData,
        post,
        processing: createProcessing,
        errors: createErrors,
        reset,
    } = useForm({
        icon: "",
        heading: "",
        description: "",
    });

    // Form for editing an existing Google PPC record
    const [editId, setEditId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        delete: deleteData,
    } = useForm({
        icon: "",
        heading: "",
        description: "",
    });

    // Handle create form submission
    const handleCreate = (e) => {
        e.preventDefault();
        post(route("google-ppc.store"), {
            onSuccess: () => {
                reset();
                setCreateOpen(false);
            },
        });
    };

    // Handle edit form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("google-ppc.update", editId), {
            onSuccess: () => {
                setEditId(null);
                setEditOpen(false);
            },
        });
    };

    // Handle edit button click
    const startEditing = (googlePpcItem) => {
        setEditId(googlePpcItem.id);
        setEditData({
            icon: googlePpcItem.icon,
            heading: googlePpcItem.heading,
            description: googlePpcItem.description,
        });
        setEditOpen(true);
    };

    // Handle delete
    const handleDelete = (id) => {
        if (
            confirm("Are you sure you want to delete this Google PPC service?")
        ) {
            deleteData(route("google-ppc.destroy", id), {
                onSuccess: () => setEditId(null),
            });
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <Head title="Google PPC Services" />
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Google PPC Services</h1>
                    <Button
                        onClick={() => {
                            reset();
                            setCreateOpen(true);
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
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

                {/* Create Form Popup */}
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Google PPC Service</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <Label htmlFor="create_icon">Icon</Label>
                                <Input
                                    id="create_icon"
                                    value={createData.icon}
                                    onChange={(e) =>
                                        setCreateData("icon", e.target.value)
                                    }
                                    className="mt-1"
                                />
                                {createErrors.icon && (
                                    <p className="text-red-500 text-sm">
                                        {createErrors.icon}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="create_heading">Heading</Label>
                                <Input
                                    id="create_heading"
                                    value={createData.heading}
                                    onChange={(e) =>
                                        setCreateData("heading", e.target.value)
                                    }
                                    className="mt-1"
                                />
                                {createErrors.heading && (
                                    <p className="text-red-500 text-sm">
                                        {createErrors.heading}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="create_description">
                                    Description
                                </Label>
                                <Textarea
                                    id="create_description"
                                    value={createData.description}
                                    onChange={(e) =>
                                        setCreateData(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1"
                                />
                                {createErrors.description && (
                                    <p className="text-red-500 text-sm">
                                        {createErrors.description}
                                    </p>
                                )}
                            </div>
                            <div className="space-x-2">
                                <Button type="submit" disabled={createProcessing}>
                                    Create
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setCreateOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Form Popup */}
                <Dialog
                    open={editOpen}
                    onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditId(null);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Google PPC Service</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <Label htmlFor="edit_icon">Icon</Label>
                                <Input
                                    id="edit_icon"
                                    value={editData.icon}
                                    onChange={(e) =>
                                        setEditData("icon", e.target.value)
                                    }
                                    className="mt-1"
                                />
                                {editErrors.icon && (
                                    <p className="text-red-500 text-sm">
                                        {editErrors.icon}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="edit_heading">Heading</Label>
                                <Input
                                    id="edit_heading"
                                    value={editData.heading}
                                    onChange={(e) =>
                                        setEditData("heading", e.target.value)
                                    }
                                    className="mt-1"
                                />
                                {editErrors.heading && (
                                    <p className="text-red-500 text-sm">
                                        {editErrors.heading}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="edit_description">
                                    Description
                                </Label>
                                <Textarea
                                    id="edit_description"
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1"
                                />
                                {editErrors.description && (
                                    <p className="text-red-500 text-sm">
                                        {editErrors.description}
                                    </p>
                                )}
                            </div>
                            <div className="space-x-2">
                                <Button type="submit" disabled={editProcessing}>
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        setEditOpen(false);
                                        setEditId(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* List of Google PPC Records */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {googlePpc.map((googlePpcItem) => (
                        <Card key={googlePpcItem.id}>
                            <CardHeader>
                                <CardTitle>{googlePpcItem.heading}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl mr-2">
                                        {googlePpcItem.icon}
                                    </span>
                                    <h3 className="text-xl font-semibold">
                                        {googlePpcItem.heading}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {googlePpcItem.description}
                                </p>
                                <div className="space-x-2">
                                    <Button
                                        onClick={() =>
                                            startEditing(googlePpcItem)
                                        }
                                        variant="outline"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleDelete(googlePpcItem.id)
                                        }
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
        </Layout>
    );
}