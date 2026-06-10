import Link from "next/link";
import {
  BarChart3,
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  School,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
  Workflow
} from "lucide-react";
import { superAdminModules } from "@/lib/super-admin";

const moduleIcons = {
  schools: School,
  "academic-years": CalendarDays,
  terms: CalendarDays,
  grades: Layers3,
  streams: Workflow,
  teachers: GraduationCap,
  students: Users,
  parents: Users,
  workers: ShieldCheck,
  "cbc-settings": Settings,
  fees: Wallet,
  exams: ClipboardList,
  transport: Bus,
  timetables: CalendarDays,
  notifications: Bell,
  reports: FileText
};

const groups = [
  { title: "School Setup", slugs: ["schools", "academic-years", "terms", "grades", "streams", "cbc-settings"] },
  { title: "People", slugs: ["students", "teachers", "parents", "workers"] },
  { title: "Operations", slugs: ["fees", "exams", "transport", "timetables", "notifications", "reports"] }
];

export function SuperAdminSidebar() {
  return (
    <aside className="space-y-4 xl:pb-6">
      <div className="rounded border border-border bg-white p-4 shadow-soft">
        <Link href="/dashboard/super-admin" className="flex items-center gap-3 font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            Command Center
            <span className="block text-xs font-semibold text-muted-foreground">Full school control</span>
          </span>
        </Link>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
          <span className="rounded bg-green-50 px-2.5 py-2 text-green-800">System online</span>
          <span className="rounded bg-orange-50 px-2.5 py-2 text-orange-800">4 approvals</span>
        </div>
      </div>

      <nav className="rounded border border-border bg-white p-3 shadow-soft">
        <div className="flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-4 xl:overflow-visible xl:pb-0">
          <Link
            href="/dashboard/super-admin"
            className="flex min-h-10 shrink-0 items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground xl:w-full"
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>

          {groups.map((group) => (
            <div key={group.title} className="shrink-0 xl:shrink">
              <p className="hidden px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground xl:block">{group.title}</p>
              <div className="flex gap-2 xl:mt-2 xl:block xl:space-y-1">
                {group.slugs.map((slug) => {
                  const item = superAdminModules.find((current) => current.slug === slug);
                  const Icon = moduleIcons[slug as keyof typeof moduleIcons] ?? BookOpen;

                  if (!item) {
                    return null;
                  }

                  return (
                    <Link
                      key={item.slug}
                      href={`/dashboard/super-admin/${item.slug}`}
                      className="flex min-h-10 shrink-0 items-center gap-2 rounded px-3 py-2 text-sm font-semibold hover:bg-muted xl:w-full"
                    >
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="whitespace-nowrap">{item.title.replace("Manage ", "").replace("View ", "")}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="hidden rounded border border-border bg-white p-4 shadow-soft xl:block">
        <p className="text-sm font-bold">Quick Health</p>
        <div className="mt-3 space-y-3 text-sm">
          <Health label="Database" value="Connected" />
          <Health label="SMS gateway" value="Ready" />
          <Health label="Backups" value="02:00 daily" />
          <Health label="Clinic" value="Open" />
        </div>
      </div>
    </aside>
  );
}

function Health({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <HeartPulse className="h-4 w-4 text-primary" aria-hidden="true" />
        {label}
      </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
