import { usePage } from "@inertiajs/react";

export default function usePermission() {
    const pageProps = usePage()?.props || {};
    const user = pageProps.auth?.user;

    const rawRoles = user?.data?.roles || user?.roles || ["admin"];
    const userRoles = (Array.isArray(rawRoles) ? rawRoles : [rawRoles])
        .map((r) => (typeof r === "string" ? r : r?.name))
        .filter(Boolean);

    // If no roles specified or empty, default to admin in admin dashboard
    if (userRoles.length === 0) {
        userRoles.push("admin");
    }

    const rawPermissions = user?.data?.permissions || user?.permissions || ["all"];
    const userPermissions = (Array.isArray(rawPermissions) ? rawPermissions : [rawPermissions])
        .map((p) => (typeof p === "string" ? p : p?.name))
        .filter(Boolean);

    const hasRole = (name) => {
        if (!name) return false;
        if (userRoles.includes("admin") || userRoles.includes("super_admin")) return true;
        return userRoles.includes(name);
    };

    const hasRoles = (names) => {
        if (!names || names.length === 0) return false;
        if (userRoles.includes("admin") || userRoles.includes("super_admin")) return true;
        return names.some((name) => userRoles.includes(name));
    };

    const hasPermissions = (name) => {
        if (!name) return false;
        if (userPermissions.includes("all") || userRoles.includes("admin") || userRoles.includes("super_admin")) return true;
        return userPermissions.includes(name);
    };

    return { hasRole, hasPermissions, hasRoles };
}
