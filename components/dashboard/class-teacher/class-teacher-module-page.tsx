import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassTeacherModule } from "@/lib/class-teacher";

export function ClassTeacherModulePage({ module }: { module: ClassTeacherModule }) {
  const Icon = module.icon;

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>Class Teacher</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">{module.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{module.description}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {module.stats.map((stat) => (
          <div key={stat.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {module.records.map((record) => (
              <div key={record.title} className="rounded border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold">{record.title}</p>
                  <Badge className="shrink-0">{record.status}</Badge>
                </div>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{record.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {module.actions.map((action) => (
              <button key={action} type="button" className="min-h-11 w-full rounded border border-border bg-background px-3 py-2 text-left text-sm font-bold hover:bg-muted">
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
