"use client";

import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import * as XLSX from "xlsx";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, initFirebaseClient, storage } from "../lib/firebase";
import styles from "./page.module.css";

type ThemeKey = "light" | "dark";
type RoleKey = "RN" | "ODP" | "HCA" | "Recovery" | "Ward";
type CapacityState = "Bookable" | "Review" | "Constrained";
type SessionKey = "AM" | "PM";
type AppointmentType = "F2F" | "POA" | "Follow up";
type ViewKey = "board" | "lists" | "specialties" | "procedures" | "blueprint";
type StatusKey = "Pending" | "Confirmed" | "Blocked";
type BoardPageKey = "day-surgery" | "outpatient" | "ward" | "theatres" | "recovery" | "outpatients";
type RotaTabKey = "pool" | "assignment";
type BoardLayoutKey = "board" | "list";

type SpecialtyRequirement = {
  role: RoleKey;
  minimum: number;
  pointsPerPerson: number;
  hardStop: boolean;
};

type Specialty = {
  id: string;
  name: string;
  listLabel: string;
  difficulty: "Low" | "Medium" | "High";
  targetPoints: number;
  turnaroundMinutes: number;
  recoveryRequired: boolean;
  wardRequired: boolean;
  requirements: SpecialtyRequirement[];
};

type Procedure = {
  id: string;
  specialtyId: string;
  name: string;
  difficulty: "Low" | "Medium" | "High";
  estimatedMinutes: number;
  arrivalLeadMinutes: number;
};

type Resource = {
  id: string;
  label: string;
  shortLabel: string;
  type: "Theatre" | "Room" | "Clinic";
  sessionLengthMinutes: number;
};

type StaffBoardColumn = {
  id: string;
  label: string;
  shortLabel: string;
};

type Booking = {
  id: string;
  resourceId: string;
  date: string;
  session: SessionKey;
  consultant: string;
  specialtyId: string;
  appointmentType: AppointmentType;
  procedureIds: string[];
  patientCount: number;
  nhsCount: number;
  ppCount: number;
  turnaroundMinutes?: number;
  timeLabel: string;
  notes: string;
  status: StatusKey;
};

type StaffAssignment = {
  id: string;
  resourceId: string;
  date: string;
  session: SessionKey;
  lead: string;
  team: Array<{ role: string; name: string }>;
};

type SessionCoverage = {
  rn: number;
  odp: number;
  hca: number;
  recovery: number;
  ward: number;
};

type SpecialtyFormState = {
  name: string;
  listLabel: string;
  difficulty: Specialty["difficulty"];
  targetPoints: string;
  turnaroundMinutes: string;
  recoveryRequired: boolean;
  wardRequired: boolean;
  rn: string;
  rnPoints: string;
  odp: string;
  odpPoints: string;
  hca: string;
  hcaPoints: string;
};

type Consultant = {
  id: string;
  name: string;
  lastName: string;
  firstName: string;
  specialtyId: string;
  procedures: string[];
  rnRequired: number;
  odpRequired: number;
  hcaRequired: number;
  focus?: string;
};

type ConsultantFormState = {
  lastName: string;
  firstName: string;
  specialtyId: string;
  procedures: string[];
  rnRequired: string;
  odpRequired: string;
  hcaRequired: string;
};

type ConsultantEditState = {
  id: string;
  lastName: string;
  firstName: string;
  specialtyId: string;
  procedures: string[];
  rnRequired: string;
  odpRequired: string;
  hcaRequired: string;
};

type ProcedureFormState = {
  specialtyId: string;
  name: string;
  difficulty: Procedure["difficulty"];
  estimatedMinutes: string;
  arrivalLeadMinutes: string;
};

type BookingDraft = {
  id?: string;
  date: string;
  resourceId: string;
  session: SessionKey;
  specialtyId: string;
  appointmentType: AppointmentType;
  consultant: string;
  procedureIds: string[];
  nhsCount: string;
  ppCount: string;
  turnaroundTime: string;
  timeLabel: string;
  notes: string;
  status: StatusKey;
};

type RotaPoolRow = {
  id: string;
  date: string;
  unit: string;
  shift: string;
  shiftTime: string;
  classification: string;
  name: string;
  fulfilment: string;
};

type RotaImportMeta = {
  source: string;
  startDate: string;
  endDate: string;
  unit: string;
  fulfilment: string;
  uploadedAt?: string;
  storagePath?: string;
  downloadUrl?: string;
};

type RotaImportRecord = {
  id: string;
  meta: RotaImportMeta;
  rows: RotaPoolRow[];
};

type ConfirmDialogState = {
  message: string;
  confirmLabel?: string;
};

type StatusMenuState = {
  bookingId: string;
  x: number;
  y: number;
};

type NoteComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  likes: number;
};

const resources: Resource[] = [
  { id: "t1", label: "Theatre 1", shortLabel: "T1", type: "Theatre", sessionLengthMinutes: 300 },
  { id: "t2", label: "Theatre 2", shortLabel: "T2", type: "Theatre", sessionLengthMinutes: 300 },
  { id: "r1", label: "Room 1", shortLabel: "R1", type: "Room", sessionLengthMinutes: 240 },
  { id: "clinic-1", label: "Clinic 1", shortLabel: "C1", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-2", label: "Clinic 2", shortLabel: "C2", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-3", label: "Clinic 3", shortLabel: "C3", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-4", label: "Clinic 4", shortLabel: "C4", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-5", label: "Clinic 5", shortLabel: "C5", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-6", label: "Clinic 6", shortLabel: "C6", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-7", label: "Clinic 7", shortLabel: "C7", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-8", label: "Clinic 8", shortLabel: "C8", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-9", label: "Clinic 9", shortLabel: "C9", type: "Clinic", sessionLengthMinutes: 240 },
  { id: "clinic-10", label: "Clinic 10", shortLabel: "C10", type: "Clinic", sessionLengthMinutes: 240 },
];

const theatreResources = resources.filter((resource) => resource.id === "t1" || resource.id === "t2" || resource.id === "r1");

const sessions: SessionKey[] = ["AM", "PM"];

const rosterCoverage: Record<string, SessionCoverage> = {
  "2026-05-25-AM": { rn: 4, odp: 2, hca: 2, recovery: 3, ward: 5 },
  "2026-05-25-PM": { rn: 4, odp: 2, hca: 2, recovery: 2, ward: 4 },
  "2026-05-26-AM": { rn: 3, odp: 2, hca: 2, recovery: 2, ward: 4 },
  "2026-05-26-PM": { rn: 3, odp: 1, hca: 1, recovery: 2, ward: 4 },
  "2026-05-27-AM": { rn: 5, odp: 2, hca: 3, recovery: 3, ward: 5 },
  "2026-05-27-PM": { rn: 4, odp: 2, hca: 2, recovery: 3, ward: 5 },
  "2026-05-28-AM": { rn: 4, odp: 1, hca: 2, recovery: 2, ward: 3 },
  "2026-05-28-PM": { rn: 4, odp: 2, hca: 2, recovery: 2, ward: 3 },
  "2026-05-29-AM": { rn: 3, odp: 1, hca: 2, recovery: 1, ward: 3 },
  "2026-05-29-PM": { rn: 3, odp: 1, hca: 1, recovery: 1, ward: 2 },
};

const initialSpecialties: Specialty[] = [
  {
    id: "pain",
    name: "Pain Management",
    listLabel: "Pain Management",
    difficulty: "Medium",
    targetPoints: 8,
    turnaroundMinutes: 20,
    recoveryRequired: true,
    wardRequired: false,
    requirements: [
      { role: "RN", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "ODP", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "HCA", minimum: 1, pointsPerPerson: 2, hardStop: false },
    ],
  },
  {
    id: "general",
    name: "General Surgery",
    listLabel: "General Surgery",
    difficulty: "High",
    targetPoints: 12,
    turnaroundMinutes: 25,
    recoveryRequired: true,
    wardRequired: true,
    requirements: [
      { role: "RN", minimum: 2, pointsPerPerson: 3, hardStop: true },
      { role: "ODP", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "HCA", minimum: 1, pointsPerPerson: 2, hardStop: false },
      { role: "Recovery", minimum: 1, pointsPerPerson: 2, hardStop: false },
      { role: "Ward", minimum: 2, pointsPerPerson: 1, hardStop: false },
    ],
  },
  {
    id: "endoscopy",
    name: "Endoscopy",
    listLabel: "Endoscopy",
    difficulty: "Medium",
    targetPoints: 9,
    turnaroundMinutes: 15,
    recoveryRequired: true,
    wardRequired: false,
    requirements: [
      { role: "RN", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "ODP", minimum: 1, pointsPerPerson: 3, hardStop: false },
      { role: "HCA", minimum: 1, pointsPerPerson: 2, hardStop: false },
      { role: "Recovery", minimum: 1, pointsPerPerson: 2, hardStop: false },
    ],
  },
  {
    id: "gynae",
    name: "Gynaecology",
    listLabel: "Gynaecology",
    difficulty: "Medium",
    targetPoints: 10,
    turnaroundMinutes: 20,
    recoveryRequired: true,
    wardRequired: false,
    requirements: [
      { role: "RN", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "ODP", minimum: 1, pointsPerPerson: 3, hardStop: true },
      { role: "HCA", minimum: 1, pointsPerPerson: 2, hardStop: false },
      { role: "Recovery", minimum: 1, pointsPerPerson: 2, hardStop: false },
    ],
  },
];

const initialProcedures: Procedure[] = [];

const initialConsultants: Consultant[] = [];

const initialBookings: Booking[] = [];

const staffAssignments: StaffAssignment[] = [];

const defaultSpecialtyForm: SpecialtyFormState = {
  name: "",
  listLabel: "",
  difficulty: "Medium",
  targetPoints: "8",
  turnaroundMinutes: "20",
  recoveryRequired: true,
  wardRequired: false,
  rn: "1",
  rnPoints: "3",
  odp: "1",
  odpPoints: "3",
  hca: "1",
  hcaPoints: "2",
};

const defaultConsultantForm = (specialtyId: string): ConsultantFormState => ({
  lastName: "",
  firstName: "",
  specialtyId,
  procedures: [],
  rnRequired: "1",
  odpRequired: "1",
  hcaRequired: "1",
});

const navItems: Array<{ key: ViewKey; label: string; short: string }> = [
  { key: "board", label: "Sessions", short: "Sessions" },
  { key: "specialties", label: "Registry", short: "Registry" },
  { key: "procedures", label: "Notes", short: "Notes" },
  { key: "blueprint", label: "Rota", short: "Rota" },
];

const sessionBoardPages: Array<{ key: BoardPageKey; label: string }> = [
  { key: "day-surgery", label: "Day Surgery" },
  { key: "outpatient", label: "Outpatient" },
];

const staffBoardPages: Array<{ key: BoardPageKey; label: string }> = [
  { key: "ward", label: "Ward" },
  { key: "theatres", label: "Theatres" },
  { key: "recovery", label: "Recovery" },
  { key: "outpatients", label: "Outpatients" },
];

const staffBoardConfigs: Record<"ward" | "theatres" | "recovery" | "outpatients", { columns: StaffBoardColumn[]; splitBySession: boolean }> = {
  ward: {
    splitBySession: false,
    columns: [
      { id: "ward-a", label: "Ward A", shortLabel: "WA" },
      { id: "ward-b", label: "Ward B", shortLabel: "WB" },
      { id: "ward-c", label: "Ward C", shortLabel: "WC" },
    ],
  },
  theatres: {
    splitBySession: true,
    columns: theatreResources.map((resource) => ({ id: resource.id, label: resource.label, shortLabel: resource.shortLabel })),
  },
  recovery: {
    splitBySession: false,
    columns: [{ id: "recovery", label: "Recovery", shortLabel: "REC" }],
  },
  outpatients: {
    splitBySession: false,
    columns: [
      { id: "clinics", label: "Clinics", shortLabel: "CLN" },
      { id: "poa", label: "POA", shortLabel: "POA" },
    ],
  },
};

const outpatientBoardColumns: StaffBoardColumn[] = [
  { id: "clinic-1", label: "Clinic 1", shortLabel: "C1" },
  { id: "clinic-2", label: "Clinic 2", shortLabel: "C2" },
  { id: "clinic-3", label: "Clinic 3", shortLabel: "C3" },
  { id: "clinic-4", label: "Clinic 4", shortLabel: "C4" },
  { id: "clinic-5", label: "Clinic 5", shortLabel: "C5" },
  { id: "clinic-6", label: "Clinic 6", shortLabel: "C6" },
  { id: "clinic-7", label: "Clinic 7", shortLabel: "C7" },
  { id: "clinic-8", label: "Clinic 8", shortLabel: "C8" },
  { id: "clinic-9", label: "Clinic 9", shortLabel: "C9" },
  { id: "clinic-10", label: "Clinic 10", shortLabel: "C10" },
];

const rotaTabs: Array<{ key: RotaTabKey; label: string }> = [
  { key: "pool", label: "Pool" },
  { key: "assignment", label: "Assignment" },
];

const importedRotaPool: RotaPoolRow[] = [];

const ROTA_IMPORTS_STORAGE_KEY = "capacity-planner-rota-imports";
const DEV_MODE_STORAGE_KEY = "capacity-planner-dev-mode";

function sortRotaImports(records: RotaImportRecord[]) {
  return [...records].sort((left, right) => {
    const leftTime = left.meta.uploadedAt ? Date.parse(left.meta.uploadedAt) : 0;
    const rightTime = right.meta.uploadedAt ? Date.parse(right.meta.uploadedAt) : 0;
    return rightTime - leftTime;
  });
}

function readStoredRotaImports() {
  if (typeof window === "undefined") return [] as RotaImportRecord[];

  try {
    const raw = window.localStorage.getItem(ROTA_IMPORTS_STORAGE_KEY);
    if (!raw) return [] as RotaImportRecord[];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [] as RotaImportRecord[];

    return parsed.filter(
      (entry): entry is RotaImportRecord =>
        Boolean(
          entry &&
            typeof entry === "object" &&
            "id" in entry &&
            "meta" in entry &&
            "rows" in entry &&
            Array.isArray((entry as RotaImportRecord).rows),
        ),
    );
  } catch {
    return [] as RotaImportRecord[];
  }
}

function writeStoredRotaImports(records: RotaImportRecord[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ROTA_IMPORTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore local persistence failures and keep the in-memory import active.
  }
}

function readStoredDevMode() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(DEV_MODE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeStoredDevMode(enabled: boolean) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(DEV_MODE_STORAGE_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore local persistence failures for dev mode.
  }
}

const defaultRotaImportMeta: RotaImportMeta = {
  source: "Daily Staffing Report - Landscape (1).xlsx",
  startDate: "Monday 01 June 2026",
  endDate: "Tuesday 30 June 2026",
  unit: "HW Day Surgery",
  fulfilment: "Substantive, Bank, Agency",
  uploadedAt: "",
};

const appointmentTypes: AppointmentType[] = ["F2F", "POA", "Follow up"];

function isoToLabel(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

function startOfWeekIso(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return toIsoDate(date);
}

function dateShort(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(new Date(`${date}T00:00:00`));
}

function weekdayShort(date: string) {
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(new Date(`${date}T00:00:00`)).toUpperCase();
  if (weekday.startsWith("TH")) return "TH";
  return weekday.charAt(0);
}

function monthLabel(date: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "short" }).format(new Date(`${date}T00:00:00`)).toUpperCase();
}

function yearLabel(date: string) {
  return new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function monthDates(date: string) {
  const base = new Date(`${date}T00:00:00`);
  const year = base.getFullYear();
  const month = base.getMonth();
  const cursor = new Date(year, month, 1);
  const dates: string[] = [];

  while (cursor.getMonth() === month) {
    dates.push(toIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function parseSearchTerms(input: string) {
  const matches = Array.from(input.matchAll(/"([^"]+)"|(\S+)/g));
  return matches
    .map((match) => (match[1] ?? match[2] ?? "").trim().toLowerCase())
    .filter(Boolean);
}

function normalizeSheetCell(value: unknown) {
  if (value == null) return "";
  return String(value).replace(/\s+/g, " ").trim();
}

function parseReportDateLabel(input: string) {
  const match = input.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return "";
  const [, day, monthName, year] = match;
  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  const month = monthMap[monthName.toLowerCase()];
  if (!month) return "";
  return `${year}-${month}-${String(Number(day)).padStart(2, "0")}`;
}

function longLabelFromIso(isoDate: string) {
  if (!isoDate) return "";
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(
    new Date(`${isoDate}T00:00:00`),
  );
}

function dateTimeLabel(input: string) {
  if (!input) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(input));
}

function inferRotaFulfilment(classification: string, existingFulfilment = "") {
  const current = existingFulfilment.replace(/\s+/g, " ").trim();
  if (current && !current.includes(",")) return current;

  const normalized = classification.replace(/\s+/g, " ").trim().toUpperCase();
  if (!normalized) return current || "Not specified";
  if (/\bSP\b/.test(normalized)) return "Bank";
  if (/^BAND\s+.+\b(RN|ODP|HCA)\b/.test(normalized)) return "Substantive";
  if (/\b(RN|ODP|HCA)\b/.test(normalized) && !normalized.startsWith("BAND")) return "Bank";
  return current && !current.includes(",") ? current : "Not specified";
}

function normalizeRotaRows(rows: RotaPoolRow[]) {
  return rows.map((row) => ({
    ...row,
    fulfilment: inferRotaFulfilment(row.classification, row.fulfilment),
  }));
}

function normalizeRotaImportRecord(record: RotaImportRecord): RotaImportRecord {
  return {
    ...record,
    rows: normalizeRotaRows(record.rows),
  };
}

function buildRotaImportFromWorkbook(buffer: ArrayBuffer, source: string): { rows: RotaPoolRow[]; meta: RotaImportMeta } {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames.includes("DailyStaffing") ? "DailyStaffing" : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const matrix = (XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: "" }) as unknown[][]).map((row) =>
    row.map(normalizeSheetCell),
  );

  const findLabelValue = (label: string) => {
    for (const row of matrix) {
      const index = row.findIndex((cell) => cell.toLowerCase() === label.toLowerCase());
      if (index >= 0) return row[index + 1] ?? "";
      const joined = row.join(" ");
      const inlineMatch = joined.match(new RegExp(`${label}\\s*:?[\\s]+(.+)$`, "i"));
      if (inlineMatch) return inlineMatch[1].trim();
    }
    return "";
  };

  const startDateRaw = findLabelValue("Start Date") || findLabelValue("Start Date:");
  const endDateRaw = findLabelValue("End Date") || findLabelValue("End Date:");
  const unitRaw = findLabelValue("Unit") || findLabelValue("Unit:");
  const fulfilmentRaw = findLabelValue("Fulfilment Type") || findLabelValue("Fulfilment") || findLabelValue("Fulfilment Type:");
  const normalizedSummaryFulfilment = fulfilmentRaw.replace(/\s+/g, " ").trim();

  let currentDate = "";
  let currentUnit = unitRaw || "Unknown unit";
  let currentFulfilment = "";
  let headerIndexes: { shift?: number; shiftTime?: number; classification?: number; name?: number; fulfilment?: number } | null = null;
  const parsedRows: RotaPoolRow[] = [];

  matrix.forEach((row, rowIndex) => {
    const joined = row.join(" ").trim();
    if (!joined) return;

    if (/day and date/i.test(joined)) {
      currentDate = parseReportDateLabel(joined);
      headerIndexes = null;
      return;
    }

    if (/^unit[:\s]/i.test(joined)) {
      const nextUnit = joined.replace(/^unit[:\s]*/i, "").trim();
      if (nextUnit) currentUnit = nextUnit;
      return;
    }

    if (/^(substantive|bank|agency)$/i.test(joined)) {
      currentFulfilment = joined.replace(/\s+/g, " ").trim();
      return;
    }

    const lowered = row.map((cell) => cell.toLowerCase());
    if (lowered.includes("shift time") && lowered.includes("classification") && lowered.includes("name")) {
      headerIndexes = {
        shift: lowered.indexOf("shift"),
        shiftTime: lowered.indexOf("shift time"),
        classification: lowered.indexOf("classification"),
        name: lowered.indexOf("name"),
        fulfilment: lowered.findIndex((cell) => cell.includes("fulfilment")),
      };
      return;
    }

    if (!currentDate || !headerIndexes || headerIndexes.shiftTime == null || headerIndexes.classification == null || headerIndexes.name == null) return;

    const shift = row[headerIndexes.shift ?? -1] ?? "";
    const shiftTime = row[headerIndexes.shiftTime] ?? "";
    const classification = row[headerIndexes.classification] ?? "";
    const name = row[headerIndexes.name] ?? "";
    const fulfilment = headerIndexes.fulfilment != null && headerIndexes.fulfilment >= 0 ? row[headerIndexes.fulfilment] ?? "" : "";

    const looksLikeStaffRow =
      Boolean(currentDate) &&
      Boolean(name) &&
      Boolean(classification) &&
      /\d{2}:\d{2}/.test(shiftTime) &&
      !/classification|name|shift time/i.test(joined);

    if (!looksLikeStaffRow) return;

    parsedRows.push({
      id: `rota-${rowIndex}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      date: currentDate,
      unit: currentUnit.split(" - ")[0] || currentUnit,
      shift: shift || "Day",
      shiftTime,
      classification,
      name,
      fulfilment: inferRotaFulfilment(classification, fulfilment || currentFulfilment || normalizedSummaryFulfilment),
    });
  });

  const uniqueFulfilment = Array.from(new Set(parsedRows.map((row) => row.fulfilment).filter(Boolean)));
  const uploadedAt = new Date().toISOString();
  const meta: RotaImportMeta = {
    source,
    startDate: startDateRaw || longLabelFromIso(parsedRows[0]?.date ?? ""),
    endDate: endDateRaw || longLabelFromIso(parsedRows[parsedRows.length - 1]?.date ?? ""),
    unit: (unitRaw || parsedRows[0]?.unit || "Unknown unit").split(" - ")[0],
    fulfilment: uniqueFulfilment.join(", ") || fulfilmentRaw || "Unknown",
    uploadedAt,
  };

  return {
    rows: parsedRows.sort((left, right) => `${left.date}-${left.name}`.localeCompare(`${right.date}-${right.name}`)),
    meta,
  };
}

function minutesToClock(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function getCoverageValue(coverage: SessionCoverage, role: RoleKey) {
  if (role === "RN") return coverage.rn;
  if (role === "ODP") return coverage.odp;
  if (role === "HCA") return coverage.hca;
  if (role === "Recovery") return coverage.recovery;
  return coverage.ward;
}

function slotStartMinutes(session: SessionKey) {
  return session === "AM" ? 8 * 60 : 13 * 60;
}

function getStatusTone(state: CapacityState) {
  if (state === "Bookable") return "Clear";
  if (state === "Review") return "Watch";
  return "Tight";
}

function getBookingFill(status: StatusKey) {
  if (status === "Confirmed") return "confirmed";
  if (status === "Blocked") return "blocked";
  return "pending";
}

function getProcedureSuggestions(input: string, options: string[]) {
  const query = input.trim().toLowerCase();
  if (!query) return [];

  return options
    .filter((option) => option.toLowerCase().includes(query))
    .slice(0, 6);
}

function formatStaffDisplayName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return name;

  if (trimmed.includes(",")) {
    const [lastName, firstName] = trimmed.split(",").map((part) => part.trim());
    if (!lastName || !firstName) return trimmed;
    return `${lastName} ${firstName.charAt(0)}.`;
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return trimmed;

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  return `${lastName} ${firstName.charAt(0)}.`;
}

function clockToMinutes(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function minutesToSession(totalMinutes: number): SessionKey {
  return totalMinutes < 13 * 60 ? "AM" : "PM";
}

function durationStringToMinutes(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes;
}

function minutesToDurationString(totalMinutes: number) {
  const safe = Math.max(0, totalMinutes);
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getProcedureQty(procedureIds: string[], procedureId: string) {
  return procedureIds.filter((id) => id === procedureId).length;
}

function getDraftSnapshot(draft: BookingDraft) {
  return JSON.stringify({
    date: draft.date,
    resourceId: draft.resourceId,
    session: draft.session,
    specialtyId: draft.specialtyId,
    appointmentType: draft.appointmentType,
    consultant: draft.consultant,
    procedureIds: draft.procedureIds,
    nhsCount: draft.nhsCount,
    ppCount: draft.ppCount,
    turnaroundTime: draft.turnaroundTime,
    timeLabel: draft.timeLabel,
    notes: draft.notes,
    status: draft.status,
  });
}

export default function Home() {
  const timeInputRef = useRef<HTMLInputElement | null>(null);
  const turnaroundInputRef = useRef<HTMLInputElement | null>(null);
  const [firestoreAccess, setFirestoreAccess] = useState<"checking" | "granted" | "blocked">("checking");
  const [theme, setTheme] = useState<ThemeKey>("light");
  const [activeView, setActiveView] = useState<ViewKey>("board");
  const [activeBoardPage, setActiveBoardPage] = useState<BoardPageKey>("day-surgery");
  const [boardLayout, setBoardLayout] = useState<BoardLayoutKey>("board");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [staffView, setStaffView] = useState(false);
  const [activeRotaTab, setActiveRotaTab] = useState<RotaTabKey>("pool");
  const [rotaFiltersOpen, setRotaFiltersOpen] = useState(false);
  const [activeRoleFilter, setActiveRoleFilter] = useState("");
  const [activeFulfilmentFilter, setActiveFulfilmentFilter] = useState("");
  const [activeDateFilter, setActiveDateFilter] = useState("");
  const [activeUnitFilter, setActiveUnitFilter] = useState("");
  const [rotaImportMeta, setRotaImportMeta] = useState<RotaImportMeta>(defaultRotaImportMeta);
  const [rotaPoolRows, setRotaPoolRows] = useState<RotaPoolRow[]>(importedRotaPool);
  const [rotaImportHistory, setRotaImportHistory] = useState<RotaImportRecord[]>([]);
  const [rotaArchiveOpen, setRotaArchiveOpen] = useState(false);
  const [weekStart, setWeekStart] = useState("2026-05-25");
  const [listDateFrom, setListDateFrom] = useState("2026-05-25");
  const [listDateTo, setListDateTo] = useState("2026-05-29");
  const [listConsultantFilter, setListConsultantFilter] = useState("");
  const [listSpecialtyFilter, setListSpecialtyFilter] = useState("");
  const [listResourceFilter, setListResourceFilter] = useState("");
  const [staffAssignmentFilter, setStaffAssignmentFilter] = useState("");
  const [todayIso, setTodayIso] = useState(() => toIsoDate(new Date()));
  const [expandedBoardListSections, setExpandedBoardListSections] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [consultants, setConsultants] = useState(initialConsultants);
  const [procedures, setProcedures] = useState(initialProcedures);
  const [bookings, setBookings] = useState(initialBookings);
  useEffect(() => {
    const storedImports = sortRotaImports(readStoredRotaImports().map(normalizeRotaImportRecord));
    if (storedImports.length === 0) return;

    setRotaImportHistory(storedImports);
    setRotaImportMeta(storedImports[0].meta);
    setRotaPoolRows(storedImports[0].rows);
  }, []);

  useEffect(() => {
    if (rotaImportHistory.length === 0) return;
    writeStoredRotaImports(sortRotaImports(rotaImportHistory).map(normalizeRotaImportRecord));
  }, [rotaImportHistory]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [specialtyForm, setSpecialtyForm] = useState(defaultSpecialtyForm);
  const [consultantForm, setConsultantForm] = useState<ConsultantFormState>(defaultConsultantForm(initialSpecialties[0].id));
  const [consultantProcedureInput, setConsultantProcedureInput] = useState("");
  const [addingProcedureForNewConsultant, setAddingProcedureForNewConsultant] = useState(false);
  const [expandedSpecialtyIds, setExpandedSpecialtyIds] = useState<string[]>(initialSpecialties.map((specialty) => specialty.id));
  const [expandedConsultantId, setExpandedConsultantId] = useState("");
  const [editingConsultantId, setEditingConsultantId] = useState("");
  const [expandedProcedureConsultantId, setExpandedProcedureConsultantId] = useState("");
  const [addingSpecialtyId, setAddingSpecialtyId] = useState("");
  const [consultantEditDraft, setConsultantEditDraft] = useState<ConsultantEditState | null>(null);
  const [consultantEditProcedureInput, setConsultantEditProcedureInput] = useState("");
  const [addingProcedureForEditConsultant, setAddingProcedureForEditConsultant] = useState(false);
  const [procedureForm, setProcedureForm] = useState<ProcedureFormState>({
    specialtyId: initialSpecialties[0].id,
    name: "",
    difficulty: "Medium",
    estimatedMinutes: "45",
    arrivalLeadMinutes: "90",
  });
  const [draft, setDraft] = useState<BookingDraft>({
    date: "2026-05-25",
    resourceId: resources[0].id,
    session: "AM",
    specialtyId: initialSpecialties[0].id,
    appointmentType: "F2F",
    consultant: "",
    procedureIds: [],
    nhsCount: "0",
    ppCount: "0",
    turnaroundTime: "00:20",
    timeLabel: "08:00",
    notes: "",
    status: "Pending",
  });
  const [openedDraftSnapshot, setOpenedDraftSnapshot] = useState("");
  const [resourceEditOpen, setResourceEditOpen] = useState(false);
  const [statusMenu, setStatusMenu] = useState<StatusMenuState | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [notesSearch, setNotesSearch] = useState("");
  const [expandedNoteIds, setExpandedNoteIds] = useState<string[]>([]);
  const [noteLikes, setNoteLikes] = useState<Record<string, number>>({});
  const [noteLiked, setNoteLiked] = useState<Record<string, boolean>>({});
  const [noteComments, setNoteComments] = useState<Record<string, NoteComment[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [devMode, setDevMode] = useState(false);
  const [brandTapCount, setBrandTapCount] = useState(0);
  const confirmActionRef = useRef<null | (() => void | Promise<void>)>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const brandTapTimerRef = useRef<number | null>(null);

  const procedureMap = useMemo(
    () => Object.fromEntries(procedures.map((procedure) => [procedure.id, procedure])),
    [procedures],
  );

  useEffect(() => {
    setTodayIso(toIsoDate(new Date()));
  }, []);

  useEffect(() => {
    const fallbackSpecialtyId = specialties[0]?.id ?? "";

    setConsultantForm((current) =>
      current.specialtyId && specialties.some((specialty) => specialty.id === current.specialtyId)
        ? current
        : { ...current, specialtyId: fallbackSpecialtyId },
    );
    setProcedureForm((current) =>
      current.specialtyId && specialties.some((specialty) => specialty.id === current.specialtyId)
        ? current
        : { ...current, specialtyId: fallbackSpecialtyId },
    );
    setDraft((current) =>
      current.specialtyId && specialties.some((specialty) => specialty.id === current.specialtyId)
        ? current
        : { ...current, specialtyId: fallbackSpecialtyId },
    );
  }, [specialties]);

  const specialtyMap = useMemo(
    () => Object.fromEntries(specialties.map((specialty) => [specialty.id, specialty])),
    [specialties],
  );

  const notesSearchTerms = useMemo(() => parseSearchTerms(notesSearch), [notesSearch]);

  const notesFeed = useMemo(() => {
    const visible = [...bookings]
      .sort((left, right) => {
        const leftStamp = `${left.date}-${left.timeLabel}`;
        const rightStamp = `${right.date}-${right.timeLabel}`;
        return leftStamp < rightStamp ? 1 : -1;
      })
      .map((booking) => {
        const comments = noteComments[booking.id] ?? [];
        const searchBlob = [
          booking.consultant,
          specialtyMap[booking.specialtyId]?.name ?? "",
          isoToLabel(booking.date),
          booking.session,
          booking.notes,
          comments.map((comment) => `${comment.author} ${comment.body}`).join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return {
          booking,
          comments,
          searchBlob,
        };
      });

    if (notesSearchTerms.length === 0) return visible;
    return visible.filter((item) => notesSearchTerms.every((term) => item.searchBlob.includes(term)));
  }, [bookings, noteComments, notesSearchTerms, specialtyMap]);

  const noteGroups = useMemo(() => {
    const currentWeekStart = startOfWeekIso(todayIso);
    const nextWeekStart = addDays(currentWeekStart, 7);
    const weekAfterNextStart = addDays(currentWeekStart, 14);

    const groups: Array<{ key: "week-a" | "week-b" | "archive"; label: string; items: typeof notesFeed }> = [
      { key: "week-a", label: "Week A", items: [] },
      { key: "week-b", label: "Week B", items: [] },
      { key: "archive", label: "Archive", items: [] },
    ];

    notesFeed.forEach((item) => {
      const bookingWeekStart = startOfWeekIso(item.booking.date);

      if (item.booking.date < todayIso) {
        groups[2].items.push(item);
        return;
      }

      if (bookingWeekStart <= nextWeekStart) {
        groups[0].items.push(item);
        return;
      }

      if (bookingWeekStart <= weekAfterNextStart) {
        groups[1].items.push(item);
        return;
      }

      groups[1].items.push(item);
    });

    return groups;
  }, [notesFeed, todayIso]);

  const dates = useMemo(
    () => Array.from({ length: 5 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const bookingSummaries = useMemo(() => {
    return bookings.map((booking) => {
      const specialty = specialtyMap[booking.specialtyId] ?? specialtyMap.endoscopy ?? specialties[0];
      const resource = resources.find((item) => item.id === booking.resourceId)!;
      const coverage = rosterCoverage[`${booking.date}-${booking.session}`];
      const selectedProcedures = booking.procedureIds.map((id) => procedureMap[id]).filter(Boolean);
      const operatingMinutes = selectedProcedures.reduce((sum, procedure) => sum + procedure.estimatedMinutes, 0);
    const turnaroundMinutes = Math.max(0, selectedProcedures.length - 1) * (booking.turnaroundMinutes ?? specialty.turnaroundMinutes);
      const totalMinutes = operatingMinutes + turnaroundMinutes;
      const finishMinutes = slotStartMinutes(booking.session) + totalMinutes;
      const latestArrivalLead = selectedProcedures.reduce(
        (lead, procedure) => Math.max(lead, procedure.arrivalLeadMinutes),
        0,
      );
      const arrivalMinutes = slotStartMinutes(booking.session) - latestArrivalLead;
      const roleChecks = specialty.requirements.map((requirement) => {
        const actual = getCoverageValue(coverage, requirement.role);
        return { ...requirement, actual, met: actual >= requirement.minimum };
      });
      const actualPoints = roleChecks.reduce(
        (sum, requirement) => sum + Math.min(requirement.actual, requirement.minimum) * requirement.pointsPerPerson,
        0,
      );
      const hardStops = roleChecks.filter((requirement) => requirement.hardStop && !requirement.met);
      const softGaps = roleChecks.filter((requirement) => !requirement.hardStop && !requirement.met);
      const overrunsSession = totalMinutes > resource.sessionLengthMinutes;
      const capacityState: CapacityState =
        hardStops.length > 0 || overrunsSession
          ? "Constrained"
          : softGaps.length > 0 || actualPoints < specialty.targetPoints
            ? "Review"
            : "Bookable";

      return {
        ...booking,
        specialty,
        resource,
        coverage,
        totalMinutes,
        finishTime: minutesToClock(finishMinutes),
        arrivalTime: minutesToClock(arrivalMinutes),
        actualPoints,
        roleChecks,
        overrunsSession,
        capacityState,
      };
    });
  }, [bookings, procedureMap, specialtyMap]);

  const visibleBoardBookings = useMemo(
    () => (activeBoardPage === "day-surgery" || activeBoardPage === "outpatient" ? bookingSummaries : []),
    [activeBoardPage, bookingSummaries],
  );

  const visibleStaffAssignments = useMemo(
    () => (staffView ? staffAssignments : []),
    [staffView],
  );

  const currentBoardPages = staffView ? staffBoardPages : sessionBoardPages;
  const activeStaffBoardPage =
    activeBoardPage === "ward" || activeBoardPage === "theatres" || activeBoardPage === "recovery" || activeBoardPage === "outpatients"
      ? activeBoardPage
      : "theatres";
  const currentStaffBoardConfig = staffBoardConfigs[activeStaffBoardPage];


  const boardDays = useMemo(() => {
    return dates.map((date) => ({
      date,
      slots: sessions.map((session) => ({
        session,
        resources: theatreResources.map((resource) => ({
          resource,
          bookings: visibleBoardBookings
            .filter((item) => item.date === date && item.resourceId === resource.id && item.session === session)
            .sort((left, right) => left.timeLabel.localeCompare(right.timeLabel)),
          staff: visibleStaffAssignments.find(
            (item) => item.date === date && item.resourceId === resource.id && item.session === session,
          ),
        })),
      })),
    }));
  }, [dates, visibleBoardBookings, visibleStaffAssignments]);

  const outpatientBoardDays = useMemo(() => {
    return dates.map((date) => ({
      date,
      columns: outpatientBoardColumns.map((column) => ({
        column,
        bookings: visibleBoardBookings
          .filter((item) => item.date === date && item.resourceId === column.id)
          .sort((left, right) => left.timeLabel.localeCompare(right.timeLabel)),
      })),
    }));
  }, [dates, visibleBoardBookings]);

  const staffBoardDays = useMemo(() => {
    if (!staffView) return [];

    if (currentStaffBoardConfig.splitBySession) {
      return dates.map((date) => ({
        date,
        rows: sessions.map((session) => ({
          session,
          columns: currentStaffBoardConfig.columns.map((column) => ({
            column,
            assignment: visibleStaffAssignments.find(
              (item) => item.date === date && item.resourceId === column.id && item.session === session,
            ),
          })),
        })),
      }));
    }

    return dates.map((date) => ({
      date,
      rows: [
        {
          session: null,
          columns: currentStaffBoardConfig.columns.map((column) => ({
            column,
            assignment: visibleStaffAssignments.find((item) => item.date === date && item.resourceId === column.id),
          })),
        },
      ],
    }));
  }, [currentStaffBoardConfig, dates, staffView, visibleStaffAssignments]);

  const rotaPoolSummary = useMemo(() => {
    const grouped = rotaPoolRows.reduce<Record<string, number>>((acc, row) => {
      acc[row.classification] = (acc[row.classification] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).sort((left, right) => right[1] - left[1]);
  }, [rotaPoolRows]);

  const rotaFulfilmentSummary = useMemo(() => {
    const grouped = rotaPoolRows.reduce<Record<string, number>>((acc, row) => {
      acc[row.fulfilment] = (acc[row.fulfilment] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).sort((left, right) => right[1] - left[1]);
  }, [rotaPoolRows]);

  const filteredRotaPool = useMemo(
    () =>
      rotaPoolRows.filter((row) => {
        const roleOk = activeRoleFilter ? row.classification === activeRoleFilter : true;
        const fulfilmentOk = activeFulfilmentFilter ? row.fulfilment === activeFulfilmentFilter : true;
        const dateOk = activeDateFilter ? row.date === activeDateFilter : true;
        const unitOk = activeUnitFilter ? row.unit === activeUnitFilter : true;
        return roleOk && fulfilmentOk && dateOk && unitOk;
      }),
    [activeDateFilter, activeFulfilmentFilter, activeRoleFilter, activeUnitFilter, rotaPoolRows],
  );

  const rotaRoleOptions = useMemo(() => Array.from(new Set(rotaPoolRows.map((row) => row.classification))), [rotaPoolRows]);
  const rotaFulfilmentOptions = useMemo(() => Array.from(new Set(rotaPoolRows.map((row) => row.fulfilment))), [rotaPoolRows]);
  const rotaDateOptions = useMemo(() => Array.from(new Set(rotaPoolRows.map((row) => row.date))).sort(), [rotaPoolRows]);
  const rotaUnitOptions = useMemo(() => Array.from(new Set(rotaPoolRows.map((row) => row.unit))), [rotaPoolRows]);
  const rotaMonthAnchor = activeDateFilter || rotaDateOptions[0] || toIsoDate(new Date());
  const rotaMonthDates = useMemo(() => monthDates(rotaMonthAnchor), [rotaMonthAnchor]);

  const rotaAssignments = useMemo(
    () =>
      dates.flatMap((date) =>
        sessions.map((session) => ({
          date,
          session,
          resources: resources.map((resource) => ({
            resource,
            assignment: staffAssignments.find(
              (item) => item.date === date && item.session === session && item.resourceId === resource.id,
            ),
          })),
        })),
      ),
    [dates],
  );
  const totalPatientsByDate = useMemo(
    () =>
      bookings.reduce<Record<string, number>>((acc, booking) => {
        acc[booking.date] = (acc[booking.date] ?? 0) + booking.nhsCount + booking.ppCount;
        return acc;
      }, {}),
    [bookings],
  );
  const totalStaffByDate = useMemo(
    () =>
      staffAssignments.reduce<Record<string, number>>((acc, assignment) => {
        acc[assignment.date] = (acc[assignment.date] ?? 0) + 1 + assignment.team.length;
        return acc;
      }, {}),
    [staffAssignments],
  );

  const totals = useMemo(() => {
    const reviewAndConstrained = bookingSummaries.filter((booking) => booking.capacityState !== "Bookable").length;
    const theatreMinutes = bookingSummaries.reduce((sum, booking) => sum + booking.totalMinutes, 0);
    const openSlots = dates.length * resources.length * sessions.length - bookingSummaries.length;

    return {
      liveLists: bookingSummaries.length,
      reviewAndConstrained,
      theatreMinutes,
      openSlots,
    };
  }, [bookingSummaries, dates]);

  const nextRisks = useMemo(
    () => bookingSummaries.filter((booking) => booking.capacityState !== "Bookable").slice(0, 3),
    [bookingSummaries],
  );

  const draftSpecialtyProcedures = useMemo(
    () => procedures.filter((procedure) => procedure.specialtyId === draft.specialtyId),
    [draft.specialtyId, procedures],
  );
  const draftSpecialtyConsultants = useMemo(
    () => consultants.filter((consultant) => consultant.specialtyId === draft.specialtyId),
    [consultants, draft.specialtyId],
  );
  const selectedDraftConsultant = useMemo(
    () => draftSpecialtyConsultants.find((consultant) => consultant.name === draft.consultant),
    [draft.consultant, draftSpecialtyConsultants],
  );
  const isOutpatientDraft = draft.resourceId.startsWith("clinic-");
  const outpatientSpecialtyValue = `${draft.specialtyId}::${draft.appointmentType}`;
  const draftAvailableProcedures = useMemo(() => {
    if (!selectedDraftConsultant || selectedDraftConsultant.procedures.length === 0) return draftSpecialtyProcedures;
    const allowed = new Set(selectedDraftConsultant.procedures.map((item) => item.toLowerCase()));
    const scoped = draftSpecialtyProcedures.filter((procedure) => allowed.has(procedure.name.toLowerCase()));
    return scoped.length > 0 ? scoped : draftSpecialtyProcedures;
  }, [draftSpecialtyProcedures, selectedDraftConsultant]);
  const draftTiming = useMemo(() => {
    const specialty = specialtyMap[draft.specialtyId] ?? specialties[0];
    const selectedProcedures = draft.procedureIds
      .map((procedureId) => procedureMap[procedureId])
      .filter((procedure): procedure is Procedure => Boolean(procedure));
    const operatingMinutes = selectedProcedures.reduce((sum, procedure) => sum + procedure.estimatedMinutes, 0);
    const turnaroundPerGap = durationStringToMinutes(draft.turnaroundTime) ?? specialty?.turnaroundMinutes ?? 20;
    const turnaroundMinutes = Math.max(0, selectedProcedures.length - 1) * turnaroundPerGap;
    const totalMinutes = operatingMinutes + turnaroundMinutes;
    const startMinutes = clockToMinutes(draft.timeLabel);
    const finishMinutes = startMinutes === null ? null : startMinutes + totalMinutes;
    return {
      specialty,
      selectedProcedures,
      turnaroundPerGap,
      totalMinutes,
      finishMinutes,
    };
  }, [draft.procedureIds, draft.specialtyId, draft.timeLabel, draft.turnaroundTime, procedureMap, specialtyMap, specialties]);
  const draftConflict = useMemo(() => {
    const startMinutes = clockToMinutes(draft.timeLabel);
    if (startMinutes === null || draftTiming.finishMinutes === null) return null;

    const sameResourceBookings = bookings.filter(
      (booking) => booking.date === draft.date && booking.resourceId === draft.resourceId && booking.id !== draft.id,
    );

    for (const booking of sameResourceBookings) {
      const bookingStart = clockToMinutes(booking.timeLabel);
      if (bookingStart === null) continue;
      const bookingSpecialty = specialtyMap[booking.specialtyId] ?? specialties[0];
      const bookingProcedures = booking.procedureIds
        .map((procedureId) => procedureMap[procedureId])
        .filter((procedure): procedure is Procedure => Boolean(procedure));
      const bookingMinutes =
        bookingProcedures.reduce((sum, procedure) => sum + procedure.estimatedMinutes, 0) +
        Math.max(0, bookingProcedures.length - 1) * (bookingSpecialty?.turnaroundMinutes ?? 0);
      const bookingFinish = bookingStart + bookingMinutes;

      if (startMinutes < bookingFinish && draftTiming.finishMinutes > bookingStart) {
        return {
          booking,
          suggestedStart: minutesToClock(bookingFinish + 60),
          bookingFinish: minutesToClock(bookingFinish),
        };
      }
    }

    return null;
  }, [bookings, draft.date, draft.id, draft.resourceId, draft.timeLabel, draftTiming.finishMinutes, procedureMap, specialties, specialtyMap]);
  const activePageLabel = navItems.find((item) => item.key === activeView)?.label ?? "";
  const listConsultantOptions = useMemo(
    () => Array.from(new Set(bookingSummaries.map((booking) => booking.consultant))).sort(),
    [bookingSummaries],
  );
  const listSpecialtyOptions = useMemo(
    () => Array.from(new Set(bookingSummaries.map((booking) => booking.specialty.name))).sort(),
    [bookingSummaries],
  );
  const visibleListBookings = useMemo(
    () =>
      bookingSummaries.filter((booking) => {
        const afterFrom = listDateFrom ? booking.date >= listDateFrom : true;
        const beforeTo = listDateTo ? booking.date <= listDateTo : true;
        const consultantOk = listConsultantFilter ? booking.consultant === listConsultantFilter : true;
        const specialtyOk = listSpecialtyFilter ? booking.specialty.name === listSpecialtyFilter : true;
        return afterFrom && beforeTo && consultantOk && specialtyOk;
      }),
    [bookingSummaries, listConsultantFilter, listDateFrom, listDateTo, listSpecialtyFilter],
  );
  const visibleProcedureTotal = useMemo(
    () => visibleListBookings.reduce((sum, booking) => sum + booking.procedureIds.length, 0),
    [visibleListBookings],
  );
  const visibleBoardListBookings = useMemo(
    () => (activeBoardPage === "day-surgery" ? visibleListBookings : []),
    [activeBoardPage, visibleListBookings],
  );
  useEffect(() => {
    setActiveBoardPage((current) => {
      if (staffView) return current === "ward" || current === "theatres" || current === "recovery" || current === "outpatients" ? current : "theatres";
      return current === "day-surgery" || current === "outpatient" ? current : "day-surgery";
    });
  }, [staffView]);

  useEffect(() => {
    if (activeView === "lists") {
      setActiveView("board");
      setBoardLayout("list");
    }
  }, [activeView]);

  useEffect(() => {
    void initFirebaseClient();

    let cancelled = false;

    async function loadPlannerData() {
      try {
        const [specialtySnapshot, consultantSnapshot, procedureSnapshot, bookingSnapshot, rotaImportSnapshot] = await Promise.all([
          getDocs(collection(firestore, "specialties")),
          getDocs(collection(firestore, "consultants")),
          getDocs(collection(firestore, "procedures")),
          getDocs(collection(firestore, "bookings")),
          getDocs(collection(firestore, "rotaImports")),
        ]);

        if (cancelled) return;

        if (!specialtySnapshot.empty) {
          setSpecialties(specialtySnapshot.docs.map((snapshot) => snapshot.data() as Specialty));
        }

        if (!consultantSnapshot.empty) {
          setConsultants(
            consultantSnapshot.docs.map((snapshot) => {
              const data = snapshot.data() as Partial<Consultant>;
              return {
                id: data.id ?? snapshot.id,
                name: data.name ?? "",
                lastName: data.lastName ?? data.name?.split(",")[0] ?? "",
                firstName: data.firstName ?? data.name?.split(",")[1]?.trim() ?? "",
                specialtyId: data.specialtyId ?? initialSpecialties[0].id,
                procedures: data.procedures ?? (data.focus ? [data.focus] : []),
                rnRequired: data.rnRequired ?? 1,
                odpRequired: data.odpRequired ?? 1,
                hcaRequired: data.hcaRequired ?? 1,
              };
            }),
          );
        }

        if (!procedureSnapshot.empty) {
          setProcedures(procedureSnapshot.docs.map((snapshot) => snapshot.data() as Procedure));
        }

        if (!bookingSnapshot.empty) {
          setBookings(bookingSnapshot.docs.map((snapshot) => snapshot.data() as Booking));
        }

        if (!rotaImportSnapshot.empty) {
          const imports = rotaImportSnapshot.docs.map((snapshot) => normalizeRotaImportRecord(snapshot.data() as RotaImportRecord));
          const ordered = imports.sort((left, right) => (right.meta.uploadedAt ?? "").localeCompare(left.meta.uploadedAt ?? ""));
          setRotaImportHistory(ordered);
          if (ordered[0]) {
            setRotaImportMeta(ordered[0].meta);
            setRotaPoolRows(ordered[0].rows);
          }
        }
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
          return;
        }
        console.error("Failed to load planner data from Firestore.", error);
      }
    }

    void loadPlannerData();

    return () => {
      cancelled = true;
    };
  }, []);

  function getMiniRequirementSummary(booking: (typeof bookingSummaries)[number]) {
    return booking.roleChecks
      .filter((requirement) => requirement.minimum > 0)
      .slice(0, 3)
      .map((requirement) => `${requirement.role} ${requirement.actual}/${requirement.minimum}`)
      .join("  ");
  }

  function openDrawerForSlot(date: string, resourceId: string, session: SessionKey, bookingId?: string, preferExisting = true) {
      const existing = bookingId
        ? bookings.find((item) => item.id === bookingId)
        : preferExisting
          ? bookings.find((item) => item.date === date && item.resourceId === resourceId && item.session === session)
          : undefined;

      let nextDraft: BookingDraft;

      if (existing) {
        nextDraft = {
          id: existing.id,
          date: existing.date,
          resourceId: existing.resourceId,
          session: existing.session,
          specialtyId: existing.specialtyId,
          appointmentType: existing.appointmentType ?? "F2F",
          consultant: existing.consultant,
          procedureIds: existing.procedureIds,
          nhsCount: String(existing.nhsCount),
          ppCount: String(existing.ppCount),
          turnaroundTime: minutesToDurationString(existing.turnaroundMinutes ?? (specialtyMap[existing.specialtyId] ?? specialties[0])?.turnaroundMinutes ?? 20),
          timeLabel: existing.timeLabel,
          notes: existing.notes,
          status: existing.status,
        };
      } else {
        nextDraft = {
          date,
          resourceId,
          session,
          specialtyId: specialties[0]?.id ?? "",
          appointmentType: "F2F",
          consultant: "",
          procedureIds: [],
          nhsCount: "0",
          ppCount: "0",
          turnaroundTime: "00:20",
          timeLabel: session === "AM" ? "08:00" : "13:00",
          notes: "",
          status: "Pending",
        };
      }

      setDraft(nextDraft);
      setOpenedDraftSnapshot(getDraftSnapshot(nextDraft));
      setResourceEditOpen(false);
      setDrawerOpen(true);
    }

  function openQuickBooking() {
    const defaultDate = dates[0] ?? todayIso;
    const defaultResourceId = activeBoardPage === "outpatient" ? "clinic-1" : "t1";
    openDrawerForSlot(defaultDate, defaultResourceId, "AM", undefined, false);
  }

  function closeDrawer(force = false) {
    if (!force && drawerOpen && getDraftSnapshot(draft) !== openedDraftSnapshot) {
      requestConfirmation("You still have an unfinished booking. Discard changes?", () => {
        setDrawerOpen(false);
        setOpenedDraftSnapshot("");
      }, "Discard");
      return;
    }

    setDrawerOpen(false);
    setOpenedDraftSnapshot("");
    setOpenedDraftSnapshot("");
  }

  function clearLongPressTimer() {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }

  function handleBrandTap() {
    if (brandTapTimerRef.current !== null) {
      window.clearTimeout(brandTapTimerRef.current);
    }

    setBrandTapCount((current) => {
      const next = current + 1;
      if (next >= 10) {
        setDevMode(true);
        return 0;
      }
      return next;
    });

    brandTapTimerRef.current = window.setTimeout(() => {
      setBrandTapCount(0);
      brandTapTimerRef.current = null;
    }, 1200);
  }

  function openStatusMenu(bookingId: string, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    setStatusMenu({
      bookingId,
      x: Math.min(window.innerWidth - 188, Math.max(12, rect.left + rect.width - 176)),
      y: Math.min(window.innerHeight - 156, Math.max(12, rect.top + rect.height + 8)),
    });
  }

  function startTileLongPress(bookingId: string, element: HTMLElement) {
    clearLongPressTimer();
    longPressTimerRef.current = window.setTimeout(() => {
      openStatusMenu(bookingId, element);
      longPressTimerRef.current = null;
    }, 450);
  }

  async function updateBookingStatus(bookingId: string, status: StatusKey) {
    setBookings((current) => current.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)));
    setStatusMenu(null);

    if (firestoreAccess !== "blocked") {
      const booking = bookings.find((item) => item.id === bookingId);
      if (!booking) return;

      try {
        await setDoc(doc(firestore, "bookings", bookingId), { ...booking, status });
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to update booking status.", error);
        }
      }
    }
  }

  function handleOutsideNavigation(action: () => void) {
    if (drawerOpen && getDraftSnapshot(draft) !== openedDraftSnapshot) {
      requestConfirmation("You still have an unfinished booking. Leave this screen and discard changes?", () => {
        setDrawerOpen(false);
        setOpenedDraftSnapshot("");
        setOpenedDraftSnapshot("");
        action();
      }, "Leave");
      return;
    }

    if (drawerOpen) {
      setDrawerOpen(false);
      setOpenedDraftSnapshot("");
    }
    action();
  }

  function requestConfirmation(message: string, onConfirm: () => void | Promise<void>, confirmLabel = "Confirm") {
    confirmActionRef.current = onConfirm;
    setConfirmDialog({ message, confirmLabel });
  }

  function closeConfirmation() {
    confirmActionRef.current = null;
    setConfirmDialog(null);
  }

  async function handleConfirmAction() {
    const action = confirmActionRef.current;
    closeConfirmation();
    if (action) {
      await action();
    }
  }

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (draftConflict) {
      requestConfirmation(
        `This time conflicts with ${draftConflict.booking.consultant} finishing at ${draftConflict.bookingFinish}. Suggested start: ${draftConflict.suggestedStart}. Keep editing?`,
        () => {},
        "Ok",
      );
      return;
    }

    const nextBooking: Booking = {
      id: draft.id ?? `b${Date.now()}`,
      date: draft.date,
      resourceId: draft.resourceId,
      session: draft.session,
      specialtyId: draft.specialtyId,
      appointmentType: draft.appointmentType,
      consultant: draft.consultant || "UNASSIGNED",
      procedureIds: draft.procedureIds,
      patientCount: Number(draft.nhsCount) + Number(draft.ppCount),
      nhsCount: Number(draft.nhsCount),
      ppCount: Number(draft.ppCount),
      turnaroundMinutes: durationStringToMinutes(draft.turnaroundTime) ?? 20,
      timeLabel: draft.timeLabel,
      notes: draft.notes,
      status: draft.status,
    };

    setBookings((current) => {
      const filtered = current.filter((item) => item.id !== nextBooking.id);
      return [...filtered, nextBooking];
    });

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "bookings", nextBooking.id), nextBooking);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to save booking.", error);
        }
      }
    }

    setDrawerOpen(false);
  }

  async function handleDeleteBooking() {
    if (!draft.id) return;
    requestConfirmation("Delete this booking?", async () => {
      setBookings((current) => current.filter((item) => item.id !== draft.id));

      if (firestoreAccess !== "blocked") {
        try {
          await deleteDoc(doc(firestore, "bookings", draft.id!));
          setFirestoreAccess("granted");
        } catch (error) {
          if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
            setFirestoreAccess("blocked");
          } else {
            console.error("Failed to delete booking.", error);
          }
        }
      }

      setDrawerOpen(false);
    }, "Delete");
  }

  async function handleSpecialtySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = specialtyForm.name.trim();
    if (!trimmedName) return;

    const nextId = trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (specialties.some((specialty) => specialty.id === nextId || specialty.name.toLowerCase() === trimmedName.toLowerCase())) {
      setSpecialtyForm(defaultSpecialtyForm);
      return;
    }

    const next: Specialty = {
      id: nextId,
      name: trimmedName,
      listLabel: trimmedName,
      difficulty: specialtyForm.difficulty,
      targetPoints: Number(specialtyForm.targetPoints),
      turnaroundMinutes: Number(specialtyForm.turnaroundMinutes),
      recoveryRequired: specialtyForm.recoveryRequired,
      wardRequired: specialtyForm.wardRequired,
      requirements: [
        { role: "RN", minimum: Number(specialtyForm.rn), pointsPerPerson: Number(specialtyForm.rnPoints), hardStop: true },
        { role: "ODP", minimum: Number(specialtyForm.odp), pointsPerPerson: Number(specialtyForm.odpPoints), hardStop: true },
        { role: "HCA", minimum: Number(specialtyForm.hca), pointsPerPerson: Number(specialtyForm.hcaPoints), hardStop: false },
        ...(specialtyForm.recoveryRequired ? [{ role: "Recovery" as const, minimum: 1, pointsPerPerson: 2, hardStop: false }] : []),
        ...(specialtyForm.wardRequired ? [{ role: "Ward" as const, minimum: 1, pointsPerPerson: 1, hardStop: false }] : []),
      ],
    };

    setSpecialties((current) => [...current, next]);
    setProcedureForm((current) => ({ ...current, specialtyId: next.id }));
    setExpandedSpecialtyIds((current) => (current.includes(next.id) ? current : [...current, next.id]));
    setSpecialtyForm(defaultSpecialtyForm);

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "specialties", next.id), next);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to save specialty.", error);
        }
      }
    }
  }

  async function deleteSpecialty(specialtyId: string) {
    const specialty = specialties.find((item) => item.id === specialtyId);
    if (!specialty) return;

    requestConfirmation(`Delete specialty "${specialty.name}"?`, async () => {
      const consultantsToDelete = consultants.filter((consultant) => consultant.specialtyId === specialtyId);
      const proceduresToDelete = procedures.filter((procedure) => procedure.specialtyId === specialtyId);
      const remainingSpecialties = specialties.filter((item) => item.id !== specialtyId);
      const fallbackSpecialtyId = remainingSpecialties[0]?.id ?? "";

      setSpecialties(remainingSpecialties);
      setConsultants((current) => current.filter((consultant) => consultant.specialtyId !== specialtyId));
      setProcedures((current) => current.filter((procedure) => procedure.specialtyId !== specialtyId));
      setExpandedSpecialtyIds((current) => current.filter((item) => item !== specialtyId));
      setAddingSpecialtyId((current) => (current === specialtyId ? "" : current));
      setExpandedConsultantId((current) => (consultantsToDelete.some((consultant) => consultant.id === current) ? "" : current));
      setEditingConsultantId((current) => (consultantsToDelete.some((consultant) => consultant.id === current) ? "" : current));
      setExpandedProcedureConsultantId((current) => (consultantsToDelete.some((consultant) => consultant.id === current) ? "" : current));
      setConsultantEditDraft((current) => (current && current.specialtyId === specialtyId ? null : current));
      setConsultantForm((current) => ({ ...current, specialtyId: fallbackSpecialtyId }));
      setProcedureForm((current) => ({ ...current, specialtyId: fallbackSpecialtyId }));
      setDraft((current) => ({ ...current, specialtyId: fallbackSpecialtyId }));

      if (firestoreAccess !== "blocked") {
        try {
          await deleteDoc(doc(firestore, "specialties", specialtyId));
          await Promise.all([
            ...consultantsToDelete.map((consultant) => deleteDoc(doc(firestore, "consultants", consultant.id))),
            ...proceduresToDelete.map((procedure) => deleteDoc(doc(firestore, "procedures", procedure.id))),
          ]);
          setFirestoreAccess("granted");
        } catch (error) {
          if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
            setFirestoreAccess("blocked");
          } else {
            console.error("Failed to delete specialty.", error);
          }
        }
      }
    }, "Delete");
  }

  async function handleProcedureSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Procedure = {
      id: procedureForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      specialtyId: procedureForm.specialtyId,
      name: procedureForm.name,
      difficulty: procedureForm.difficulty,
      estimatedMinutes: Number(procedureForm.estimatedMinutes),
      arrivalLeadMinutes: Number(procedureForm.arrivalLeadMinutes),
    };

    setProcedures((current) => [...current, next]);
    setProcedureForm((current) => ({
      ...current,
      name: "",
      estimatedMinutes: "45",
      arrivalLeadMinutes: "90",
    }));

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "procedures", next.id), next);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to save procedure.", error);
        }
      }
    }
  }

  async function handleConsultantSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const displayName = `${consultantForm.lastName.toUpperCase()}, ${consultantForm.firstName}`.trim();

    const next: Consultant = {
      id: `${consultantForm.lastName}-${consultantForm.firstName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: displayName,
      lastName: consultantForm.lastName,
      firstName: consultantForm.firstName,
      specialtyId: consultantForm.specialtyId,
      procedures: consultantForm.procedures,
      rnRequired: Number(consultantForm.rnRequired),
      odpRequired: Number(consultantForm.odpRequired),
      hcaRequired: Number(consultantForm.hcaRequired),
    };

    setConsultants((current) => [...current.filter((item) => item.id !== next.id), next]);
    setConsultantForm(defaultConsultantForm(consultantForm.specialtyId));
    setConsultantProcedureInput("");
    setAddingProcedureForNewConsultant(false);
    setAddingSpecialtyId("");

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "consultants", next.id), next);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to save consultant.", error);
        }
      }
    }
  }

  function handleAddConsultantProcedure() {
    const nextProcedure = consultantProcedureInput.trim();
    if (!nextProcedure) return;
    setConsultantForm((current) => ({
      ...current,
      procedures: current.procedures.includes(nextProcedure) ? current.procedures : [...current.procedures, nextProcedure],
    }));
    setConsultantProcedureInput("");
    setAddingProcedureForNewConsultant(false);
  }

  function selectConsultantProcedureSuggestion(procedureName: string) {
    setConsultantProcedureInput(procedureName);
  }

  function handleRemoveConsultantProcedure(procedureName: string) {
    requestConfirmation(`Remove procedure "${procedureName}"?`, () => {
      setConsultantForm((current) => ({
        ...current,
        procedures: current.procedures.filter((item) => item !== procedureName),
      }));
    }, "Remove");
  }

  function toggleSpecialtySection(specialtyId: string) {
    setExpandedSpecialtyIds((current) =>
      current.includes(specialtyId) ? current.filter((item) => item !== specialtyId) : [...current, specialtyId],
    );
  }

  function startConsultantAdd(specialtyId: string) {
    setAddingSpecialtyId(specialtyId);
    setConsultantForm(defaultConsultantForm(specialtyId));
    setConsultantProcedureInput("");
    setAddingProcedureForNewConsultant(false);
    setExpandedConsultantId("");
    setEditingConsultantId("");
    setConsultantEditDraft(null);
    setExpandedSpecialtyIds((current) => (current.includes(specialtyId) ? current : [...current, specialtyId]));
  }

  function cancelConsultantAdd() {
    setAddingSpecialtyId("");
    setConsultantForm(defaultConsultantForm(consultantForm.specialtyId || specialties[0]?.id || initialSpecialties[0].id));
    setConsultantProcedureInput("");
    setAddingProcedureForNewConsultant(false);
  }

  function openConsultantDetails(consultantOrId: Consultant | string) {
    const consultant =
      typeof consultantOrId === "string"
        ? consultants.find((item) => item.id === consultantOrId)
        : consultantOrId;

    if (!consultant) return;

    setAddingSpecialtyId("");
    setExpandedConsultantId((current) => (current === consultant.id ? "" : consultant.id));
    setEditingConsultantId("");
    setConsultantEditDraft(null);
    setConsultantEditProcedureInput("");
    setAddingProcedureForEditConsultant(false);
  }

  function startConsultantEdit(consultant: Consultant) {
    setAddingSpecialtyId("");
    setExpandedConsultantId(consultant.id);
    setEditingConsultantId(consultant.id);
    setConsultantEditDraft({
      id: consultant.id,
      lastName: consultant.lastName,
      firstName: consultant.firstName,
      specialtyId: consultant.specialtyId,
      procedures: consultant.procedures,
      rnRequired: String(consultant.rnRequired),
      odpRequired: String(consultant.odpRequired),
      hcaRequired: String(consultant.hcaRequired),
    });
    setConsultantEditProcedureInput("");
    setAddingProcedureForEditConsultant(false);
  }

  function cancelConsultantEdit() {
    setEditingConsultantId("");
    setConsultantEditDraft(null);
    setConsultantEditProcedureInput("");
    setAddingProcedureForEditConsultant(false);
  }

  function addConsultantEditProcedure() {
    const nextProcedure = consultantEditProcedureInput.trim();
    if (!nextProcedure || !consultantEditDraft) return;
    setConsultantEditDraft((current) =>
      current
        ? {
            ...current,
            procedures: current.procedures.includes(nextProcedure) ? current.procedures : [...current.procedures, nextProcedure],
          }
        : current,
    );
    setConsultantEditProcedureInput("");
    setAddingProcedureForEditConsultant(false);
  }

  function selectConsultantEditProcedureSuggestion(procedureName: string) {
    setConsultantEditProcedureInput(procedureName);
  }

  function removeConsultantEditProcedure(procedureName: string) {
    requestConfirmation(`Remove procedure "${procedureName}"?`, () => {
      setConsultantEditDraft((current) =>
        current
          ? {
              ...current,
              procedures: current.procedures.filter((item) => item !== procedureName),
            }
          : current,
      );
    }, "Remove");
  }

  async function saveConsultantEdit() {
    if (!consultantEditDraft) return;

    const nextConsultant: Consultant = {
      id: consultantEditDraft.id,
      name: `${consultantEditDraft.lastName.toUpperCase()}, ${consultantEditDraft.firstName}`.trim(),
      lastName: consultantEditDraft.lastName,
      firstName: consultantEditDraft.firstName,
      specialtyId: consultantEditDraft.specialtyId,
      procedures: consultantEditDraft.procedures,
      rnRequired: Number(consultantEditDraft.rnRequired),
      odpRequired: Number(consultantEditDraft.odpRequired),
      hcaRequired: Number(consultantEditDraft.hcaRequired),
    };

    setConsultants((current) => current.map((consultant) => (consultant.id === nextConsultant.id ? nextConsultant : consultant)));
    setEditingConsultantId("");
    setConsultantEditDraft(null);
    setConsultantEditProcedureInput("");
    setAddingProcedureForEditConsultant(false);

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "consultants", nextConsultant.id), nextConsultant);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to update consultant.", error);
        }
      }
    }
  }

  async function deleteConsultant(consultantId: string) {
    requestConfirmation("Delete this consultant?", async () => {
      setConsultants((current) => current.filter((consultant) => consultant.id !== consultantId));
      setExpandedConsultantId((current) => (current === consultantId ? "" : current));
      setEditingConsultantId((current) => (current === consultantId ? "" : current));
      setConsultantEditDraft((current) => (current?.id === consultantId ? null : current));

      if (firestoreAccess !== "blocked") {
        try {
          await deleteDoc(doc(firestore, "consultants", consultantId));
          setFirestoreAccess("granted");
        } catch (error) {
          if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
            setFirestoreAccess("blocked");
          } else {
            console.error("Failed to delete consultant.", error);
          }
        }
      }
    }, "Delete");
  }

  async function upsertProcedureDuration(specialtyId: string, procedureName: string, estimatedMinutes: number) {
    const normalizedName = procedureName.trim();
    if (!normalizedName) return;

    const existing = procedures.find(
      (procedure) => procedure.specialtyId === specialtyId && procedure.name.toLowerCase() === normalizedName.toLowerCase(),
    );

    const next: Procedure = existing
      ? { ...existing, estimatedMinutes }
      : {
          id: normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          specialtyId,
          name: normalizedName,
          difficulty: "Medium",
          estimatedMinutes,
          arrivalLeadMinutes: 90,
        };

    setProcedures((current) => {
      const withoutExisting = current.filter((procedure) => procedure.id !== next.id);
      return [...withoutExisting, next];
    });

    if (firestoreAccess !== "blocked") {
      try {
        await setDoc(doc(firestore, "procedures", next.id), next);
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to update procedure duration.", error);
        }
      }
    }
  }

  function toggleNoteExpanded(bookingId: string) {
    setExpandedNoteIds((current) => (current.includes(bookingId) ? current.filter((id) => id !== bookingId) : [...current, bookingId]));
  }

  function toggleNoteLike(bookingId: string) {
    const nextLiked = !noteLiked[bookingId];
    setNoteLiked((current) => ({ ...current, [bookingId]: nextLiked }));
    setNoteLikes((current) => ({ ...current, [bookingId]: Math.max(0, (current[bookingId] ?? 0) + (nextLiked ? 1 : -1)) }));
  }

  function addNoteComment(bookingId: string) {
    const draftText = (commentDrafts[bookingId] ?? "").trim();
    if (!draftText) return;

    const nextComment: NoteComment = {
      id: `${bookingId}-${Date.now()}`,
      author: "Coordinator",
      body: draftText,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setNoteComments((current) => ({
      ...current,
      [bookingId]: [...(current[bookingId] ?? []), nextComment],
    }));
    setCommentDrafts((current) => ({ ...current, [bookingId]: "" }));
  }

  function toggleCommentLike(bookingId: string, commentId: string) {
    setNoteComments((current) => ({
      ...current,
      [bookingId]: (current[bookingId] ?? []).map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    }));
  }

  async function handleRotaUpload(file: File) {
    const buffer = await file.arrayBuffer();
    const parsed = buildRotaImportFromWorkbook(buffer, file.name);
    if (parsed.rows.length === 0) return;

    const normalizedRows = normalizeRotaRows(parsed.rows);
    setRotaImportMeta(parsed.meta);
    setRotaPoolRows(normalizedRows);
    const localRecord: RotaImportRecord = {
      id: `${Date.now()}`,
      meta: parsed.meta,
      rows: normalizedRows,
    };
    setRotaImportHistory((current) => [localRecord, ...current].sort((left, right) => (right.meta.uploadedAt ?? "").localeCompare(left.meta.uploadedAt ?? "")));
    setActiveRoleFilter("");
    setActiveFulfilmentFilter("");
    setActiveDateFilter("");
    setActiveUnitFilter("");

    if (firestoreAccess !== "blocked") {
      try {
        const uploadId = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        let storagePath = "";
        let downloadUrl = "";

        try {
          storagePath = `rota-imports/${uploadId}/${file.name}`;
          const storageRef = ref(storage, storagePath);
          await uploadBytes(storageRef, file, {
            contentType: file.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          downloadUrl = await getDownloadURL(storageRef);
        } catch (error) {
          console.error("Failed to upload rota file to storage.", error);
        }

        const record: RotaImportRecord = {
          id: uploadId,
          meta: {
            ...parsed.meta,
            storagePath,
            downloadUrl,
          },
          rows: normalizedRows,
        };

        await setDoc(doc(firestore, "rotaImports", uploadId), record);
        setRotaImportMeta(record.meta);
        setRotaImportHistory((current) => [record, ...current.filter((item) => item.id !== uploadId)].sort((left, right) => (right.meta.uploadedAt ?? "").localeCompare(left.meta.uploadedAt ?? "")));
        setFirestoreAccess("granted");
      } catch (error) {
        if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
          setFirestoreAccess("blocked");
        } else {
          console.error("Failed to archive rota import.", error);
        }
      }
    }
  }

  async function deleteRotaImport(importId: string) {
    requestConfirmation("Delete this archived rota upload?", async () => {
      const currentHistory = sortRotaImports(rotaImportHistory);
      const target = currentHistory.find((item) => item.id === importId);
      if (!target) return;

      const nextHistory = sortRotaImports(currentHistory.filter((item) => item.id !== importId));
      setRotaImportHistory(nextHistory);

      if (nextHistory.length > 0) {
        setRotaImportMeta(nextHistory[0].meta);
        setRotaPoolRows(nextHistory[0].rows);
      } else {
        setRotaImportMeta(defaultRotaImportMeta);
        setRotaPoolRows([]);
      }

      if (firestoreAccess !== "blocked") {
        try {
          if (target.meta.storagePath) {
            try {
              await deleteObject(ref(storage, target.meta.storagePath));
            } catch (error) {
              console.error("Failed to delete rota file from storage.", error);
            }
          }

          await deleteDoc(doc(firestore, "rotaImports", importId));
          setFirestoreAccess("granted");
        } catch (error) {
          if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
            setFirestoreAccess("blocked");
          } else {
            console.error("Failed to delete archived rota import.", error);
          }
        }
      }
    }, "Delete");
  }

  const visibleBoardStaffAssignments = dates.flatMap((date) =>
    sessions.flatMap((session) =>
      resources
        .map((resource) => {
          const assignment = visibleStaffAssignments.find(
            (item) => item.date === date && item.session === session && item.resourceId === resource.id,
          );

          return {
            id: `${date}-${session}-${resource.id}`,
            date,
            session,
            resource,
            assignment,
          };
        })
        .filter((item) => {
          if (listResourceFilter && item.resource.id !== listResourceFilter) return false;
          if (staffAssignmentFilter === "assigned") return Boolean(item.assignment);
          if (staffAssignmentFilter === "unassigned") return !item.assignment;
          return true;
        }),
    ),
  );

  const boardListSections = staffView
    ? dates.map((date) => ({
        id: `staff-${date}`,
        title: isoToLabel(date),
        subtitle: `${visibleBoardStaffAssignments.filter((item) => item.date === date).length} assignments`,
        rows: visibleBoardStaffAssignments.filter((item) => item.date === date),
      }))
    : dates.map((date) => ({
        id: `session-${date}`,
        title: isoToLabel(date),
        subtitle: `${visibleBoardListBookings.filter((booking) => booking.date === date).length} sessions`,
        rows: visibleBoardListBookings.filter((booking) => booking.date === date),
      }));

  useEffect(() => {
    const nextIds = boardListSections.map((section) => section.id);
    setExpandedBoardListSections((current) => (current.length === nextIds.length && current.every((item, index) => item === nextIds[index]) ? current : nextIds));
  }, [staffView, weekStart, listDateFrom, listDateTo, listConsultantFilter, listSpecialtyFilter, listResourceFilter, staffAssignmentFilter]);

  function toggleBoardListSection(sectionId: string) {
    setExpandedBoardListSections((current) =>
      current.includes(sectionId) ? current.filter((item) => item !== sectionId) : [...current, sectionId],
    );
  }

  return (
    <>
      <main className={styles.appShell} data-theme={theme}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <p className={styles.kicker}>Royal Free London Private Patients Unit</p>
            <h1 className={styles.brandTitle}>Capacity Planner</h1>
            <p className={styles.brandText}>Hadley Wood board with light and black modes.</p>
          </div>

          <nav className={styles.sidebarNav}>
            {navItems.map((item) => (
              <button key={item.key} type="button" className={styles.navButton} data-active={activeView === item.key} onClick={() => handleOutsideNavigation(() => setActiveView(item.key))}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className={styles.sidebarMeta}>
            <span>{isoToLabel(dates[0])} - {isoToLabel(dates[dates.length - 1])}</span>
            <span>{totals.liveLists} live lists</span>
            <span>{totals.openSlots} open bays</span>
          </div>
        </aside>

        {activeView === "board" ? (
          <header className={`${styles.mobileFixedHeader} ${styles.mobileBoardHeader}`}>
            <Image src="/rfppu-mark.png" alt="" width={44} height={44} className={styles.logoMark} priority />
            <div className={styles.brandTapTarget} onClick={handleBrandTap} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleBrandTap();
              }
            }}>
            <div className={styles.boardTitles}>
              <div className={styles.titleStack}>
                <strong>The Royal Free London</strong>
                <strong>Private Patients Unit</strong>
              </div>
              <span>Hadley Wood Hospital</span>
            </div>
            </div>
            <div className={styles.themeToggle}>
              <button
                type="button"
                className={styles.themeIconButton}
                aria-label="Theme settings"
                onClick={() => setThemeMenuOpen((current) => !current)}
              />
              {themeMenuOpen ? (
                <div className={styles.themeMenu}>
                  <button type="button" data-active={theme === "light"} onClick={() => { setTheme("light"); setThemeMenuOpen(false); }}>
                    Light
                  </button>
                  <button type="button" data-active={theme === "dark"} onClick={() => { setTheme("dark"); setThemeMenuOpen(false); }}>
                    Black
                  </button>
                </div>
              ) : null}
            </div>
          </header>
        ) : (
          <header className={`${styles.mobileFixedHeader} ${styles.pageHeader}`}>
            <Image src="/rfppu-mark.png" alt="" width={44} height={44} className={styles.logoMark} priority />
            <div className={styles.brandTapTarget} onClick={handleBrandTap} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleBrandTap();
              }
            }}>
            <div className={styles.boardTitles}>
              <div className={styles.titleStack}>
                <strong>The Royal Free London</strong>
                <strong>Private Patients Unit</strong>
              </div>
              <span>Hadley Wood Hospital</span>
            </div>
            </div>
            <div className={styles.themeToggle}>
              <button
                type="button"
                className={styles.themeIconButton}
                aria-label="Theme settings"
                onClick={() => setThemeMenuOpen((current) => !current)}
              />
              {themeMenuOpen ? (
                <div className={styles.themeMenu}>
                  <button type="button" data-active={theme === "light"} onClick={() => { setTheme("light"); setThemeMenuOpen(false); }}>
                    Light
                  </button>
                  <button type="button" data-active={theme === "dark"} onClick={() => { setTheme("dark"); setThemeMenuOpen(false); }}>
                    Black
                  </button>
                </div>
              ) : null}
            </div>
          </header>
        )}

        <section className={styles.content} data-view={activeView}>
          <div className={styles.pageLabelRow}>
            <p className={styles.pageSectionLabel}>{activePageLabel}</p>
            {activeView === "board" ? (
              <div className={styles.weekSpinner}>
                <button
                  type="button"
                  className={styles.spinnerButton}
                  aria-label="Previous week"
                  onClick={() => setWeekStart((current) => addDays(current, -7))}
                >
                  <span className={styles.spinnerTriangleLeft} />
                </button>
                <p>{isoToLabel(dates[0])} - {isoToLabel(dates[dates.length - 1])}</p>
                <button
                  type="button"
                  className={styles.spinnerButton}
                  aria-label="Next week"
                  onClick={() => setWeekStart((current) => addDays(current, 7))}
                >
                  <span className={styles.spinnerTriangleRight} />
                </button>
              </div>
            ) : null}
          </div>

          {activeView === "board" ? (
            <>
              <div className={styles.boardPageSwitch}>
                <div className={styles.boardPageTabs}>
                  {currentBoardPages.map((page) => (
                    <button
                      key={page.key}
                      type="button"
                      className={styles.boardPageButton}
                      data-active={activeBoardPage === page.key}
                      onClick={() => handleOutsideNavigation(() => setActiveBoardPage(page.key))}
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
                <div className={styles.boardViewActions}>
                  <button
                    type="button"
                    className={styles.viewIconToggle}
                    data-active={boardLayout !== "board"}
                    aria-label={boardLayout === "board" ? "Switch to list view" : "Switch to board view"}
                    onClick={() => handleOutsideNavigation(() => setBoardLayout((current) => (current === "board" ? "list" : "board")))}
                  >
                    <span className={styles.viewIcon} data-kind={boardLayout === "board" ? "list" : "board"} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.viewIconToggle}
                    data-active={staffView}
                    aria-label={staffView ? "Switch to session view" : "Switch to staff view"}
                    onClick={() => handleOutsideNavigation(() => setStaffView((current) => !current))}
                  >
                    <span className={staffView ? styles.staffIcon : styles.sessionIcon} aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                </div>
              </div>
              {boardLayout === "board" ? (
              <section className={styles.boardFrame}>
                <div className={styles.boardTop}>
                  <Image src="/rfppu-mark.png" alt="" width={44} height={44} className={styles.logoMark} priority />
                  <div className={styles.brandTapTarget} onClick={handleBrandTap} role="button" tabIndex={0} onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleBrandTap();
                    }
                  }}>
                  <div className={styles.boardTitles}>
                    <div className={styles.titleStack}>
                      <strong>The Royal Free London</strong>
                      <strong>Private Patients Unit</strong>
                    </div>
                    <span>Hadley Wood Hospital</span>
                    <div className={styles.weekSpinner}>
                      <button
                        type="button"
                        className={styles.spinnerButton}
                        aria-label="Previous week"
                        onClick={() => setWeekStart((current) => addDays(current, -7))}
                      >
                        <span className={styles.spinnerTriangleLeft} />
                      </button>
                      <p>{isoToLabel(dates[0])} - {isoToLabel(dates[dates.length - 1])}</p>
                      <button
                        type="button"
                        className={styles.spinnerButton}
                        aria-label="Next week"
                        onClick={() => setWeekStart((current) => addDays(current, 7))}
                      >
                        <span className={styles.spinnerTriangleRight} />
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className={styles.themeToggle}>
                    <button
                      type="button"
                      className={styles.themeIconButton}
                      aria-label={theme === "light" ? "Switch to black mode" : "Switch to light mode"}
                      onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
                    >
                      {theme === "light" ? "◐" : "◑"}
                    </button>
                  </div>
                </div>

                <div className={styles.columnHeaderRow}>
                  <div className={styles.sideStub} />
                  <div className={`${styles.columnHeaders} ${!staffView && activeBoardPage === "outpatient" ? styles.outpatientColumnHeaders : ""}`}>
                    {!staffView && activeBoardPage === "outpatient" ? (
                      <span className={styles.outpatientHeaderGroup}>Clinics 1-10</span>
                    ) : (
                      (staffView ? currentStaffBoardConfig.columns : theatreResources).map((resource) => (
                        <span key={resource.id}>{resource.label}</span>
                      ))
                    )}
                  </div>
                </div>

                <div className={styles.weekBoard}>
                  {staffView
                    ? staffBoardDays.map((day) => (
                        <section key={day.date} className={styles.dayBoard}>
                          <div className={styles.dayMarker}>
                            <span>{weekdayShort(day.date)}</span>
                            <strong>{dateShort(day.date)}</strong>
                            {currentStaffBoardConfig.splitBySession ? (
                              <>
                                <em className={styles.daySessionTop}>AM</em>
                                <em className={styles.daySessionBottom}>PM</em>
                              </>
                            ) : null}
                          </div>

                          <div className={styles.dayContent}>
                            {day.rows.map((row) => (
                              <div key={`${day.date}-${row.session ?? "all"}`} className={styles.sessionLine}>
                                <div className={styles.sessionCells}>
                                  {row.columns.map(({ column, assignment }) => (
                                    <div key={`${day.date}-${row.session ?? "all"}-${column.id}`} className={styles.resourceLane}>
                                      {assignment ? (
                                        <article className={styles.staffCard}>
                                          <strong>{assignment.lead}</strong>
                                          <p>{currentStaffBoardConfig.splitBySession ? `${column.label} staff` : column.label}</p>
                                          <div className={styles.staffTeam}>
                                            {assignment.team.map((member) => (
                                              <span key={`${assignment.id}-${member.role}-${member.name}`}>
                                                <b>{member.role}</b> {member.name}
                                              </span>
                                            ))}
                                          </div>
                                        </article>
                                      ) : (
                                        <article className={styles.staffCard} data-empty="true">
                                          <strong>No staff assigned</strong>
                                          <p>{currentStaffBoardConfig.splitBySession ? `${column.shortLabel} ${row.session}` : column.label}</p>
                                        </article>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))
                    : activeBoardPage === "outpatient"
                      ? outpatientBoardDays.map((day) => (
                          <section key={day.date} className={styles.dayBoard}>
                            <div className={styles.dayMarker}>
                              <span>{weekdayShort(day.date)}</span>
                              <strong>{dateShort(day.date)}</strong>
                            </div>

                            <div className={styles.dayContent}>
                              <div className={styles.sessionLine}>
                                <div className={styles.sessionCells}>
                                  {day.columns.map(({ column, bookings: cellBookings }) => (
                                    <div key={`${day.date}-${column.id}`} className={styles.resourceLane}>
                                      {cellBookings.length > 0 ? (
                                        cellBookings.map((booking) => (
                                          <button
                                            key={booking.id}
                                            type="button"
                                            className={styles.boardCell}
                                            data-fill={getBookingFill(booking.status)}
                                            onContextMenu={(event) => {
                                              event.preventDefault();
                                              openStatusMenu(booking.id, event.currentTarget);
                                            }}
                                            onTouchStart={(event) => startTileLongPress(booking.id, event.currentTarget)}
                                            onTouchEnd={clearLongPressTimer}
                                            onTouchCancel={clearLongPressTimer}
                                            onClick={() => openDrawerForSlot(day.date, column.id, booking.session, booking.id)}
                                          >
                                            <strong>{booking.consultant}</strong>
                                            <p>{booking.specialty.name}</p>
                                            <div className={styles.cellFooter}>
                                              <div className={styles.cellCounts}>
                                                {booking.nhsCount > 0 ? <span className={styles.nhsCount}><i className={styles.nhsDot} /> {booking.nhsCount}</span> : null}
                                                {booking.ppCount > 0 ? <span className={styles.ppCount}><i className={styles.ppDot} /> {booking.ppCount}</span> : null}
                                              </div>
                                              <span className={styles.cellTime}>{booking.timeLabel}</span>
                                            </div>
                                          </button>
                                        ))
                                      ) : (
                                        <button
                                          type="button"
                                          className={styles.boardCell}
                                          data-fill="empty"
                                          onClick={() => openDrawerForSlot(day.date, column.id, "AM")}
                                        >
                                          <span className={styles.emptyCellPlus}>+</span>
                                          <span className={styles.emptyCellLabel}>{column.shortLabel}</span>
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>
                        ))
                      : boardDays.map((day) => (
                        <section key={day.date} className={styles.dayBoard}>
                          <div className={styles.dayMarker}>
                            <span>{weekdayShort(day.date)}</span>
                            <strong>{dateShort(day.date)}</strong>
                            <em className={styles.daySessionTop}>AM</em>
                            <em className={styles.daySessionBottom}>PM</em>
                          </div>

                          <div className={styles.dayContent}>
                            {day.slots.map((slot) => (
                              <div key={`${day.date}-${slot.session}`} className={styles.sessionLine}>
                                <div className={styles.sessionCells}>
                                  {slot.resources.map(({ resource, bookings: cellBookings }) => (
                                    <div key={`${day.date}-${slot.session}-${resource.id}`} className={styles.resourceLane}>
                                      {cellBookings.length > 0 ? (
                                        cellBookings.map((booking) => (
                                          <button
                                            key={booking.id}
                                            type="button"
                                            className={styles.boardCell}
                                            data-fill={getBookingFill(booking.status)}
                                            onContextMenu={(event) => {
                                              event.preventDefault();
                                              openStatusMenu(booking.id, event.currentTarget);
                                            }}
                                            onTouchStart={(event) => startTileLongPress(booking.id, event.currentTarget)}
                                            onTouchEnd={clearLongPressTimer}
                                            onTouchCancel={clearLongPressTimer}
                                            onClick={() => openDrawerForSlot(day.date, resource.id, slot.session, booking.id)}
                                          >
                                            <strong>{booking.consultant}</strong>
                                            <p>{booking.specialty.name}</p>
                                            <div className={styles.cellFooter}>
                                              <div className={styles.cellCounts}>
                                                {booking.nhsCount > 0 ? <span className={styles.nhsCount}><i className={styles.nhsDot} /> {booking.nhsCount}</span> : null}
                                                {booking.ppCount > 0 ? <span className={styles.ppCount}><i className={styles.ppDot} /> {booking.ppCount}</span> : null}
                                              </div>
                                              <span className={styles.cellTime}>{booking.timeLabel}</span>
                                            </div>
                                          </button>
                                        ))
                                      ) : (
                                        <button
                                          type="button"
                                          className={styles.boardCell}
                                          data-fill="empty"
                                          onClick={() => openDrawerForSlot(day.date, resource.id, slot.session)}
                                        >
                                          <span className={styles.emptyCellPlus}>+</span>
                                          <span className={styles.emptyCellLabel}>{resource.shortLabel} {slot.session}</span>
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                </div>
              </section>
              ) : (
                <section className={`${styles.viewStack} ${styles.compactView} ${styles.boardEmbeddedList}`}>
                  <div className={styles.listFilters}>
                    <label>
                      <span>From</span>
                      <input type="date" value={listDateFrom} onChange={(event) => setListDateFrom(event.target.value)} />
                    </label>
                    <label>
                      <span>To</span>
                      <input type="date" value={listDateTo} onChange={(event) => setListDateTo(event.target.value)} />
                    </label>
                    {staffView ? (
                      <>
                        <label>
                          <span>Resource</span>
                          <select value={listResourceFilter} onChange={(event) => setListResourceFilter(event.target.value)}>
                            <option value="">All</option>
                            {resources.map((resource) => (
                              <option key={resource.id} value={resource.id}>{resource.label}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <span>Assignment</span>
                          <select value={staffAssignmentFilter} onChange={(event) => setStaffAssignmentFilter(event.target.value)}>
                            <option value="">All</option>
                            <option value="assigned">Assigned</option>
                            <option value="unassigned">Unassigned</option>
                          </select>
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          <span>Consultant</span>
                          <select value={listConsultantFilter} onChange={(event) => setListConsultantFilter(event.target.value)}>
                            <option value="">All</option>
                            {listConsultantOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <span>Specialty</span>
                          <select value={listSpecialtyFilter} onChange={(event) => setListSpecialtyFilter(event.target.value)}>
                            <option value="">All</option>
                            {listSpecialtyOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                      </>
                    )}
                  </div>
                  <div className={styles.catalogue}>
                    {boardListSections.map((section) => (
                      <article key={section.id} className={styles.compactCatalogueItem}>
                        <div className={styles.registrySectionHeader}>
                          <button type="button" className={styles.registrySectionToggle} onClick={() => toggleBoardListSection(section.id)}>
                            <strong>{section.title}</strong>
                            <span>{section.subtitle}</span>
                            <span className={styles.mobileOnly}>{expandedBoardListSections.includes(section.id) ? "▾" : "▸"}</span>
                          </button>
                        </div>
                        {expandedBoardListSections.includes(section.id) ? (
                          <div className={styles.listRows}>
                            {staffView
                              ? (section.rows as typeof visibleBoardStaffAssignments).map((row) => (
                                  <article key={row.id} className={`${styles.detailCard} ${styles.listRowCard}`}>
                                    <div className={styles.listRowTop}>
                                      <div>
                                        <strong>{row.resource.label}</strong>
                                        <span>{row.session}</span>
                                      </div>
                                      <div className={styles.rotaAssignmentTeam}>
                                        {row.assignment ? (
                                          <>
                                            <strong className={styles.rotaLead}>{formatStaffDisplayName(row.assignment.lead)}</strong>
                                            {row.assignment.team.map((member) => (
                                              <span key={`${row.assignment?.id}-${member.role}-${member.name}`}>
                                                {member.role} {formatStaffDisplayName(member.name)}
                                              </span>
                                            ))}
                                          </>
                                        ) : (
                                          <span className={styles.muted}>Unassigned</span>
                                        )}
                                      </div>
                                    </div>
                                  </article>
                                ))
                              : (section.rows as typeof visibleBoardListBookings).map((booking) => (
                                  <article key={booking.id} className={`${styles.detailCard} ${styles.listRowCard}`} data-state={booking.capacityState}>
                                    <div className={styles.listRowTop}>
                                      <div>
                                        <strong>{booking.consultant}</strong>
                                        <span>{booking.session}</span>
                                      </div>
                                      <div className={styles.listRowTotals}>
                                        <span>Pts {totalPatientsByDate[booking.date] ?? booking.patientCount}</span>
                                        <span>Staff {totalStaffByDate[booking.date] ?? 0}</span>
                                      </div>
                                    </div>
                                    <div className={styles.listRowFacts}>
                                      <div className={styles.listRowMeta}>
                                        <span>{booking.specialty.name}</span>
                                        <span>{booking.resource.label}</span>
                                        <span>{booking.timeLabel}</span>
                                      </div>
                                    </div>
                                  </article>
                                ))}
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                  <div className={styles.listSummaryBar}>
                    <span>{staffView ? "Total assignments" : "Total procedures"}</span>
                    <strong>{staffView ? visibleBoardStaffAssignments.filter((item) => item.assignment).length : visibleBoardListBookings.reduce((sum, booking) => sum + booking.procedureIds.length, 0)}</strong>
                  </div>
                </section>
              )}
            </>
          ) : null}

          {activeView === "lists" && false ? (
            <section className={`${styles.viewStack} ${styles.compactView}`}>
              <div className={styles.listFilters}>
                <label>
                  <span>From</span>
                  <input type="date" value={listDateFrom} onChange={(event) => setListDateFrom(event.target.value)} />
                </label>
                <label>
                  <span>To</span>
                  <input type="date" value={listDateTo} onChange={(event) => setListDateTo(event.target.value)} />
                </label>
                <label>
                  <span>Consultant</span>
                  <select value={listConsultantFilter} onChange={(event) => setListConsultantFilter(event.target.value)}>
                    <option value="">All</option>
                    {listConsultantOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Specialty</span>
                  <select value={listSpecialtyFilter} onChange={(event) => setListSpecialtyFilter(event.target.value)}>
                    <option value="">All</option>
                    {listSpecialtyOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.listRows}>
                {visibleListBookings.map((booking) => (
                  <article key={booking.id} className={`${styles.detailCard} ${styles.listRowCard}`} data-state={booking.capacityState}>
                    <div className={styles.listRowTop}>
                      <div>
                        <strong>{booking.consultant}</strong>
                      </div>
                      <span>{isoToLabel(booking.date)}</span>
                    </div>
                    <div className={styles.listRowFacts}>
                      <div className={styles.listRowMeta}>
                        <span>{booking.specialty.name}</span>
                        <span>{booking.resource.label}</span>
                        <span>{booking.timeLabel}</span>
                      </div>
                      <div className={styles.listRowTotals}>
                        <span>Pts {totalPatientsByDate[booking.date] ?? booking.patientCount}</span>
                        <span>Staff {totalStaffByDate[booking.date] ?? 0}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.listSummaryBar}>
                <span>Total procedures</span>
                <strong>{visibleProcedureTotal}</strong>
              </div>
            </section>
          ) : null}

          {activeView === "specialties" && false ? (
            <section className={`${styles.viewStack} ${styles.compactView}`}>
              <div className={`${styles.catalogue} ${styles.compactCatalogue}`}>
                {specialties.map((specialty) => (
                  <article key={specialty.id} className={`${styles.catalogueItem} ${styles.compactCatalogueItem}`}>
                    <div className={styles.registrySectionHeader}>
                      <button type="button" className={styles.registrySectionToggle} onClick={() => toggleSpecialtySection(specialty.id)}>
                        <strong>{specialty.name}</strong>
                        <span className={styles.desktopOnly}>{expandedSpecialtyIds.includes(specialty.id) ? "Hide" : "Show"}</span>
                        <span className={styles.mobileOnly}>{expandedSpecialtyIds.includes(specialty.id) ? "▾" : "▸"}</span>
                      </button>
                      <button type="button" className={styles.registryHeaderAction} onClick={() => startConsultantAdd(specialty.id)}>
                        <span className={styles.desktopOnly}>Add consultant</span>
                        <span className={styles.mobileOnly}>＋</span>
                      </button>
                    </div>
                    {expandedSpecialtyIds.includes(specialty.id) ? (
                      <>
                        <div className={styles.registrySectionActions}>
                          <button type="button" className={styles.registryAddButton} onClick={() => startConsultantAdd(specialty.id)}>
                            <span className={styles.desktopOnly}>Add consultant</span>
                            <span className={styles.mobileOnly}>+</span>
                          </button>
                        </div>
                        {addingSpecialtyId === specialty.id ? (
                          <form className={`${styles.form} ${styles.compactForm} ${styles.registryInlineForm}`} onSubmit={handleConsultantSubmit}>
                            <div className={styles.formGrid}>
                              <label>
                                <span>Last name</span>
                                <input value={consultantForm.lastName} onChange={(event) => setConsultantForm((current) => ({ ...current, lastName: event.target.value }))} placeholder="Shah" required />
                              </label>
                              <label>
                                <span>First name</span>
                                <input value={consultantForm.firstName} onChange={(event) => setConsultantForm((current) => ({ ...current, firstName: event.target.value }))} placeholder="Ravi" required />
                              </label>
                            </div>
                            <label>
                              <span>Procedures</span>
                              <div className={styles.procedureBuilder}>
                                <input value={consultantProcedureInput} onChange={(event) => setConsultantProcedureInput(event.target.value)} placeholder="Add procedure" />
                                <button type="button" className={styles.secondaryButton} onClick={handleAddConsultantProcedure}>Add</button>
                              </div>
                            </label>
                            <div className={styles.ruleChips}>
                              {consultantForm.procedures.map((procedureName) => (
                                <button key={procedureName} type="button" className={styles.registryChip} onClick={() => handleRemoveConsultantProcedure(procedureName)}>
                                  {procedureName}
                                  <span className={styles.desktopOnly}> Remove</span>
                                  <span className={styles.mobileOnly}> ×</span>
                                </button>
                              ))}
                            </div>
                            <div className={styles.formGrid}>
                              <label>
                                <span>RN</span>
                                <input value={consultantForm.rnRequired} onChange={(event) => setConsultantForm((current) => ({ ...current, rnRequired: event.target.value }))} inputMode="numeric" />
                              </label>
                              <label>
                                <span>ODP</span>
                                <input value={consultantForm.odpRequired} onChange={(event) => setConsultantForm((current) => ({ ...current, odpRequired: event.target.value }))} inputMode="numeric" />
                              </label>
                              <label>
                                <span>HCA</span>
                                <input value={consultantForm.hcaRequired} onChange={(event) => setConsultantForm((current) => ({ ...current, hcaRequired: event.target.value }))} inputMode="numeric" />
                              </label>
                            </div>
                            <div className={styles.registryEditActions}>
                              <button type="button" className={styles.secondaryButton} onClick={cancelConsultantAdd}>
                                <span className={styles.desktopOnly}>Cancel</span>
                                <span className={styles.mobileOnly}>×</span>
                              </button>
                              <button type="submit" className={styles.primaryButton}>
                                <span className={styles.desktopOnly}>Save</span>
                                <span className={styles.mobileOnly}>✓</span>
                              </button>
                            </div>
                          </form>
                        ) : null}
                        <div className={styles.registryConsultantTable}>
                          <div className={styles.registryTableHead}>
                            <span>Last name</span>
                            <span>First name</span>
                            <span>Specialty</span>
                          </div>
                          {consultants
                            .filter((consultant) => consultant.specialtyId === specialty.id)
                            .map((consultant) => (
                              <div key={consultant.id} className={styles.registryConsultantBlock}>
                                <div className={styles.registryConsultantRow}>
                                  <span>{consultant.lastName}</span>
                                  <span>{consultant.firstName}</span>
                                  <div className={styles.registryRowActions}>
                                    <span>{specialty.name}</span>
                                    <button type="button" className={styles.registryInlineButton} onClick={() => startConsultantEdit(consultant)}>
                                      <span className={styles.desktopOnly}>Edit</span>
                                      <span className={styles.mobileOnly}>✎</span>
                                    </button>
                                    <button type="button" className={styles.registryInlineButton} onClick={() => openConsultantDetails(consultant.id)}>
                                      <span className={styles.desktopOnly}>{expandedConsultantId === consultant.id ? "Hide" : "Expand"}</span>
                                      <span className={styles.mobileOnly}>{expandedConsultantId === consultant.id ? "▾" : "▸"}</span>
                                    </button>
                                  </div>
                                </div>
                                {expandedConsultantId === consultant.id ? (
                                  <div className={styles.registryConsultantDetail}>
                                    {editingConsultantId === consultant.id && consultantEditDraft ? (
                                      <>
                                        <div className={styles.formGrid}>
                                          <label>
                                            <span>Last name</span>
                                            <input value={consultantEditDraft.lastName} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, lastName: event.target.value } : current)} />
                                          </label>
                                          <label>
                                            <span>First name</span>
                                            <input value={consultantEditDraft.firstName} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, firstName: event.target.value } : current)} />
                                          </label>
                                          <label>
                                            <span>Specialty</span>
                                            <select value={consultantEditDraft.specialtyId} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, specialtyId: event.target.value } : current)}>
                                              {specialties.map((option) => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                              ))}
                                            </select>
                                          </label>
                                        </div>
                                        <label>
                                          <span>Procedures</span>
                                          <div className={styles.procedureBuilder}>
                                            <input value={consultantEditProcedureInput} onChange={(event) => setConsultantEditProcedureInput(event.target.value)} placeholder="Add procedure" />
                                            <button type="button" className={styles.secondaryButton} onClick={addConsultantEditProcedure}>Add</button>
                                          </div>
                                        </label>
                                        <div className={styles.ruleChips}>
                                          {consultantEditDraft.procedures.map((procedureName) => (
                                            <button key={procedureName} type="button" className={styles.registryChip} onClick={() => removeConsultantEditProcedure(procedureName)}>
                                              {procedureName}
                                              <span className={styles.desktopOnly}> Remove</span>
                                              <span className={styles.mobileOnly}> ×</span>
                                            </button>
                                          ))}
                                        </div>
                                        <div className={styles.formGrid}>
                                          <label>
                                            <span>RN</span>
                                            <input value={consultantEditDraft.rnRequired} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, rnRequired: event.target.value } : current)} inputMode="numeric" />
                                          </label>
                                          <label>
                                            <span>ODP</span>
                                            <input value={consultantEditDraft.odpRequired} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, odpRequired: event.target.value } : current)} inputMode="numeric" />
                                          </label>
                                          <label>
                                            <span>HCA</span>
                                            <input value={consultantEditDraft.hcaRequired} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, hcaRequired: event.target.value } : current)} inputMode="numeric" />
                                          </label>
                                        </div>
                                        <div className={styles.registryEditActions}>
                                          <button type="button" className={styles.secondaryButton} onClick={cancelConsultantEdit}>
                                            <span className={styles.desktopOnly}>Cancel</span>
                                            <span className={styles.mobileOnly}>×</span>
                                          </button>
                                          <button type="button" className={styles.primaryButton} onClick={() => void saveConsultantEdit()}>
                                            <span className={styles.desktopOnly}>Save</span>
                                            <span className={styles.mobileOnly}>✓</span>
                                          </button>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className={styles.compactMetaRow}>
                                          <span>{consultant.procedures.join(", ") || "No procedures"}</span>
                                        </div>
                                        <div className={styles.ruleChips}>
                                          <span>RN {consultant.rnRequired}</span>
                                          <span>ODP {consultant.odpRequired}</span>
                                          <span>HCA {consultant.hcaRequired}</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                        </div>
                      </>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "specialties" ? (
            <section className={`${styles.viewStack} ${styles.compactView}`}>
              {devMode ? (
                <article className={styles.registryDevPanel}>
                  <div className={styles.registryDevHeader}>
                    <strong>Dev Mode</strong>
                    <button type="button" className={styles.registryDevHide} onClick={() => setDevMode(false)}>
                      Hide
                    </button>
                  </div>
                  <form className={styles.registryDevForm} onSubmit={handleSpecialtySubmit}>
                    <input
                      value={specialtyForm.name}
                      onChange={(event) => setSpecialtyForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Add specialty"
                      required
                    />
                    <button type="submit" className={styles.registryDevAdd}>
                      Add specialty
                    </button>
                  </form>
                  <div className={styles.registryDevList}>
                    {specialties.map((specialty) => (
                      <div key={specialty.id} className={styles.registryDevItem}>
                        <span>{specialty.name}</span>
                        <button type="button" className={styles.registryDevRemove} onClick={() => void deleteSpecialty(specialty.id)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
              <div className={`${styles.catalogue} ${styles.compactCatalogue}`}>
                {specialties.map((specialty) => {
                  const specialtyConsultants = consultants.filter((consultant) => consultant.specialtyId === specialty.id);
                  const isExpanded = expandedSpecialtyIds.includes(specialty.id);

                  return (
                    <article key={specialty.id} className={`${styles.catalogueItem} ${styles.compactCatalogueItem}`}>
                      <div className={styles.registryPanelHeader}>
                        <button type="button" className={styles.registryPanelToggle} onClick={() => toggleSpecialtySection(specialty.id)}>
                          <div className={styles.registryPanelTitle}>
                            <strong>{specialty.name}</strong>
                            <span>{specialtyConsultants.length} consultants</span>
                          </div>
                          <span className={styles.registryPanelChevron} data-open={isExpanded} aria-hidden="true" />
                        </button>
                      </div>
                      {isExpanded ? (
                        <div className={styles.registryPanelBody}>
                          <div className={styles.registryPanelActions}>
                            <button type="button" className={styles.registryAddButton} onClick={() => startConsultantAdd(specialty.id)}>
                              Add consultant
                            </button>
                          </div>
                          {addingSpecialtyId === specialty.id ? (
                            <form className={`${styles.form} ${styles.compactForm} ${styles.registryInlineForm}`} onSubmit={handleConsultantSubmit}>
                              <div className={styles.registryInlineNameRow}>
                                <input value={consultantForm.lastName} onChange={(event) => setConsultantForm((current) => ({ ...current, lastName: event.target.value }))} placeholder="Last name" required />
                                <input value={consultantForm.firstName} onChange={(event) => setConsultantForm((current) => ({ ...current, firstName: event.target.value }))} placeholder="First name" required />
                              </div>
                              <div className={styles.registryProcedureSection}>
                                <div className={styles.registryProcedureHeader}>
                                  <span>Procedures under {consultantForm.lastName || "this consultant"}</span>
                                </div>
                                      <div className={styles.registryProcedureList}>
                                        {consultantForm.procedures.length > 0 ? (
                                          consultantForm.procedures.map((procedureName) => (
                                            <div key={procedureName} className={styles.registryProcedureItem}>
                                              <span className={styles.registryProcedureText}>{procedureName}</span>
                                              <button type="button" className={styles.registryProcedureRemove} onClick={() => handleRemoveConsultantProcedure(procedureName)} aria-label={`Remove ${procedureName}`}>
                                                Remove
                                              </button>
                                            </div>
                                          ))
                                        ) : (
                                          <span className={styles.registryProcedureEmpty}>No procedures added</span>
                                  )}
                                </div>
                                <div className={styles.registryPanelActions}>
                                  <button type="button" className={styles.registryAddButton} onClick={() => setAddingProcedureForNewConsultant((current) => !current)}>
                                    Add procedure
                                  </button>
                                </div>
                                {addingProcedureForNewConsultant ? (
                                  <>
                                    <div className={styles.registryInlineProcedureRow}>
                                      <input value={consultantProcedureInput} onChange={(event) => setConsultantProcedureInput(event.target.value)} placeholder="Procedure name" />
                                      <button type="button" className={styles.secondaryButton} onClick={handleAddConsultantProcedure}>Add</button>
                                    </div>
                                    {getProcedureSuggestions(
                                      consultantProcedureInput,
                                      procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                    ).length > 0 ? (
                                      <div className={styles.registrySuggestionList}>
                                        {getProcedureSuggestions(
                                          consultantProcedureInput,
                                          procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                        ).map((procedureName) => (
                                          <button key={procedureName} type="button" className={styles.registrySuggestionButton} onClick={() => selectConsultantProcedureSuggestion(procedureName)}>
                                            {procedureName}
                                          </button>
                                        ))}
                                      </div>
                                    ) : null}
                                  </>
                                ) : null}
                              </div>
                              <div className={styles.registryEditActions}>
                                <button type="button" className={styles.secondaryButton} onClick={cancelConsultantAdd}>
                                  Cancel
                                </button>
                                <button type="submit" className={styles.primaryButton}>
                                  Save
                                </button>
                              </div>
                            </form>
                          ) : null}
                          <div className={styles.registryCardList}>
                            {specialtyConsultants.map((consultant) => (
                              <div key={consultant.id} className={styles.registryCard}>
                                <div className={styles.registryCardButton}>
                                  <button type="button" className={styles.registryCardIdentityButton} onClick={() => openConsultantDetails(consultant)}>
                                    <div className={styles.registryCardIdentity}>
                                      <strong>{consultant.lastName}</strong>
                                      <span>{consultant.firstName}</span>
                                    </div>
                                  </button>
                                  {editingConsultantId === consultant.id ? (
                                    <div className={styles.registryInlineRowActions}>
                                      <button type="button" className={styles.registryEditLink} onClick={() => void deleteConsultant(consultant.id)}>
                                        Remove
                                      </button>
                                      <button type="button" className={styles.registryEditLink} data-strong="true" onClick={() => void saveConsultantEdit()}>
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    <button type="button" className={styles.registryEditLink} onClick={() => startConsultantEdit(consultant)}>
                                      Edit
                                    </button>
                                  )}
                                  <div className={styles.registryRowTools}>
                                    <button type="button" className={styles.registryChevronButton} onClick={() => openConsultantDetails(consultant)} aria-label={expandedConsultantId === consultant.id ? "Collapse consultant" : "Expand consultant"}>
                                      <span className={styles.registryCardChevron} data-open={expandedConsultantId === consultant.id} aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                                {expandedConsultantId === consultant.id && editingConsultantId === consultant.id && consultantEditDraft ? (
                                  <div className={styles.registryCardEditor}>
                                    <div className={styles.registryInlineNameRow}>
                                      <input value={consultantEditDraft.lastName} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, lastName: event.target.value } : current)} placeholder="Last name" />
                                      <input value={consultantEditDraft.firstName} onChange={(event) => setConsultantEditDraft((current) => current ? { ...current, firstName: event.target.value } : current)} placeholder="First name" />
                                    </div>
                                    <div className={styles.registryProcedureSection}>
                                      <div className={styles.registryProcedureHeader}>
                                        <span>Procedures under {consultantEditDraft.lastName || "this consultant"}</span>
                                      </div>
                                      <div className={styles.registryProcedureList}>
                                        {consultantEditDraft.procedures.length > 0 ? (
                                          consultantEditDraft.procedures.map((procedureName) => (
                                            <div key={procedureName} className={styles.registryProcedureItem}>
                                              <span className={styles.registryProcedureText}>{procedureName}</span>
                                              <button type="button" className={styles.registryProcedureRemove} onClick={() => removeConsultantEditProcedure(procedureName)} aria-label={`Remove ${procedureName}`}>
                                                Remove
                                              </button>
                                            </div>
                                          ))
                                        ) : (
                                          <span className={styles.registryProcedureEmpty}>No procedures added</span>
                                        )}
                                      </div>
                                      <div className={styles.registryPanelActions}>
                                        <button type="button" className={styles.registryAddButton} onClick={() => setAddingProcedureForEditConsultant((current) => !current)}>
                                          Add procedure
                                        </button>
                                      </div>
                                      {addingProcedureForEditConsultant ? (
                                        <>
                                          <div className={styles.registryInlineProcedureRowAlt}>
                                            <input value={consultantEditProcedureInput} onChange={(event) => setConsultantEditProcedureInput(event.target.value)} placeholder="Procedure name" />
                                            <button type="button" className={styles.secondaryButton} onClick={addConsultantEditProcedure}>Add</button>
                                          </div>
                                          {getProcedureSuggestions(
                                            consultantEditProcedureInput,
                                            procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                          ).length > 0 ? (
                                            <div className={styles.registrySuggestionList}>
                                              {getProcedureSuggestions(
                                                consultantEditProcedureInput,
                                                procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                              ).map((procedureName) => (
                                                <button key={procedureName} type="button" className={styles.registrySuggestionButton} onClick={() => selectConsultantEditProcedureSuggestion(procedureName)}>
                                                  {procedureName}
                                                </button>
                                              ))}
                                            </div>
                                          ) : null}
                                        </>
                                      ) : null}
                                    </div>
                                  </div>
                                ) : null}
                                    {/*
                                    <div className={styles.registryInlineProcedureRow}>
                                      <input value={consultantEditProcedureInput} onChange={(event) => setConsultantEditProcedureInput(event.target.value)} placeholder="Add procedure" />
                                      <button type="button" className={styles.secondaryButton} onClick={addConsultantEditProcedure}>Add</button>
                                    </div>
                                    {getProcedureSuggestions(
                                      consultantEditProcedureInput,
                                      procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                    ).length > 0 ? (
                                      <div className={styles.registrySuggestionList}>
                                        {getProcedureSuggestions(
                                          consultantEditProcedureInput,
                                          procedures.filter((procedure) => procedure.specialtyId === specialty.id).map((procedure) => procedure.name),
                                        ).map((procedureName) => (
                                          <button key={procedureName} type="button" className={styles.registrySuggestionButton} onClick={() => selectConsultantEditProcedureSuggestion(procedureName)}>
                                            {procedureName}
                                          </button>
                                        ))}
                                      </div>
                                    ) : null}
                                    <div className={styles.ruleChips}>
                                      {consultantEditDraft.procedures.map((procedureName) => (
                                        <button key={procedureName} type="button" className={styles.registryChip} onClick={() => removeConsultantEditProcedure(procedureName)}>
                                          {procedureName}
                                          <span> −</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                    */}
                                  {expandedConsultantId === consultant.id && editingConsultantId !== consultant.id ? (
                                    <div className={styles.registryCardEditor}>
                                      <div className={styles.registryExpandedMeta}>
                                        <span>{consultant.procedures.length} procedures</span>
                                      <div className={styles.registryExpandedActions}>
                                        <button
                                          type="button"
                                          className={styles.registryShowMoreButton}
                                          onClick={() => setExpandedProcedureConsultantId((current) => (current === consultant.id ? "" : consultant.id))}
                                        >
                                          {expandedProcedureConsultantId === consultant.id ? "Show less" : "Show more..."}
                                        </button>
                                      </div>
                                      </div>
                                      {expandedProcedureConsultantId === consultant.id ? (
                                        <div className={styles.registryProcedureList}>
                                          {consultant.procedures.map((procedureName) => {
                                            const matchedProcedure = procedures.find(
                                              (procedure) =>
                                                procedure.specialtyId === consultant.specialtyId &&
                                                procedure.name.toLowerCase() === procedureName.toLowerCase(),
                                            );

                                            return (
                                              <div key={`${consultant.id}-${procedureName}`} className={styles.registryProcedureDurationRow}>
                                                <span className={styles.registryProcedureText}>{procedureName}</span>
                                                <label className={styles.registryDurationField}>
                                                  <input
                                                    type="number"
                                                    min={0}
                                                    step={5}
                                                    value={matchedProcedure?.estimatedMinutes ?? 45}
                                                    onChange={(event) =>
                                                      void upsertProcedureDuration(
                                                        consultant.specialtyId,
                                                        procedureName,
                                                        Number(event.target.value || 0),
                                                      )
                                                    }
                                                  />
                                                  <em>mins</em>
                                                </label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : null}
                                    </div>
                                  ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {activeView === "procedures" ? (
            <section className={`${styles.viewStack} ${styles.compactView}`}>
              <div className={styles.notesPage}>
                <div className={styles.notesSearchBar}>
                  <input
                    value={notesSearch}
                    onChange={(event) => setNotesSearch(event.target.value)}
                    placeholder='Search notes, consultant, specialty, date, or "Pain Management"'
                  />
                </div>

                <div className={styles.notesFeed}>
                  {noteGroups.map((group) => (
                    <section key={group.key} className={styles.notesGroup} data-group={group.key}>
                      <div className={styles.notesGroupHeader}>
                        <strong>{group.label}</strong>
                        <span>{group.items.length} sessions</span>
                      </div>
                      <div className={styles.notesGroupBody}>
                        {group.items.map(({ booking, comments }) => {
                    const expanded = expandedNoteIds.includes(booking.id);
                    const specialty = specialtyMap[booking.specialtyId] ?? specialtyMap.endoscopy ?? specialties[0];
                    const specialtyName = specialty.listLabel || specialty.name;
                    const resourceLabel = resources.find((resource) => resource.id === booking.resourceId)?.label ?? booking.resourceId;

                          return (
                            <article key={booking.id} className={styles.noteCard} data-status={booking.status.toLowerCase()}>
                        <button type="button" className={styles.noteRow} onClick={() => toggleNoteExpanded(booking.id)} aria-expanded={expanded}>
                          <span className={styles.noteRowConsultant}>{booking.consultant}</span>
                          <span className={styles.noteRowMeta}>
                            {specialtyName} · {isoToLabel(booking.date)}
                          </span>
                        </button>

                        {expanded ? (
                          <div className={styles.noteExpanded}>
                            <div className={styles.noteSessionMeta}>
                              <span>{resourceLabel}</span>
                              <span>{booking.session}</span>
                              <span>{booking.timeLabel}</span>
                            </div>

                            <p className={styles.noteBody}>
                              {booking.notes.trim() || "No booking notes recorded for this session yet."}
                            </p>

                            <div className={styles.noteSocialRow}>
                              <button
                                type="button"
                                className={styles.noteLikeButton}
                                data-active={noteLiked[booking.id] ? "true" : "false"}
                                onClick={() => toggleNoteLike(booking.id)}
                              >
                                Like {noteLikes[booking.id] ?? 0}
                              </button>
                              <span className={styles.noteCommentCount}>{comments.length} comments</span>
                            </div>

                            <div className={styles.noteCommentComposer}>
                              <input
                                value={commentDrafts[booking.id] ?? ""}
                                onChange={(event) => setCommentDrafts((current) => ({ ...current, [booking.id]: event.target.value }))}
                                placeholder="Add a comment"
                              />
                              <button type="button" className={styles.secondaryButton} onClick={() => addNoteComment(booking.id)}>
                                Comment
                              </button>
                            </div>

                            <div className={styles.noteCommentsList}>
                              {comments.map((comment) => (
                                <div key={comment.id} className={styles.noteCommentItem}>
                                  <div className={styles.noteCommentHeader}>
                                    <strong>{comment.author}</strong>
                                    <span>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(comment.createdAt))}</span>
                                  </div>
                                  <p>{comment.body}</p>
                                  <button type="button" className={styles.noteCommentLike} onClick={() => toggleCommentLike(booking.id, comment.id)}>
                                    Like {comment.likes}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                        })}
                        {group.items.length === 0 ? <div className={styles.notesEmpty}>No session notes here.</div> : null}
                      </div>
                    </section>
                  ))}

                  {notesFeed.length === 0 ? <div className={styles.notesEmpty}>No matching session notes.</div> : null}
                </div>
              </div>
            </section>
          ) : null}

          {activeView === "blueprint" ? (
            <section className={styles.viewStack}>
              <div className={styles.rotaTabs}>
                {rotaTabs.map((tab) => (
                  <button key={tab.key} type="button" className={styles.rotaTabButton} data-active={activeRotaTab === tab.key} onClick={() => setActiveRotaTab(tab.key)}>
                    {tab.label}
                  </button>
                ))}
              </div>
              {activeRotaTab === "pool" ? (
                <div className={styles.rotaPoolLayout}>
                  <article className={`${styles.detailCard} ${styles.rotaImportCard}`}>
                    <div className={styles.detailHeader}>
                      <div>
                        <p className={styles.eyebrow}>Imported report</p>
                      </div>
                    </div>
                    <div className={styles.rotaImportMeta}>
                      <span>Source: {rotaImportMeta.source}</span>
                      <span>Date: {rotaImportMeta.startDate}{rotaImportMeta.endDate ? ` - ${rotaImportMeta.endDate}` : ""}</span>
                      <span>Unit: {rotaImportMeta.unit}</span>
                      <span>Uploaded: {rotaImportMeta.uploadedAt ? dateTimeLabel(rotaImportMeta.uploadedAt) : "Not archived yet"}</span>
                    </div>
                    <button type="button" className={styles.rotaArchiveLink} onClick={() => setRotaArchiveOpen((current) => !current)}>
                      {rotaArchiveOpen ? "Hide archive list" : "View archive list"}
                    </button>
                    {rotaArchiveOpen ? (
                      <div className={styles.rotaArchiveList}>
                        {rotaImportHistory.length > 0 ? (
                          rotaImportHistory.map((item) => (
                            <article key={item.id} className={styles.rotaArchiveItem}>
                              <strong>{item.meta.source}</strong>
                              <span>{item.meta.startDate}{item.meta.endDate ? ` - ${item.meta.endDate}` : ""}</span>
                              <span>{item.meta.uploadedAt ? dateTimeLabel(item.meta.uploadedAt) : "Not archived yet"}</span>
                              <button type="button" className={styles.rotaArchiveDelete} onClick={() => void deleteRotaImport(item.id)}>
                                Remove
                              </button>
                            </article>
                          ))
                        ) : (
                          <span className={styles.rotaArchiveEmpty}>No archived uploads yet.</span>
                        )}
                      </div>
                    ) : null}
                  </article>
                  <div className={styles.rotaControls}>
                    <label className={styles.rotaUploadButton}>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (file) await handleRotaUpload(file);
                        }}
                      />
                      <span className={styles.rotaUploadIcon} aria-hidden="true" />
                      <span>{rotaImportMeta.uploadedAt ? "Update" : "Upload"}</span>
                    </label>
                    <button
                      type="button"
                      className={styles.rotaFilterButton}
                      aria-expanded={rotaFiltersOpen}
                      onClick={() => setRotaFiltersOpen((current) => !current)}
                    >
                      <span className={styles.rotaFilterIcon} aria-hidden="true" />
                      <span>Filter</span>
                    </button>
                  </div>
                  <div className={styles.rotaDateStrip}>
                    <div className={styles.rotaDateMonth}>
                      <span>{monthLabel(rotaMonthAnchor)}</span>
                      <strong>{yearLabel(rotaMonthAnchor)}</strong>
                    </div>
                    <div className={styles.rotaDateTrack}>
                        {rotaMonthDates.map((option) => {
                          const hasRows = rotaDateOptions.includes(option);
                          const isActive = activeDateFilter === option;
                          const isWeekend = ["S", "SU"].includes(weekdayShort(option));

                          return (
                            <button
                              key={option}
                              type="button"
                              className={styles.rotaDateCell}
                              data-active={isActive}
                              data-has-rows={hasRows}
                              data-weekend={isWeekend}
                              onClick={() => setActiveDateFilter((current) => (current === option ? "" : option))}
                            >
                            <span>{weekdayShort(option)}</span>
                            <strong>{Number(dateShort(option))}</strong>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {rotaFiltersOpen ? (
                    <div className={styles.rotaFilterPanel}>
                      <label>
                        <span>Role</span>
                        <select value={activeRoleFilter} onChange={(event) => setActiveRoleFilter(event.target.value)}>
                          <option value="">All</option>
                          {rotaRoleOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Fulfilment</span>
                        <select value={activeFulfilmentFilter} onChange={(event) => setActiveFulfilmentFilter(event.target.value)}>
                          <option value="">All</option>
                          {rotaFulfilmentOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Date</span>
                        <select value={activeDateFilter} onChange={(event) => setActiveDateFilter(event.target.value)}>
                          <option value="">All</option>
                          {rotaDateOptions.map((option) => (
                            <option key={option} value={option}>{isoToLabel(option)}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Unit</span>
                        <select value={activeUnitFilter} onChange={(event) => setActiveUnitFilter(event.target.value)}>
                          <option value="">All</option>
                          {rotaUnitOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ) : null}
                  <div className={styles.rotaPoolRows}>
                    {filteredRotaPool.map((row) => (
                      <article key={row.id} className={styles.rotaPoolRow}>
                        <div>
                          <strong>{row.name}</strong>
                          <p>{row.classification}</p>
                        </div>
                        <div className={styles.rotaMeta}>
                          <span>{isoToLabel(row.date)}</span>
                          <span>{row.shiftTime}</span>
                          <span>{row.fulfilment}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.rotaAssignmentGrid}>
                  {rotaAssignments.map((slot) => (
                    <article key={`${slot.date}-${slot.session}`} className={styles.detailCard}>
                      <div className={styles.detailHeader}>
                        <div>
                          <strong>{isoToLabel(slot.date)}</strong>
                          <p>{slot.session}</p>
                        </div>
                      </div>
                      <div className={styles.rotaAssignmentRows}>
                        {slot.resources.map(({ resource, assignment }) => (
                          <div key={`${slot.date}-${slot.session}-${resource.id}`} className={styles.rotaAssignmentRow}>
                            <strong>{resource.label}</strong>
                            {assignment ? (
                              <div className={styles.rotaAssignmentTeam}>
                                <span className={styles.rotaLead}>{formatStaffDisplayName(assignment.lead)}</span>
                                {assignment.team.map((member) => (
                                  <span key={`${assignment.id}-${member.role}-${member.name}`}>
                                    <b>{member.role}</b> {formatStaffDisplayName(member.name)}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className={styles.muted}>Unassigned</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {false ? (
            <section className={styles.viewStack}>
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.eyebrow}>Blueprint</p>
                  <h2>Planning notes</h2>
                </div>
              </div>
              <div className={styles.cardsGrid}>
                <article className={styles.detailCard}>
                  <p className={styles.eyebrow}>Current logic</p>
                  <div className={styles.blueprintList}>
                    <span>Board mirrors the screenshot’s 5-day slot wall structure.</span>
                    <span>Tiles show consultant, specialty, time, and NHS/PP counts only.</span>
                    <span>Light and black modes share the same layout and workflow.</span>
                  </div>
                </article>
                <article className={styles.detailCard}>
                  <p className={styles.eyebrow}>Next risks</p>
                  <div className={styles.riskList}>
                    {nextRisks.map((booking) => (
                      <div key={booking.id} className={styles.riskRow}>
                        <strong>{booking.resource.label}</strong>
                        <span>{isoToLabel(booking.date)} {booking.session}</span>
                        <span>{booking.specialty.name}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>
          ) : null}
        </section>

        {activeView === "board" && !staffView && (activeBoardPage === "day-surgery" || activeBoardPage === "outpatient") ? (
          <button type="button" className={styles.floatingBookButton} aria-label="Book a session" onClick={openQuickBooking}>
            <span>+</span>
          </button>
        ) : null}

        <nav className={styles.bottomNav}>
          {navItems.map((item) => (
            <button key={item.key} type="button" className={styles.bottomNavButton} data-active={activeView === item.key} onClick={() => handleOutsideNavigation(() => setActiveView(item.key))}>
              {item.short}
            </button>
          ))}
          <div className={styles.bottomNavMenu}>
            <button
              type="button"
              className={styles.themeMenuButton}
              aria-label="Open settings"
              aria-expanded={themeMenuOpen}
              onClick={() => setThemeMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
            {themeMenuOpen ? (
              <div className={styles.themeMenu}>
                <button
                  type="button"
                  className={styles.themeMenuItem}
                  data-active={theme === "light"}
                  onClick={() => {
                    setTheme("light");
                    setThemeMenuOpen(false);
                  }}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={styles.themeMenuItem}
                  data-active={theme === "dark"}
                  onClick={() => {
                    setTheme("dark");
                    setThemeMenuOpen(false);
                  }}
                >
                  Black
                </button>
              </div>
            ) : null}
          </div>
        </nav>
      </main>

      <aside className={styles.drawer} data-open={drawerOpen} data-theme={theme}>
          <div className={styles.drawerHeader}>
            <button type="button" className={styles.drawerIcon} onClick={() => closeDrawer()}>✕</button>
          <strong>Book a List Slot</strong>
          <button type="submit" form="booking-form" className={styles.drawerIcon}>✓</button>
        </div>
        <form id="booking-form" className={styles.drawerForm} onSubmit={handleBookingSubmit}>
          {draftConflict ? (
            <div className={styles.drawerConflictBanner} role="alert">
              <strong>Timing conflict</strong>
              <span>
                {draftConflict.booking.consultant} already occupies this resource until {draftConflict.bookingFinish}. Suggested start {draftConflict.suggestedStart}.
              </span>
            </div>
          ) : null}
          <label>
            <span>Date</span>
            <input className={styles.drawerReadonly} type="date" value={draft.date} readOnly />
          </label>
          <label>
            <span>Specialty</span>
            <select required value={draft.specialtyId} onChange={(event) => setDraft((current) => ({ ...current, specialtyId: event.target.value, consultant: "", procedureIds: [] }))}>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
              ))}
            </select>
          </label>
          {isOutpatientDraft ? (
            <label>
              <span>Type</span>
              <select value={draft.appointmentType} onChange={(event) => setDraft((current) => ({ ...current, appointmentType: event.target.value as AppointmentType }))}>
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
          ) : null}
          <label>
            <span>Consultant</span>
            <select required value={draft.consultant} onChange={(event) => setDraft((current) => ({ ...current, consultant: event.target.value, procedureIds: [] }))}>
              <option value="">Select</option>
              {draftSpecialtyConsultants.map((consultant) => (
                <option key={consultant.id} value={consultant.name}>{consultant.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Session</span>
            <select className={styles.drawerReadonly} value={draft.session} disabled>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </label>
          <label>
            <span>Time</span>
            <div className={styles.drawerTimeField}>
              <input
                ref={timeInputRef}
                type="time"
                step={300}
                required
                value={draft.timeLabel}
                onChange={(event) =>
                  setDraft((current) => {
                    const nextTime = event.target.value;
                    const minutes = clockToMinutes(nextTime);
                    return {
                      ...current,
                      timeLabel: nextTime,
                      session: minutes === null ? current.session : minutesToSession(minutes),
                    };
                  })
                }
              />
              <button
                type="button"
                className={styles.drawerTimeButton}
                aria-label="Choose time"
                onClick={() => {
                  timeInputRef.current?.showPicker?.();
                  timeInputRef.current?.focus();
                }}
              >
                <span className={styles.drawerTimeIcon} />
              </button>
            </div>
          </label>
          {!isOutpatientDraft ? <div className={styles.drawerMetaBlock}>
            <div className={styles.drawerMetaRow}>
              <span>ETF</span>
              <strong>{draftTiming.finishMinutes === null ? "Set time" : minutesToClock(draftTiming.finishMinutes)}</strong>
            </div>
            <div className={styles.drawerMetaRow}>
              <span>Est. duration</span>
              <strong>{draftTiming.totalMinutes > 0 ? `${draftTiming.totalMinutes} mins` : "Select procedures"}</strong>
            </div>
            <div className={styles.drawerMetaRow}>
              <span>Turn around</span>
              <div className={styles.drawerTimeField}>
                <input
                  ref={turnaroundInputRef}
                  type="time"
                  step={300}
                  value={draft.turnaroundTime}
                  onChange={(event) => setDraft((current) => ({ ...current, turnaroundTime: event.target.value }))}
                />
                <button
                  type="button"
                  className={styles.drawerTimeButton}
                  aria-label="Choose turnaround"
                  onClick={() => {
                    turnaroundInputRef.current?.showPicker?.();
                    turnaroundInputRef.current?.focus();
                  }}
                >
                  <span className={styles.drawerTimeIcon} />
                </button>
              </div>
            </div>
          </div> : null}
          <div className={styles.drawerStepperGrid}>
            <label className={styles.drawerStepperField}>
              <span>NHS</span>
              <div className={styles.drawerStepper}>
                <input required value={draft.nhsCount} onChange={(event) => setDraft((current) => ({ ...current, nhsCount: event.target.value }))} inputMode="numeric" />
                <div className={styles.drawerStepperButtons}>
                  <button type="button" aria-label="Increase NHS count" onClick={() => setDraft((current) => ({ ...current, nhsCount: String(Number(current.nhsCount || 0) + 1) }))}>
                    <span className={styles.spinnerTriangleUp} />
                  </button>
                  <button type="button" aria-label="Decrease NHS count" onClick={() => setDraft((current) => ({ ...current, nhsCount: String(Math.max(0, Number(current.nhsCount || 0) - 1)) }))}>
                    <span className={styles.spinnerTriangleDown} />
                  </button>
                </div>
              </div>
            </label>
            <label className={styles.drawerStepperField}>
              <span>PP</span>
              <div className={styles.drawerStepper}>
                <input required value={draft.ppCount} onChange={(event) => setDraft((current) => ({ ...current, ppCount: event.target.value }))} inputMode="numeric" />
                <div className={styles.drawerStepperButtons}>
                  <button type="button" aria-label="Increase private patient count" onClick={() => setDraft((current) => ({ ...current, ppCount: String(Number(current.ppCount || 0) + 1) }))}>
                    <span className={styles.spinnerTriangleUp} />
                  </button>
                  <button type="button" aria-label="Decrease private patient count" onClick={() => setDraft((current) => ({ ...current, ppCount: String(Math.max(0, Number(current.ppCount || 0) - 1)) }))}>
                    <span className={styles.spinnerTriangleDown} />
                  </button>
                </div>
              </div>
            </label>
          </div>
          <div className={styles.drawerLockedField}>
            <span>Resource</span>
            <div className={styles.drawerLockedControl}>
              {resourceEditOpen ? (
                <select value={draft.resourceId} onChange={(event) => setDraft((current) => ({ ...current, resourceId: event.target.value }))}>
                  {resources.map((resource) => (
                    <option key={resource.id} value={resource.id}>{resource.label}</option>
                  ))}
                </select>
              ) : (
                <input className={styles.drawerReadonly} value={resources.find((resource) => resource.id === draft.resourceId)?.label ?? ""} readOnly />
              )}
              <button type="button" className={styles.drawerInlineAction} onClick={() => setResourceEditOpen((current) => !current)}>
                {resourceEditOpen ? "Done" : "Change"}
              </button>
            </div>
          </div>
          {!isOutpatientDraft ? <div className={styles.drawerChecklistBlock}>
            <span>Procedures</span>
            <div className={styles.drawerChecklistHeader} aria-hidden="true">
              <span />
              <span>Procedure</span>
              <span>Qty</span>
            </div>
            <div className={styles.drawerChecklist}>
              {draftAvailableProcedures.map((procedure) => (
                <div key={procedure.id} className={styles.drawerChecklistItem}>
                  <label className={styles.drawerChecklistMain}>
                    <input
                      type="checkbox"
                      checked={draft.procedureIds.includes(procedure.id)}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          procedureIds: event.target.checked
                            ? [...current.procedureIds, procedure.id]
                            : current.procedureIds.filter((id) => id !== procedure.id),
                        }))
                      }
                    />
                    <span className={styles.drawerChecklistText}>{procedure.name}</span>
                  </label>
                  <div className={styles.drawerProcedureQty}>
                    <div className={styles.drawerStepper}>
                      <input value={String(getProcedureQty(draft.procedureIds, procedure.id))} readOnly />
                      <div className={styles.drawerStepperButtons}>
                        <button
                          type="button"
                          aria-label={`Increase ${procedure.name} quantity`}
                          onClick={() =>
                            setDraft((current) => ({
                              ...current,
                              procedureIds: [...current.procedureIds, procedure.id],
                            }))
                          }
                        >
                          <span className={styles.spinnerTriangleUp} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Decrease ${procedure.name} quantity`}
                          onClick={() =>
                            setDraft((current) => {
                              const nextIds = [...current.procedureIds];
                              const index = nextIds.lastIndexOf(procedure.id);
                              if (index >= 0) nextIds.splice(index, 1);
                              return { ...current, procedureIds: nextIds };
                            })
                          }
                        >
                          <span className={styles.spinnerTriangleDown} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> : null}
          <div className={styles.drawerLockedField}>
            <span>Status</span>
            <input className={styles.drawerReadonly} value={draft.status} readOnly />
            <p className={styles.drawerHelperText}>New bookings start as Pending. Change status by long-pressing or right-clicking the tile after booking.</p>
          </div>
          <label>
            <span>Notes</span>
            <textarea value={draft.notes} onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))} rows={8} />
          </label>
          {draft.id ? (
            <button type="button" className={styles.secondaryButton} onClick={handleDeleteBooking}>Delete booking</button>
          ) : null}
        </form>
      </aside>

      {drawerOpen ? <button type="button" className={styles.backdrop} onClick={() => closeDrawer()} aria-label="Close drawer" /> : null}
      {confirmDialog ? (
        <>
          <button type="button" className={styles.backdrop} onClick={closeConfirmation} aria-label="Close confirmation" />
          <div className={styles.confirmDialog} role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
            <strong id="confirm-dialog-title">Confirm action</strong>
            <p>{confirmDialog.message}</p>
            <div className={styles.confirmDialogActions}>
              <button type="button" className={styles.secondaryButton} onClick={closeConfirmation}>
                Cancel
              </button>
              <button type="button" className={styles.primaryButton} onClick={() => void handleConfirmAction()}>
                {confirmDialog.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </>
      ) : null}
      {statusMenu ? (
        <>
          <button type="button" className={styles.backdrop} onClick={() => setStatusMenu(null)} aria-label="Close status menu" />
          <div
            className={styles.statusPopover}
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-popover-title"
            style={{ left: statusMenu.x, top: statusMenu.y }}
          >
            <div className={styles.statusPopoverActions}>
              <button type="button" className={styles.statusPill} data-status="pending" aria-label="Set status to Pending" title="Pending" onClick={() => void updateBookingStatus(statusMenu.bookingId, "Pending")}>
                <span className={styles.statusGlyph} data-status="pending" />
              </button>
              <button type="button" className={styles.statusPill} data-status="confirmed" aria-label="Set status to Confirmed" title="Confirmed" onClick={() => void updateBookingStatus(statusMenu.bookingId, "Confirmed")}>
                <span className={styles.statusGlyph} data-status="confirmed" />
              </button>
              <button type="button" className={styles.statusPill} data-status="blocked" aria-label="Set status to Blocked" title="Blocked" onClick={() => void updateBookingStatus(statusMenu.bookingId, "Blocked")}>
                <span className={styles.statusGlyph} data-status="blocked" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
