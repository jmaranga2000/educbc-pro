import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("finance").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function FinanceModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="finance" moduleSlug={module} />;
}
