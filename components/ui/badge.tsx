import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "border-primary/20 bg-primary/10 text-primary",
  secondary: "border-secondary/20 bg-secondary/10 text-secondary",
  outline: "border-border bg-transparent text-foreground",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive"
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
