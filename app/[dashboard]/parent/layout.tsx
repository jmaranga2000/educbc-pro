import Link from "next/link";
import { Bell, Search, UserRound } from "lucide-react";
import { ParentSidebar } from "@/components/dashboard/parent/parent-sidebar";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen xl:h-screen xl:flex xl:flex-col xl:overflow-hidden bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 flex-none">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-3 font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                EduCBC Pro
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Parent</span>
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
              <span className="text-muted-foreground">Search children, fees, messages</span>
            </label>
            <nav className="flex flex-wrap gap-2 text-sm font-semibold">
              <Link href="/dashboard/parent" className="rounded bg-primary px-3 py-2 text-primary-foreground">
                Parent
              </Link>
              <Link href="/dashboard/student" className="rounded px-3 py-2 hover:bg-muted">
                Student
              </Link>
              <Link href="/dashboard/class-teacher" className="rounded px-3 py-2 hover:bg-muted">
                Class Teacher
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 xl:flex-1 xl:min-h-0 xl:overflow-hidden">
        <div className="xl:h-full xl:overflow-y-auto custom-scrollbar xl:pr-1">
          <ParentSidebar />
        </div>
        <section className="min-w-0 xl:h-full xl:overflow-y-auto custom-scrollbar xl:pr-1">{children}</section>
      </div>
    </main>
  );
}
