import { CbcEngineSectionPage } from "@/components/dashboard/exams/exams-pages";

export default async function CbcEngineSectionRoutePage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  return <CbcEngineSectionPage section={section} />;
}
