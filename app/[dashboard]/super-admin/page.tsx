import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function SuperAdminDashboardPage() {
  return <SuperAdminDashboard />;
}
