// =============================================================================
// PROCEDURES FIREBASE (14,000+ Procedures)
// Separate Firebase instance ONLY for procedures reference data
// This keeps procedures database separate from MEDASKCA operational data
// =============================================================================

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Procedures Firebase Configuration (opsc-4)
const proceduresFirebaseConfig = {
  apiKey: "AIzaSyBeXJz3IWRHAjzVxu7VaKpt8PdYbIr5er8",
  authDomain: "opsc-4.firebaseapp.com",
  projectId: "opsc-4",
  storageBucket: "opsc-4.firebasestorage.app",
  messagingSenderId: "791916086773",
  appId: "1:791916086773:web:154d42e305a436b4404cbc",
  measurementId: "G-ZZL6CTP85S"
};

let proceduresApp: FirebaseApp;
let proceduresDb: Firestore;

// Initialize Procedures Firebase (completely separate instance from MEDASKCA)
if (typeof window !== 'undefined') {
  const existingApps = getApps();
  const proceduresAppInstance = existingApps.find(app => app.name === 'procedures-firebase');

  if (!proceduresAppInstance) {
    proceduresApp = initializeApp(proceduresFirebaseConfig, 'procedures-firebase');
  } else {
    proceduresApp = proceduresAppInstance;
  }

  proceduresDb = getFirestore(proceduresApp);

  console.log('✅ Procedures Firebase initialized (opsc-4)');
}

export { proceduresDb, proceduresApp };
