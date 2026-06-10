import { notFound } from "next/navigation";
import { ReportDetailsView } from "@/components/dashboard/super-admin/report-details-view";
import { getReport } from "@/lib/super-admin-expanded";

export default async function ReportDetailsPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = getReport(reportId);

  if (!report) {
    notFound();
  }

  return <ReportDetailsView report={report} />;
}
