import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("transport").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function TransportModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="transport" moduleSlug={module} />;
}
