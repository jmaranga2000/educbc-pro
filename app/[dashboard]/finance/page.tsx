import { FinanceDashboard } from "@/components/dashboard/finance/finance-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default async function FinanceDashboardPage() {
  return <FinanceDashboard />;
}
