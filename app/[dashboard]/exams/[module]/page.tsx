import { SpecificDashboardModuleRoute, specificModuleParams } from "@/components/dashboard/specific-dashboard-route";

export function generateStaticParams() {
  return specificModuleParams("exams").map((item) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function ExamsModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SpecificDashboardModuleRoute dashboardKey="exams" moduleSlug={module} />;
}
