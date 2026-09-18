export type OperationalStatus = "operational" | "degraded" | "down" | "maintenance" | "idle";

export type PriorityLevel = "low" | "medium" | "high" | "urgent";

export type WorkOrderStatus = "scheduled" | "in_progress" | "completed" | "on_hold";

export type IncidentCategory =
  | "mechanical"
  | "electrical"
  | "material_shortage"
  | "tooling"
  | "quality"
  | "safety";

export type IncidentSeverity = "info" | "warning" | "critical";

export interface ProductionStation {
  id: string;
  code: string;
  name: string;
  line: string;
  status: OperationalStatus;
  operator?: string;
  currentWorkOrderId?: string;
  targetPerHour: number;
  actualPerHour: number;
  temperatureCelsius?: number;
  uptimePercentage: number;
  lastUpdated: string;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  partNumber: string;
  description: string;
  assignedLine: string;
  assignedStationId?: string;
  targetQuantity: number;
  completedQuantity: number;
  scrapQuantity: number;
  status: WorkOrderStatus;
  priority: PriorityLevel;
  startDate: string;
  dueDate: string;
}

export interface DowntimeIncident {
  id: string;
  stationId: string;
  stationName: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  startedAt: string;
  resolvedAt?: string;
  durationMinutes?: number;
  description: string;
  reportedBy: string;
  isResolved: boolean;
}

export interface ShiftInfo {
  id: string;
  shiftName: string;
  shiftCode: "SHIFT-A" | "SHIFT-B" | "SHIFT-C";
  supervisor: string;
  startTime: string;
  endTime: string;
  operatorsCount: number;
}

export interface ProductionKPIs {
  overallOEE: number;
  availability: number;
  performance: number;
  qualityRate: number;
  totalUnitsProduced: number;
  targetUnits: number;
  activeLinesCount: number;
  totalLinesCount: number;
  unresolvedIncidentsCount: number;
}
