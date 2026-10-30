"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { InertiaContext } from "./inertia-adapter";

export function AdminPageWrapper({ Component, fetcher, initialProps = {} }) {
  const [data, setData] = useState(initialProps);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: 1,
    name: "Admin",
    email: "admin@digitalnawab.com",
    roles: ["admin"],
    data: {
      id: 1,
      name: "Admin",
      email: "admin@digitalnawab.com",
      roles: ["admin"],
      permissions: ["all"],
    },
  });

  const loadData = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("dn_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser({
              ...parsed,
              data: {
                ...parsed,
                roles: parsed.roles || ["admin"],
                permissions: parsed.permissions || ["all"],
              },
            });
          } catch {}
        }
      }

      if (fetcher) {
        const fetched = await fetcher();
        if (fetched) {
          setData((prev) => ({ ...prev, ...fetched }));
        }
      }
    } catch (err) {
      console.error("Failed to load admin page data:", err);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    loadData();

    const handleRefresh = () => loadData();
    window.addEventListener("inertia:refresh", handleRefresh);
    return () => window.removeEventListener("inertia:refresh", handleRefresh);
  }, [loadData]);

  const pageContextValue = {
    props: {
      auth: { user },
      flash: {},
      errors: {},
      ...data,
    },
    url: typeof window !== "undefined" ? window.location.pathname : "/admin",
    refresh: loadData,
  };

  return (
    <InertiaContext.Provider value={pageContextValue}>
      <Component {...data} />
    </InertiaContext.Provider>
  );
}

export default AdminPageWrapper;

