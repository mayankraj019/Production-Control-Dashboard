import React from "react";
import { Button } from "@/components/ui/button";
import { SearchX, Inbox, AlertCircle, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  variant?: "search" | "no-jobs" | "error";
  onClearFilters?: () => void;
  onRetry?: () => void;
}

export function EmptyState({
  variant = "search",
  onClearFilters,
  onRetry,
}: EmptyStateProps) {
  if (variant === "no-jobs") {
    return (
      <div className="rounded-sm border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          <Inbox className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          No work orders in queue
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
          There are currently no production jobs scheduled in the system.
        </p>
        {onRetry && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 text-xs font-mono gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reload Jobs</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (variant === "error") {
    return (
      <div className="rounded-sm border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Something went wrong
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
          Please try again.
        </p>
        {onRetry && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 text-xs font-mono gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Try again</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Default: Search / Filter empty state
  return (
    <div className="rounded-sm border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <SearchX className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        No work orders found
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
        Try adjusting your search or filters.
      </p>
      {onClearFilters && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs font-mono"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
