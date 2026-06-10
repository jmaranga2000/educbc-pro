import Link from "next/link";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { examsModules, examsProfile } from "@/lib/exams-dashboard";

export function ExamsDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>{examsProfile.activePeriod}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">Exams Department Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Department workspace for CBC assessments, grading, analytics, report cards, approvals, and publishing.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Assessments" value={`${examsProfile.assessments}`} />
        <Metric label="Completion" value={examsProfile.completion} />
        <Metric label="Reports Ready" value={`${examsProfile.reportsReady}`} />
        <Metric label="Pending Approvals" value={`${examsProfile.pendingApprovals}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exams Department Pages</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {examsModules.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.slug} href={`/dashboard/exams/${item.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="mt-3 font-bold">{item.title}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-2xl font-bold">{value}</p>
    </div>
  );
}
