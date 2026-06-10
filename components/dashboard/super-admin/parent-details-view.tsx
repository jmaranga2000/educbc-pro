import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKes, type ParentRecord } from "@/lib/super-admin-expanded";

export function ParentDetailsView({ parent }: { parent: ParentRecord }) {
  const totalPaid = parent.children.reduce((sum, child) => sum + child.fees.paid, 0);
  const totalBalance = parent.children.reduce((sum, child) => sum + child.fees.balance, 0);

  return (
    <div className="space-y-5">
      <Link href="/dashboard/super-admin/parents" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to parents
      </Link>

      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Parent Details</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">{parent.name}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {parent.relationship} for {parent.children.length} linked learner{parent.children.length === 1 ? "" : "s"} in {parent.grade}, {parent.stream}.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="Children linked" value={String(parent.children.length)} detail="Learner records attached" />
        <Metric label="Fees paid" value={formatKes(totalPaid)} detail="Across linked learners" />
        <Metric label="Yet to be paid" value={formatKes(totalBalance)} detail={totalBalance === 0 ? "Account cleared" : "Requires follow-up"} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Parent Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Relationship" value={parent.relationship} />
              <Info label="Phone" value={parent.phone} />
              <Info label="Email" value={parent.email} />
              <Info label="National ID" value={parent.nationalId} />
              <Info label="Occupation" value={parent.occupation} />
              <Info label="Address" value={parent.address} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guardian Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            {parent.guardian ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Guardian available
                </div>
                <Info label="Guardian" value={parent.guardian.name} />
                <Info label="Relationship" value={parent.guardian.relationship} />
                <Info label="Phone" value={parent.guardian.phone} />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded bg-orange-50 px-3 py-2 text-sm font-bold text-orange-800">
                  <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                  No guardian listed
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Add a trusted guardian or emergency contact before closing the parent verification checklist.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Children and Fee Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            {parent.children.map((child) => (
              <div key={child.admissionNo} className="rounded border border-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{child.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {child.admissionNo} - {child.grade} {child.stream}
                    </p>
                  </div>
                  <span className="rounded bg-muted px-2.5 py-1 text-xs font-bold">{child.attendance} attendance</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Info label="Class teacher" value={child.classTeacher} />
                  <Info label="Annual bill" value={formatKes(child.fees.annualBill)} />
                  <Info label="Paid" value={formatKes(child.fees.paid)} />
                  <Info label="Yet to pay" value={formatKes(child.fees.balance)} />
                  <Info label="Last payment" value={child.fees.lastPayment} />
                  <Info label="Next due" value={child.fees.nextDue} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication and Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {parent.communication.map((item) => (
              <div key={`${item.date}-${item.note}`} className="flex flex-col gap-2 rounded border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{item.note}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <span className="w-fit rounded bg-muted px-2.5 py-1 text-xs font-bold">{item.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <UserRound className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold text-primary">{detail}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
