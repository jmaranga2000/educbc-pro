import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { classStudents, getClassStudent, subjectPerformance } from "@/lib/class-teacher";

export function ClassAcademicsPage() {
  const rankedStudents = [...classStudents].sort((a, b) => b.performance - a.performance);
  const streamMean = Math.round(classStudents.reduce((sum, student) => sum + student.performance, 0) / classStudents.length);

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Academics and Exams</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">Stream Performance</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          General class performance, subject performance, and student ranking from top performer to least performer.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Stream Mean" value={`${streamMean}%`} />
        <Metric label="Top Student" value={rankedStudents[0]?.name ?? "None"} />
        <Metric label="Support Priority" value={rankedStudents[rankedStudents.length - 1]?.name ?? "None"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Per Subject</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {subjectPerformance.map((subject) => (
            <div key={subject.subject} className="rounded border border-border bg-background p-4">
              <p className="font-bold">{subject.subject}</p>
              <p className="mt-2 text-2xl font-bold text-primary">{subject.mean}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Top: {subject.topStudent}</p>
              <p className="mt-1 text-sm text-muted-foreground">Focus: {subject.concern}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Per Student</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-3">Rank</th>
                <th className="py-2 pr-3">Student</th>
                <th className="py-2 pr-3">Admission No.</th>
                <th className="py-2 pr-3">Mean</th>
                <th className="py-2 pr-3">CBC Band</th>
                <th className="py-2 pr-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rankedStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-bold">{index + 1}</td>
                  <td className="py-3 pr-3">{student.name}</td>
                  <td className="py-3 pr-3">{student.admissionNumber}</td>
                  <td className="py-3 pr-3">{student.performance}%</td>
                  <td className="py-3 pr-3">{student.cbcBand}</td>
                  <td className="py-3 pr-3">
                    <Link href={`/dashboard/class-teacher/academics/${student.id}`} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                      Performance Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export function StudentAcademicPerformancePage({ studentId }: { studentId: string }) {
  const student = getClassStudent(studentId);

  if (!student) {
    return <div className="rounded border border-border bg-white p-5 shadow-soft">Student academic record not found.</div>;
  }

  const highest = Math.max(...student.performanceHistory.map((item) => item.mean));
  const latest = student.performanceHistory[student.performanceHistory.length - 1];
  const first = student.performanceHistory[0];
  const growth = latest.mean - first.mean;

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>{student.admissionNumber}</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{student.name} Performance</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Academic tracking from when the learner joined the school through the current term, with subject scores,
          term movement, CBC band, and class position trend.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Current Mean" value={`${latest.mean}%`} />
        <Metric label="Best Term" value={`${highest}%`} />
        <Metric label="Growth Since Joining" value={`${growth >= 0 ? "+" : ""}${growth}%`} />
        <Metric label="Current Position" value={`#${latest.position}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Since Joining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid min-h-72 grid-cols-6 items-end gap-3 border-b border-l border-border px-3 pt-4">
            {student.performanceHistory.map((point) => (
              <div key={`${point.year}-${point.term}`} className="flex h-64 flex-col justify-end gap-2">
                <div className="flex flex-1 items-end">
                  <div className="w-full rounded-t bg-primary" style={{ height: `${point.mean}%` }} />
                </div>
                <div className="min-h-16 text-center text-xs">
                  <p className="font-bold">{point.mean}%</p>
                  <p className="text-muted-foreground">{point.year}</p>
                  <p className="text-muted-foreground">{point.term.replace("Term ", "T")}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.subjectScores.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold">{subject.subject}</span>
                  <span>{subject.score}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded bg-muted">
                  <div className="h-full rounded bg-primary" style={{ width: `${subject.score}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{subject.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Position Trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {student.performanceHistory.map((point) => (
              <div key={`${point.year}-${point.term}-position`} className="flex items-center justify-between rounded border border-border bg-background px-3 py-2 text-sm">
                <span>{point.year} {point.term}</span>
                <span className="font-bold">#{point.position}</span>
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
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
