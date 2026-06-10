import { AssignedSubjectDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function AssignedSubjectDetailsRoutePage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;

  return <AssignedSubjectDetailsPage id={subjectId} />;
}
