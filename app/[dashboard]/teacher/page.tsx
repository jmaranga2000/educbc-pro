import { TeacherDashboard } from "@/components/dashboard/teacher/teacher-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function TeacherDashboardPage() {
  return <TeacherDashboard />;
}
