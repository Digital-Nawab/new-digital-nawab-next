"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import NextLink from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

// Context for Inertia Page Props & Routing
export const InertiaContext = createContext({
  props: {
    auth: {
      user: {
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
      },
    },
    flash: {},
    errors: {},
  },
  url: "/admin",
  refresh: () => {},
  setPageProps: () => {},
});

// Helper for building route URLs (Ziggy route() replica)
export function route(name, ...params) {
  if (!name) {
    return {
      current: (pattern) => {
        if (typeof window === "undefined") return false;
        const pathname = window.location.pathname;
        if (!pattern) return pathname;
        if (pattern === "dashboard") return pathname === "/admin" || pathname === "/";
        if (pattern === "admin.index") return pathname === "/admin";
        if (pattern.endsWith(".index")) {
          const res = pattern.replace(".index", "");
          return pathname.includes(res);
        }
        return pathname.includes(pattern);
      },
    };
  }

  const id = params[0] !== undefined ? params[0] : "";
  const subId = params[1] !== undefined ? params[1] : "";

  // Common Named Routes
  switch (name) {
    case "dashboard":
    case "admin.index":
      return "/admin";
    case "login":
      return "/login";
    case "logout":
      return "/api/logout";
    case "register":
      return "/api/register";
    case "profile.edit":
      return "/admin/profile";
    case "profile.update":
      return "/api/profile";
    case "profile.destroy":
      return "/api/profile";
    case "password.confirm":
    case "password.email":
    case "password.request":
    case "password.store":
    case "password.update":
    case "verification.send":
      return "/api/" + name.replace(".", "/");
    case "enquiries.index":
      return "/admin/enquiries";
    case "enquiries.store":
      return "/api/enquiries";
    case "enquiries.destroy":
      return `/api/delete_enquiry/${id}`;
    case "enquiries.updateStatus":
      return `/api/update_enquirystatus/${id}`;
    case "service.store":
      return "/api/services";
    case "service.update":
      return `/api/update_service/${id}`;
    case "service.destroy":
      return `/api/delete_service/${id}`;
    case "subservice.store":
      return "/api/subservices";
    case "subservice.destroy":
      return `/api/delete_subservice/${id}`;
    case "technologies.index":
      return "/admin/technologies";
    case "technologies.store":
      return "/api/post_technology";
    case "technologies.update":
      return `/api/update_technology/${id}`;
    case "technologies.delete":
      return `/api/delete_technology/${id}`;
    case "faqs.index":
      return "/admin/faqs";
    case "faqs.store":
      return "/api/post_faq";
    case "faqs.update":
      return `/api/update_faq/${id}`;
    case "faqs.destroy":
      return `/api/delete_faq/${id}`;
    case "roles.index":
      return "/admin/roles";
    case "roles.create":
      return "/admin/roles/create";
    case "roles.store":
      return "/api/roles";
    case "roles.show":
      return `/admin/roles/${id}`;
    case "roles.edit":
      return `/admin/roles/${id}/edit`;
    case "roles.update":
      return `/api/roles/${id}`;
    case "roles.destroy":
      return `/api/roles/${id}`;
    case "users.index":
      return "/admin/users";
    case "users.create":
      return "/admin/users/create";
    case "users.store":
      return "/api/users";
    case "users.show":
      return `/admin/users/${id}`;
    case "users.edit":
      return `/admin/users/${id}/edit`;
    case "users.update":
      return `/api/users/${id}`;
    case "users.destroy":
      return `/api/users/${id}`;
    case "permissions.index":
      return "/admin/permissions";
    case "permissions.create":
      return "/admin/permissions/create";
    case "permissions.store":
      return "/api/permissions";
    case "permissions.show":
      return `/admin/permissions/${id}`;
    case "permissions.edit":
      return `/admin/permissions/${id}/edit`;
    case "permissions.update":
      return `/api/permissions/${id}`;
    case "permissions.destroy":
      return `/api/permissions/${id}`;
  }

  // Generic REST conventions
  if (name.endsWith(".store")) {
    const res = name.replace(".store", "");
    return `/api/${res}`;
  }
  if (name.endsWith(".update")) {
    const res = name.replace(".update", "");
    return `/api/${res}/${id}`;
  }
  if (name.endsWith(".destroy")) {
    const res = name.replace(".destroy", "");
    return `/api/${res}/${id}`;
  }
  if (name.endsWith(".index")) {
    const res = name.replace(".index", "");
    return `/admin/${res}`;
  }
  if (name.endsWith(".show")) {
    const res = name.replace(".show", "");
    return `/admin/${res}/${id}`;
  }
  if (name.endsWith(".edit")) {
    const res = name.replace(".edit", "");
    return `/admin/${res}/${id}/edit`;
  }
  if (name.endsWith(".create")) {
    const res = name.replace(".create", "");
    return `/admin/${res}/create`;
  }

  return `/api/${name}`;
}

// Make route available globally on globalThis and window
if (typeof globalThis !== "undefined") {
  globalThis.route = route;
}
if (typeof window !== "undefined") {
  window.route = route;
}

// Head Component (document.title manager)
export function Head({ title, children }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Digital Nawab`;
    }
  }, [title]);
  return null;
}

// Inertia Link Component
export function Link({ href = "#", method = "get", as = "a", children, onClick, className, ...props }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (method && method.toLowerCase() === "post") {
      e.preventDefault();
      router.post(href);
    }
  };

  if (as === "button") {
    return (
      <button type="button" onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <NextLink href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </NextLink>
  );
}

// Normalize relative API URLs
export function resolveApiUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/api/")) {
    return url;
  }
  return `/api${url.startsWith("/") ? "" : "/"}${url}`;
}

// Router object
export const router = {
  post: async (url, data = {}, options = {}) => {
    try {
      const targetUrl = resolveApiUrl(url);
      let payload = data;
      let headers = {};
      if (options.forceFormData || hasFile(data)) {
        payload = toFormData(data);
        headers["Content-Type"] = "multipart/form-data";
      }
      const res = await axios.post(targetUrl, payload, { headers });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("inertia:refresh"));
      }
      toast.success(res.data?.message || "Operation successful!");
      if (options.onSuccess) options.onSuccess(res.data);
      if (options.onFinish) options.onFinish();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "An error occurred";
      toast.error(msg);
      if (options.onError) options.onError(err.response?.data?.errors || err);
      if (options.onFinish) options.onFinish();
      throw err;
    }
  },
  put: async (url, data = {}, options = {}) => {
    try {
      const targetUrl = resolveApiUrl(url);
      let payload = data;
      let headers = {};
      if (options.forceFormData || hasFile(data)) {
        payload = toFormData(data);
        // PHP/Node compatibility: Some put endpoints accept POST with _method=PUT
        headers["Content-Type"] = "multipart/form-data";
      }
      const res = await axios.put(targetUrl, payload, { headers });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("inertia:refresh"));
      }
      toast.success(res.data?.message || "Updated successfully!");
      if (options.onSuccess) options.onSuccess(res.data);
      if (options.onFinish) options.onFinish();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Update failed";
      toast.error(msg);
      if (options.onError) options.onError(err.response?.data?.errors || err);
      if (options.onFinish) options.onFinish();
      throw err;
    }
  },
  delete: async (url, options = {}) => {
    try {
      const targetUrl = resolveApiUrl(url);
      const res = await axios.delete(targetUrl);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("inertia:refresh"));
      }
      toast.success(res.data?.message || "Deleted successfully!");
      if (options.onSuccess) options.onSuccess(res.data);
      if (options.onFinish) options.onFinish();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Delete failed";
      toast.error(msg);
      if (options.onError) options.onError(err.response?.data?.errors || err);
      if (options.onFinish) options.onFinish();
      throw err;
    }
  },
  get: async (url, params = {}, options = {}) => {
    try {
      const res = await axios.get(url, { params });
      if (options.onSuccess) options.onSuccess(res.data);
      return res.data;
    } catch (err) {
      if (options.onError) options.onError(err);
      throw err;
    }
  },
  visit: (url) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  },
  reload: (options = {}) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("inertia:refresh"));
      if (options.onSuccess) options.onSuccess();
    }
  },
};

// Helper to check if object contains File/Blob
function hasFile(obj) {
  if (!obj || typeof obj !== "object") return false;
  return Object.values(obj).some(
    (v) => (typeof File !== "undefined" && v instanceof File) || (typeof Blob !== "undefined" && v instanceof Blob)
  );
}

// Helper to convert object to FormData
function toFormData(obj) {
  if (typeof FormData === "undefined") return obj;
  if (obj instanceof FormData) return obj;
  const fd = new FormData();
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined && val !== null) {
      fd.append(key, val);
    }
  }
  return fd;
}

// useForm hook
export function useForm(initialValues = {}) {
  const [data, setDataState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const setData = useCallback((keyOrFn, val) => {
    if (typeof keyOrFn === "function") {
      setDataState(keyOrFn);
    } else if (typeof keyOrFn === "object" && keyOrFn !== null) {
      setDataState((prev) => ({ ...prev, ...keyOrFn }));
    } else {
      setDataState((prev) => ({ ...prev, [keyOrFn]: val }));
    }
  }, []);

  const reset = useCallback(
    (...fields) => {
      if (fields.length === 0) {
        setDataState(initialValues);
      } else {
        setDataState((prev) => {
          const next = { ...prev };
          for (const f of fields) {
            next[f] = initialValues[f] !== undefined ? initialValues[f] : "";
          }
          return next;
        });
      }
    },
    [initialValues]
  );

  const clearErrors = useCallback((...fields) => {
    if (fields.length === 0) {
      setErrors({});
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        for (const f of fields) delete next[f];
        return next;
      });
    }
  }, []);

  const post = useCallback(
    async (url, options = {}) => {
      setProcessing(true);
      try {
        const targetUrl = resolveApiUrl(url);
        let payload = options.data || data;
        let headers = {};
        if (options.forceFormData || hasFile(payload)) {
          payload = toFormData(payload);
          headers["Content-Type"] = "multipart/form-data";
        }
        const res = await axios.post(targetUrl, payload, { headers });
        setProcessing(false);
        setWasSuccessful(true);
        setRecentlySuccessful(true);
        setTimeout(() => setRecentlySuccessful(false), 2000);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("inertia:refresh"));
        }
        toast.success(res.data?.message || "Saved successfully!");
        if (options.onSuccess) options.onSuccess(res.data);
        if (options.onFinish) options.onFinish();
        return res.data;
      } catch (err) {
        setProcessing(false);
        const errMap = err.response?.data?.errors || {};
        setErrors(errMap);
        toast.error(err.response?.data?.message || err.message || "Failed to submit");
        if (options.onError) options.onError(errMap);
        if (options.onFinish) options.onFinish();
      }
    },
    [data]
  );

  const put = useCallback(
    async (url, options = {}) => {
      setProcessing(true);
      try {
        const targetUrl = resolveApiUrl(url);
        let payload = options.data || data;
        let headers = {};
        if (options.forceFormData || hasFile(payload)) {
          payload = toFormData(payload);
          headers["Content-Type"] = "multipart/form-data";
        }
        const res = await axios.put(targetUrl, payload, { headers });
        setProcessing(false);
        setWasSuccessful(true);
        setRecentlySuccessful(true);
        setTimeout(() => setRecentlySuccessful(false), 2000);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("inertia:refresh"));
        }
        toast.success(res.data?.message || "Updated successfully!");
        if (options.onSuccess) options.onSuccess(res.data);
        if (options.onFinish) options.onFinish();
        return res.data;
      } catch (err) {
        setProcessing(false);
        const errMap = err.response?.data?.errors || {};
        setErrors(errMap);
        toast.error(err.response?.data?.message || err.message || "Failed to update");
        if (options.onError) options.onError(errMap);
        if (options.onFinish) options.onFinish();
      }
    },
    [data]
  );

  const destroy = useCallback(
    async (url, options = {}) => {
      setProcessing(true);
      try {
        const targetUrl = resolveApiUrl(url);
        const res = await axios.delete(targetUrl);
        setProcessing(false);
        setWasSuccessful(true);
        setRecentlySuccessful(true);
        setTimeout(() => setRecentlySuccessful(false), 2000);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("inertia:refresh"));
        }
        toast.success(res.data?.message || "Deleted successfully!");
        if (options.onSuccess) options.onSuccess(res.data);
        if (options.onFinish) options.onFinish();
        return res.data;
      } catch (err) {
        setProcessing(false);
        const errMap = err.response?.data?.errors || {};
        setErrors(errMap);
        toast.error(err.response?.data?.message || err.message || "Failed to delete");
        if (options.onError) options.onError(errMap);
        if (options.onFinish) options.onFinish();
      }
    },
    []
  );

  return {
    data,
    setData,
    post,
    put,
    delete: destroy,
    reset,
    errors,
    clearErrors,
    processing,
    wasSuccessful,
    recentlySuccessful,
  };
}

// usePage hook
export function usePage() {
  const ctx = useContext(InertiaContext);
  return ctx;
}

export default {
  InertiaContext,
  usePage,
  useForm,
  router,
  route,
  Link,
  Head,
};
