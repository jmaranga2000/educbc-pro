import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("sports").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function SportsModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="sports" moduleSlug={module} />;
}
