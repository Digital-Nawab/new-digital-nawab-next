import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Search,
    Plus,
    Shield,
    Edit,
    Trash2,
    Eye,
    Filter,
    MoreVertical,
    Key,
} from "lucide-react";
import Layout from "@/Layouts/Layout";

const PermissionIndex = () => {
    const { props } = usePage();
    const { permissions } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("table"); // table or grid

    const handleDelete = (id) => {
        router.delete(`/permissions/${id}`, {
            onSuccess: () => {
                // Refresh the page or update state if needed
            },
        });
    };

    // Filter permissions based on search term
    const filteredPermissions = permissions.data.filter(
        (permission) =>
            permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (permission.guard_name &&
                permission.guard_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    const PermissionCard = ({ permission }) => (
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
                <div className="">
                    <div className="flex items-center justify-between space-x-3">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Key className="w-4 h-4 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                {permission.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 mt-1">
                                ID: {permission.id}
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Link href={`/permissions/${permission.id}/edit`}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete Permission
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete the
                                            permission "{permission.name}"? This
                                            action cannot be undone and may
                                            affect users who have this
                                            permission.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleDelete(permission.id)
                                            }
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );

    return (
        <Layout>
            <div className="container mx-auto py-6 px-4 max-w-6xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Permissions
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Manage system permissions and access
                                    controls
                                </p>
                            </div>
                        </div>
                        <Link href="/permissions/create">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                                <Plus className="w-4 h-4 mr-2" />
                                New Permission
                            </Button>
                        </Link>
                    </div>

                    {/* Stats and Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-lg border px-4 py-2 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {permissions.data.length} Total
                                        Permissions
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search permissions..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-sm"
                                />
                            </div>

                            <div className="flex border border-gray-300 rounded-lg bg-white">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                                        viewMode === "grid"
                                            ? "bg-blue-50 text-blue-700 border-r border-blue-200"
                                            : "text-gray-500 hover:text-gray-700 border-r border-gray-300"
                                    }`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode("table")}
                                    className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                                        viewMode === "table"
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Table
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {filteredPermissions.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
                            <div className="p-4 bg-gray-100 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {searchTerm
                                    ? "No permissions found"
                                    : "No permissions yet"}
                            </h3>
                            <p className="text-gray-500 text-center mb-6 max-w-md text-sm">
                                {searchTerm
                                    ? "No permissions match your search criteria. Try adjusting your search terms."
                                    : "Get started by creating your first permission to control access to different parts of your application."}
                            </p>
                            {!searchTerm && (
                                <Link href="/permissions/create">
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create First Permission
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPermissions.map((permission) => (
                            <PermissionCard
                                key={permission.id}
                                permission={permission}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="font-semibold text-gray-900 w-20">
                                        ID
                                    </TableHead>
                                    <TableHead className="font-semibold text-gray-900">
                                        Permission Name
                                    </TableHead>
                                    {/* <TableHead className="font-semibold text-gray-900 w-24">Status</TableHead> */}
                                    <TableHead className="font-semibold text-gray-900 w-32 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPermissions.map((permission) => (
                                    <TableRow
                                        key={permission.id}
                                        className="hover:bg-gray-50/50"
                                    >
                                        <TableCell className="font-mono text-sm text-gray-600">
                                            #{permission.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <div className="p-1.5 bg-blue-100 rounded-md">
                                                    <Key className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="font-medium text-gray-900">
                                                    {permission.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        {/* <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </TableCell> */}
                                        <TableCell>
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link
                                                    href={`/permissions/${permission.id}/edit`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete
                                                                Permission
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you
                                                                want to delete
                                                                the permission "
                                                                {
                                                                    permission.name
                                                                }
                                                                "? This action
                                                                cannot be undone
                                                                and may affect
                                                                users who have
                                                                this permission.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        permission.id
                                                                    )
                                                                }
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                {/* Results Info */}
                {filteredPermissions.length > 0 && (
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                        <div>
                            Showing {filteredPermissions.length} of{" "}
                            {permissions.data.length} permissions
                            {searchTerm && (
                                <span className="ml-1">for "{searchTerm}"</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PermissionIndex;
