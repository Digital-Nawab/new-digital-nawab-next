import React from "react";
import { Link, router, route } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function UserMenu({ user }) {
    const name = user?.data?.name || user?.name || "Admin";
    const email = user?.data?.email || user?.email || "admin@digitalnawab.com";
    const role = user?.data?.roles?.[0] || user?.roles?.[0] || "admin";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded px-2 py-1 hover:bg-accent border border-gray-200">
                <span className="text-sm font-medium">{name} ({role})</span>
                <svg width="16" height="16" viewBox="0 0 20 20">
                    <path
                        d="M5.5 7.5l4.5 4.5 4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-gray-200">
                <DropdownMenuLabel className="leading-tight">
                    <div className="font-semibold text-gray-900">{name} ({role})</div>
                    <div className="text-xs text-gray-500">{email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href={route("profile.edit")} className="cursor-pointer">Account / Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-700"
                    onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("dn_user");
                            localStorage.removeItem("auth_token");
                            window.location.href = "/login";
                        }
                    }}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
