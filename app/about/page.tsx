import { PublicNav } from "@/components/public/public-nav";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PublicNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-normal">About EduCBC Pro</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          EduCBC Pro is designed as a comprehensive CBC learning management and school management system for Kenyan
          primary and junior secondary schools. The platform joins classroom workflows, finance, administration,
          communication, and student support in one role-aware system.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["Academic Operations", "Subjects, assignments, learning resources, exams, CBC assessments, and reports."],
            ["School Management", "Students, teachers, parents, workers, streams, fees, documents, health, and transport."],
            ["Communication", "Africa's Talking SMS for fee reminders, exam results, attendance alerts, events, and emergencies."],
            ["Analytics", "CBC performance, attendance, finance, school performance, and AI-ready insight workflows."]
          ].map(([title, text]) => (
            <div key={title} className="rounded border border-border bg-white p-5 shadow-soft">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
