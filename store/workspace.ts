import { create } from "zustand";
import type { Role } from "@/lib/types";

type WorkspaceState = {
  activeRole: Role;
  setActiveRole: (role: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeRole: "SUPER_ADMIN",
  setActiveRole: (role) => set({ activeRole: role as Role })
}));
