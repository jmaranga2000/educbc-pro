import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("workers").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function WorkersModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="workers" moduleSlug={module} />;
}
