import Link from "next/link";
import { AlertCircle, CheckCircle2, Search, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKes, parentRecords } from "@/lib/super-admin-expanded";

export function ParentsDirectory() {
  const totalChildren = parentRecords.reduce((sum, parent) => sum + parent.children.length, 0);
  const parentsWithGuardians = parentRecords.filter((parent) => parent.guardian).length;
  const totalBalance = parentRecords.reduce(
    (sum, parent) => sum + parent.children.reduce((childSum, child) => childSum + child.fees.balance, 0),
    0
  );

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Parents Directory</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">Parents Sorted by Grade and Stream</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Review parent contacts, guardian coverage, linked learners, and fee balances from one super admin view.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Summary label="Parents listed" value={String(parentRecords.length)} detail="Sorted by grade, stream, then parent" />
        <Summary label="Linked learners" value={String(totalChildren)} detail="Children mapped to parent accounts" />
        <Summary label="Outstanding fees" value={formatKes(totalBalance)} detail={`${parentsWithGuardians} parents have guardians listed`} />
      </div>

      <Card>
        <CardHeader className="gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>All Parents</CardTitle>
            <p className="text-sm text-muted-foreground">Open a parent to inspect guardians, children, fee status, and follow-ups.</p>
          </div>
          <div className="flex min-h-10 items-center gap-2 rounded border border-border px-3 text-sm text-muted-foreground">
            <Search className="h-4 w-4" aria-hidden="true" />
            Search-ready directory
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-y border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-3">Grade / Stream</th>
                  <th className="px-3 py-3">Parent</th>
                  <th className="px-3 py-3">Children</th>
                  <th className="px-3 py-3">Guardian</th>
                  <th className="px-3 py-3">Fees paid</th>
                  <th className="px-3 py-3">Yet to pay</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {parentRecords.map((parent) => {
                  const paid = parent.children.reduce((sum, child) => sum + child.fees.paid, 0);
                  const balance = parent.children.reduce((sum, child) => sum + child.fees.balance, 0);

                  return (
                    <tr key={parent.id} className="border-b border-border align-top">
                      <td className="px-3 py-4 font-semibold">
                        {parent.grade}
                        <span className="mt-1 block text-xs text-muted-foreground">{parent.stream}</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-bold">{parent.name}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{parent.relationship} - {parent.phone}</span>
                      </td>
                      <td className="px-3 py-4">
                        {parent.children.map((child) => (
                          <span key={child.admissionNo} className="block font-semibold">
                            {child.name}
                            <span className="block text-xs font-normal text-muted-foreground">{child.admissionNo}</span>
                          </span>
                        ))}
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-2 rounded bg-muted px-2.5 py-1 font-semibold">
                          {parent.guardian ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-700" aria-hidden="true" />
                          )}
                          {parent.guardianStatus}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-bold text-green-700">{formatKes(paid)}</td>
                      <td className="px-3 py-4 font-bold text-red-700">{formatKes(balance)}</td>
                      <td className="px-3 py-4">
                        <Link
                          href={`/dashboard/super-admin/parents/${parent.id}`}
                          className="inline-flex min-h-10 items-center rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Summary({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Users className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold text-primary">{detail}</p>
    </div>
  );
}
