import { ParentAttendanceDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function AttendanceDetailsRoutePage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;

  return <ParentAttendanceDetailsPage childId={childId} />;
}
