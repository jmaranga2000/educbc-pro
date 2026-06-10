import { ROLE_PERMISSIONS } from "@/constants";
import type { Role } from "@/lib/types";

export function can(role: Role, permission: string) {
  const permissions: readonly string[] = ROLE_PERMISSIONS[role];

  return permissions.includes("*") || permissions.includes(permission);
}
