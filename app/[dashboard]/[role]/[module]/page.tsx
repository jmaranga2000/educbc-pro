import { notFound } from "next/navigation";
import { SpecificModuleView } from "@/components/dashboard/specific-dashboard-view";
import { getSpecificDashboard, getSpecificModule, specificDashboards } from "@/lib/specific-dashboards";

export function generateStaticParams() {
  const params: Array<{ role: string; module: string }> = [];
  specificDashboards
    .filter((d) => d.key !== "super-admin")
    .forEach((d) => {
      d.modules.forEach((m) => {
        params.push({ role: d.key, module: m.slug });
      });
    });
  return params;
}

export default async function DynamicDashboardModulePage({
  params
}: {
  params: Promise<{ role: string; module: string }>;
}) {
  const { role, module } = await params;
  const dashboard = getSpecificDashboard(role);
  const currentModule = getSpecificModule(role, module);

  if (!dashboard || !currentModule || role === "super-admin") {
    notFound();
  }

  return <SpecificModuleView dashboard={dashboard} module={currentModule} />;
}
