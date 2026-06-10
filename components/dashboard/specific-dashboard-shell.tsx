import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardIconMap } from "@/components/dashboard/dashboard-shell";
import { specificDashboards, type SpecificDashboard } from "@/lib/specific-dashboards";

export function SpecificDashboardShell({
  dashboard,
  children
}: {
  dashboard: SpecificDashboard;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border bg-white/88">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>EduCBC Pro</span>
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold">
            <Link href={`/dashboard/${dashboard.key}`} className="rounded bg-primary px-3 py-2 text-primary-foreground">
              {dashboard.title}
            </Link>
            <Link href="/modules" className="rounded px-3 py-2 hover:bg-muted">
              Public Modules
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[292px_1fr] lg:px-8">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Specific Dashboards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {specificDashboards.map((item) => {
                const Icon = dashboardIconMap[item.icon];
                const active = item.key === dashboard.key;

                return (
                  <Link
                    key={item.key}
                    href={`/dashboard/${item.key}`}
                    className={`flex min-h-11 items-center gap-2 rounded px-3 py-2 text-sm font-bold transition ${
                      active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.title.replace(" Dashboard", "")}</span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dashboard.title} Pages</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1.5">
              {dashboard.modules.map((item) => (
                <Link key={item.slug} href={`/dashboard/${dashboard.key}/${item.slug}`} className="rounded px-3 py-2 text-sm font-semibold hover:bg-muted">
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
