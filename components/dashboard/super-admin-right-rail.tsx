import { AlertTriangle, Bell, CalendarCheck, CheckCircle2, Clock3, Radio, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { label: "Fee collection", value: "82%", detail: "KES 1.8M still outstanding", tone: "text-green-700" },
  { label: "Attendance today", value: "94.2%", detail: "Grade 8 North below target", tone: "text-primary" },
  { label: "Reports ready", value: "316", detail: "Awaiting class teacher comments", tone: "text-orange-700" }
];

const liveFeed = [
  { time: "08:10", title: "Gate attendance synced", detail: "1,182 learners checked in", icon: CheckCircle2 },
  { time: "08:32", title: "Fee alert queue prepared", detail: "214 parent reminders ready", icon: Bell },
  { time: "09:05", title: "Clinic visit logged", detail: "Grade 3 East first aid case closed", icon: CalendarCheck },
  { time: "09:28", title: "Exam setup pending", detail: "JSS Integrated Science marksheet needs approval", icon: AlertTriangle }
];

const actions = [
  "Approve pending report cards",
  "Review high balance accounts",
  "Confirm worker weekend rota",
  "Check Grade 6 numeracy intervention"
];

export function SuperAdminRightRail() {
  return (
    <aside className="space-y-4 xl:pb-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Live Highlights</CardTitle>
            <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {highlights.map((item) => (
              <div key={item.label} className="rounded border border-border p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className={`mt-2 text-2xl font-bold ${item.tone}`}>{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveFeed.map((item) => {
              const Icon = item.icon;

              return (
                <div key={`${item.time}-${item.title}`} className="flex gap-3 rounded border border-border p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-muted text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                      <p className="text-xs font-bold text-muted-foreground">{item.time}</p>
                    </div>
                    <p className="mt-1 font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actions.map((action) => (
              <button
                key={action}
                type="button"
                className="flex min-h-10 w-full items-center justify-between gap-3 rounded border border-border px-3 py-2 text-left text-sm font-semibold transition hover:bg-muted"
              >
                {action}
                <TrendingUp className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
