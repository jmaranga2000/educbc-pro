import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assignedClassTeachers, classLeaders, classTeacherProfile } from "@/lib/class-teacher";

export function CompleteClassDetailsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Complete Class</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{classTeacherProfile.className}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          General class administration details: class teacher, assigned teachers, class leaders, stream room,
          learner count, and operational status.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Class Teacher" value={classTeacherProfile.teacherName} />
        <Metric label="Room" value={classTeacherProfile.room} />
        <Metric label="Students" value={`${classTeacherProfile.learners}`} />
        <Metric label="Term" value={classTeacherProfile.term} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>Teachers Assigned to This Class</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3">Teacher</th>
                  <th className="py-2 pr-3">Role</th>
                  <th className="py-2 pr-3">Subject</th>
                  <th className="py-2 pr-3">Contact</th>
                </tr>
              </thead>
              <tbody>
                {assignedClassTeachers.map((teacher) => (
                  <tr key={teacher.phone} className="border-b border-border last:border-0">
                    <td className="py-3 pr-3 font-semibold">{teacher.name}</td>
                    <td className="py-3 pr-3">{teacher.role}</td>
                    <td className="py-3 pr-3">{teacher.subject}</td>
                    <td className="py-3 pr-3">{teacher.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(classLeaders).map(([role, name]) => (
              <div key={role} className="rounded border border-border bg-background p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{role.replace(/([A-Z])/g, " $1")}</p>
                <p className="mt-2 font-bold">{name}</p>
              </div>
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
