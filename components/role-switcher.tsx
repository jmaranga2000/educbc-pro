"use client";

import { UserCog } from "lucide-react";
import { dashboardProfiles } from "@/lib/dashboard-ui";
import { useWorkspaceStore } from "@/store/workspace";

export function RoleSwitcher() {
  const activeRole = useWorkspaceStore((state) => state.activeRole);
  const setActiveRole = useWorkspaceStore((state) => state.setActiveRole);

  return (
    <label className="flex min-w-[260px] items-center gap-3 rounded border border-border bg-white px-3 py-2 shadow-soft">
      <UserCog className="h-5 w-5 text-primary" aria-hidden="true" />
      <span className="sr-only">Switch role</span>
      <select
        className="w-full bg-transparent text-sm font-semibold outline-none"
        value={activeRole}
        onChange={(event) => setActiveRole(event.target.value)}
      >
        {dashboardProfiles.map((dashboard) => (
          <option key={dashboard.role} value={dashboard.role}>
            {dashboard.title}
          </option>
        ))}
      </select>
    </label>
  );
}
