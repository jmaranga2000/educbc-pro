import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ReportRecord } from "@/lib/super-admin-expanded";

export function ReportDetailsView({ report }: { report: ReportRecord }) {
  return (
    <div className="space-y-5">
      <Link href="/dashboard/super-admin/reports" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to reports
      </Link>

      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">{report.type} Report</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">{report.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{report.summary}</p>
          </div>
          <span className="w-fit rounded bg-muted px-3 py-2 text-sm font-bold">{report.status}</span>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        {report.metrics.map((metric) => (
          <div key={metric.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold">{metric.value}</p>
            <p className="mt-2 text-sm font-semibold text-primary">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Sections</CardTitle>
            <p className="text-sm text-muted-foreground">{report.period} - Owner: {report.owner}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.sections.map((section) => (
                <div key={section.heading} className="rounded border border-border p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-bold">{section.heading}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{section.body}</p>
                      <p className="mt-3 text-sm font-semibold text-primary">{section.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Source data checked", "Head teacher review", "Finance review where needed", "Parent-safe summary prepared"].map((item) => (
                <label key={item} className="flex items-center gap-2 rounded border border-border p-3 text-sm font-semibold">
                  <input type="checkbox" className="h-4 w-4" defaultChecked={report.status === "Published"} />
                  {item}
                </label>
              ))}
              <button type="button" className="inline-flex min-h-10 items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4" aria-hidden="true" />
                Publish or send for approval
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
