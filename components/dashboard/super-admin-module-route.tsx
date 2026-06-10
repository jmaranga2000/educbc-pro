import { notFound } from "next/navigation";
import { SuperAdminModulePageView } from "@/components/dashboard/super-admin-module-page";
import { getSuperAdminModule } from "@/lib/super-admin";

export function SuperAdminModuleRoute({ slug }: { slug: string }) {
  const currentModule = getSuperAdminModule(slug);

  if (!currentModule) {
    notFound();
  }

  return <SuperAdminModulePageView module={currentModule} />;
}
