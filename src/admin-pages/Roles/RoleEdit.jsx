import { useForm, Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
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

export default function RoleEdit() {
    const { props } = usePage();
    const { role, permissions, flash } = props;
    console.log(props);

    const [selected, setSelected] = useState(role.data.permissions);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: role.data.name,
        permissions: [],
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);
    
    useEffect(() => {
       console.log(selected)
    }, [selected]);

    const handlePermissionToggle = (permission) => {
        setSelected(prev => {
            const isSelected = prev.some(p => p.id === permission.id);
            if (isSelected) {
                return prev.filter(p => p.id !== permission.id);
            } else {
                return [...prev, permission];
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        data.permissions = selected.map((s) => s.name);
        put(`/roles/${role.data.id}`, {
            preserveState: true,
            preserveScroll: true,
            onError: (err) => {
                console.error("Form submission errors:", err);
            },
            onSuccess: () => {
                console.log("Role updated successfully");
            },
        });
    };

    const handleDelete = (roleId, permissionName) => {
        router.delete(`/roles/${roleId}/permission/${permissionName}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Update the selected permissions to reflect the revocation
                setSelected((prev) =>
                    prev.filter((p) => p.value !== permissionName)
                );
            },
            onError: (err) => {
                console.error("Revoke permission error:", err);
            },
        });
    };

    return (
        <Layout>
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                <h1 className="text-2xl font-bold mb-4">Edit Role</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label>Add Permissions</Label>
                        <div className="border rounded p-4 grid grid-cols-1  lg:grid-cols-4 gap-2 ">
                            {permissions?.data?.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2 py-1">
                                    <Checkbox
                                        checked={selected.some(p => p.id === permission.id)}
                                        onCheckedChange={() => handlePermissionToggle(permission)}
                                    />
                                    <label className="text-sm cursor-pointer" onClick={() => handlePermissionToggle(permission)}>
                                        {permission.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </form>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Assigned Permissions
                    </h2>
                    {role.data.permissions.length === 0 ? (
                        <p className="text-gray-500">
                            No permissions assigned to this role.
                        </p>
                    ) : (
                        <Table className="bg-white rounded-lg border shadow-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        ID
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {role.data.permissions.map((permission) => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="font-medium">
                                            {permission.id}
                                        </TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        {/* <TableCell className="text-right">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        Revoke
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently revoke the permission "{permission.name}" from the role "{role.data.name}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(role.data.id, permission.name)}
                                                        >
                                                            Revoke
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </Layout>
    );
}