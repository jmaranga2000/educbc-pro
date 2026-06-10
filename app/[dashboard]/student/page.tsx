import { SpecificDashboardRoute } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function StudentDashboardPage() {
  return <SpecificDashboardRoute dashboardKey="student" />;
}
