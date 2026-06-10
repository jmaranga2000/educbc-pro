import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("class-teacher").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function ClassTeacherModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="class-teacher" moduleSlug={module} />;
}
