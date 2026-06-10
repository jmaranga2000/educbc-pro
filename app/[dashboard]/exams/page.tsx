import { ExamsDashboard } from "@/components/dashboard/exams/exams-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function ExamsDashboardPage() {
  return <ExamsDashboard />;
}
