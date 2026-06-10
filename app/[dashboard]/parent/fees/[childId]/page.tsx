import { ParentFeeDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function FeeDetailsRoutePage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;

  return <ParentFeeDetailsPage childId={childId} />;
}
