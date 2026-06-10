import Link from "next/link";
import { PublicNav } from "@/components/public/public-nav";

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <PublicNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-normal">Admissions</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          The admissions flow is prepared for learner registration, parent linking, document uploads, stream placement,
          and initial fee setup.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Student profile", "Parent contacts", "Birth certificate", "Grade and stream", "Fee structure", "Welcome SMS"].map(
            (item) => (
              <div key={item} className="rounded border border-border bg-white p-4 font-bold shadow-soft">
                {item}
              </div>
            )
          )}
        </div>
        <Link href="/dashboard/admin/people" className="mt-8 inline-flex rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          Open Admissions Workspace
        </Link>
      </section>
    </main>
  );
}
