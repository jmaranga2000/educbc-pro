import { AssignmentDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function AssignmentDetailsRoutePage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = await params;

  return <AssignmentDetailsPage id={assignmentId} />;
}
