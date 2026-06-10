import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { classParents, getClassParent } from "@/lib/class-teacher";

export function ClassParentsDirectoryPage() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Parents</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">Parents Per Student</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Parent and guardian contacts linked to every learner in the class stream.
        </p>
      </section>

      <div className="overflow-x-auto rounded border border-border bg-white shadow-soft">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Relationship</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {classParents.map((parent) => (
              <tr key={parent.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{parent.studentName}</td>
                <td className="px-4 py-3 font-semibold">{parent.name}</td>
                <td className="px-4 py-3">{parent.relationship}</td>
                <td className="px-4 py-3">{parent.phone}</td>
                <td className="px-4 py-3">{parent.communicationStatus}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/class-teacher/parents/${parent.id}`} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ClassParentDetailsPage({ parentId }: { parentId: string }) {
  const parent = getClassParent(parentId);

  if (!parent) {
    return <div className="rounded border border-border bg-white p-5 shadow-soft">Parent record not found.</div>;
  }

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>{parent.relationship}</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{parent.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Parent details and linked learner record.</p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Info label="Linked Student" value={parent.studentName} />
        <Info label="Phone" value={parent.phone} />
        <Info label="Email" value={parent.email} />
        <Info label="Home" value={parent.home} />
        <Info label="Emergency Contact" value={parent.emergencyContact} />
        <Info label="Communication Status" value={parent.communicationStatus} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words font-bold">{value}</p>
    </div>
  );
}
