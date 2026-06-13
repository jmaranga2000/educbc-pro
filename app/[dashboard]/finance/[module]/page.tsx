import { notFound } from "next/navigation";
import { SpecificDashboardShell } from "@/components/dashboard/specific-dashboard-shell";
import { SpecificModuleView } from "@/components/dashboard/specific-dashboard-view";
import { getSpecificDashboard, getSpecificModule } from "@/lib/specific-dashboards";
import { specificModuleParams } from "@/components/dashboard/specific-dashboard-route";
import {
  getFeeStructures,
  getPayments,
  getArrears,
  getFinanceReports,
  getReceipts,
  getReconciliationRows,
  getIntegrations
} from "@/services/finance-dashboard.service";
import {
  FeeStructuresPage,
  PaymentsPage,
  ArrearsPage,
  ReportsPage,
  ReconciliationPage,
  IntegrationsPage
} from "@/components/dashboard/finance/finance-pages";

export function generateStaticParams() {
  return specificModuleParams("finance").map((item: any) => ({
    dashboard: "dashboard",
    module: item.module
  }));
}

export default async function FinanceModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: moduleSlug } = await params;

  const dashboard = getSpecificDashboard("finance");
  const module = getSpecificModule("finance", moduleSlug);

  if (!dashboard || !module) {
    notFound();
  }

  let content = <SpecificModuleView dashboard={dashboard} module={module} />;

  switch (moduleSlug) {
    case "fee-structures":
      const feeData = await getFeeStructures();
      content = <FeeStructuresPage data={feeData} />;
      break;
    case "payments":
      const paymentData = await getPayments();
      content = <PaymentsPage data={paymentData} />;
      break;
    case "arrears":
      const arrearsData = await getArrears();
      content = <ArrearsPage data={arrearsData} />;
      break;
    case "reports":
      const reportsData = await getFinanceReports();
      content = <ReportsPage data={reportsData} />;
      break;
    case "receipts":
      const receiptsData = await getReceipts();
      content = <PaymentsPage data={receiptsData} isReceipts={true} />;
      break;
    case "reconciliation":
      const reconData = await getReconciliationRows();
      content = <ReconciliationPage data={reconData} />;
      break;
    case "integrations":
      const integrationsData = await getIntegrations();
      content = <IntegrationsPage data={integrationsData} />;
      break;
  }

  return (
    <SpecificDashboardShell dashboard={dashboard}>
      {content}
    </SpecificDashboardShell>
  );
}
