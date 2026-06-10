import { notFound } from "next/navigation";
import { SpecificDashboardShell } from "@/components/dashboard/specific-dashboard-shell";
import { SpecificDashboardView, SpecificModuleView } from "@/components/dashboard/specific-dashboard-view";
import { getSpecificDashboard, getSpecificModule, type SpecificDashboardKey } from "@/lib/specific-dashboards";

export function SpecificDashboardRoute({ dashboardKey }: { dashboardKey: SpecificDashboardKey }) {
  const dashboard = getSpecificDashboard(dashboardKey);

  if (!dashboard) {
    notFound();
  }

  return (
    <SpecificDashboardShell dashboard={dashboard}>
      <SpecificDashboardView dashboard={dashboard} />
    </SpecificDashboardShell>
  );
}

export function specificModuleParams(dashboardKey: SpecificDashboardKey) {
  return getSpecificDashboard(dashboardKey)?.modules.map((item) => ({ module: item.slug })) ?? [];
}

export function SpecificDashboardModuleRoute({
  dashboardKey,
  moduleSlug
}: {
  dashboardKey: SpecificDashboardKey;
  moduleSlug: string;
}) {
  const dashboard = getSpecificDashboard(dashboardKey);
  const module = getSpecificModule(dashboardKey, moduleSlug);

  if (!dashboard || !module) {
    notFound();
  }

  return (
    <SpecificDashboardShell dashboard={dashboard}>
      <SpecificModuleView dashboard={dashboard} module={module} />
    </SpecificDashboardShell>
  );
}
