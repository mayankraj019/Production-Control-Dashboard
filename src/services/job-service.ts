import { MOCK_JOBS } from "@/data/mock-jobs";
import { Job, JobFilterParams } from "@/types/job";

export const JobService = {
  async getJobs(filters?: JobFilterParams): Promise<Job[]> {
    let results = [...MOCK_JOBS];

    if (!filters) return results;

    if (filters.status && filters.status !== "All") {
      results = results.filter((job) => job.status === filters.status);
    }

    if (filters.assignedMachine) {
      const machine = filters.assignedMachine.toLowerCase();
      results = results.filter((job) =>
        job.assignedMachine.toLowerCase().includes(machine)
      );
    }

    if (filters.customer) {
      const customer = filters.customer.toLowerCase();
      results = results.filter((job) =>
        job.customer.toLowerCase().includes(customer)
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

  async getJobById(id: string): Promise<Job | null> {
    const job = MOCK_JOBS.find((j) => j.id === id);
    return job ? { ...job } : null;
  },
};
