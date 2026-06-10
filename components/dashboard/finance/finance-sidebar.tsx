"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, WalletCards, X } from "lucide-react";
import { financeModules, financeProfile } from "@/lib/finance-dashboard";

export function FinanceSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="space-y-4">
      <div className="rounded border border-border bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard/finance" className="flex min-w-0 items-center gap-3 font-bold">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
              <WalletCards className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              Finance
              <span className="block truncate text-xs font-semibold text-muted-foreground">{financeProfile.officer}</span>
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-border lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label="Toggle finance navigation"
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
          <span className="rounded bg-green-50 px-2.5 py-2 text-green-800">{financeProfile.collectionRate} collected</span>
          <span className="rounded bg-orange-50 px-2.5 py-2 text-orange-800">{financeProfile.arrears} arrears</span>
        </div>
      </div>

      <nav className={`${open ? "block" : "hidden"} rounded border border-border bg-white p-3 shadow-soft lg:block`}>
        <Link
          href="/dashboard/finance"
          className={`flex min-h-10 items-center rounded px-3 py-2 text-sm font-bold ${
            pathname === "/dashboard/finance" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
          onClick={() => setOpen(false)}
        >
          Dashboard
        </Link>
        <div className="mt-3 space-y-1">
          {financeModules.map((item) => {
            const Icon = item.icon;
            const href = `/dashboard/finance/${item.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.slug}
                href={href}
                className={`flex min-h-10 items-center gap-2 rounded px-3 py-2 text-sm font-semibold ${
                  active ? "bg-muted text-primary" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
