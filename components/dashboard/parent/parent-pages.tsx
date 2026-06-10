import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getParentChild, getParentMessage, parentChildren, parentMessages } from "@/lib/parent-dashboard";

export function ParentChildrenPage() {
  return (
    <ListingPage
      badge="Children"
      title="Linked Children"
      description="Profiles, class teachers, class information, health notes, and transport status."
      headers={["Admission", "Child", "Class", "Class Teacher", "Attendance", "Mean", "Fees", "Action"]}
      rows={parentChildren.map((child) => [
        child.admissionNumber,
        child.name,
        `${child.grade} ${child.stream}`,
        child.classTeacher,
        child.attendance,
        `${child.mean}%`,
        child.feeBalance,
        <DetailLink key={child.id} href={`/dashboard/parent/children/${child.id}`} />
      ])}
    />
  );
}

export function ParentChildDetailsPage({ childId }: { childId: string }) {
  const child = getParentChild(childId);
  if (!child) return <NotFound label="Child" />;

  return (
    <DetailPage badge={child.admissionNumber} title={child.name} description="Complete linked learner profile for parent view." rows={[
      ["Class", `${child.grade} ${child.stream}`],
      ["Class Teacher", child.classTeacher],
      ["Teacher Phone", child.classTeacherPhone],
      ["Attendance", child.attendance],
      ["Mean Score", `${child.mean}%`],
      ["CBC Band", child.cbcBand],
      ["Fee Balance", child.feeBalance],
      ["Health", child.healthNote],
      ["Transport", child.transport]
    ]} />
  );
}

export function ParentAcademicsPage() {
  return (
    <div className="space-y-5">
      <Header badge="Academics" title="Academic Records" description="Exam results, CBC bands, homework, assignments, and subject performance for linked children." />
      <div className="grid gap-5">
        {parentChildren.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle>{child.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{child.grade} {child.stream} - {child.mean}% mean</p>
                </div>
                <Link href={`/dashboard/parent/academics/${child.id}`} className="rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Details</Link>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {child.subjects.map((subject) => (
                <div key={subject.subject} className="rounded border border-border bg-background p-4">
                  <p className="font-bold">{subject.subject}</p>
                  <p className="mt-2 text-2xl font-bold text-primary">{subject.score}%</p>
                  <p className="mt-1 text-sm text-muted-foreground">{subject.teacher}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ParentAcademicDetailsPage({ childId }: { childId: string }) {
  const child = getParentChild(childId);
  if (!child) return <NotFound label="Academic record" />;

  return (
    <div className="space-y-5">
      <Header badge="Academic Details" title={`${child.name} Academics`} description="Subject scores, teacher comments, CBC band, and term academic movement." />
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Mean Score" value={`${child.mean}%`} />
        <Metric label="CBC Band" value={child.cbcBand} />
        <Metric label="Class Rank" value={`#${child.progressHistory[child.progressHistory.length - 1].rank}`} />
      </div>
      <Card>
        <CardHeader><CardTitle>Subject Performance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {child.subjects.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between text-sm"><span className="font-bold">{subject.subject}</span><span>{subject.score}%</span></div>
              <div className="h-3 overflow-hidden rounded bg-muted"><div className="h-full rounded bg-primary" style={{ width: `${subject.score}%` }} /></div>
              <p className="text-xs text-muted-foreground">{subject.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ParentFeesPage() {
  return (
    <ListingPage
      badge="Fees"
      title="Fee Balances and Statements"
      description="Fee balances, vote heads, payments, and parent follow-up details."
      headers={["Child", "Class", "Balance", "Vote Heads", "Status", "Action"]}
      rows={parentChildren.map((child) => [
        child.name,
        `${child.grade} ${child.stream}`,
        child.feeBalance,
        `${child.feeStatement.length}`,
        child.feeBalance === "KES 0" ? "Cleared" : "Pending",
        <DetailLink key={child.id} href={`/dashboard/parent/fees/${child.id}`} />
      ])}
    />
  );
}

export function ParentFeeDetailsPage({ childId }: { childId: string }) {
  const child = getParentChild(childId);
  if (!child) return <NotFound label="Fee record" />;
  return (
    <div className="space-y-5">
      <Header badge="Fee Statement" title={`${child.name} Fees`} description="Detailed vote-head statement, paid amounts, and balances." />
      <ListingTable headers={["Vote Head", "Expected", "Paid", "Balance"]} rows={child.feeStatement.map((item) => [item.item, item.expected, item.paid, item.balance])} />
    </div>
  );
}

export function ParentAttendancePage() {
  return (
    <ListingPage
      badge="Attendance"
      title="Attendance Records"
      description="Daily attendance, absence alerts, late records, and term attendance."
      headers={["Child", "Class", "Term Attendance", "Recent Status", "Note", "Action"]}
      rows={parentChildren.map((child) => [
        child.name,
        `${child.grade} ${child.stream}`,
        child.attendance,
        child.attendanceRecords[0].status,
        child.attendanceRecords[0].note,
        <DetailLink key={child.id} href={`/dashboard/parent/attendance/${child.id}`} />
      ])}
    />
  );
}

export function ParentAttendanceDetailsPage({ childId }: { childId: string }) {
  const child = getParentChild(childId);
  if (!child) return <NotFound label="Attendance record" />;
  return (
    <div className="space-y-5">
      <Header badge={child.attendance} title={`${child.name} Attendance`} description="Detailed attendance history and parent alert context." />
      <ListingTable headers={["Date", "Status", "Note"]} rows={child.attendanceRecords.map((record) => [record.date, record.status, record.note])} />
    </div>
  );
}

export function ParentCommunicationPage() {
  return (
    <ListingPage
      badge="Communication"
      title="Messages and Notices"
      description="Teacher messages, school notifications, events, alerts, and parent replies."
      headers={["Title", "From", "Child", "Channel", "Status", "Date", "Action"]}
      rows={parentMessages.map((message) => [
        message.title,
        message.from,
        message.child,
        message.channel,
        message.status,
        message.date,
        <DetailLink key={message.id} href={`/dashboard/parent/communication/${message.id}`} />
      ])}
    />
  );
}

export function ParentMessageDetailsPage({ messageId }: { messageId: string }) {
  const message = getParentMessage(messageId);
  if (!message) return <NotFound label="Message" />;
  return <DetailPage badge={message.status} title={message.title} description={message.message} rows={[
    ["From", message.from],
    ["Child", message.child],
    ["Channel", message.channel],
    ["Date", message.date],
    ["Reply Status", message.status === "Unread" ? "Reply available" : "Already read"]
  ]} />;
}

export function ParentProgressPage() {
  return (
    <div className="space-y-5">
      <Header badge="Progress" title="Learner Progress Tracking" description="Performance trends, class ranking, subject movement, and CBC band tracking." />
      <div className="grid gap-5">
        {parentChildren.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle>{child.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Current mean {child.mean}% - CBC {child.cbcBand}</p>
                </div>
                <Link href={`/dashboard/parent/progress/${child.id}`} className="rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Open Trend</Link>
              </div>
            </CardHeader>
            <CardContent>
              <ProgressBars childId={child.id} compact />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ParentProgressDetailsPage({ childId }: { childId: string }) {
  const child = getParentChild(childId);
  if (!child) return <NotFound label="Progress record" />;
  return (
    <div className="space-y-5">
      <Header badge="Progress Detail" title={`${child.name} Progress`} description="Term-by-term mean score and class rank since the tracked period began." />
      <ProgressBars childId={childId} />
      <Card>
        <CardHeader><CardTitle>Rank Movement</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {child.progressHistory.map((point) => (
            <div key={point.term} className="rounded border border-border bg-background p-4">
              <p className="font-bold">{point.term}</p>
              <p className="mt-2 text-sm text-muted-foreground">Mean {point.mean}%</p>
              <p className="mt-1 text-sm text-muted-foreground">Rank #{point.rank}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ProgressBars({ childId, compact = false }: { childId: string; compact?: boolean }) {
  const child = getParentChild(childId);
  if (!child) return null;
  return (
    <div className={`grid grid-cols-5 items-end gap-3 border-b border-l border-border px-3 pt-4 ${compact ? "min-h-44" : "min-h-80"}`}>
      {child.progressHistory.map((point) => (
        <div key={point.term} className={`flex flex-col justify-end gap-2 ${compact ? "h-36" : "h-72"}`}>
          <div className="flex flex-1 items-end"><div className="w-full rounded-t bg-primary" style={{ height: `${point.mean}%` }} /></div>
          <div className="min-h-12 text-center text-xs">
            <p className="font-bold">{point.mean}%</p>
            <p className="text-muted-foreground">{point.term}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListingPage({ badge, title, description, headers, rows }: { badge: string; title: string; description: string; headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="space-y-5">
      <Header badge={badge} title={title} description={description} />
      <ListingTable headers={headers} rows={rows} />
    </div>
  );
}

function ListingTable({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded border border-border bg-white shadow-soft">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailPage({ badge, title, description, rows }: { badge: string; title: string; description: string; rows: string[][] }) {
  return (
    <div className="space-y-5">
      <Header badge={badge} title={title} description={description} />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 break-words font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ badge, title, description }: { badge: string; title: string; description: string }) {
  return (
    <section className="rounded border border-border bg-white p-5 shadow-soft">
      <Badge>{badge}</Badge>
      <h1 className="mt-3 text-3xl font-bold tracking-normal">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
    </section>
  );
}

function DetailLink({ href }: { href: string }) {
  return <Link href={href} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Details</Link>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-xl font-bold">{value}</p>
    </div>
  );
}

function NotFound({ label }: { label: string }) {
  return <div className="rounded border border-border bg-white p-5 shadow-soft">{label} not found.</div>;
}
