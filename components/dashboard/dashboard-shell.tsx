import Link from "next/link";
import {
  Activity,
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  Library,
  LineChart,
  Medal,
  MessageSquare,
  NotebookTabs,
  Receipt,
  ShieldCheck,
  Trophy,
  Users,
  WalletCards,
  type LucideIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardProfiles, type DashboardProfile, type IconName } from "@/lib/dashboard-ui";
import { dashboardSections, roleRoutes, slugFromRole } from "@/lib/app-routes";
import type { Role } from "@/types";

export const dashboardIconMap: Record<IconName, LucideIcon> = {
  Activity,
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Bus: Activity,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  Library,
  LineChart,
  Medal,
  MessageSquare,
  NotebookTabs,
  Receipt,
  ShieldCheck,
  Trophy,
  Users,
  WalletCards
};

export function DashboardShell({
  role,
  children
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const roleSlug = slugFromRole(role);

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
            <Link href={`/dashboard/${roleSlug}`} className="rounded bg-primary px-3 py-2 text-primary-foreground">
              Dashboard
            </Link>
            <Link href={`/dashboard/${roleSlug}/cbc`} className="rounded px-3 py-2 hover:bg-muted">
              CBC
            </Link>
            <Link href={`/dashboard/${roleSlug}/timetable`} className="rounded px-3 py-2 hover:bg-muted">
              Timetable
            </Link>
            <Link href={`/dashboard/${roleSlug}/finance`} className="rounded px-3 py-2 hover:bg-muted">
              Finance
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="space-y-4">
          <RoleList activeRole={role} />
          <SectionList roleSlug={roleSlug} />
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}

function RoleList({ activeRole }: { activeRole: Role }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Dashboards</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {roleRoutes.map((route) => {
          const profile = dashboardProfiles.find((item) => item.role === route.role) as DashboardProfile;
          const Icon = dashboardIconMap[profile.icon];
          const active = activeRole === route.role;

          return (
            <Link
              key={route.role}
              href={`/dashboard/${route.slug}`}
              className={`flex min-h-11 items-center gap-2 rounded px-3 py-2 text-sm font-bold transition ${
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{route.label}</span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

function SectionList({ roleSlug }: { roleSlug: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pages</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1.5">
        {dashboardSections.map((section) => (
          <Link
            key={section.slug}
            href={`/dashboard/${roleSlug}/${section.slug}`}
            className="rounded px-3 py-2 text-sm font-semibold hover:bg-muted"
          >
            {section.label}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
