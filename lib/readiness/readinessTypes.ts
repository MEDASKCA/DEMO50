// Theatre Readiness System Types

export type ReadinessStatus = 'ready' | 'not-ready' | 'in-progress' | 'blocked';
export type CheckStatus = 'pending' | 'completed' | 'failed' | 'n/a';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

// Individual Check Item
export interface CheckItem {
  id: string;
  name: string;
  description?: string;
  status: CheckStatus;
  checkedBy?: string;
  checkedAt?: string; // ISO timestamp
  notes?: string;
  required: boolean; // If true, must be completed for readiness
}

// Staff Readiness
export interface StaffReadiness {
  consultantSurgeon?: {
    name: string;
    present: boolean;
    checkedIn?: string; // ISO timestamp
  };
  assistingSurgeon?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  consultantAnaesthetist?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  assistingAnaesthetist?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  scrubNurse?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  circulating?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  odp?: {
    name: string;
    present: boolean;
    checkedIn?: string;
  };
  additionalStaff: Array<{
    role: string;
    name: string;
    present: boolean;
    checkedIn?: string;
  }>;
}

// Inventory & Supplies Readiness
export interface InventoryReadiness {
  criticalSuppliesVerified: CheckItem;
  procedureSpecificEquipment: CheckItem;
  sterilePacks: CheckItem;
  medications: CheckItem;
  implants?: CheckItem; // For orthopedics, cardiac, etc.
  bloodProducts?: CheckItem; // If required for procedure
  lowStockAlerts: Array<{
    itemId: string;
    itemName: string;
    currentStock: number;
    minimumRequired: number;
  }>;
}

// Equipment Status
export interface EquipmentReadiness {
  anaestheticMachine: CheckItem;
  ventilator: CheckItem;
  monitoringEquipment: CheckItem;
  surgicalLights: CheckItem;
  operatingTable: CheckItem;
  diathermy: CheckItem;
  suction: CheckItem;
  imagingEquipment?: CheckItem; // C-arm, X-ray, etc.
  emergencyEquipment: CheckItem; // Crash cart, defibrillator
  specializedEquipment: CheckItem[]; // Procedure-specific
}

// Room Setup & Safety
export interface RoomSetupReadiness {
  theatreCleaned: CheckItem;
  environmentalControls: CheckItem; // Temp, humidity, air pressure
  whoSafetyChecklist: CheckItem;
  fireExtinguisher: CheckItem;
  emergencyExits: CheckItem;
  communicationSystems: CheckItem;
  documentationReady: CheckItem;
}

// Session Information
export interface SessionInfo {
  sessionId: string;
  theatreId: string;
  theatreName: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  sessionType: string; // 'day', 'long-day', 'am', 'pm', etc.
  specialty: string;
  expectedCases?: number;
}

// Blocking Issue
export interface BlockingIssue {
  id: string;
  category: 'staff' | 'inventory' | 'equipment' | 'safety' | 'other';
  priority: Priority;
  description: string;
  impact: string; // What this blocks
  reportedBy: string;
  reportedAt: string; // ISO timestamp
  resolvedBy?: string;
  resolvedAt?: string;
  status: 'open' | 'in-progress' | 'resolved';
  notes?: string;
}

// Daily Handover
export interface DailyHandover {
  id: string;
  theatreId: string;
  date: string; // YYYY-MM-DD
  shift: 'day' | 'night';
  conductedBy: string;
  conductedAt?: string; // ISO timestamp
  attendees: string[];
  briefingPoints: string[];
  specialConsiderations: string[];
  complexCases: Array<{
    caseNumber: string;
    specialty: string;
    concerns: string;
  }>;
  equipmentIssues?: string[];
  completed: boolean;
}

// Complete Theatre Readiness
export interface TheatreReadiness {
  id: string;
  sessionInfo: SessionInfo;
  overallStatus: ReadinessStatus;
  lastUpdated: string; // ISO timestamp

  // Readiness Components
  staffReadiness: {
    status: ReadinessStatus;
    details: StaffReadiness;
    missingRoles: string[];
  };

  inventoryReadiness: {
    status: ReadinessStatus;
    details: InventoryReadiness;
    criticalShortages: string[];
  };

  equipmentReadiness: {
    status: ReadinessStatus;
    details: EquipmentReadiness;
    failedChecks: string[];
  };

  roomSetupReadiness: {
    status: ReadinessStatus;
    details: RoomSetupReadiness;
    pendingTasks: string[];
  };

  blockingIssues: BlockingIssue[];
  handover?: DailyHandover;

  // Sign-off
  readinessSignedOff: boolean;
  signedOffBy?: string;
  signedOffAt?: string; // ISO timestamp
  comments?: string;
}

// Readiness Statistics (for dashboard overview)
export interface ReadinessStats {
  totalTheatres: number;
  ready: number;
  notReady: number;
  inProgress: number;
  blocked: number;
  criticalIssues: number;
  lastRefreshed: string; // ISO timestamp
}

// Audit Trail Entry
export interface ReadinessAuditEntry {
  id: string;
  theatreId: string;
  date: string; // YYYY-MM-DD
  action: string;
  performedBy: string;
  performedAt: string; // ISO timestamp
  details: any;
}
