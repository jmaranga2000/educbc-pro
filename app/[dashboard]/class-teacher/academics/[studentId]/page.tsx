import { StudentAcademicPerformancePage } from "@/components/dashboard/class-teacher/academics-page";

export default async function AcademicStudentDetailsRoutePage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;

  return <StudentAcademicPerformancePage studentId={studentId} />;
}
