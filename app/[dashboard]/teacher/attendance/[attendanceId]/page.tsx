import { AttendanceSessionDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function AttendanceDetailsRoutePage({ params }: { params: Promise<{ attendanceId: string }> }) {
  const { attendanceId } = await params;

  return <AttendanceSessionDetailsPage id={attendanceId} />;
}
