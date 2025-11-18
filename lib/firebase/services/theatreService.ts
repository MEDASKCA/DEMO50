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
  Theatre,
  Procedure,
  ProcedureTimelineEvent,
  TheatreEfficiency,
  COLLECTIONS
} from '@/types/tom';

// ===== THEATRES =====
export const getAllTheatres = async (): Promise<Theatre[]> => {
  const theatresRef = collection(db, COLLECTIONS.THEATRES);
  const snapshot = await getDocs(theatresRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Theatre));
};

export const getTheatreById = async (id: string): Promise<Theatre | null> => {
  const theatreRef = doc(db, COLLECTIONS.THEATRES, id);
  const snapshot = await getDoc(theatreRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Theatre : null;
};

export const getActiveTheatres = async (): Promise<Theatre[]> => {
  const theatresRef = collection(db, COLLECTIONS.THEATRES);
  const q = query(theatresRef, where('status', '==', 'active'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Theatre));
};

export const getTheatresByType = async (type: Theatre['type']): Promise<Theatre[]> => {
  const theatresRef = collection(db, COLLECTIONS.THEATRES);
  const q = query(theatresRef, where('type', '==', type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Theatre));
};

export const addTheatre = async (theatre: Omit<Theatre, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const theatresRef = collection(db, COLLECTIONS.THEATRES);
  const docRef = await addDoc(theatresRef, {
    ...theatre,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateTheatre = async (id: string, updates: Partial<Theatre>): Promise<void> => {
  const theatreRef = doc(db, COLLECTIONS.THEATRES, id);
  await updateDoc(theatreRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const updateTheatreStatus = async (id: string, status: Theatre['status']): Promise<void> => {
  const theatreRef = doc(db, COLLECTIONS.THEATRES, id);
  await updateDoc(theatreRef, {
    status,
    updatedAt: Timestamp.now(),
  });
};

// ===== PROCEDURES =====
export const getProceduresForDate = async (date: string): Promise<Procedure[]> => {
  const proceduresRef = collection(db, COLLECTIONS.PROCEDURES);
  const q = query(
    proceduresRef,
    where('date', '==', date),
    orderBy('scheduledTime')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Procedure));
};

export const getProceduresForTheatre = async (theatreId: string, date: string): Promise<Procedure[]> => {
  const proceduresRef = collection(db, COLLECTIONS.PROCEDURES);
  const q = query(
    proceduresRef,
    where('theatreId', '==', theatreId),
    where('date', '==', date),
    orderBy('scheduledTime')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Procedure));
};

export const getProcedureById = async (id: string): Promise<Procedure | null> => {
  const procedureRef = doc(db, COLLECTIONS.PROCEDURES, id);
  const snapshot = await getDoc(procedureRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Procedure : null;
};

export const getActiveProcedures = async (): Promise<Procedure[]> => {
  const proceduresRef = collection(db, COLLECTIONS.PROCEDURES);
  const q = query(
    proceduresRef,
    where('status', 'in', ['in_theatre', 'anaesthetic', 'surgery', 'recovery'])
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Procedure));
};

export const addProcedure = async (
  procedure: Omit<Procedure, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const proceduresRef = collection(db, COLLECTIONS.PROCEDURES);
  const docRef = await addDoc(proceduresRef, {
    ...procedure,
    status: 'scheduled',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateProcedure = async (id: string, updates: Partial<Procedure>): Promise<void> => {
  const procedureRef = doc(db, COLLECTIONS.PROCEDURES, id);
  await updateDoc(procedureRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const updateProcedureStatus = async (
  id: string,
  status: Procedure['status']
): Promise<void> => {
  const procedureRef = doc(db, COLLECTIONS.PROCEDURES, id);
  await updateDoc(procedureRef, {
    status,
    updatedAt: Timestamp.now(),
  });
};

export const addProcedureNote = async (id: string, note: string): Promise<void> => {
  const procedure = await getProcedureById(id);
  if (!procedure) throw new Error('Procedure not found');

  const procedureRef = doc(db, COLLECTIONS.PROCEDURES, id);
  await updateDoc(procedureRef, {
    notes: [...(procedure.notes || []), note],
    updatedAt: Timestamp.now(),
  });
};

// ===== PROCEDURE TIMELINE =====
export const getTimelineForProcedure = async (procedureId: string): Promise<ProcedureTimelineEvent[]> => {
  const timelineRef = collection(db, COLLECTIONS.PROCEDURE_TIMELINE);
  const q = query(
    timelineRef,
    where('procedureId', '==', procedureId),
    orderBy('scheduledTime')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProcedureTimelineEvent));
};

export const addTimelineEvent = async (
  event: Omit<ProcedureTimelineEvent, 'id' | 'createdAt'>
): Promise<string> => {
  const timelineRef = collection(db, COLLECTIONS.PROCEDURE_TIMELINE);
  const docRef = await addDoc(timelineRef, {
    ...event,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateTimelineEvent = async (
  id: string,
  updates: Partial<ProcedureTimelineEvent>
): Promise<void> => {
  const eventRef = doc(db, COLLECTIONS.PROCEDURE_TIMELINE, id);
  await updateDoc(eventRef, updates);
};

export const recordTimelineActual = async (
  eventId: string,
  actualTime: string,
  performedBy?: string
): Promise<void> => {
  const eventRef = doc(db, COLLECTIONS.PROCEDURE_TIMELINE, eventId);
  await updateDoc(eventRef, {
    actualTime,
    performedBy,
    status: 'completed',
  });
};

// ===== THEATRE EFFICIENCY =====
export const getEfficiencyForTheatre = async (
  theatreId: string,
  date: string
): Promise<TheatreEfficiency | null> => {
  const efficiencyRef = collection(db, COLLECTIONS.THEATRE_EFFICIENCY);
  const q = query(
    efficiencyRef,
    where('theatreId', '==', theatreId),
    where('date', '==', date)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as TheatreEfficiency;
};

export const getEfficiencyForDate = async (date: string): Promise<TheatreEfficiency[]> => {
  const efficiencyRef = collection(db, COLLECTIONS.THEATRE_EFFICIENCY);
  const q = query(
    efficiencyRef,
    where('date', '==', date),
    orderBy('efficiencyScore', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TheatreEfficiency));
};

export const calculateAndSaveEfficiency = async (
  theatreId: string,
  theatreName: string,
  date: string
): Promise<string> => {
  // Get procedures for this theatre on this date
  const procedures = await getProceduresForTheatre(theatreId, date);

  const casesScheduled = procedures.length;
  const casesCompleted = procedures.filter(p => p.status === 'completed').length;
  const casesInProgress = procedures.filter(p =>
    ['in_theatre', 'anaesthetic', 'surgery', 'recovery'].includes(p.status)
  ).length;
  const casesCancelled = procedures.filter(p => p.status === 'cancelled').length;

  // Calculate metrics
  const completedProcedures = procedures.filter(p => p.actualDuration);
  const avgCaseTime = completedProcedures.length > 0
    ? completedProcedures.reduce((sum, p) => sum + (p.actualDuration || 0), 0) / completedProcedures.length
    : 0;

  const avgScheduledTime = procedures.length > 0
    ? procedures.reduce((sum, p) => sum + p.estimatedDuration, 0) / procedures.length
    : 0;

  // Calculate efficiency score (simplified)
  const completionRate = casesScheduled > 0 ? (casesCompleted / casesScheduled) * 100 : 0;
  const timeEfficiency = avgScheduledTime > 0 ? (avgCaseTime / avgScheduledTime) * 100 : 100;
  const efficiencyScore = Math.round((completionRate + (100 - Math.abs(100 - timeEfficiency))) / 2);

  const efficiencyData: Omit<TheatreEfficiency, 'id' | 'createdAt' | 'updatedAt'> = {
    theatreId,
    theatreName,
    date,
    efficiencyScore,
    targetScore: 85,
    trend: efficiencyScore >= 85 ? 'improving' : efficiencyScore >= 75 ? 'stable' : 'worsening',
    casesScheduled,
    casesCompleted,
    casesInProgress,
    casesCancelled,
    utilizationRate: 85, // TODO: Calculate based on operating hours
    avgCaseTime: Math.round(avgCaseTime),
    avgScheduledTime: Math.round(avgScheduledTime),
    totalDelayMinutes: 0, // TODO: Calculate from timeline
    onTimeStarts: 90, // TODO: Calculate from procedures
    turnoverTime: 25, // TODO: Calculate from procedures
    targetTurnoverTime: 25,
    factors: [
      { factor: 'On-time starts', score: 90, status: 'excellent' },
      { factor: 'Turnover time', score: 85, status: 'good' },
      { factor: 'Case completion rate', score: Math.round(completionRate), status: completionRate >= 90 ? 'excellent' : 'good' },
      { factor: 'Equipment ready', score: 95, status: 'excellent' },
    ],
  };

  const efficiencyRef = collection(db, COLLECTIONS.THEATRE_EFFICIENCY);
  const docRef = await addDoc(efficiencyRef, {
    ...efficiencyData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
};

export const updateEfficiency = async (
  id: string,
  updates: Partial<TheatreEfficiency>
): Promise<void> => {
  const efficiencyRef = doc(db, COLLECTIONS.THEATRE_EFFICIENCY, id);
  await updateDoc(efficiencyRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};
