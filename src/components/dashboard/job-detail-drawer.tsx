"use client";

import React, { useEffect, useState } from "react";
import { Job, JobStatus } from "@/types/job";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Check,
  Building,
  Calendar,
  Cpu,
  Hash,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface JobDetailDrawerProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (jobId: string, newStatus: JobStatus) => void;
}

const ALL_STATUSES: JobStatus[] = ["Pending", "In Progress", "Delayed", "Completed"];

function DrawerContent({
  job,
  onClose,
  onUpdateStatus,
}: {
  job: Job;
  onClose: () => void;
  onUpdateStatus: (jobId: string, newStatus: JobStatus) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<JobStatus>(job.status);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const hasStatusChanged = selectedStatus !== job.status;

  const handleApplyStatusUpdate = () => {
    if (!selectedStatus || selectedStatus === job.status) return;

    onUpdateStatus(job.id, selectedStatus);
    setFeedbackMessage(`Status updated to ${selectedStatus}`);
  };

  useEffect(() => {
    if (!feedbackMessage) return;

    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const isDelayed = job.status === "Delayed";
  const hasIssues = Boolean(job.notes && job.notes.trim().length > 0);

  return (
    <div className="w-full sm:w-[480px] md:w-[520px] max-w-full border-l border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col h-full max-h-screen">
      {/* 1. Drawer Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span
            id="slide-over-title"
            className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 shrink-0"
          >
            {job.id}
          </span>
          <StatusBadge status={job.status} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9 sm:h-8 sm:w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Close detail panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-b border-emerald-200 dark:border-emerald-900/50 shrink-0">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Drawer Body - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs">
        {/* Section 1: Status Update Control */}
        <section className="rounded-sm border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Update Status
            </span>
            <span className="text-[11px] text-zinc-500">
              Current: <strong className="text-zinc-800 dark:text-zinc-200">{job.status}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as JobStatus)}
              aria-label="Select new status"
              className="h-9 sm:h-8 flex-1 rounded-sm border border-zinc-200 bg-white px-2.5 font-mono text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:ring-zinc-600"
            >
              {ALL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <Button
              size="sm"
              onClick={handleApplyStatusUpdate}
              disabled={!hasStatusChanged}
              className="h-9 sm:h-8 text-xs font-medium"
            >
              Update Status
            </Button>
          </div>
        </section>

        {/* Section 2: Core Work Order Specifications */}
        <section className="space-y-2.5">
          <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Order Specifications
          </h4>
          <div className="grid grid-cols-1 gap-2.5 rounded-sm border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
              <span className="text-zinc-500 dark:text-zinc-400 shrink-0">Product Name</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100 sm:text-right break-words">
                {job.productName}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 shrink-0">
                <Building className="h-3.5 w-3.5 text-zinc-400" />
                Customer
              </span>
              <span className="text-right font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {job.customer}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 shrink-0">
                <Hash className="h-3.5 w-3.5 text-zinc-400" />
                Batch Quantity
              </span>
              <span className="text-right font-mono font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
                {job.quantity.toLocaleString()} units
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 shrink-0">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                Due Date
              </span>
              <span className="text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">
                {job.dueDate}
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Machine & Routing Information */}
        <section className="space-y-2.5">
          <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Machine Floor Allocation
          </h4>
          <div className="rounded-sm border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-zinc-400" />
              <span className="text-zinc-500 dark:text-zinc-400">Assigned Unit</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-900 dark:text-zinc-100 font-medium break-all sm:break-normal">
              {job.assignedMachine}
            </span>
          </div>
        </section>

        {/* Section 4: Operational Notes & Issues */}
        <section className="space-y-2.5">
          <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Notes & Operational Issues
          </h4>

          {hasIssues ? (
            <div
              className={`rounded-sm border p-3.5 ${
                isDelayed
                  ? "border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
                  : "border-zinc-200 bg-zinc-50/60 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200"
              }`}
            >
              <div className="flex items-start gap-2">
                {isDelayed ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                ) : (
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                )}
                <p className="leading-relaxed">{job.notes}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-zinc-200 bg-zinc-50/50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
              <CheckCircle2 className="mx-auto h-4 w-4 text-zinc-400" />
              <h5 className="mt-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                No issues reported
              </h5>
              <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                This job currently has no recorded issues.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Drawer Footer */}
      <div className="border-t border-zinc-200 p-3 sm:p-4 dark:border-zinc-800 flex justify-end shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="h-9 sm:h-8 w-full sm:w-auto text-xs font-mono"
        >
          Close Panel
        </Button>
      </div>
    </div>
  );
}

export const JobDetailDrawer = React.memo(function JobDetailDrawer({
  job,
  isOpen,
  onClose,
  onUpdateStatus,
}: JobDetailDrawerProps) {
  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !job) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <DrawerContent
          key={job.id}
          job={job}
          onClose={onClose}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </div>
  );
});
