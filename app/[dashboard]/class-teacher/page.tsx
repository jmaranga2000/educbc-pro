import { ClassTeacherDashboard } from "@/components/dashboard/class-teacher/class-teacher-dashboard";

export function generateStaticParams() {
  return [{ dashboard: "dashboard" }];
}

export default function ClassTeacherDashboardPage() {
  return <ClassTeacherDashboard />;
}
