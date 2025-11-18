'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  band: string;
  trust: string;
  hospital: string;
  isNHSEmail: boolean;
  phoneNumber?: string;
  additionalEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if email is NHS email
  const isNHSEmail = (email: string): boolean => {
    const nhsDomains = ['nhs.net', 'nhs.uk'];
    const domain = email.split('@')[1]?.toLowerCase();
    return nhsDomains.some(nhsDomain => domain === nhsDomain || domain?.endsWith(`.${nhsDomain}`));
  };

  // Parse NHS email to extract basic info
  const parseNHSEmail = (email: string): Partial<UserProfile> => {
    // Example: alexander.monterubio@bartshealth.nhs.net
    const [localPart] = email.split('@');
    const nameParts = localPart.split('.');

    return {
      firstName: nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : '',
      lastName: nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : '',
      isNHSEmail: true,
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Fetch user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user: firebaseUser } = userCredential;

      // Parse NHS email if applicable
      const nhsData = isNHSEmail(email) ? parseNHSEmail(email) : {};

      // Create user profile in Firestore
      const profile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        firstName: profileData.firstName || nhsData.firstName || '',
        lastName: profileData.lastName || nhsData.lastName || '',
        role: profileData.role || '',
        band: profileData.band || '',
        trust: profileData.trust || '',
        hospital: profileData.hospital || '',
        isNHSEmail: isNHSEmail(email),
        phoneNumber: profileData.phoneNumber || '',
        additionalEmail: profileData.additionalEmail || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), profile);
      setUserProfile(profile);

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Redirect to profile setup or home
      router.push('/profile/setup');
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      router.push('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedProfile = {
        ...userProfile,
        ...data,
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      setUserProfile(updatedProfile as UserProfile);
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
