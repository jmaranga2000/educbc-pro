import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReportCreatePanel } from "@/components/dashboard/super-admin/reports-dashboard";

export default function NewReportPage() {
  return (
    <div className="space-y-5">
      <Link href="/dashboard/super-admin/reports" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to reports
      </Link>
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">New Report</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">Create Report Draft</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Start a report with scope, audience, source data, and review requirements.
        </p>
      </section>
      <ReportCreatePanel />
    </div>
  );
}
