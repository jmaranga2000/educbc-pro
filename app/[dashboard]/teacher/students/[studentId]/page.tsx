import { TeacherStudentDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function StudentDetailsRoutePage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;

  return <TeacherStudentDetailsPage id={studentId} />;
}
