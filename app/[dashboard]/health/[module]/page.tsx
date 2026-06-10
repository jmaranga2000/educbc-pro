import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("health").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function HealthModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="health" moduleSlug={module} />;
}
