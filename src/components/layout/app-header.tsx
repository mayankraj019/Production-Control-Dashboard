import React from "react";

export function AppHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Product Name & Short Contextual Description */}
        <div className="flex items-baseline space-x-3">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Production Control
          </span>
          <span className="hidden sm:inline-block text-xs text-zinc-500 dark:text-zinc-400">
            Plant Operations & Work Order Tracking
          </span>
        </div>
      </div>
    </header>
  );
}
