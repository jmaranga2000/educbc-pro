import { notFound } from "next/navigation";
import { ClassTeacherModulePage } from "@/components/dashboard/class-teacher/class-teacher-module-page";
import { getClassTeacherModule } from "@/lib/class-teacher";

function PageFor({ slug }: { slug: string }) {
  const module = getClassTeacherModule(slug);

  if (!module) {
    notFound();
  }

  return <ClassTeacherModulePage module={module} />;
}

export function CompleteClassPage() {
  return <PageFor slug="complete-class" />;
}

export function ClassTeacherProfilePage() {
  return <PageFor slug="profile" />;
}

export function ClassTeacherStudentsPage() {
  return <PageFor slug="students" />;
}

export function ClassTeacherAcademicsPage() {
  return <PageFor slug="academics" />;
}

export function DisciplineRecordsPage() {
  return <PageFor slug="discipline-records" />;
}

export function LinkedParentsPage() {
  return <PageFor slug="parents" />;
}

export function CbcProgressPage() {
  return <PageFor slug="cbc-progress" />;
}

export function ParentNotificationsPage() {
  return <PageFor slug="notifications" />;
}

export function ClassTeacherAttendancePage() {
  return <PageFor slug="attendance" />;
}
