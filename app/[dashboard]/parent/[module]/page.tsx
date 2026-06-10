import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("parent").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function ParentModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="parent" moduleSlug={module} />;
}
