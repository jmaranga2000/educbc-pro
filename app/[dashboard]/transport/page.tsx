import { SpecificDashboardRoute } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function TransportDashboardPage() {
  return <SpecificDashboardRoute dashboardKey="transport" />;
}
