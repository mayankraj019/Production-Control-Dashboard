import React from "react";
import { JobStatus } from "@/types/job";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = (status: JobStatus): { container: string; dot: string } => {
    switch (status) {
      case "Pending":
        return {
          container:
            "border-zinc-300/80 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300",
          dot: "rounded-full bg-zinc-400 dark:bg-zinc-500",
        };
      case "In Progress":
        return {
          container:
            "border-blue-200 bg-blue-50/70 text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300",
          dot: "rounded-full bg-blue-600 dark:bg-blue-400",
        };
      case "Delayed":
        return {
          container:
            "border-amber-200 bg-amber-50/70 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
          dot: "rounded-xs rotate-45 bg-amber-600 dark:bg-amber-400",
        };
      case "Completed":
        return {
          container:
            "border-emerald-200 bg-emerald-50/70 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
          dot: "rounded-full bg-emerald-600 dark:bg-emerald-400",
        };
    }
  };

  const { container, dot } = getStyles(status);

  return (
    <span
      role="status"
      aria-label={`Status: ${status}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-mono font-medium tracking-tight whitespace-nowrap select-none",
        container,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0", dot)} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}
