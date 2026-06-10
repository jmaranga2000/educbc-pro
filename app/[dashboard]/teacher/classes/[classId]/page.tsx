import { TeacherClassDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function ClassDetailsRoutePage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;

  return <TeacherClassDetailsPage id={classId} />;
}
