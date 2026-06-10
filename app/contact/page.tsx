import { PublicNav } from "@/components/public/public-nav";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PublicNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-normal">Contact</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          Use this public page as the future contact and school onboarding entry point. It can connect to SMS,
          email, or an admissions request workflow when backend persistence is added.
        </p>
        <div className="mt-8 rounded border border-border bg-white p-5 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              School Name
              <input className="min-h-11 rounded border border-border px-3 font-normal outline-none focus:border-primary" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Phone Number
              <input className="min-h-11 rounded border border-border px-3 font-normal outline-none focus:border-primary" />
            </label>
            <label className="grid gap-2 text-sm font-bold md:col-span-2">
              Message
              <textarea className="min-h-32 rounded border border-border px-3 py-2 font-normal outline-none focus:border-primary" />
            </label>
          </div>
          <button className="mt-4 rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" type="button">
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
