import { SpecificDashboardRoute } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function LibraryDashboardPage() {
  return <SpecificDashboardRoute dashboardKey="library" />;
}
