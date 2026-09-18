"use client";

import React, { useState } from "react";
import { Job } from "@/types/job";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WorkOrdersTableProps {
  jobs: Job[];
  selectedJobId?: string | null;
  onSelectJob?: (job: Job) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  startIndex?: number;
  endIndex?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  onPageChange?: (page: number) => void;
}

export const WorkOrdersTable = React.memo(function WorkOrdersTable({
  jobs,
  selectedJobId: externalSelectedJobId,
  onSelectJob,
  currentPage = 1,
  totalPages = 1,
  totalItems = jobs.length,
  startIndex = 0,
  endIndex = jobs.length,
  pageSize = 9,
  onPageSizeChange,
  onPageChange,
}: WorkOrdersTableProps) {
  const [internalSelectedJobId, setInternalSelectedJobId] = useState<string | null>(null);
  const selectedJobId =
    externalSelectedJobId !== undefined ? externalSelectedJobId : internalSelectedJobId;

  const handleRowClick = (job: Job) => {
    setInternalSelectedJobId(job.id);
    onSelectJob?.(job);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, job: Job) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(job);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop & Tablet Table */}
      <div className="hidden md:block w-full overflow-hidden rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80 text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Job ID</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Product</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Customer</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium text-right whitespace-nowrap">Quantity</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Due Date</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Status</th>
                <th scope="col" className="py-2.5 px-3.5 font-medium whitespace-nowrap">Assigned Machine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {jobs.map((job) => {
                const isSelected = selectedJobId === job.id;

                return (
                  <tr
                    key={job.id}
                    tabIndex={0}
                    aria-selected={isSelected}
                    onClick={() => handleRowClick(job)}
                    onKeyDown={(e) => handleKeyDown(e, job)}
                    className={cn(
                      "cursor-pointer transition-colors outline-none",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                      isSelected
                        ? "bg-zinc-100/90 dark:bg-zinc-800/70 font-normal"
                        : "bg-transparent",
                      "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
                    )}
                  >
                    <td className="py-3 px-3.5 font-mono font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {job.id}
                    </td>
                    <td className="py-3 px-3.5 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {job.productName}
                    </td>
                    <td className="py-3 px-3.5 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {job.customer}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-right text-zinc-800 dark:text-zinc-200 tabular-nums whitespace-nowrap">
                      {job.quantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {job.dueDate}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {job.assignedMachine}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {onPageChange && totalItems > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50/70 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                Showing <strong className="text-zinc-900 dark:text-zinc-100 font-medium">{startIndex + 1}–{Math.min(endIndex, totalItems)}</strong> of <strong className="text-zinc-900 dark:text-zinc-100 font-medium">{totalItems}</strong>
              </span>

              {onPageSizeChange && (
                <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-mono text-[10px] uppercase text-zinc-400">Rows:</span>
                  <div className="flex items-center gap-0.5">
                    {[6, 9, 18].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onPageSizeChange(size)}
                        className={cn(
                          "px-2 py-0.5 rounded font-mono text-[11px] transition-colors",
                          pageSize === size
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-xs"
                            : "text-zinc-600 hover:bg-zinc-200/80 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        )}
                        aria-label={`Show ${size} rows per frame`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-7 px-2.5 text-xs font-mono gap-1"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={cn(
                      "h-7 w-7 p-0 text-xs font-mono",
                      page === currentPage
                        ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    )}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-7 px-2.5 text-xs font-mono gap-1"
                aria-label="Forward to next page"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-2">
        {jobs.map((job) => {
          const isSelected = selectedJobId === job.id;

          return (
            <div
              key={job.id}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Inspect job ${job.id}: ${job.productName}`}
              onClick={() => handleRowClick(job)}
              onKeyDown={(e) => handleKeyDown(e, job)}
              className={cn(
                "rounded-sm border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950 cursor-pointer outline-none transition-colors",
                isSelected
                  ? "bg-zinc-100/90 dark:bg-zinc-800/80 ring-1 ring-zinc-300 dark:ring-zinc-700"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 active:bg-zinc-100 dark:active:bg-zinc-900",
                "focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {job.id}
                </span>
                <StatusBadge status={job.status} />
              </div>

              <h4 className="mt-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                {job.productName}
              </h4>

              <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                {job.customer}
              </p>

              <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Qty:</span>
                  <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">
                    {job.quantity.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Due:</span>
                  <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                    {job.dueDate}
                  </span>
                </div>

                <div className="w-full flex items-baseline gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                  <span className="shrink-0 text-zinc-400">Unit:</span>
                  <span className="truncate text-zinc-700 dark:text-zinc-300">
                    {job.assignedMachine}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {onPageChange && totalItems > 0 && (
          <div className="flex items-center justify-between rounded-sm border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950 text-xs">
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              <strong>{startIndex + 1}–{Math.min(endIndex, totalItems)}</strong> of <strong>{totalItems}</strong>
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-7 px-2 text-xs font-mono gap-1"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </Button>

              <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-300 px-1">
                {currentPage}/{totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-7 px-2 text-xs font-mono gap-1"
                aria-label="Forward to next page"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
