import { ParentDashboard } from "@/components/dashboard/parent/parent-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function ParentDashboardPage() {
  return <ParentDashboard />;
}
