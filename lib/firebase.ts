// =============================================================================
// MEDASKCA FIREBASE (Operational Data)
// Main Firebase for theatres, schedules, consultants, staff, bookings
// This is separate from Procedures Firebase (procedures-55ef9)
// =============================================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// MEDASKCA Firebase Configuration (medaskca-93d48)
const firebaseConfig = {
  apiKey: "AIzaSyAWzAZiMVlGU1h7CLZRR1Qc-0BxKkIDNW4",
  authDomain: "medaskca-93d48.firebaseapp.com",
  projectId: "medaskca-93d48",
  storageBucket: "medaskca-93d48.firebasestorage.app",
  messagingSenderId: "830746933399",
  appId: "1:830746933399:web:b94a042718d64989f7d1d2",
  measurementId: "G-ETHE315F6E"
};

// Initialize MEDASKCA Firebase (singleton pattern to prevent multiple instances)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== 'undefined') {
  console.log('✅ MEDASKCA Firebase initialized (medaskca-93d48)');
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics (only in browser, not during SSR)
export const analytics = typeof window !== 'undefined'
  ? isSupported().then(yes => yes ? getAnalytics(app) : null)
  : null;

export default app;
