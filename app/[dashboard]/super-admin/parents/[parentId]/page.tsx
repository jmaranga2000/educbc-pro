import { notFound } from "next/navigation";
import { ParentDetailsView } from "@/components/dashboard/super-admin/parent-details-view";
import { getParentRecord } from "@/lib/super-admin-expanded";

export default async function ParentDetailsPage({ params }: { params: Promise<{ parentId: string }> }) {
  const { parentId } = await params;
  const parent = getParentRecord(parentId);

  if (!parent) {
    notFound();
  }

  return <ParentDetailsView parent={parent} />;
}
