import Link from "next/link";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { SuperAdminSidebar } from "@/components/dashboard/super-admin-sidebar";
import { SuperAdminRightRail } from "@/components/dashboard/super-admin-right-rail";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen xl:h-screen xl:flex xl:flex-col xl:overflow-hidden bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 flex-none">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-3 font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                EduCBC Pro
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Super admin</span>
              </span>
            </Link>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded border border-border lg:hidden">
              <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="sr-only">Notifications</span>
            </button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex min-h-10 w-full items-center gap-2 rounded border border-border bg-white px-3 text-sm md:w-80">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground">Search learners, fees, staff, reports</span>
            </label>
            <nav className="flex flex-wrap gap-2 text-sm font-semibold">
              <Link href="/dashboard/super-admin" className="rounded bg-primary px-3 py-2 text-primary-foreground">
                Super Admin
              </Link>
              <Link href="/dashboard/teacher" className="rounded px-3 py-2 hover:bg-muted">
                Teacher
              </Link>
              <Link href="/dashboard/exams" className="rounded px-3 py-2 hover:bg-muted">
                Exams
              </Link>
              <Link href="/dashboard/finance" className="rounded px-3 py-2 hover:bg-muted">
                Finance
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:px-8 xl:grid-cols-[280px_minmax(0,1fr)_340px] xl:flex-1 xl:min-h-0 xl:overflow-hidden">
        <div className="xl:h-full xl:overflow-y-auto custom-scrollbar xl:pr-1">
          <SuperAdminSidebar />
        </div>
        <section className="min-w-0 xl:h-full xl:overflow-y-auto custom-scrollbar xl:pr-1">{children}</section>
        <div className="xl:h-full xl:overflow-y-auto custom-scrollbar xl:pr-1">
          <SuperAdminRightRail />
        </div>
      </div>
    </main>
  );
}
