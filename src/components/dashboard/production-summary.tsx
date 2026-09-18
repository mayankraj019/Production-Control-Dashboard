import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { JobSummaryMetrics } from "@/types/job";

interface ProductionSummaryProps {
  metrics: JobSummaryMetrics;
}

export const ProductionSummary = React.memo(function ProductionSummary({
  metrics,
}: ProductionSummaryProps) {
  return (
    <section aria-label="Production Summary" className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* 1. Total Jobs */}
      <Card className="rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-medium">
              Total Jobs
            </span>
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
              {metrics.totalJobs}
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              in system
            </span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {metrics.inProgressCount} active • {metrics.pendingCount} queued
          </p>
        </CardContent>
      </Card>

      {/* 2. Delayed Jobs (Operational Exception) */}
      <Card className="rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-medium">
              Delayed Jobs
            </span>
            {metrics.delayedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-sm border border-rose-200 bg-rose-50 px-1 py-0.5 text-[9px] sm:text-[10px] font-mono text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                Action Req.
              </span>
            )}
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono tracking-tight text-rose-600 dark:text-rose-400">
              {metrics.delayedCount}
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              exceptions
            </span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            Equipment & material holds
          </p>
        </CardContent>
      </Card>

      {/* 3. Due Soon */}
      <Card className="rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-medium">
              Due Soon
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              ≤ 48 hrs
            </span>
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
              {metrics.dueTodayCount + metrics.dueTomorrowCount}
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              scheduled
            </span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {metrics.dueTodayCount} today • {metrics.dueTomorrowCount} tomorrow
          </p>
        </CardContent>
      </Card>

      {/* 4. Completed Jobs */}
      <Card className="rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-medium">
              Completed
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
              {metrics.completedCount}
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              cleared
            </span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            100% inspection pass
          </p>
        </CardContent>
      </Card>
    </section>
  );
});
