"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB7TbIWXnNlLY_r_sl68aP4E6mXapQmZ4",
  authDomain: "booking-app-6d89a.firebaseapp.com",
  projectId: "booking-app-6d89a",
  storageBucket: "booking-app-6d89a.firebasestorage.app",
  messagingSenderId: "3897801410",
  appId: "1:3897801410:web:0a3e6b1b7650360b04995b",
  measurementId: "G-ZCWV6H5BR3",
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);

let analyticsPromise: Promise<Analytics | null> | null = null;

export function initFirebaseClient() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) => (supported ? getAnalytics(firebaseApp) : null));
  }
  return analyticsPromise;
}
