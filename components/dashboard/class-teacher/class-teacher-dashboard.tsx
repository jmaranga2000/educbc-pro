import Link from "next/link";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { classTeacherModules, classTeacherProfile } from "@/lib/class-teacher";

const focus = ["attendance", "academics", "discipline-records", "notifications"];

export function ClassTeacherDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>{classTeacherProfile.term}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">{classTeacherProfile.className} Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Class teacher workspace for the complete stream: learners, parents, CBC progress, academics,
              attendance, discipline, and parent communication.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Learners" value={`${classTeacherProfile.learners}`} detail="Assigned stream roll" />
        <Metric label="Attendance" value={classTeacherProfile.attendance} detail="Weekly class average" />
        <Metric label="CBC Progress" value={classTeacherProfile.cbcProgress} detail="Evidence completion" />
        <Metric label="Parent Reach" value={classTeacherProfile.parentReach} detail="Verified contacts" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Class Teacher Pages</CardTitle>
            <p className="text-sm text-muted-foreground">Dedicated workspaces for this stream.</p>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {classTeacherModules.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.slug} href={`/dashboard/class-teacher/${item.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
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

        <Card>
          <CardHeader>
            <CardTitle>Today’s Focus</CardTitle>
            <p className="text-sm text-muted-foreground">Fast access to work that usually needs daily attention.</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {focus.map((slug) => {
              const item = classTeacherModules.find((module) => module.slug === slug);
              if (!item) return null;

              return (
                <Link key={slug} href={`/dashboard/class-teacher/${slug}`} className="flex min-h-11 items-center justify-between gap-3 rounded border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">
                  <span>{item.title}</span>
                  <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-3 text-sm font-semibold text-primary">{detail}</p>
    </div>
  );
}
