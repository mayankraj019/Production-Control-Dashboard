import { MOCK_JOBS } from "@/data/mock-jobs";
import { Job, JobFilterParams, JobStatus, JobSummaryMetrics } from "@/types/job";

/**
 * JobService provides an abstraction layer over the production jobs dataset.
 * Currently backed by local mock data, this interface can be replaced with
 * `fetch('/api/jobs')` or an external factory MES/ERP integration without modifying UI consumers.
 */
export const JobService = {
  /**
   * Retrieve all jobs with optional filtering parameters.
   */
  async getJobs(filters?: JobFilterParams): Promise<Job[]> {
    // Simulates an async network fetch
    let results = [...MOCK_JOBS];

    if (!filters) {
      return results;
    }

    if (filters.status && filters.status !== "All") {
      results = results.filter((job) => job.status === filters.status);
    }

    if (filters.assignedMachine) {
      results = results.filter((job) =>
        job.assignedMachine.toLowerCase().includes(filters.assignedMachine!.toLowerCase())
      );
    }

    if (filters.customer) {
      results = results.filter((job) =>
        job.customer.toLowerCase().includes(filters.customer!.toLowerCase())
      );
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (job) =>
          job.id.toLowerCase().includes(q) ||
          job.productName.toLowerCase().includes(q) ||
          job.customer.toLowerCase().includes(q) ||
          job.assignedMachine.toLowerCase().includes(q) ||
          (job.notes && job.notes.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Retrieve a single job by its unique Job ID.
   */
  async getJobById(id: string): Promise<Job | null> {
    const job = MOCK_JOBS.find((j) => j.id === id);
    return job ? { ...job } : null;
  },

  /**
   * Get calculated summary KPIs across the jobs dataset.
   * Based on the reference production date context (2026-09-18).
   */
  async getSummaryMetrics(): Promise<JobSummaryMetrics> {
    const referenceToday = "2026-09-18";
    const referenceTomorrow = "2026-09-19";

    const totalJobs = MOCK_JOBS.length;
    let pendingCount = 0;
    let inProgressCount = 0;
    let delayedCount = 0;
    let completedCount = 0;
    let dueTodayCount = 0;
    let dueTomorrowCount = 0;

    for (const job of MOCK_JOBS) {
      if (job.status === "Pending") pendingCount++;
      if (job.status === "In Progress") inProgressCount++;
      if (job.status === "Delayed") delayedCount++;
      if (job.status === "Completed") completedCount++;

      if (job.status !== "Completed") {
        if (job.dueDate === referenceToday) dueTodayCount++;
        if (job.dueDate === referenceTomorrow) dueTomorrowCount++;
      }
    }

    return {
      totalJobs,
      pendingCount,
      inProgressCount,
      delayedCount,
      completedCount,
      dueTodayCount,
      dueTomorrowCount,
    };
  },

  /**
   * Retrieve distinct lists of machines and customers for filter dropdowns.
   */
  async getFilterOptions(): Promise<{ machines: string[]; customers: string[]; statuses: JobStatus[] }> {
    const machines = Array.from(new Set(MOCK_JOBS.map((j) => j.assignedMachine))).sort();
    const customers = Array.from(new Set(MOCK_JOBS.map((j) => j.customer))).sort();
    const statuses: JobStatus[] = ["Pending", "In Progress", "Delayed", "Completed"];

    return {
      machines,
      customers,
      statuses,
    };
  },
};
