"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspace";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  roleName?: string;
};

export function Button({ className, variant = "default", roleName, onClick, children, ...props }: ButtonProps) {
  const setActiveRole = useWorkspaceStore((state) => state.setActiveRole);

  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded px-3 py-2 text-sm font-semibold transition",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-transparent text-foreground hover:bg-muted",
        className
      )}
      onClick={(event) => {
        if (roleName) {
          setActiveRole(roleName);
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
