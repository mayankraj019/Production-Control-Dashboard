"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Job, JobStatus, JobSummaryMetrics } from "@/types/job";
import { ProductionSummary } from "@/components/dashboard/production-summary";
import {
  SortDirection,
  SortField,
  WorkOrderControls,
} from "@/components/dashboard/work-order-controls";
import { WorkOrdersTable } from "@/components/dashboard/work-orders-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { JobDetailDrawer } from "@/components/dashboard/job-detail-drawer";

interface ProductionDashboardProps {
  initialJobs: Job[];
}

export function ProductionDashboard({ initialJobs }: ProductionDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortField>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) || null,
    [jobs, selectedJobId]
  );

  const summaryMetrics = useMemo<JobSummaryMetrics>(() => {
    const today = "2026-09-18";
    const tomorrow = "2026-09-19";

    let pendingCount = 0;
    let inProgressCount = 0;
    let delayedCount = 0;
    let completedCount = 0;
    let dueTodayCount = 0;
    let dueTomorrowCount = 0;

    for (const job of jobs) {
      if (job.status === "Pending") pendingCount++;
      else if (job.status === "In Progress") inProgressCount++;
      else if (job.status === "Delayed") delayedCount++;
      else if (job.status === "Completed") completedCount++;

      if (job.status !== "Completed") {
        if (job.dueDate === today) dueTodayCount++;
        else if (job.dueDate === tomorrow) dueTomorrowCount++;
      }
    }

    return {
      totalJobs: jobs.length,
      pendingCount,
      inProgressCount,
      delayedCount,
      completedCount,
      dueTodayCount,
      dueTomorrowCount,
    };
  }, [jobs]);

  const statusCounts = useMemo(
    () => ({
      all: jobs.length,
      pending: summaryMetrics.pendingCount,
      inProgress: summaryMetrics.inProgressCount,
      delayed: summaryMetrics.delayedCount,
      completed: summaryMetrics.completedCount,
    }),
    [jobs.length, summaryMetrics]
  );

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      if (statusFilter !== "All" && job.status !== statusFilter) {
        return false;
      }

      if (q) {
        const matchesId = job.id.toLowerCase().includes(q);
        const matchesProduct = job.productName.toLowerCase().includes(q);
        const matchesCustomer = job.customer.toLowerCase().includes(q);
        return matchesId || matchesProduct || matchesCustomer;
      }

      return true;
    });
  }, [jobs, searchQuery, statusFilter]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const cmp =
        sortBy === "dueDate"
          ? a.dueDate.localeCompare(b.dueDate)
          : a.quantity - b.quantity;
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filteredJobs, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedJobs = useMemo(
    () => sortedJobs.slice(startIndex, endIndex),
    [sortedJobs, startIndex, endIndex]
  );

  const isFiltered =
    searchQuery.trim().length > 0 ||
    statusFilter !== "All" ||
    sortBy !== "dueDate" ||
    sortDirection !== "asc";

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((status: JobStatus | "All") => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleSortByChange = useCallback((field: SortField) => {
    setSortBy(field);
    setCurrentPage(1);
  }, []);

  const handleSortDirectionToggle = useCallback(() => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("All");
    setSortBy("dueDate");
    setSortDirection("asc");
    setCurrentPage(1);
  }, []);

  const handleUpdateStatus = useCallback((jobId: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
  }, []);

  return (
    <div className="space-y-4">
      <ProductionSummary metrics={summaryMetrics} />

      <section aria-label="Work Orders" className="space-y-2.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Work Orders
            </h2>
            <span className="inline-flex items-center rounded-sm bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {sortedJobs.length} of {jobs.length} jobs
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time queue dispatch and machine floor routing
          </p>
        </div>

        <WorkOrderControls
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
          sortDirection={sortDirection}
          onSortDirectionToggle={handleSortDirectionToggle}
          isFiltered={isFiltered}
          onClearFilters={handleClearFilters}
          statusCounts={statusCounts}
        />

        {jobs.length === 0 ? (
          <EmptyState
            variant="no-jobs"
            onRetry={() => {
              setJobs(initialJobs);
              setCurrentPage(1);
            }}
          />
        ) : sortedJobs.length === 0 ? (
          <EmptyState variant="search" onClearFilters={handleClearFilters} />
        ) : (
          <WorkOrdersTable
            jobs={paginatedJobs}
            selectedJobId={selectedJobId}
            onSelectJob={(job) => setSelectedJobId(job.id)}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={sortedJobs.length}
            startIndex={startIndex}
            endIndex={endIndex}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      <JobDetailDrawer
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJobId(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
