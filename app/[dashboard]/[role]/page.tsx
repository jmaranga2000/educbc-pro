import { notFound } from "next/navigation";
import { SpecificDashboardView } from "@/components/dashboard/specific-dashboard-view";
import { getSpecificDashboard } from "@/lib/specific-dashboards";

export default async function DynamicDashboardPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const dashboard = getSpecificDashboard(role);

  if (!dashboard || role === "super-admin") {
    notFound();
  }

  return <SpecificDashboardView dashboard={dashboard} />;
}
