import Link from "next/link";
import { BarChart3, FilePlus2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reports } from "@/lib/super-admin-expanded";

export function ReportsDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Reports Center</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">Create, Review, and Publish Reports</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Build academic, financial, attendance, operations, and CBC reports for school leadership and parents.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Summary label="Reports tracked" value={String(reports.length)} detail="Draft, ready, and published" />
        <Summary label="Ready to publish" value={String(reports.filter((report) => report.status === "Ready").length)} detail="Awaiting final approval" />
        <Summary label="Published reports" value={String(reports.filter((report) => report.status === "Published").length)} detail="Visible to leadership" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader className="gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Report Library</CardTitle>
              <p className="text-sm text-muted-foreground">Open a report for metrics, sections, and recommended actions.</p>
            </div>
            <Link
              href="/dashboard/super-admin/reports/new"
              className="inline-flex min-h-10 items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              New report
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/dashboard/super-admin/reports/${report.id}`}
                  className="block rounded border border-border p-4 transition hover:bg-muted/50"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-bold">{report.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{report.summary}</p>
                    </div>
                    <span className="w-fit rounded bg-muted px-2.5 py-1 text-xs font-bold">{report.status}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                    <span>{report.type}</span>
                    <span>{report.period}</span>
                    <span>{report.owner}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <ReportCreatePanel compact />
      </div>
    </div>
  );
}

export function ReportCreatePanel({ compact = false }: { compact?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{compact ? "Quick Create Form" : "New Report Form"}</CardTitle>
        <p className="text-sm text-muted-foreground">Capture report purpose, scope, source data, and publishing audience.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Field label="Report title" placeholder="e.g. Term 2 Attendance Review" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select label="Report type" options={["Academic", "CBC", "Finance", "Attendance", "Operations", "Workers"]} />
            <Select label="Period" options={["Term 1 2026", "Term 2 2026", "Term 3 2026", "Monthly", "Weekly"]} />
          </div>
          <Select label="Audience" options={["Leadership", "Teachers", "Parents", "Board", "Finance Office"]} />
          <label className="block">
            <span className="text-sm font-semibold">Report notes</span>
            <textarea
              className="mt-2 min-h-32 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Add the main questions this report should answer."
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded border border-border p-3 text-sm font-semibold">
              <input type="checkbox" className="h-4 w-4" />
              Include charts
            </label>
            <label className="flex items-center gap-2 rounded border border-border p-3 text-sm font-semibold">
              <input type="checkbox" className="h-4 w-4" />
              Notify reviewers
            </label>
          </div>
          <button className="inline-flex min-h-10 items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90" type="button">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Save report draft
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

function Summary({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold text-primary">{detail}</p>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input className="mt-2 min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary" placeholder={placeholder} />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <select className="mt-2 min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
