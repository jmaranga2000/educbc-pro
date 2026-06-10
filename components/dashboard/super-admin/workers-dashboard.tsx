import { BriefcaseBusiness, Crown, ShieldCheck, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { workerCategories } from "@/lib/super-admin-expanded";

export function WorkersDashboard() {
  const totalWorkers = workerCategories.reduce((sum, category) => sum + category.workers.length, 0);

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Workers Management</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">Non-teaching Staff by Category</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Manage health, catering, cleaning, security, library, and staff office teams with category heads and worker rosters.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Summary label="Categories" value={String(workerCategories.length)} detail="Operational staff sections" />
        <Summary label="Workers listed" value={String(totalWorkers)} detail="Excluding category heads" />
        <Summary label="Heads assigned" value={String(workerCategories.length)} detail="Every category has a lead" />
      </div>

      <div className="grid gap-5">
        {workerCategories.map((category) => (
          <Card key={category.slug}>
            <CardHeader>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                  {category.workers.length} workers
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                <div className="rounded border border-primary/20 bg-primary/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Crown className="h-4 w-4" aria-hidden="true" />
                    Category head
                  </div>
                  <p className="mt-3 text-lg font-bold">{category.head.name}</p>
                  <p className="mt-1 text-sm font-semibold">{category.head.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{category.head.phone}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{category.head.shift}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="border-y border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-3 py-3">Worker</th>
                        <th className="px-3 py-3">Role</th>
                        <th className="px-3 py-3">Shift</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.workers.map((worker) => (
                        <tr key={`${category.slug}-${worker.name}`} className="border-b border-border">
                          <td className="px-3 py-4 font-bold">{worker.name}</td>
                          <td className="px-3 py-4">{worker.role}</td>
                          <td className="px-3 py-4">{worker.shift}</td>
                          <td className="px-3 py-4">
                            <span className="inline-flex items-center gap-2 rounded bg-muted px-2.5 py-1 font-semibold">
                              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                              {worker.status}
                            </span>
                          </td>
                          <td className="px-3 py-4">{worker.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <BriefcaseBusiness className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold text-primary">{detail}</p>
    </div>
  );
}
