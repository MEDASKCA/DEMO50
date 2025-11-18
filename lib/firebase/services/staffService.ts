import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  StaffMember,
  StaffBreak,
  ReliefRequest,
  SickLeave,
  LateArrival,
  VacantShift,
  COLLECTIONS
} from '@/types/tom';

// ===== STAFF MEMBERS =====
export const getAllStaff = async (): Promise<StaffMember[]> => {
  const staffRef = collection(db, COLLECTIONS.STAFF);
  const snapshot = await getDocs(staffRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
};

export const getStaffById = async (id: string): Promise<StaffMember | null> => {
  const staffRef = doc(db, COLLECTIONS.STAFF, id);
  const snapshot = await getDoc(staffRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as StaffMember : null;
};

export const getStaffByDepartment = async (department: string): Promise<StaffMember[]> => {
  const staffRef = collection(db, COLLECTIONS.STAFF);
  const q = query(staffRef, where('department', '==', department));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
};

export const getStaffOnDutyToday = async (): Promise<StaffMember[]> => {
  const staffRef = collection(db, COLLECTIONS.STAFF);
  const q = query(staffRef, where('shiftStart', '!=', null));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
};

export const addStaff = async (staff: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const staffRef = collection(db, COLLECTIONS.STAFF);
  const docRef = await addDoc(staffRef, {
    ...staff,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateStaff = async (id: string, updates: Partial<StaffMember>): Promise<void> => {
  const staffRef = doc(db, COLLECTIONS.STAFF, id);
  await updateDoc(staffRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const deleteStaff = async (id: string): Promise<void> => {
  const staffRef = doc(db, COLLECTIONS.STAFF, id);
  await deleteDoc(staffRef);
};

// ===== STAFF BREAKS =====
export const getBreaksForDate = async (date: string): Promise<StaffBreak[]> => {
  const breaksRef = collection(db, COLLECTIONS.STAFF_BREAKS);
  const q = query(breaksRef, where('date', '==', date), orderBy('startTime'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffBreak));
};

export const getBreaksForStaff = async (staffId: string, date: string): Promise<StaffBreak[]> => {
  const breaksRef = collection(db, COLLECTIONS.STAFF_BREAKS);
  const q = query(breaksRef, where('staffId', '==', staffId), where('date', '==', date));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffBreak));
};

export const addBreak = async (breakData: Omit<StaffBreak, 'id' | 'createdAt'>): Promise<string> => {
  const breaksRef = collection(db, COLLECTIONS.STAFF_BREAKS);
  const docRef = await addDoc(breaksRef, {
    ...breakData,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateBreakStatus = async (id: string, status: StaffBreak['status']): Promise<void> => {
  const breakRef = doc(db, COLLECTIONS.STAFF_BREAKS, id);
  await updateDoc(breakRef, { status });
};

// ===== RELIEF REQUESTS =====
export const getActiveReliefRequests = async (): Promise<ReliefRequest[]> => {
  const requestsRef = collection(db, COLLECTIONS.RELIEF_REQUESTS);
  const q = query(
    requestsRef,
    where('status', 'in', ['pending', 'acknowledged']),
    orderBy('requestedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ReliefRequest));
};

export const addReliefRequest = async (
  request: Omit<ReliefRequest, 'id' | 'requestedAt' | 'status'>
): Promise<string> => {
  const requestsRef = collection(db, COLLECTIONS.RELIEF_REQUESTS);
  const docRef = await addDoc(requestsRef, {
    ...request,
    status: 'pending',
    requestedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateReliefRequest = async (
  id: string,
  updates: Partial<ReliefRequest>
): Promise<void> => {
  const requestRef = doc(db, COLLECTIONS.RELIEF_REQUESTS, id);
  await updateDoc(requestRef, updates);
};

export const deployReliefStaff = async (
  requestId: string,
  staffId: string,
  staffName: string
): Promise<void> => {
  const requestRef = doc(db, COLLECTIONS.RELIEF_REQUESTS, requestId);
  await updateDoc(requestRef, {
    status: 'deployed',
    deployedStaffId: staffId,
    deployedStaffName: staffName,
    acknowledgedAt: Timestamp.now(),
  });
};

// ===== SICK LEAVE =====
export const getActiveSickLeave = async (): Promise<SickLeave[]> => {
  const sickLeaveRef = collection(db, COLLECTIONS.SICK_LEAVE);
  const q = query(sickLeaveRef, where('status', '==', 'active'), orderBy('startDate'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SickLeave));
};

export const addSickLeave = async (
  sickLeave: Omit<SickLeave, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const sickLeaveRef = collection(db, COLLECTIONS.SICK_LEAVE);
  const docRef = await addDoc(sickLeaveRef, {
    ...sickLeave,
    status: 'active',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateSickLeave = async (id: string, updates: Partial<SickLeave>): Promise<void> => {
  const sickLeaveRef = doc(db, COLLECTIONS.SICK_LEAVE, id);
  await updateDoc(sickLeaveRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

// ===== LATE ARRIVALS =====
export const getLateArrivalsForDate = async (date: string): Promise<LateArrival[]> => {
  const lateArrivalsRef = collection(db, COLLECTIONS.LATE_ARRIVALS);
  const q = query(lateArrivalsRef, where('date', '==', date), orderBy('scheduledStart'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LateArrival));
};

export const addLateArrival = async (
  lateArrival: Omit<LateArrival, 'id' | 'createdAt'>
): Promise<string> => {
  const lateArrivalsRef = collection(db, COLLECTIONS.LATE_ARRIVALS);
  const docRef = await addDoc(lateArrivalsRef, {
    ...lateArrival,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// ===== VACANT SHIFTS =====
export const getVacantShifts = async (startDate: string, endDate: string): Promise<VacantShift[]> => {
  const vacantShiftsRef = collection(db, COLLECTIONS.VACANT_SHIFTS);
  const q = query(
    vacantShiftsRef,
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    where('status', '==', 'open'),
    orderBy('date'),
    orderBy('priority')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VacantShift));
};

export const addVacantShift = async (
  shift: Omit<VacantShift, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const vacantShiftsRef = collection(db, COLLECTIONS.VACANT_SHIFTS);
  const docRef = await addDoc(vacantShiftsRef, {
    ...shift,
    status: 'open',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const coverVacantShift = async (
  shiftId: string,
  staffId: string,
  staffName: string
): Promise<void> => {
  const shiftRef = doc(db, COLLECTIONS.VACANT_SHIFTS, shiftId);
  await updateDoc(shiftRef, {
    status: 'covered',
    coverStaffId: staffId,
    coverStaffName: staffName,
    updatedAt: Timestamp.now(),
  });
};
