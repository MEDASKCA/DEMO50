// ============================================================================
// FIREBASE DATA TYPES
// Type definitions for Firestore collections
// ============================================================================

export interface FirebaseSpecialty {
  id: string;
  name: string;
  abbreviation: string;
  subspecialties?: Array<{
    name: string;
    abbreviation: string;
  }>;
  createdAt?: Date;
}

export interface FirebaseProcedure {
  id?: string;
  name: string;
  opcs4: string[]; // OPCS-4 codes (can have multiple)
  commonVariations?: string[]; // Alternative procedure names
  specialtyId: string; // Reference to specialty document ID
  specialtyName: string; // Denormalized for quick filtering
  subspecialtyName?: string; // Denormalized for quick filtering
  createdAt?: Date;
}

export interface FirebaseSurgeon {
  id?: string;
  firstName: string;
  lastName: string;
  title: 'Mr' | 'Ms' | 'Dr' | 'Prof'; // Common UK surgical titles
  specialtyId: string; // Reference to specialty document ID
  specialtyName: string; // Denormalized for quick filtering
  subspecialtyName?: string; // Denormalized for quick filtering
  createdAt?: Date;
}

// Helper type for procedure with surgeon info (for future preference cards)
export interface ProcedureWithSurgeon extends FirebaseProcedure {
  surgeon?: FirebaseSurgeon;
  preferenceCardId?: string;
}
