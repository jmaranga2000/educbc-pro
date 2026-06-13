import { notFound } from "next/navigation";
import { SpecificDashboardShell } from "@/components/dashboard/specific-dashboard-shell";
import { getSpecificDashboard } from "@/lib/specific-dashboards";
import { getFinanceRecordById } from "@/services/finance-dashboard.service";
import { FinanceRecordDetailsPage } from "@/components/dashboard/finance/finance-pages";

export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default async function FinanceRecordDetailsRoute({
  params
}: {
  params: Promise<{ dashboard: string; module: string; recordId: string }>;
}) {
  const { recordId } = await params;

  const dashboard = getSpecificDashboard("finance");
  if (!dashboard) {
    notFound();
  }

  const record = await getFinanceRecordById(recordId);

  return (
    <SpecificDashboardShell dashboard={dashboard}>
      <FinanceRecordDetailsPage record={record} />
    </SpecificDashboardShell>
  );
}
