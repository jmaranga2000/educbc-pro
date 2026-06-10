import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  assignedSubjects,
  attendanceSessions,
  cbcAssessments,
  getAttendanceSession,
  getCbcAssessment,
  getLearningResource,
  getTeacherAssignment,
  getTeacherClass,
  getTeacherMessage,
  getTeacherStudent,
  getTeacherSubject,
  learningResources,
  teacherAssignments,
  teacherClasses,
  teacherMessages,
  teacherStudents
} from "@/lib/teacher";

export function AssignmentsPage() {
  return (
    <ListingPage
      badge="Assignments"
      title="Assignment Workspace"
      description="Create, track, grade, and review learner submissions."
      headers={["Assignment", "Class", "Subject", "Due", "Submissions", "Status", "Action"]}
      rows={teacherAssignments.map((item) => [
        item.title,
        item.className,
        item.subject,
        item.dueDate,
        item.submissions,
        item.status,
        <DetailLink key={item.id} href={`/dashboard/teacher/assignments/${item.id}`} />
      ])}
    />
  );
}

export function AssignmentDetailsPage({ id }: { id: string }) {
  const item = getTeacherAssignment(id);
  if (!item) return <NotFound label="Assignment" />;
  return <DetailPage badge={item.status} title={item.title} description={item.brief} rows={[
    ["Class", item.className],
    ["Subject", item.subject],
    ["Due Date", item.dueDate],
    ["Submissions", item.submissions],
    ["Grading Queue", item.status === "Grading" ? "Review submitted work and publish marks." : "Monitor learner submissions."],
    ["Teacher Action", "Add rubric, mark scripts, return feedback, and notify missing learners."]
  ]} />;
}

export function AssignedSubjectsPage() {
  return (
    <ListingPage
      badge="Assigned Subjects"
      title="Subjects Across the School"
      description="Subject allocations, lesson load, coverage, and performance per assigned stream."
      headers={["Subject", "Classes", "Lessons", "Mean", "Coverage", "Action"]}
      rows={assignedSubjects.map((item) => [
        item.subject,
        item.classes.join(", "),
        `${item.lessons}`,
        `${item.mean}%`,
        item.coverage,
        <DetailLink key={item.id} href={`/dashboard/teacher/assigned-subjects/${item.id}`} />
      ])}
    />
  );
}

export function AssignedSubjectDetailsPage({ id }: { id: string }) {
  const item = getTeacherSubject(id);
  if (!item) return <NotFound label="Subject" />;
  return <DetailPage badge="Subject Load" title={item.subject} description="Detailed teaching allocation for this subject." rows={[
    ["Classes", item.classes.join(", ")],
    ["Weekly Lessons", `${item.lessons}`],
    ["Mean Score", `${item.mean}%`],
    ["Syllabus Coverage", item.coverage],
    ["Priority", item.mean < 75 ? "Plan intervention tasks." : "Maintain enrichment activities."]
  ]} />;
}

export function TeacherClassesPage() {
  return (
    <ListingPage
      badge="Classes"
      title="Assigned Classes"
      description="Streams taught by this teacher, with attendance, next lesson, and support counts."
      headers={["Class", "Learners", "Subject", "Attendance", "Next Lesson", "Support", "Action"]}
      rows={teacherClasses.map((item) => [
        item.name,
        `${item.learners}`,
        item.subject,
        item.attendance,
        item.nextLesson,
        `${item.support}`,
        <DetailLink key={item.id} href={`/dashboard/teacher/classes/${item.id}`} />
      ])}
    />
  );
}

export function TeacherClassDetailsPage({ id }: { id: string }) {
  const item = getTeacherClass(id);
  if (!item) return <NotFound label="Class" />;
  const learners = teacherStudents.filter((student) => student.className === item.name);
  return (
    <div className="space-y-5">
      <DetailPage badge={item.subject} title={item.name} description="Class-level lesson coverage, learner support, and next lesson details." rows={[
        ["Learners", `${item.learners}`],
        ["Attendance", item.attendance],
        ["Next Lesson", item.nextLesson],
        ["Support Cases", `${item.support}`]
      ]} />
      <Card>
        <CardHeader><CardTitle>Learners Taught in This Class</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {learners.map((student) => (
            <Link key={student.id} href={`/dashboard/teacher/students/${student.id}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
              <p className="font-bold">{student.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{student.admissionNumber} - {student.mean}%</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function TeacherStudentsPage() {
  return (
    <ListingPage
      badge="Students"
      title="Students Taught"
      description="Learners this teacher handles across assigned classes."
      headers={["Admission", "Student", "Class", "Subject", "Mean", "Attendance", "Assignments", "Action"]}
      rows={teacherStudents.map((item) => [
        item.admissionNumber,
        item.name,
        item.className,
        item.subject,
        `${item.mean}%`,
        item.attendance,
        item.assignmentStatus,
        <DetailLink key={item.id} href={`/dashboard/teacher/students/${item.id}`} />
      ])}
    />
  );
}

export function TeacherStudentDetailsPage({ id }: { id: string }) {
  const item = getTeacherStudent(id);
  if (!item) return <NotFound label="Student" />;
  return (
    <DetailPage badge={item.admissionNumber} title={item.name} description="Teacher-specific learner record with performance, submissions, attendance, and support needs." rows={[
      ["Class", item.className],
      ["Subject", item.subject],
      ["Mean Score", `${item.mean}%`],
      ["Attendance", item.attendance],
      ["Assignment Status", item.assignmentStatus],
      ["Parent Phone", item.parentPhone],
      ["Support Need", item.supportNeed]
    ]} extra={item.records.map((record) => (
      <div key={record.title} className="rounded border border-border bg-background p-4">
        <p className="font-bold">{record.title}</p>
        <p className="mt-1 text-xl font-bold text-primary">{record.value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{record.detail}</p>
      </div>
    ))} />
  );
}

export function TeacherAttendancePage() {
  return (
    <ListingPage
      badge="Attendance"
      title="Lesson Attendance"
      description="Attendance sessions for teacher lessons and assigned classes."
      headers={["Date", "Class", "Subject", "Present", "Absent", "Late", "Topic", "Action"]}
      rows={attendanceSessions.map((item) => [
        item.date,
        item.className,
        item.subject,
        `${item.present}`,
        `${item.absent}`,
        `${item.late}`,
        item.topic,
        <DetailLink key={item.id} href={`/dashboard/teacher/attendance/${item.id}`} />
      ])}
    />
  );
}

export function AttendanceSessionDetailsPage({ id }: { id: string }) {
  const item = getAttendanceSession(id);
  if (!item) return <NotFound label="Attendance session" />;
  return <DetailPage badge={item.date} title={`${item.className} Attendance`} description="Lesson attendance detail and follow-up actions." rows={[
    ["Subject", item.subject],
    ["Topic", item.topic],
    ["Present", `${item.present}`],
    ["Absent", `${item.absent}`],
    ["Late", `${item.late}`],
    ["Follow-up", item.absent > 0 ? "Send absent learner notice." : "No absence follow-up required."]
  ]} />;
}

export function LearningResourcesPage() {
  return (
    <ListingPage
      badge="Resources"
      title="Learning Resources"
      description="Notes, PDFs, videos, rubrics, and lesson resources."
      headers={["Title", "Type", "Subject", "Class", "Downloads", "Status", "Action"]}
      rows={learningResources.map((item) => [
        item.title,
        item.type,
        item.subject,
        item.className,
        `${item.downloads}`,
        item.status,
        <DetailLink key={item.id} href={`/dashboard/teacher/learning-resources/${item.id}`} />
      ])}
    />
  );
}

export function LearningResourceDetailsPage({ id }: { id: string }) {
  const item = getLearningResource(id);
  if (!item) return <NotFound label="Resource" />;
  return <DetailPage badge={item.type} title={item.title} description="Resource metadata, class visibility, and publishing status." rows={[
    ["Subject", item.subject],
    ["Class", item.className],
    ["Downloads", `${item.downloads}`],
    ["Status", item.status],
    ["Feature", "Upload replacement file, publish, unpublish, or attach to assignment."]
  ]} />;
}

export function CommunicationsPage() {
  return (
    <ListingPage
      badge="Communications"
      title="Teacher Messages"
      description="Messages created for learners, parents, class teachers, or administrators."
      headers={["Title", "Audience", "Channel", "Status", "Created", "Action"]}
      rows={teacherMessages.map((item) => [
        item.title,
        item.audience,
        item.channel,
        item.status,
        item.createdAt,
        <DetailLink key={item.id} href={`/dashboard/teacher/communications/${item.id}`} />
      ])}
      action={<Link href="/dashboard/teacher/communications/new" className="rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">New Message</Link>}
    />
  );
}

export function CommunicationDetailsPage({ id }: { id: string }) {
  const item = getTeacherMessage(id);
  if (!item) return <NotFound label="Message" />;
  return <DetailPage badge={item.status} title={item.title} description="Communication detail with delivery target and channel." rows={[
    ["Audience", item.audience],
    ["Channel", item.channel],
    ["Created", item.createdAt],
    ["Status", item.status],
    ["Delivery", item.channel === "SMS" ? "Queue through SMS provider." : "Send in-app notification."]
  ]} />;
}

export function NewCommunicationPage() {
  return (
    <div className="space-y-5">
      <Header badge="New Message" title="Create Teacher Message" description="Compose a message for learners, parents, class teachers, or administrators." />
      <form className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="grid gap-4">
          {["Audience", "Channel", "Title"].map((label) => (
            <label key={label} className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
              <input className="min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm" />
            </label>
          ))}
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</span>
            <textarea className="min-h-32 w-full rounded border border-border bg-white px-3 py-2 text-sm" />
          </label>
          <button type="button" className="min-h-11 rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Save Message</button>
        </div>
      </form>
    </div>
  );
}

export function CbcAssessmentPage() {
  return (
    <ListingPage
      badge="CBC Assessment"
      title="CBC Assessment Records"
      description="Competency records, evidence, comments, and learner scores."
      headers={["Student", "Class", "Subject", "Competency", "Score", "Evidence", "Action"]}
      rows={cbcAssessments.map((item) => [
        item.studentName,
        item.className,
        item.subject,
        item.competency,
        `${item.score}%`,
        item.evidence,
        <DetailLink key={item.id} href={`/dashboard/teacher/cbc-assessment/${item.id}`} />
      ])}
    />
  );
}

export function CbcAssessmentDetailsPage({ id }: { id: string }) {
  const item = getCbcAssessment(id);
  if (!item) return <NotFound label="CBC assessment" />;
  return <DetailPage badge={item.competency} title={`${item.studentName} CBC Assessment`} description="Detailed competency assessment with evidence and teacher comment." rows={[
    ["Class", item.className],
    ["Subject", item.subject],
    ["Score", `${item.score}%`],
    ["Evidence", item.evidence],
    ["Teacher Comment", item.comment],
    ["Next Action", item.score < 70 ? "Assign remediation task." : "Add enrichment activity."]
  ]} />;
}

function ListingPage({
  badge,
  title,
  description,
  headers,
  rows,
  action
}: {
  badge: string;
  title: string;
  description: string;
  headers: string[];
  rows: Array<Array<ReactNode>>;
  action?: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <Header badge={badge} title={title} description={description} action={action} />
      <div className="overflow-x-auto rounded border border-border bg-white shadow-soft">
        <table className="w-full min-w-[900px] text-left text-sm">
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
    </div>
  );
}

function DetailPage({
  badge,
  title,
  description,
  rows,
  extra
}: {
  badge: string;
  title: string;
  description: string;
  rows: string[][];
  extra?: ReactNode;
}) {
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
      {extra ? <div className="grid gap-3 md:grid-cols-2">{extra}</div> : null}
    </div>
  );
}

function Header({ badge, title, description, action }: { badge: string; title: string; description: string; action?: ReactNode }) {
  return (
    <section className="rounded border border-border bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge>{badge}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-normal">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {action}
      </div>
    </section>
  );
}

function DetailLink({ href }: { href: string }) {
  return <Link href={href} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Details</Link>;
}

function NotFound({ label }: { label: string }) {
  return <div className="rounded border border-border bg-white p-5 shadow-soft">{label} not found.</div>;
}
