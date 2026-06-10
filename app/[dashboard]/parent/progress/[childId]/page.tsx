import { ParentProgressDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function ProgressDetailsRoutePage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;

  return <ParentProgressDetailsPage childId={childId} />;
}
