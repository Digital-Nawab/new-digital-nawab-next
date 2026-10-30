"use client";

import React from "react";
import axios from "axios";
import DashboardPage from "@/Pages/Admin/Dashboard";
import { AdminPageWrapper } from "@/lib/AdminPageWrapper";

export default function Page() {
  return (
    <AdminPageWrapper
      Component={DashboardPage}
      fetcher={async () => {
        try {
          const res = await axios.get("/api/admin/dashboard");
          return res.data?.data || {};
        } catch {
          return {};
        }
      }}
    />
  );
}
