import { ParentChildDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function ChildDetailsRoutePage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;

  return <ParentChildDetailsPage childId={childId} />;
}
