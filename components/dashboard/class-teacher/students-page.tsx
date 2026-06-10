import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { classStudents, getClassStudent, getStudentRecord, slugFromRecordTitle } from "@/lib/class-teacher";

export function ClassStudentsDirectoryPage() {
  const students = [...classStudents].sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>Students</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">Class Student Register</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Students sorted by admission number, with home, parent contact, performance, fees, health, and attendance.
        </p>
      </section>

      <div className="overflow-x-auto rounded border border-border bg-white shadow-soft">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Admission No.</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Home</th>
              <th className="px-4 py-3">Parent Number</th>
              <th className="px-4 py-3">Performance</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Health</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-bold">{student.admissionNumber}</td>
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.home}</td>
                <td className="px-4 py-3">{student.parentPhone}</td>
                <td className="px-4 py-3">{student.performance}% ({student.cbcBand})</td>
                <td className="px-4 py-3">{student.feeBalance}</td>
                <td className="px-4 py-3">{student.healthCondition}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/class-teacher/students/${student.id}`} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
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

export function ClassStudentDetailsPage({ studentId }: { studentId: string }) {
  const student = getClassStudent(studentId);

  if (!student) {
    return <div className="rounded border border-border bg-white p-5 shadow-soft">Student record not found.</div>;
  }

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>{student.admissionNumber}</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{student.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Complete student record for class teacher review.</p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Info label="Home" value={student.home} />
        <Info label="Parent" value={student.parentName} />
        <Info label="Parent Number" value={student.parentPhone} />
        <Info label="Attendance" value={student.attendance} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {student.records.map((record) => (
          <Link
            key={record.title}
            href={`/dashboard/class-teacher/students/${student.id}/${slugFromRecordTitle(record.title)}`}
            className="rounded border border-border bg-white p-4 shadow-soft transition hover:border-primary/30 hover:bg-muted/40"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold">{record.title}</p>
              <Badge>{record.status}</Badge>
            </div>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">{record.detail}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function StudentRecordDetailsPage({ studentId, recordType }: { studentId: string; recordType: string }) {
  const student = getClassStudent(studentId);
  const record = getStudentRecord(studentId, recordType);

  if (!student || !record) {
    return <div className="rounded border border-border bg-white p-5 shadow-soft">Student record not found.</div>;
  }

  const detailRows = getRecordDetailRows(student, recordType);

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>{student.admissionNumber}</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">{record.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Full {record.title.toLowerCase()} details for {student.name}.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Info label="Student" value={student.name} />
        <Info label="Admission Number" value={student.admissionNumber} />
        <Info label="Parent Contact" value={student.parentPhone} />
        <Info label="Status" value={record.status} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {detailRows.map((row) => (
          <div key={row.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{row.label}</p>
            <p className="mt-2 font-bold">{row.value}</p>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">{row.detail}</p>
          </div>
        ))}
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

function getRecordDetailRows(student: NonNullable<ReturnType<typeof getClassStudent>>, recordType: string) {
  if (recordType === "academic-record") {
    return [
      { label: "Current Mean", value: `${student.performance}%`, detail: `Current CBC band is ${student.cbcBand}.` },
      { label: "Best Subject", value: student.subjectScores.sort((a, b) => b.score - a.score)[0]?.subject ?? "N/A", detail: "Highest current subject score." },
      { label: "Support Area", value: student.subjectScores.sort((a, b) => a.score - b.score)[0]?.subject ?? "N/A", detail: "Lowest current subject score." },
      { label: "Academic Trend", value: `${student.performanceHistory[0].mean}% to ${student.performance}%`, detail: "Performance movement since joining." }
    ];
  }

  if (recordType === "fee-record") {
    return [
      { label: "Balance", value: student.feeBalance, detail: "Outstanding balance for the current term." },
      { label: "Billing Status", value: student.feeBalance === "KES 0" ? "Cleared" : "Pending", detail: "Class teacher can follow up with finance or parent." },
      { label: "Parent", value: student.parentName, detail: student.parentPhone },
      { label: "Last Follow-up", value: "2026-06-05", detail: "Reminder logged for this student account." }
    ];
  }

  if (recordType === "health-record") {
    return [
      { label: "Condition", value: student.healthCondition, detail: "Visible health condition or flag." },
      { label: "Emergency Contact", value: student.parentPhone, detail: `Primary contact: ${student.parentName}.` },
      { label: "Clinic Visibility", value: student.healthCondition === "None" ? "Normal" : "Flagged", detail: "Health status shown to school clinic." },
      { label: "Class Action", value: student.healthCondition === "None" ? "No action required" : "Monitor during class activities", detail: "Class teacher health note." }
    ];
  }

  return [
    { label: "Term Attendance", value: student.attendance, detail: "Current term attendance rate." },
    { label: "Today", value: Number(student.attendance.replace("%", "")) >= 90 ? "Present" : "Needs follow-up", detail: "Current attendance signal." },
    { label: "Parent Alert", value: Number(student.attendance.replace("%", "")) >= 90 ? "Not needed" : "Recommended", detail: student.parentPhone },
    { label: "Class Teacher Note", value: "Track weekly", detail: "Attendance history should be reviewed every Friday." }
  ];
}
