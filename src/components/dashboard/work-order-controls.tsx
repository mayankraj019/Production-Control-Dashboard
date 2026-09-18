"use client";

import React from "react";
import { JobStatus } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowUpDown } from "lucide-react";

export type SortField = "dueDate" | "quantity";
export type SortDirection = "asc" | "desc";

interface WorkOrderControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: JobStatus | "All";
  onStatusFilterChange: (status: JobStatus | "All") => void;
  sortBy: SortField;
  onSortByChange: (sortField: SortField) => void;
  sortDirection: SortDirection;
  onSortDirectionToggle: () => void;
  isFiltered: boolean;
  onClearFilters: () => void;
  statusCounts: {
    all: number;
    pending: number;
    inProgress: number;
    delayed: number;
    completed: number;
  };
}

export const WorkOrderControls = React.memo(function WorkOrderControls({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  sortDirection,
  onSortDirectionToggle,
  isFiltered,
  onClearFilters,
  statusCounts,
}: WorkOrderControlsProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-sm border border-zinc-200 bg-zinc-50/70 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 sm:h-3.5 sm:w-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ID, product, customer..."
            aria-label="Search work orders"
            className="h-9 sm:h-8 w-full rounded-sm border border-zinc-200 bg-white pl-8 pr-8 text-sm sm:text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-600"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <label
            htmlFor="status-select"
            className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0"
          >
            Status:
          </label>
          <select
            id="status-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as JobStatus | "All")}
            className="h-9 sm:h-8 w-full sm:w-auto rounded-sm border border-zinc-200 bg-white px-2.5 font-mono text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:ring-zinc-600"
          >
            <option value="All">All ({statusCounts.all})</option>
            <option value="Pending">Pending ({statusCounts.pending})</option>
            <option value="In Progress">In Progress ({statusCounts.inProgress})</option>
            <option value="Delayed">Delayed ({statusCounts.delayed})</option>
            <option value="Completed">Completed ({statusCounts.completed})</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0 border-t border-zinc-200/60 sm:border-0 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
          <label
            htmlFor="sort-by-select"
            className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0"
          >
            Sort:
          </label>
          <select
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortField)}
            className="h-9 sm:h-8 flex-1 sm:flex-initial rounded-sm border border-zinc-200 bg-white px-2.5 font-mono text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:ring-zinc-600"
          >
            <option value="dueDate">Due Date</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onSortDirectionToggle}
          className="h-9 sm:h-8 px-2.5 font-mono text-xs text-zinc-700 dark:text-zinc-300 gap-1.5"
          aria-label={`Toggle sort order (${sortDirection})`}
        >
          <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
          <span className="uppercase">{sortDirection}</span>
        </Button>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-9 sm:h-8 px-2 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 gap-1 ml-auto sm:ml-0"
          >
            <X className="h-3 w-3" />
            <span className="hidden sm:inline">Clear filters</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
});
