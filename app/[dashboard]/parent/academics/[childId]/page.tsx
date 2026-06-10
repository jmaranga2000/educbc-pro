import { ParentAcademicDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function AcademicDetailsRoutePage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;

  return <ParentAcademicDetailsPage childId={childId} />;
}
