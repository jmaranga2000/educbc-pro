import Link from "next/link";
import { CBC_BANDS } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimetableGrid } from "@/components/timetable-grid";
import { dashboardIconMap } from "@/components/dashboard/dashboard-shell";
import { cbcRows, dashboardProfiles, moduleRows, pipelineRows, type DashboardProfile } from "@/lib/dashboard-ui";
import { dashboardSections, slugFromRole } from "@/lib/app-routes";
import { timetable } from "@/lib/demo-data";
import { gradeFromScore, meanScore } from "@/lib/cbc";
import type { Role } from "@/types";

export function RoleDashboardView({ role }: { role: Role }) {
  const dashboard = dashboardProfiles.find((item) => item.role === role) ?? dashboardProfiles[0];
  const roleSlug = slugFromRole(role);

  return (
    <div className="space-y-5">
      <DashboardHero dashboard={dashboard} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.metrics.map((metric) => {
          const Icon = dashboardIconMap[metric.icon];

          return (
            <div key={metric.label} className="rounded border border-border bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-primary">{metric.delta}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <Badge>{dashboard.role.replaceAll("_", " ")}</Badge>
              <CardTitle className="mt-3 text-2xl">{dashboard.title} Workbench</CardTitle>
            </div>
            <span className="rounded border border-border bg-muted px-3 py-2 text-sm font-bold">{dashboard.scope}</span>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {dashboard.workbench.map((item) => (
                <Link key={item} href={`/dashboard/${roleSlug}/${inferSectionSlug(item)}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
                  <p className="font-bold">{item}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Open the operational page for records, forms, and reports.</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.records.map((record) => (
              <div key={record.label} className="rounded border border-border bg-background p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold">{record.label}</p>
                  <Badge className="shrink-0">{record.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{record.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Pages</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardSections.map((section) => (
            <Link key={section.slug} href={`/dashboard/${roleSlug}/${section.slug}`} className="rounded border border-border bg-background p-4 hover:bg-muted">
              <p className="font-bold">{section.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardSectionView({ role, sectionSlug }: { role: Role; sectionSlug: string }) {
  const dashboard = dashboardProfiles.find((item) => item.role === role) ?? dashboardProfiles[0];
  const section = dashboardSections.find((item) => item.slug === sectionSlug);

  if (!section) {
    return null;
  }

  return (
    <div className="space-y-5">
      <DashboardHero dashboard={dashboard} eyebrow={section.label} title={`${section.label} Workspace`} summary={section.description} />
      {sectionSlug === "cbc" && <CbcWorkspace />}
      {sectionSlug === "timetable" && <TimetableWorkspace />}
      {sectionSlug === "finance" && <FinanceWorkspace />}
      {sectionSlug === "people" && <RecordsWorkspace title="People Records" rows={peopleRows} />}
      {sectionSlug === "academics" && <RecordsWorkspace title="Academic Records" rows={academicRows} />}
      {sectionSlug === "attendance" && <RecordsWorkspace title="Attendance Records" rows={attendanceRows} />}
      {sectionSlug === "communication" && <RecordsWorkspace title="Notification Center" rows={communicationRows} />}
      {sectionSlug === "documents" && <RecordsWorkspace title="Document Management" rows={documentRows} />}
      {sectionSlug === "sports" && <RecordsWorkspace title="Sports Management" rows={sportsRows} />}
      {sectionSlug === "library" && <RecordsWorkspace title="Library Module" rows={libraryRows} />}
      {sectionSlug === "transport" && <RecordsWorkspace title="Transport Module" rows={transportRows} />}
      {sectionSlug === "health" && <RecordsWorkspace title="Health Module" rows={healthRows} />}
      {sectionSlug === "analytics" && <AnalyticsWorkspace />}
    </div>
  );
}

function DashboardHero({
  dashboard,
  eyebrow,
  title,
  summary
}: {
  dashboard: DashboardProfile;
  eyebrow?: string;
  title?: string;
  summary?: string;
}) {
  const Icon = dashboardIconMap[dashboard.icon];

  return (
    <div className="rounded border border-border bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">{eyebrow ?? "Dashboard"}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-normal">{title ?? dashboard.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{summary ?? dashboard.summary}</p>
          </div>
        </div>
        <Badge className="w-fit">{dashboard.scope}</Badge>
      </div>
    </div>
  );
}

function CbcWorkspace() {
  const classMean = meanScore(cbcRows.map((row) => row.score));
  const band = gradeFromScore(classMean);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {CBC_BANDS.map((item) => (
          <div key={item.label} className="rounded border border-border bg-white p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">{item.range}</p>
            <p className="mt-2 text-3xl font-bold">{item.label}</p>
            <p className="mt-1 text-sm font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>CBC Assessment Engine</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Scores, bands, positions, and learner support signals.</p>
          </div>
          <Badge>
            Mean {classMean}% / {band.label}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Learner</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Band</th>
                  <th className="px-4 py-3">Risk</th>
                </tr>
              </thead>
              <tbody>
                {cbcRows.map((row) => (
                  <tr key={row.learner} className="border-t border-border bg-white">
                    <td className="px-4 py-3 font-bold">{row.learner}</td>
                    <td className="px-4 py-3">{row.grade}</td>
                    <td className="px-4 py-3">{row.subject}</td>
                    <td className="px-4 py-3">{row.score}%</td>
                    <td className="px-4 py-3">{row.band}</td>
                    <td className="px-4 py-3">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function TimetableWorkspace() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
      <RecordsWorkspace
        title="Generator Steps"
        rows={[
          ["Step 1", "Calculate total lessons needed", "Ready"],
          ["Step 2", "Allocate compulsory subjects first", "Ready"],
          ["Step 3", "Allocate specialized teachers", "Ready"],
          ["Step 4", "Allocate practical subjects", "Ready"],
          ["Step 5", "Resolve conflicts", "Ready"],
          ["Step 6", "Optimize schedule", "Ready"],
          ["Step 7", "Generate timetable", "Ready"]
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Generated Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <TimetableGrid timetable={timetable} />
        </CardContent>
      </Card>
    </div>
  );
}

function FinanceWorkspace() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <RecordsWorkspace title="Fee Collection" rows={financeRows} />
      <RecordsWorkspace
        title="Payment Integrations"
        rows={[
          ["M-Pesa", "Future integration", "Prepared"],
          ["Airtel Money", "Future integration", "Prepared"],
          ["Bank Payments", "Manual reconciliation records", "Active"]
        ]}
      />
    </div>
  );
}

function AnalyticsWorkspace() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <RecordsWorkspace title="Analytics Dashboards" rows={analyticsRows} />
      <Card>
        <CardHeader>
          <CardTitle>Project Layers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pipelineRows.map((row) => (
            <div key={row.step} className="rounded border border-border bg-background p-4">
              <p className="font-bold">{row.step}</p>
              <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function RecordsWorkspace({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map(([label, value, status]) => (
          <div key={`${title}-${label}`} className="rounded border border-border bg-background p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold">{label}</p>
              <Badge className="shrink-0">{status}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function inferSectionSlug(label: string) {
  const text = label.toLowerCase();
  if (text.includes("fee") || text.includes("payment") || text.includes("arrears")) return "finance";
  if (text.includes("cbc") || text.includes("exam") || text.includes("report")) return "cbc";
  if (text.includes("attendance")) return "attendance";
  if (text.includes("assignment") || text.includes("subject") || text.includes("resource")) return "academics";
  if (text.includes("message") || text.includes("notice") || text.includes("communication")) return "communication";
  if (text.includes("document")) return "documents";
  if (text.includes("sport") || text.includes("team") || text.includes("fixture")) return "sports";
  if (text.includes("library") || text.includes("book")) return "library";
  if (text.includes("health") || text.includes("medical") || text.includes("clinic")) return "health";
  if (text.includes("timetable")) return "timetable";
  return "people";
}

const peopleRows = [
  ["Students", "Admission numbers, grade, stream, parents, fee balance", "Model ready"],
  ["Parents", "Linked children, contacts, occupation, communication", "Model ready"],
  ["Teachers", "Subjects, qualification, TSC number, level, availability", "Model ready"],
  ["Workers", "Accountant, librarian, secretary, nurse, driver, store keeper", "Model ready"]
];

const academicRows = [
  ["Subjects", "Lower primary, upper primary, and JSS assessment areas", "Mapped"],
  ["Assignments", "Homework, resources, due dates, uploads, grading", "Ready"],
  ["Exams", "Scores, publishing, report cards, analysis", "Ready"],
  ["Academic Calendar", "Academic years and terms", "Ready"]
];

const attendanceRows = [
  ["Daily Marking", "Present, absent, late, excused", "Ready"],
  ["History", "Learner and class attendance records", "Ready"],
  ["Alerts", "Attendance SMS alert boundary", "Prepared"]
];

const financeRows = [
  ["Expected Fees", "KES 10.2M current term billing", "Active"],
  ["Collected", "KES 8.4M cash, bank, and mobile money", "82%"],
  ["Arrears", "KES 1.8M fee reminder queue", "Action"],
  ["Daily Collection", "KES 326K today", "Report"]
];

const communicationRows = [
  ["Fee reminders", "Automatic SMS through Africa's Talking", "Prepared"],
  ["Exam results", "Parent result alerts", "Prepared"],
  ["Attendance alerts", "Absence and late notifications", "Prepared"],
  ["Event reminders", "School notices and events", "Prepared"]
];

const documentRows = [
  ["Birth certificates", "Student document uploads", "R2 ready"],
  ["Report cards", "CBC and exam reports", "R2 ready"],
  ["Assignment files", "Teacher and student resources", "R2 ready"],
  ["Teacher documents", "Staff files and certificates", "R2 ready"]
];

const sportsRows = [
  ["Football", "Team registration and match results", "Active"],
  ["Volleyball", "Training schedule and players", "Active"],
  ["Basketball", "Fixtures and tournaments", "Active"],
  ["Athletics", "Player profiles and meet tracking", "Active"]
];

const libraryRows = [
  ["Book Inventory", "Title, author, category, copies", "Ready"],
  ["Borrowing", "Loans, due dates, borrowers", "Ready"],
  ["Returns", "Return processing and availability", "Ready"],
  ["Fines", "Outstanding fine amounts", "Ready"]
];

const transportRows = [
  ["School Buses", "Registration, capacity, driver assignment", "Ready"],
  ["Routes", "Stops, pickup, dropoff, bus mapping", "Ready"],
  ["Student Tracking", "Students assigned to transport routes", "Prepared"]
];

const healthRows = [
  ["Medical Records", "Student health notes and emergency contacts", "Ready"],
  ["Allergies", "Allergy flags for learner safety", "Ready"],
  ["Clinic Visits", "Symptoms, action taken, attended by", "Ready"]
];

const analyticsRows = [
  ["School Performance", "Enrollment, population growth, performance", "Ready"],
  ["CBC Analytics", "Competency bands, trends, weak learners", "Ready"],
  ["Attendance Analytics", "Daily, weekly, class, and learner patterns", "Ready"],
  ["Financial Analytics", "Collections, arrears, rates, reports", "Ready"],
  ["AI Features", "Prediction, at-risk detection, comments, recommendations", "Planned"]
];
