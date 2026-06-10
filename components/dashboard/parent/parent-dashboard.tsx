import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parentChildren, parentModules, parentProfile } from "@/lib/parent-dashboard";

export function ParentDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <UserRound className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <Badge>{parentProfile.verified}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">{parentProfile.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Parent workspace for linked children, academics, fees, attendance, communication, and progress tracking.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Linked Children" value={`${parentProfile.childrenCount}`} />
        <Metric label="Total Balance" value={parentProfile.totalBalance} />
        <Metric label="Unread Messages" value={`${parentProfile.unreadMessages}`} />
        <Metric label="Contact" value={parentProfile.phone} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>Parent Pages</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {parentModules.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.slug} href={`/dashboard/parent/${item.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
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

        <Card>
          <CardHeader>
            <CardTitle>Linked Children</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {parentChildren.map((child) => (
              <Link key={child.id} href={`/dashboard/parent/children/${child.id}`} className="block rounded border border-border bg-background p-4 hover:bg-muted">
                <p className="font-bold">{child.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{child.grade} {child.stream} - {child.mean}%</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-xl font-bold">{value}</p>
    </div>
  );
}
