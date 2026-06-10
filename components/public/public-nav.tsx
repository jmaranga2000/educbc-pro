import Link from "next/link";
import { GraduationCap } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/modules", label: "Modules" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" }
];

export function PublicNav() {
  return (
    <header className="border-b border-border bg-white/88">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-bold text-foreground">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>EduCBC Pro</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded px-3 py-2 hover:bg-muted">
              {link.label}
            </Link>
          ))}
          <Link href="/dashboard/super-admin" className="rounded bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
