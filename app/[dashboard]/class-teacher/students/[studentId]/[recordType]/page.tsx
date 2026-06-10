import { StudentRecordDetailsPage } from "@/components/dashboard/class-teacher/students-page";

export default async function StudentRecordRoutePage({
  params
}: {
  params: Promise<{ studentId: string; recordType: string }>;
}) {
  const { studentId, recordType } = await params;

  return <StudentRecordDetailsPage studentId={studentId} recordType={recordType} />;
}
