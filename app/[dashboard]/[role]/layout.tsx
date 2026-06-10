import { notFound } from "next/navigation";
import { SpecificDashboardShell } from "@/components/dashboard/specific-dashboard-shell";
import { getSpecificDashboard } from "@/lib/specific-dashboards";
import { roleRoutes } from "@/lib/app-routes";

export function generateStaticParams() {
  return roleRoutes
    .filter((route) => route.slug !== "super-admin")
    .map((route) => ({ role: route.slug }));
}

export default async function RoleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const dashboard = getSpecificDashboard(role);

  if (!dashboard || role === "super-admin") {
    notFound();
  }

  return <SpecificDashboardShell dashboard={dashboard}>{children}</SpecificDashboardShell>;
}
