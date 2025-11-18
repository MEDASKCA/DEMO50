// Service for handling surgical competency data
// This will integrate with Firebase/database

import {
  StaffProcedureExperience,
  StaffEquipmentExperience,
  CustomProcedure,
  CustomEquipment,
  RemovalRequest,
  ScrubEpisode,
  ExperienceUpdateSuggestion
} from '@/lib/surgicalCompetencyData';

// ============================================================================
// PROCEDURE EXPERIENCE
// ============================================================================

export async function saveStaffProcedureExperience(
  staffId: string,
  procedures: StaffProcedureExperience[]
): Promise<void> {
  try {
    // TODO: Replace with actual Firebase/database call
    const response = await fetch('/api/competency/procedures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId, procedures })
    });

    if (!response.ok) {
      throw new Error('Failed to save procedure experience');
    }

    // For now, save to localStorage as fallback
    localStorage.setItem(
      `staff_procedures_${staffId}`,
      JSON.stringify(procedures)
    );
  } catch (error) {
    console.error('Error saving procedure experience:', error);
    throw error;
  }
}

export async function loadStaffProcedureExperience(
  staffId: string
): Promise<StaffProcedureExperience[]> {
  try {
    // TODO: Replace with actual Firebase/database call
    const response = await fetch(`/api/competency/procedures/${staffId}`);

    if (response.ok) {
      const data = await response.json();
      return data.procedures || [];
    }

    // Fallback to localStorage
    const stored = localStorage.getItem(`staff_procedures_${staffId}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading procedure experience:', error);
    return [];
  }
}

// ============================================================================
// EQUIPMENT EXPERIENCE
// ============================================================================

export async function saveStaffEquipmentExperience(
  staffId: string,
  equipment: StaffEquipmentExperience[]
): Promise<void> {
  try {
    const response = await fetch('/api/competency/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId, equipment })
    });

    if (!response.ok) {
      throw new Error('Failed to save equipment experience');
    }

    // Fallback to localStorage
    localStorage.setItem(
      `staff_equipment_${staffId}`,
      JSON.stringify(equipment)
    );
  } catch (error) {
    console.error('Error saving equipment experience:', error);
    throw error;
  }
}

export async function loadStaffEquipmentExperience(
  staffId: string
): Promise<StaffEquipmentExperience[]> {
  try {
    const response = await fetch(`/api/competency/equipment/${staffId}`);

    if (response.ok) {
      const data = await response.json();
      return data.equipment || [];
    }

    // Fallback to localStorage
    const stored = localStorage.getItem(`staff_equipment_${staffId}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading equipment experience:', error);
    return [];
  }
}

// ============================================================================
// CUSTOM PROCEDURES & EQUIPMENT
// ============================================================================

export async function addCustomProcedure(
  procedure: Omit<CustomProcedure, 'id' | 'addedDate' | 'approved' | 'usageCount'>
): Promise<CustomProcedure> {
  try {
    const response = await fetch('/api/competency/custom-procedures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(procedure)
    });

    if (!response.ok) {
      throw new Error('Failed to add custom procedure');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding custom procedure:', error);
    throw error;
  }
}

export async function addCustomEquipment(
  equipment: Omit<CustomEquipment, 'id' | 'addedDate' | 'approved' | 'usageCount'>
): Promise<CustomEquipment> {
  try {
    const response = await fetch('/api/competency/custom-equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment)
    });

    if (!response.ok) {
      throw new Error('Failed to add custom equipment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding custom equipment:', error);
    throw error;
  }
}

export async function getCustomProcedures(): Promise<CustomProcedure[]> {
  try {
    const response = await fetch('/api/competency/custom-procedures');

    if (response.ok) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error('Error fetching custom procedures:', error);
    return [];
  }
}

export async function getCustomEquipment(): Promise<CustomEquipment[]> {
  try {
    const response = await fetch('/api/competency/custom-equipment');

    if (response.ok) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error('Error fetching custom equipment:', error);
    return [];
  }
}

// ============================================================================
// REMOVAL REQUESTS
// ============================================================================

export async function submitRemovalRequest(
  request: Omit<RemovalRequest, 'id' | 'requestDate' | 'status'>
): Promise<RemovalRequest> {
  try {
    const response = await fetch('/api/competency/removal-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error('Failed to submit removal request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting removal request:', error);
    throw error;
  }
}

export async function getRemovalRequests(
  staffId?: string,
  status?: 'pending' | 'approved' | 'rejected'
): Promise<RemovalRequest[]> {
  try {
    const params = new URLSearchParams();
    if (staffId) params.append('staffId', staffId);
    if (status) params.append('status', status);

    const response = await fetch(`/api/competency/removal-requests?${params}`);

    if (response.ok) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error('Error fetching removal requests:', error);
    return [];
  }
}

export async function updateRemovalRequest(
  requestId: string,
  update: {
    status: 'approved' | 'rejected';
    reviewedBy: string;
    reviewNotes?: string;
  }
): Promise<RemovalRequest> {
  try {
    const response = await fetch(`/api/competency/removal-requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });

    if (!response.ok) {
      throw new Error('Failed to update removal request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating removal request:', error);
    throw error;
  }
}

// ============================================================================
// EPR INTEGRATION - SCRUB EPISODES
// ============================================================================

export async function matchScrubEpisodes(
  staffId: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<ScrubEpisode[]> {
  try {
    const params = new URLSearchParams({ staffId });
    if (dateFrom) params.append('dateFrom', dateFrom.toISOString());
    if (dateTo) params.append('dateTo', dateTo.toISOString());

    const response = await fetch(`/api/epr/scrub-episodes?${params}`);

    if (response.ok) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error('Error fetching scrub episodes:', error);
    return [];
  }
}

export async function generateExperienceSuggestions(
  staffId: string
): Promise<ExperienceUpdateSuggestion[]> {
  try {
    // Get unmatched scrub episodes
    const episodes = await matchScrubEpisodes(staffId);
    const unmatchedEpisodes = episodes.filter(ep => !ep.experienceUpdated);

    // Get current experience
    const currentExperience = await loadStaffProcedureExperience(staffId);

    const suggestions: ExperienceUpdateSuggestion[] = [];

    for (const episode of unmatchedEpisodes) {
      const existing = currentExperience.find(
        exp => exp.opcs4Codes.includes(episode.opcs4Code)
      );

      let suggestedLevel: number | undefined;
      let message = '';

      if (!existing || existing.experienceLevel === 0) {
        // First time scrubbing this procedure
        suggestedLevel = 2; // Novice (learning)
        message = `You scrubbed "${episode.procedureName}" on ${new Date(episode.date).toLocaleDateString()}. Would you like to update your experience to "Novice (learning)"?`;
      } else if (existing.experienceLevel === 2) {
        // Currently learning - suggest checking if ready to progress
        const timesPerformed = existing.timesPerformed || 0;
        if (timesPerformed >= 5) {
          suggestedLevel = 3; // Competent (with supervision)
          message = `You've now scrubbed "${episode.procedureName}" ${timesPerformed + 1} times. Consider updating to "Competent (with supervision)".`;
        } else {
          message = `You scrubbed "${episode.procedureName}" on ${new Date(episode.date).toLocaleDateString()}. This is your ${timesPerformed + 1}${getOrdinalSuffix(timesPerformed + 1)} time.`;
        }
      }

      if (message) {
        suggestions.push({
          id: `suggestion_${episode.id}`,
          staffId,
          procedureName: episode.procedureName,
          opcs4Code: episode.opcs4Code,
          scrubEpisodeId: episode.id,
          scrubDate: episode.date,
          currentLevel: existing?.experienceLevel || 0,
          suggestedLevel,
          message,
          status: 'pending',
          createdDate: new Date()
        });
      }
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating experience suggestions:', error);
    return [];
  }
}

export async function respondToSuggestion(
  suggestionId: string,
  action: 'accepted' | 'declined',
  staffId: string
): Promise<void> {
  try {
    const response = await fetch(`/api/competency/suggestions/${suggestionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, staffId })
    });

    if (!response.ok) {
      throw new Error('Failed to respond to suggestion');
    }
  } catch (error) {
    console.error('Error responding to suggestion:', error);
    throw error;
  }
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

export async function addOPCS4ToCustomProcedure(
  procedureId: string,
  opcs4Codes: string[],
  adminId: string
): Promise<void> {
  try {
    const response = await fetch(`/api/admin/custom-procedures/${procedureId}/opcs4`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opcs4Codes, adminId })
    });

    if (!response.ok) {
      throw new Error('Failed to add OPCS-4 codes');
    }
  } catch (error) {
    console.error('Error adding OPCS-4 codes:', error);
    throw error;
  }
}

export async function approveCustomItem(
  itemType: 'procedure' | 'equipment',
  itemId: string,
  adminId: string
): Promise<void> {
  try {
    const response = await fetch(`/api/admin/custom-${itemType}s/${itemId}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId })
    });

    if (!response.ok) {
      throw new Error(`Failed to approve custom ${itemType}`);
    }
  } catch (error) {
    console.error(`Error approving custom ${itemType}:`, error);
    throw error;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export const competencyService = {
  // Procedures
  saveStaffProcedureExperience,
  loadStaffProcedureExperience,

  // Equipment
  saveStaffEquipmentExperience,
  loadStaffEquipmentExperience,

  // Custom items
  addCustomProcedure,
  addCustomEquipment,
  getCustomProcedures,
  getCustomEquipment,

  // Removal requests
  submitRemovalRequest,
  getRemovalRequests,
  updateRemovalRequest,

  // EPR integration
  matchScrubEpisodes,
  generateExperienceSuggestions,
  respondToSuggestion,

  // Admin
  addOPCS4ToCustomProcedure,
  approveCustomItem
};
