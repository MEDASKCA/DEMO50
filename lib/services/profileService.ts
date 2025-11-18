// Profile Service - Firestore CRUD operations
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
  // Basic Info
  userId: string;
  firstName: string;
  lastName: string;
  department: string;
  professionalQualification: string;
  roles: string[];
  band: string;

  // Contact
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone';

  // Location
  currentTrust: string;
  currentHospital: string;
  postcode: string;
  area: string;
  willingToTravel: string;

  // Professional
  professionalSummary: string;
  employmentHistory: any[];
  education: any[];
  certifications: any[];
  awards: any[];
  volunteerWork: any[];
  languages: any[];
  interests: string[];

  // Competencies
  competencies: Record<string, number>;

  // Privacy & Consent
  profileVisibility: {
    publicView: boolean;
    visibleToTrusts: boolean;
    visibleToEmployers: boolean;
  };
  dataSharing: {
    shareWithNHSTrusts: boolean;
    shareWithBankAgencies: boolean;
    shareIdentityInfo: boolean;
    shareComplianceData: boolean;
  };

  // Metadata
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

const PROFILES_COLLECTION = 'profiles';

/**
 * Create a new user profile
 */
export async function createProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    const profile: UserProfile = {
      userId,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      department: profileData.department || '',
      role: profileData.role || '',
      band: profileData.band || '',
      email: profileData.email || '',
      phone: profileData.phone,
      preferredContact: profileData.preferredContact || 'email',
      currentTrust: profileData.currentTrust || '',
      currentHospital: profileData.currentHospital || '',
      postcode: profileData.postcode || '',
      area: profileData.area || '',
      willingToTravel: profileData.willingToTravel || '15',
      professionalSummary: profileData.professionalSummary || '',
      employmentHistory: profileData.employmentHistory || [],
      education: profileData.education || [],
      certifications: profileData.certifications || [],
      awards: profileData.awards || [],
      volunteerWork: profileData.volunteerWork || [],
      languages: profileData.languages || [],
      interests: profileData.interests || [],
      competencies: profileData.competencies || {},
      profileVisibility: profileData.profileVisibility || {
        publicView: false,
        visibleToTrusts: true,
        visibleToEmployers: true
      },
      dataSharing: profileData.dataSharing || {
        shareWithNHSTrusts: false,
        shareWithBankAgencies: false,
        shareIdentityInfo: false,
        shareComplianceData: false
      },
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };

    await setDoc(profileRef, profile);
    console.log('Profile created successfully:', userId);
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}

/**
 * Get user profile by ID
 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      return profileSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log('Profile updated successfully:', userId);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Delete user profile
 */
export async function deleteProfile(userId: string): Promise<void> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await deleteDoc(profileRef);
    console.log('Profile deleted successfully:', userId);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}

/**
 * Search profiles by role
 */
export async function searchProfilesByRole(role: string): Promise<UserProfile[]> {
  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where('role', '==', role),
      where('profileVisibility.publicView', '==', true)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
}

/**
 * Search profiles by trust
 */
export async function searchProfilesByTrust(trust: string): Promise<UserProfile[]> {
  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where('currentTrust', '==', trust),
      where('profileVisibility.visibleToTrusts', '==', true)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  } catch (error) {
    console.error('Error searching profiles by trust:', error);
    throw error;
  }
}

/**
 * Update competencies
 */
export async function updateCompetencies(userId: string, competencies: Record<string, number>): Promise<void> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await updateDoc(profileRef, {
      competencies,
      updatedAt: serverTimestamp()
    });
    console.log('Competencies updated successfully:', userId);
  } catch (error) {
    console.error('Error updating competencies:', error);
    throw error;
  }
}

/**
 * Update privacy settings
 */
export async function updatePrivacySettings(
  userId: string,
  visibility: Partial<UserProfile['profileVisibility']>,
  dataSharing: Partial<UserProfile['dataSharing']>
): Promise<void> {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    const updates: any = {
      updatedAt: serverTimestamp()
    };

    if (visibility) {
      updates['profileVisibility'] = visibility;
    }
    if (dataSharing) {
      updates['dataSharing'] = dataSharing;
    }

    await updateDoc(profileRef, updates);
    console.log('Privacy settings updated successfully:', userId);
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    throw error;
  }
}
