"use client";

import React, { useMemo, useState } from "react";
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
  // Source of truth: the jobs collection
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  // Active drawer selection
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Control primitives
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortField>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  const handlePageSizeChange = React.useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  // Derive selected job directly from source of truth
  const selectedJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  // 1. Derive Summary Metrics directly from source of truth
  const summaryMetrics = useMemo<JobSummaryMetrics>(() => {
    const referenceToday = "2026-09-18";
    const referenceTomorrow = "2026-09-19";

    let pendingCount = 0;
    let inProgressCount = 0;
    let delayedCount = 0;
    let completedCount = 0;
    let dueTodayCount = 0;
    let dueTomorrowCount = 0;

    for (const job of jobs) {
      if (job.status === "Pending") pendingCount++;
      if (job.status === "In Progress") inProgressCount++;
      if (job.status === "Delayed") delayedCount++;
      if (job.status === "Completed") completedCount++;

      // Active / uncompleted jobs due today or tomorrow
      if (job.status !== "Completed") {
        if (job.dueDate === referenceToday) dueTodayCount++;
        if (job.dueDate === referenceTomorrow) dueTomorrowCount++;
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

  // Status counts for filter dropdown display
  const statusCounts = useMemo(() => {
    return {
      all: jobs.length,
      pending: summaryMetrics.pendingCount,
      inProgress: summaryMetrics.inProgressCount,
      delayed: summaryMetrics.delayedCount,
      completed: summaryMetrics.completedCount,
    };
  }, [jobs.length, summaryMetrics]);

  // 2. Derive Filtered Jobs
  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      // Status filter
      if (statusFilter !== "All" && job.status !== statusFilter) {
        return false;
      }

      // Search matching (Job ID, Product name, Customer) - case-insensitive
      if (q) {
        const matchesId = job.id.toLowerCase().includes(q);
        const matchesProduct = job.productName.toLowerCase().includes(q);
        const matchesCustomer = job.customer.toLowerCase().includes(q);

        if (!matchesId && !matchesProduct && !matchesCustomer) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, searchQuery, statusFilter]);

  // 3. Derive Sorted Jobs
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "dueDate") {
        comparison = a.dueDate.localeCompare(b.dueDate);
      } else if (sortBy === "quantity") {
        comparison = a.quantity - b.quantity;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredJobs, sortBy, sortDirection]);

  // 4. Derive Pagination
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedJobs = useMemo(() => {
    return sortedJobs.slice(startIndex, endIndex);
  }, [sortedJobs, startIndex, endIndex]);

  // Check if any filter or search is active
  const isFiltered =
    searchQuery.trim().length > 0 ||
    statusFilter !== "All" ||
    sortBy !== "dueDate" ||
    sortDirection !== "asc";

  const handleSearchChange = React.useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = React.useCallback((status: JobStatus | "All") => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleSortByChange = React.useCallback((field: SortField) => {
    setSortBy(field);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setSearchQuery("");
    setStatusFilter("All");
    setSortBy("dueDate");
    setSortDirection("asc");
    setCurrentPage(1);
  }, []);

  const handleSortDirectionToggle = React.useCallback(() => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  }, []);

  const handlePageChange = React.useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleRowClick = React.useCallback((job: Job) => {
    setSelectedJobId(job.id);
  }, []);

  const handleCloseDrawer = React.useCallback(() => {
    setSelectedJobId(null);
  }, []);

  // Status mutation updating source of truth
  const handleUpdateStatus = React.useCallback((jobId: string, newStatus: JobStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
  }, []);

  return (
    <div className="space-y-4">
      {/* Derived Summary Section */}
      <ProductionSummary metrics={summaryMetrics} />

      {/* Work Orders Section */}
      <section aria-label="Work Orders" className="space-y-2.5">
        {/* Section Header */}
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

        {/* Work Order Controls */}
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

        {/* Conditional Table or Proper Empty State */}
        {jobs.length === 0 ? (
          <EmptyState
            variant="no-jobs"
            onRetry={() => {
              setJobs(initialJobs);
              setCurrentPage(1);
            }}
          />
        ) : sortedJobs.length === 0 ? (
          <EmptyState
            variant="search"
            onClearFilters={handleClearFilters}
          />
        ) : (
          <WorkOrdersTable
            jobs={paginatedJobs}
            selectedJobId={selectedJobId}
            onSelectJob={handleRowClick}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={sortedJobs.length}
            startIndex={startIndex}
            endIndex={endIndex}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      {/* Job Detail Drawer */}
      <JobDetailDrawer
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={handleCloseDrawer}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
