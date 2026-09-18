"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-center min-h-[50vh]">
      <div className="w-full max-w-md rounded-sm border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950 shadow-none">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
          <AlertCircle className="h-5 w-5" />
        </div>

        <h2 className="mt-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Something went wrong
        </h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Please try again.
        </p>

        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => reset()}
            className="h-8 text-xs font-mono gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try again</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
