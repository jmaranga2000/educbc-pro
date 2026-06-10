import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  ShieldCheck,
  Users,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { superAdminCharts, superAdminModules, superAdminStats } from "@/lib/super-admin";

const priorityCards = [
  {
    title: "Finance Watch",
    value: "KES 1.8M",
    detail: "Outstanding balances across 214 learners",
    href: "/dashboard/super-admin/fees",
    icon: Wallet
  },
  {
    title: "Academic Release",
    value: "316",
    detail: "Report cards ready for review",
    href: "/dashboard/super-admin/reports",
    icon: FileText
  },
  {
    title: "People Verification",
    value: "93%",
    detail: "Parent contacts verified this term",
    href: "/dashboard/super-admin/parents",
    icon: Users
  }
];

const queues = [
  { label: "Pending admissions", value: "46", detail: "New learner files awaiting approval", icon: GraduationCap },
  { label: "Teacher comments", value: "181", detail: "Needed before report publishing", icon: ClipboardList },
  { label: "Worker rota gaps", value: "4", detail: "Weekend and clinic relief shifts", icon: ShieldCheck },
  { label: "Notifications queued", value: "728", detail: "Fees, attendance, and exam alerts", icon: Bell }
];

const focusModules = ["students", "parents", "fees", "exams", "workers", "reports"];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Super Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">School Command Center</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Highest level control for academics, learners, parents, staff, CBC setup, fees, exams, transport,
              timetables, notifications, and operational reports.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:w-[360px]">
            <MiniStatus label="Today" value="Live" />
            <MiniStatus label="Term" value="T2 2026" />
            <MiniStatus label="Access" value="Root" />
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-3">
        {priorityCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link key={card.title} href={card.href} className="rounded border border-border bg-white p-4 shadow-soft transition hover:border-primary/20 hover:bg-muted/50">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">{card.title}</p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{card.detail}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        {superAdminStats.map((stat, index) => (
          <div key={stat.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {index % 3 === 0 ? (
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              ) : index % 3 === 1 ? (
                <CreditCard className="h-5 w-5 text-primary" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
              )}
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {superAdminCharts.map((chart) => (
          <Card key={chart.title}>
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chart.values.map((item) => {
                  const width = Math.max(8, Math.min(100, item.value));

                  return (
                    <div key={item.label} className="grid grid-cols-[88px_1fr_52px] items-center gap-3 text-sm">
                      <span className="font-semibold">{item.label}</span>
                      <span className="h-3 overflow-hidden rounded bg-muted">
                        <span className="block h-full rounded bg-primary" style={{ width: `${width}%` }} />
                      </span>
                      <span className="text-right font-bold">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Management Queue</CardTitle>
            <p className="text-sm text-muted-foreground">High-impact items the super admin should clear first.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {queues.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="rounded border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span className="rounded bg-muted px-2.5 py-1 text-xs font-bold">{item.value}</span>
                    </div>
                    <p className="mt-3 font-bold">{item.label}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Shortcuts</CardTitle>
            <p className="text-sm text-muted-foreground">Jump into the most used super admin modules.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {focusModules.map((slug) => {
                const item = superAdminModules.find((current) => current.slug === slug);

                if (!item) {
                  return null;
                }

                return (
                  <Link
                    key={item.slug}
                    href={`/dashboard/super-admin/${item.slug}`}
                    className="flex min-h-11 items-center justify-between gap-3 rounded border border-border px-3 py-2 text-sm font-semibold transition hover:bg-muted"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk and Compliance Snapshot</CardTitle>
          <p className="text-sm text-muted-foreground">Operational signals that need leadership visibility.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Risk title="Fee arrears" detail="36 accounts above KES 25,000" level="Finance action" />
            <Risk title="Attendance dip" detail="Grade 8 North below weekly target" level="Class follow-up" />
            <Risk title="Worker coverage" detail="Clinic and cleaning relief gaps remain" level="Admin action" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniStatus({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-muted px-3 py-2">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function Risk({ title, detail, level }: { title: string; detail: string; level: string }) {
  return (
    <div className="rounded border border-border p-4">
      <div className="flex items-center gap-2 text-orange-700">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        <p className="font-bold">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
      <p className="mt-3 inline-flex rounded bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-800">{level}</p>
    </div>
  );
}
