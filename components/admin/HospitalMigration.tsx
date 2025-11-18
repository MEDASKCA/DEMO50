'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react';

const DEFAULT_TRUST_ID = 'barts-health-nhs-trust';
const DEFAULT_HOSPITAL_ID = 'royal-london-hospital';

export default function HospitalMigration() {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [migrationStats, setMigrationStats] = useState<any>(null);

  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
    console.log(message);
  };

  const runMigration = async () => {
    setStatus('running');
    setLog([]);
    setMigrationStats(null);

    const stats = {
      specialties: 0,
      units: 0,
      mappings: 0,
      surgeons: 0,
      procedures: 0
    };

    try {
      addLog('='.repeat(60));
      addLog('MULTI-HOSPITAL MIGRATION');
      addLog('='.repeat(60));
      addLog('');

      // Step 1: Create default trust
      addLog('Step 1: Creating default NHS Trust...');
      const trustRef = doc(db, 'trusts', DEFAULT_TRUST_ID);
      await setDoc(trustRef, {
        name: 'Barts Health NHS Trust',
        createdAt: new Date()
      }, { merge: true });
      addLog('✓ Created trust: Barts Health NHS Trust');
      addLog('');

      // Step 2: Create default hospital
      addLog('Step 2: Creating default hospital...');
      const hospitalRef = doc(db, 'hospitals', DEFAULT_HOSPITAL_ID);
      await setDoc(hospitalRef, {
        name: 'Royal London Hospital',
        trustId: DEFAULT_TRUST_ID,
        trustName: 'Barts Health NHS Trust',
        createdAt: new Date()
      }, { merge: true });
      addLog('✓ Created hospital: Royal London Hospital, Barts Health NHS Trust');
      addLog('');

      // Step 3: Add hospitalId to specialties
      addLog('Step 3: Migrating specialties...');
      const specialtiesSnapshot = await getDocs(collection(db, 'specialties'));
      for (const docSnapshot of specialtiesSnapshot.docs) {
        const data = docSnapshot.data();
        if (!data.hospitalId) {
          await updateDoc(doc(db, 'specialties', docSnapshot.id), {
            hospitalId: DEFAULT_HOSPITAL_ID
          });
          stats.specialties++;
        }
      }
      addLog(`✓ Updated ${stats.specialties} specialties with hospitalId`);
      addLog('');

      // Step 4: Add hospitalId to theatre units
      addLog('Step 4: Migrating theatre units...');
      const unitsSnapshot = await getDocs(collection(db, 'theatreUnits'));
      for (const docSnapshot of unitsSnapshot.docs) {
        const data = docSnapshot.data();
        if (!data.hospitalId) {
          await updateDoc(doc(db, 'theatreUnits', docSnapshot.id), {
            hospitalId: DEFAULT_HOSPITAL_ID
          });
          stats.units++;
        }
      }
      addLog(`✓ Updated ${stats.units} theatre units with hospitalId`);
      addLog('');

      // Step 5: Add hospitalId to specialty-theatre mappings
      addLog('Step 5: Migrating specialty-theatre mappings...');
      const mappingsSnapshot = await getDocs(collection(db, 'specialtyTheatreMappings'));
      for (const docSnapshot of mappingsSnapshot.docs) {
        const data = docSnapshot.data();
        if (!data.hospitalId) {
          await updateDoc(doc(db, 'specialtyTheatreMappings', docSnapshot.id), {
            hospitalId: DEFAULT_HOSPITAL_ID
          });
          stats.mappings++;
        }
      }
      addLog(`✓ Updated ${stats.mappings} specialty-theatre mappings with hospitalId`);
      addLog('');

      // Step 6: Add hospitalId to surgeons
      addLog('Step 6: Migrating surgeons...');
      const surgeonsSnapshot = await getDocs(collection(db, 'surgeons'));
      for (const docSnapshot of surgeonsSnapshot.docs) {
        const data = docSnapshot.data();
        if (!data.hospitalId) {
          await updateDoc(doc(db, 'surgeons', docSnapshot.id), {
            hospitalId: DEFAULT_HOSPITAL_ID
          });
          stats.surgeons++;
        }
      }
      addLog(`✓ Updated ${stats.surgeons} surgeons with hospitalId`);
      addLog('');

      // Step 7: Procedures remain GLOBAL
      addLog('Step 7: Checking procedures...');
      const proceduresSnapshot = await getDocs(collection(db, 'procedures'));
      stats.procedures = proceduresSnapshot.size;
      addLog(`✓ ${stats.procedures} procedures remain in GLOBAL library (shared across hospitals)`);
      addLog('');

      addLog('='.repeat(60));
      addLog('MIGRATION COMPLETED SUCCESSFULLY!');
      addLog('='.repeat(60));

      setMigrationStats(stats);
      setStatus('complete');

    } catch (error: any) {
      console.error('Migration error:', error);
      addLog('');
      addLog('❌ MIGRATION FAILED');
      addLog(`Error: ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Multi-Hospital Migration</h2>
              <p className="text-sm text-gray-600 mt-1">
                Migrate your existing data to support multiple NHS Trusts and hospitals
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {status === 'idle' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">What this migration does:</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Creates "Barts Health NHS Trust"</li>
                  <li>Creates "Royal London Hospital" under this trust</li>
                  <li>Tags all existing specialties, theatres, and mappings with this hospital</li>
                  <li>Keeps procedures in a global library (shared across hospitals)</li>
                  <li><strong>No data will be deleted</strong> - everything is preserved</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-900 mb-2">⚠️ Important:</h3>
                <p className="text-sm text-amber-800">
                  Run this migration ONCE. After completion, you'll be able to add more hospitals via the admin panel.
                </p>
              </div>

              <button
                onClick={runMigration}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Migration
              </button>
            </div>
          )}

          {status === 'running' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-medium">Migration in progress...</span>
              </div>

              <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs max-h-96 overflow-y-auto">
                {log.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {status === 'complete' && migrationStats && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Migration completed successfully!</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">{migrationStats.specialties}</div>
                  <div className="text-sm text-green-600">Specialties</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">{migrationStats.units}</div>
                  <div className="text-sm text-green-600">Theatre Units</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">{migrationStats.mappings}</div>
                  <div className="text-sm text-green-600">Mappings</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">{migrationStats.surgeons}</div>
                  <div className="text-sm text-green-600">Surgeons</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-700">{migrationStats.procedures}</div>
                  <div className="text-sm text-blue-600">Procedures (Global)</div>
                </div>
              </div>

              <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs max-h-96 overflow-y-auto">
                {log.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">✓ Next steps:</h3>
                <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                  <li>Refresh this page to see the hospital selector in the header</li>
                  <li>You can now add more hospitals from the admin panel</li>
                  <li>All your existing data is now tagged with "Royal London Hospital"</li>
                </ol>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Refresh Page
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <span className="font-medium">Migration failed</span>
              </div>

              <div className="bg-gray-900 text-red-400 rounded-lg p-4 font-mono text-xs max-h-96 overflow-y-auto">
                {log.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>

              <button
                onClick={() => setStatus('idle')}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
