import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("library").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function LibraryModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="library" moduleSlug={module} />;
}
