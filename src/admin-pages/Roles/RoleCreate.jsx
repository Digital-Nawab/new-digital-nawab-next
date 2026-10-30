// resources/js/Pages/Roles/RoleCreate.jsx
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function RoleCreate() {
    const { props } = usePage();
    const { permissions } = props;
    console.log(props);
    const [selected, setSelected] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permissions: [],
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);
    
    console.log(selected)
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
        post("/roles");
    };



    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create Role</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label>Add Permissions</Label>
                        <div className="border rounded p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
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
                        Create
                    </Button>
                </form>
            </div>
        </Layout>
    );
}