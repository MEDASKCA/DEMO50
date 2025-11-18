'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';

export interface Trust {
  id: string;
  name: string;
  createdAt?: Date;
}

export interface Hospital {
  id: string;
  name: string;
  trustId: string;
  trustName: string;
  createdAt?: Date;
}

interface HospitalContextType {
  currentHospital: Hospital | null;
  currentTrust: Trust | null;
  hospitals: Hospital[];
  trusts: Trust[];
  setCurrentHospital: (hospital: Hospital) => void;
  loading: boolean;
  refreshHospitals: () => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [currentHospital, setCurrentHospitalState] = useState<Hospital | null>(null);
  const [currentTrust, setCurrentTrust] = useState<Trust | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [trusts, setTrusts] = useState<Trust[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTrusts = async () => {
    try {
      const q = query(collection(db, 'trusts'));
      const snapshot = await getDocs(q);
      const loadedTrusts: Trust[] = [];

      snapshot.forEach(doc => {
        loadedTrusts.push({
          id: doc.id,
          ...doc.data()
        } as Trust);
      });

      setTrusts(loadedTrusts);
      return loadedTrusts;
    } catch (error) {
      console.error('Error loading trusts:', error);
      return [];
    }
  };

  const loadHospitals = async () => {
    try {
      const q = query(collection(db, 'hospitals'));
      const snapshot = await getDocs(q);
      const loadedHospitals: Hospital[] = [];

      snapshot.forEach(doc => {
        loadedHospitals.push({
          id: doc.id,
          ...doc.data()
        } as Hospital);
      });

      loadedHospitals.sort((a, b) => a.name.localeCompare(b.name));
      setHospitals(loadedHospitals);
      return loadedHospitals;
    } catch (error) {
      console.error('Error loading hospitals:', error);
      return [];
    }
  };

  const refreshHospitals = async () => {
    await loadTrusts();
    await loadHospitals();
  };

  const setCurrentHospital = (hospital: Hospital) => {
    setCurrentHospitalState(hospital);
    localStorage.setItem('currentHospitalId', hospital.id);

    // Load the trust for this hospital
    const trust = trusts.find(t => t.id === hospital.trustId);
    if (trust) {
      setCurrentTrust(trust);
    }
  };

  useEffect(() => {
    const initializeContext = async () => {
      setLoading(true);

      // Load trusts and hospitals
      const loadedTrusts = await loadTrusts();
      const loadedHospitals = await loadHospitals();

      // Try to restore from localStorage
      const savedHospitalId = localStorage.getItem('currentHospitalId');

      if (savedHospitalId && loadedHospitals.length > 0) {
        const savedHospital = loadedHospitals.find(h => h.id === savedHospitalId);
        if (savedHospital) {
          setCurrentHospitalState(savedHospital);
          const trust = loadedTrusts.find(t => t.id === savedHospital.trustId);
          if (trust) {
            setCurrentTrust(trust);
          }
        } else {
          // Saved hospital not found, use first available
          setCurrentHospitalState(loadedHospitals[0]);
          const trust = loadedTrusts.find(t => t.id === loadedHospitals[0].trustId);
          if (trust) {
            setCurrentTrust(trust);
          }
        }
      } else if (loadedHospitals.length > 0) {
        // No saved hospital, use first available
        setCurrentHospitalState(loadedHospitals[0]);
        const trust = loadedTrusts.find(t => t.id === loadedHospitals[0].trustId);
        if (trust) {
          setCurrentTrust(trust);
        }
      }

      setLoading(false);
    };

    initializeContext();
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        currentHospital,
        currentTrust,
        hospitals,
        trusts,
        setCurrentHospital,
        loading,
        refreshHospitals
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
}
