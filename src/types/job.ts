export type JobStatus = "Pending" | "In Progress" | "Delayed" | "Completed";

export interface Job {
  id: string;
  productName: string;
  customer: string;
  quantity: number;
  dueDate: string; // ISO format: YYYY-MM-DD
  status: JobStatus;
  assignedMachine: string;
  notes?: string | null;
}

export interface JobFilterParams {
  status?: JobStatus | "All";
  assignedMachine?: string;
  customer?: string;
  searchQuery?: string;
}

export interface JobSummaryMetrics {
  totalJobs: number;
  pendingCount: number;
  inProgressCount: number;
  delayedCount: number;
  completedCount: number;
  dueTodayCount: number;
  dueTomorrowCount: number;
}
