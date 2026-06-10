import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("student").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function StudentModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="student" moduleSlug={module} />;
}
