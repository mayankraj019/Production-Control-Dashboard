import React from "react";
import { JobService } from "@/services/job-service";
import { ProductionDashboard } from "@/components/dashboard/production-dashboard";

export default async function HomePage() {
  const jobs = await JobService.getJobs();

  return (
    <main className="flex-1 p-3 sm:p-6 max-w-7xl mx-auto w-full overflow-x-hidden">
      <ProductionDashboard initialJobs={jobs} />
    </main>
  );
}
