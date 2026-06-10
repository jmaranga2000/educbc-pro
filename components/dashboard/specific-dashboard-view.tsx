import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardIconMap } from "@/components/dashboard/dashboard-shell";
import type { SpecificDashboard, SpecificDashboardModule } from "@/lib/specific-dashboards";

export function SpecificDashboardView({ dashboard }: { dashboard: SpecificDashboard }) {
  const Icon = dashboardIconMap[dashboard.icon];

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <Badge>{dashboard.key.replaceAll("-", " ")}</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-normal">{dashboard.title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{dashboard.subtitle}</p>
            </div>
          </div>
          <Link href="/" className="rounded border border-border px-3 py-2 text-sm font-bold hover:bg-muted">
            Public Site
          </Link>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat) => (
          <div key={stat.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{stat.detail}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dashboard.title} Modules</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {dashboard.modules.map((item) => (
            <Link key={item.slug} href={`/dashboard/${dashboard.key}/${item.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
              <p className="font-bold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SpecificModuleView({
  dashboard,
  module
}: {
  dashboard: SpecificDashboard;
  module: SpecificDashboardModule;
}) {
  const Icon = dashboardIconMap[dashboard.icon];

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>{dashboard.title}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">{module.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{module.description}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Records and Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {module.records.map((record) => (
              <div key={record} className="rounded border border-border bg-background p-4">
                <p className="font-bold">{record}</p>
                <p className="mt-2 text-sm text-muted-foreground">This page is the workspace for creating, viewing, updating, and reporting on {record.toLowerCase()}.</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Create record", "View records", "Generate report", "Send notification"].map((action) => (
              <button key={action} type="button" className="min-h-11 w-full rounded border border-border bg-background px-3 py-2 text-left text-sm font-bold hover:bg-muted">
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
