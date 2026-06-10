import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  approvalQueue,
  cbcEngineSpec,
  findExamsRecord,
  curriculumLevels
} from "@/lib/exams-dashboard";
import {
  getApprovalQueue,
  getAssessmentPeriods,
  getCbcEngineOverview,
  getCbcEngineSection,
  getPerformanceRows,
  getReportCards,
  getRiskLearners,
  getSubjectRows
} from "@/services/exams-dashboard.service";

export async function CbcAssessmentEnginePage() {
  const engine = await getCbcEngineOverview();

  return (
    <div className="space-y-5">
      <Header
        badge="CBC Engine"
        title="CBC Assessment Engine"
        description="Production-grade CBC engine structure based on the pasted specification: curriculum hierarchy, competencies, score calculation, reports, workflow, and analytics."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Curriculum Nodes" value={`${engine.stats.curriculumNodes}`} />
        <Metric label="Competencies" value={`${engine.stats.competencies}`} />
        <Metric label="Assessment Scores" value={`${engine.stats.assessmentCount}`} />
        <Metric label="Learners" value={`${engine.stats.learnerCount}`} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader><CardTitle>Curriculum Hierarchy</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {engine.hierarchy.map((item) => (
              <Link key={item.id} href="/dashboard/exams/cbc-assessment-engine/hierarchy" className="rounded border border-border bg-background p-4 hover:bg-muted">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{item.level}</p>
                <p className="mt-2 font-bold">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Achievement Scale</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {engine.grading.map((scale) => (
              <Link key={scale.id} href="/dashboard/exams/cbc-assessment-engine/grading" className="block rounded border border-border bg-background p-4 hover:bg-muted">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{scale.level} ({scale.value})</p>
                  <Badge>{scale.range}</Badge>
                </div>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{scale.remark}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ListCard title="Core Competencies" href="/dashboard/exams/cbc-assessment-engine/competencies" items={engine.competencies.map((item) => item.title)} />
        <ListCard title="Assessment Types" href="/dashboard/exams/cbc-assessment-engine/assessment-types" items={engine.assessmentTypes.map((item) => item.title)} />
        <ListCard title="MongoDB Collections" href="/dashboard/exams/cbc-assessment-engine/collections" items={engine.collections.map((item) => item.title)} />
      </div>

      <Card>
        <CardHeader><CardTitle>Assessment Workflow</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {engine.workflow.map((step, index) => (
            <Link key={step.id} href="/dashboard/exams/cbc-assessment-engine/workflow" className="rounded border border-border bg-background p-4 hover:bg-muted">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Step {index + 1}</p>
              <p className="mt-2 font-bold">{step.title}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export async function CbcEngineSectionPage({ section }: { section: string }) {
  const rows = await getCbcEngineSection(section);
  return (
    <div className="space-y-5">
      <Header badge="CBC Engine" title={labelize(section)} description="Live CBC engine records loaded through the exams dashboard service layer." />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => {
          const item = row as { id: string; title?: string; level?: string; detail?: string; remark?: string };

          return (
            <div key={item.id} className="rounded border border-border bg-white p-4 shadow-soft">
              <p className="font-bold">{item.title ?? item.level ?? item.id}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.detail ?? item.remark ?? "CBC engine record"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function AssessmentPeriodsPage() {
  const periods = await getAssessmentPeriods();
  return (
    <ListingPage
      badge="Assessment Periods"
      title="Assessment Windows"
      description="Create, activate, close, and publish assessment periods."
      headers={["Period", "Term", "Status", "Completion", "Assessments", "Action"]}
      rows={periods.map((item) => [item.name, item.term, item.status, item.completion, `${item.assessments}`, <DetailLink key={item.id} href={`/dashboard/exams/assessment-periods/${item.id}`} />])}
    />
  );
}

export function CurriculumLevelPage({ level }: { level: "lower-primary" | "upper-primary" | "junior-secondary" }) {
  const item = curriculumLevels.find((current) => current.id === level);
  if (!item) return <NotFound label="Curriculum level" />;

  return (
    <DetailPage badge={item.grades} title={item.level} description="Curriculum assessment setup by learning area, strand, sub-strand, outcome, indicator, and assessment completion." rows={[
      ["Grades", item.grades],
      ["Learning Areas", item.areas],
      ["Completion", item.completion],
      ["Learners", `${item.learners}`],
      ["Engine Link", "Each assessment maps to grade, learning area, strand, sub-strand, outcome, and indicator."],
      ["Reports", "Learner, class, stream, grade, and school reports are generated from this level."]
    ]} />
  );
}

export function GradingSystemPage() {
  return (
    <div className="space-y-5">
      <Header badge="Grading" title="CBC Grading System" description="Configurable CBC grading boundaries and automated teacher remarks templates." />
      <div className="grid gap-3 md:grid-cols-2">
        {cbcEngineSpec.scoring.map((scale) => (
          <div key={scale.level} className="rounded border border-border bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <p className="text-2xl font-bold">{scale.level}</p>
              <Badge>{scale.range}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Numeric level: {scale.value}</p>
            <p className="mt-3 text-sm leading-5">{scale.remark}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function PerformanceAnalyticsPage() {
  const rows = await getPerformanceRows();
  return (
    <ListingPage
      badge="Analytics"
      title="Performance Analytics"
      description="Learner, class, grade, stream, subject, competency, teacher, and school trend analytics."
      headers={["Name", "Scope", "Mean", "Achievement", "Completion", "Top", "Risk", "Action"]}
      rows={rows.map((item) => [item.name, item.scope, `${item.mean}%`, item.achievement, item.completion, item.top, `${item.risk}`, <DetailLink key={item.id} href={`/dashboard/exams/performance-analytics/${item.id}`} />])}
    />
  );
}

export async function SubjectAnalysisPage() {
  const rows = await getSubjectRows();
  return (
    <ListingPage
      badge="Subject Analysis"
      title="Subject and Teacher Analysis"
      description="Subject means, teacher comparison, grade performance, stream performance, and trends."
      headers={["Subject", "Teacher", "Grade", "Mean", "Trend", "Completion", "Action"]}
      rows={rows.map((item) => [item.subject, item.teacher, item.grade, `${item.mean}%`, item.trend, item.completion, <DetailLink key={item.id} href={`/dashboard/exams/subject-analysis/${item.id}`} />])}
    />
  );
}

export async function ReportCardsPage() {
  const rows = await getReportCards();
  return (
    <ListingPage
      badge="Report Cards"
      title="CBC Report Cards"
      description="Generate, review, approve, publish, and export CBC report cards with QR verification readiness."
      headers={["Student", "Admission", "Grade", "Status", "Approval", "Export", "Action"]}
      rows={rows.map((item) => [item.student, item.admission, item.grade, item.status, item.approval, item.export, <DetailLink key={item.id} href={`/dashboard/exams/report-cards/${item.id}`} />])}
    />
  );
}

export async function ApprovalsPage() {
  const rows = await getApprovalQueue();
  return (
    <ListingPage
      badge="Approvals"
      title="Review and Publishing Queue"
      description="Class teacher reviews, head teacher approvals, publishing, and parent visibility."
      headers={["Item", "Owner", "Stage", "Due", "Status", "Action"]}
      rows={rows.map((item) => [item.item, item.owner, item.stage, item.due, item.status, <DetailLink key={item.id} href={`/dashboard/exams/approvals/${item.id}`} />])}
    />
  );
}

export async function AtRiskLearnersPage() {
  const rows = await getRiskLearners();
  return (
    <ListingPage
      badge="At Risk"
      title="At-Risk Learner Detection"
      description="Learners flagged by multiple BE ratings, poor attendance, declining trends, or incomplete assessments."
      headers={["Student", "Grade", "Reason", "Attendance", "Trend", "Alerts", "Action"]}
      rows={rows.map((item) => [item.student, item.grade, item.reason, item.attendance, item.trend, item.alert, <DetailLink key={item.id} href={`/dashboard/exams/at-risk-learners/${item.id}`} />])}
    />
  );
}

export function ExamsRecordDetailsPage({ id }: { id: string }) {
  const record = findExamsRecord(id) as Record<string, string | number> | undefined;
  if (!record) return <NotFound label="Record" />;
  const title = String(record.name ?? record.student ?? record.subject ?? record.item ?? "Exam record");

  return (
    <DetailPage
      badge={String(record.status ?? record.scope ?? record.stage ?? "Details")}
      title={title}
      description="Detailed exams department record with workflow context and follow-up actions."
      rows={Object.entries(record)
        .filter(([key]) => key !== "id")
        .map(([key, value]) => [labelize(key), String(value)])}
    />
  );
}

function ListingPage({ badge, title, description, headers, rows }: { badge: string; title: string; description: string; headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="space-y-5">
      <Header badge={badge} title={title} description={description} />
      <div className="overflow-x-auto rounded border border-border bg-white shadow-soft">
        <table className="w-full min-w-[920px] text-left text-sm">
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

function ListCard({ title, items, href }: { title: string; items: string[]; href: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => <Link key={item} href={href} className="block rounded border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted">{item}</Link>)}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-2xl font-bold">{value}</p>
    </div>
  );
}

function DetailLink({ href }: { href: string }) {
  return <Link href={href} className="rounded bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Details</Link>;
}

function NotFound({ label }: { label: string }) {
  return <div className="rounded border border-border bg-white p-5 shadow-soft">{label} not found.</div>;
}

function labelize(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
