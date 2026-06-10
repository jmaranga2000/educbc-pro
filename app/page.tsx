import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, GraduationCap, ShieldCheck } from "lucide-react";
import { PublicNav } from "@/components/public/public-nav";
import { publicModules, publicStats } from "@/lib/public-content";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <PublicNav />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-primary">
            CBC learning and school management
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl">
            EduCBC Pro for Kenyan Primary and Junior Secondary Schools
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            A complete school operating system for CBC assessments, role dashboards, fees, timetable generation,
            communication, documents, library, health, sports, transport, and analytics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/super-admin"
              className="inline-flex min-h-11 items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/modules"
              className="inline-flex min-h-11 items-center rounded border border-border bg-white px-4 py-2 text-sm font-bold hover:bg-muted"
            >
              View Modules
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          {publicStats.map((stat) => (
            <div key={stat.label} className="rounded border border-border bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white/72">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: ShieldCheck, title: "RBAC", text: "Super admin, staff, parents, students, and department roles." },
            { icon: BarChart3, title: "CBC Engine", text: "EE, ME, AE, and BE grading with competency analytics." },
            { icon: CalendarDays, title: "Timetable", text: "Teacher availability, subject constraints, breaks, and optimization." },
            { icon: GraduationCap, title: "Dashboards", text: "Dedicated workspaces for every role in the school." }
          ].map((item) => (
            <div key={item.title} className="rounded border border-border bg-background p-4">
              <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-3 font-bold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {publicModules.map((module) => (
            <div key={module} className="rounded border border-border bg-white p-4 shadow-soft">
              <p className="font-bold">{module}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
