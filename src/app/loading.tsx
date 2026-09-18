import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="flex-1 p-3 sm:p-6 max-w-7xl mx-auto w-full space-y-5 animate-pulse">
      {/* Skeleton Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
            <CardContent className="p-3 sm:p-4 space-y-2">
              <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              <div className="h-7 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              <div className="h-3 w-28 bg-zinc-100 dark:bg-zinc-850 rounded-sm" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skeleton Work Orders Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
          <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-850 rounded-sm hidden sm:block" />
        </div>

        {/* Skeleton Controls Bar */}
        <div className="h-14 sm:h-12 w-full bg-zinc-100 dark:bg-zinc-900/60 rounded-sm border border-zinc-200 dark:border-zinc-800" />

        {/* Skeleton Table */}
        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
          <div className="h-10 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800" />
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="h-11 px-4 flex items-center justify-between gap-4">
                <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                <div className="h-3.5 w-44 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                <div className="h-3.5 w-28 bg-zinc-100 dark:bg-zinc-850 rounded-sm hidden md:block" />
                <div className="h-3.5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-sm ml-auto" />
                <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
