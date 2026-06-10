import { ClassStudentDetailsPage } from "@/components/dashboard/class-teacher/students-page";

export default async function StudentDetailsRoutePage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;

  return <ClassStudentDetailsPage studentId={studentId} />;
}
