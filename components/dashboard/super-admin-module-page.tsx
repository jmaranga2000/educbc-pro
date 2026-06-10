import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SuperAdminModule } from "@/lib/super-admin";

export function SuperAdminModulePageView({ module }: { module: SuperAdminModule }) {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Super Admin Module</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{module.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{module.description}</p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {module.records.map((record) => (
              <div key={record.label} className="rounded border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold">{record.label}</p>
                  <Badge className="shrink-0">{record.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{record.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Create record", "View records", "Update settings", "Generate report"].map((action) => (
              <button
                key={action}
                type="button"
                className="min-h-11 w-full rounded border border-border bg-background px-3 py-2 text-left text-sm font-bold hover:bg-muted"
              >
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
