import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("teacher").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function TeacherModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="teacher" moduleSlug={module} />;
}
