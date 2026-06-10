import Link from "next/link";
import { ArrowUpRight, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { financeModules } from "@/lib/finance-dashboard";
import { getFinanceSummary } from "@/services/finance-dashboard.service";

export async function FinanceDashboard() {
  const summary = await getFinanceSummary();

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <WalletCards className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>{summary.activeTerm}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">Finance Department Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Finance workspace for fee structures, payments, arrears, reports, receipts, reconciliation, and payment integrations.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Expected" value={summary.expected} />
        <Metric label="Collected" value={summary.collected} />
        <Metric label="Arrears" value={summary.arrears} />
        <Metric label="Collection Rate" value={summary.collectionRate} />
      </div>

      <Card>
        <CardHeader><CardTitle>Finance Pages</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {financeModules.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.slug} href={`/dashboard/finance/${item.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="mt-3 font-bold">{item.title}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-2xl font-bold">{value}</p>
    </div>
  );
}
