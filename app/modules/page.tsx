import Link from "next/link";
import { PublicNav } from "@/components/public/public-nav";
import { dashboardSections } from "@/lib/app-routes";

export default function ModulesPage() {
  return (
    <main className="min-h-screen">
      <PublicNav />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-normal">System Modules</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Public overview of the application modules that become full workspaces inside each dashboard.
            </p>
          </div>
          <Link href="/dashboard/super-admin" className="rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            Open Dashboard
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardSections.map((section) => (
            <div key={section.slug} className="rounded border border-border bg-white p-5 shadow-soft">
              <h2 className="text-lg font-bold">{section.label}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
