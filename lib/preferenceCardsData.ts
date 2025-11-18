// Preference Cards Data Structure
// Based on Royal London Hospital Orthopaedic Kardex 2022

export interface PreferenceCardItem {
  itemId: string; // Links to inventory item
  itemName: string;
  quantity: number;
  category: "Basic Set" | "Standby" | "Consumables" | "Specific Consumables" | "Add-Ons" | "Operating Table";
  notes?: string;
}

export interface PreferenceCard {
  id: string;
  procedureName: string;
  opcs4Codes: string[];
  specialty: string;
  category: string; // NAILINGS, PLATINGS, JOINTS, etc.
  surgeon?: string;

  // Required items organized by category
  basicSets: PreferenceCardItem[];
  standbyEquipment: PreferenceCardItem[];
  consumables: PreferenceCardItem[];
  specificConsumables: PreferenceCardItem[];
  addOns: PreferenceCardItem[];
  operatingTable: PreferenceCardItem[];

  // Procedure Scoring (4-factor system)
  customCode?: string; // e.g., EMER-1, ORTHO-3
  complexityScore?: number; // 1-5
  durationScore?: number; // 1-5
  variabilityScore?: number; // 1-5
  surgeonLevelScore?: number; // 1-5
  averageScore?: number; // Total (sum) of 4 factors (typically 4-10 points)
  complexity?: 'minor' | 'major'; // Derived from complexityScore

  // Additional info
  estimatedDuration: number; // minutes
  anesthesiaType: "GA" | "Spinal" | "Regional" | "Local";
  patientPosition: string;
  specialInstructions?: string;
  lastUpdated: string;
}

// ========================================
// ORTHOPAEDIC PREFERENCE CARDS
// From Royal London Hospital Kardex
// ========================================

export const PREFERENCE_CARDS: PreferenceCard[] = [
  // ========================================
  // NAILINGS (7 procedures from Kardex)
  // ========================================
  {
    id: "PC-001",
    procedureName: "DHS (Dynamic Hip Screw)",
    opcs4Codes: ["W221", "W191"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-011", itemName: "DHS Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 4, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 2, category: "Consumables" },
      { itemId: "INV-016", itemName: "Monocryl 3.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-017", itemName: "K-Wire 2.0mm x 150mm", quantity: 2, category: "Specific Consumables" },
      { itemId: "INV-018", itemName: "Guide Wire 2.5mm x 950mm", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 1, category: "Specific Consumables" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 90,
    anesthesiaType: "GA",
    patientPosition: "Supine on traction table",
    specialInstructions: "Patient positioned on traction table with affected leg in traction. Image intensifier required.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-002",
    procedureName: "Cannulated Hip Screw",
    opcs4Codes: ["W221"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-011", itemName: "DHS Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 3, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-017", itemName: "K-Wire 2.0mm x 150mm", quantity: 3, category: "Specific Consumables" },
      { itemId: "INV-018", itemName: "Guide Wire 2.5mm x 950mm", quantity: 2, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 1, category: "Specific Consumables" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 75,
    anesthesiaType: "Spinal",
    patientPosition: "Supine on traction table",
    specialInstructions: "Fluoroscopy required for guide wire placement and screw positioning.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-003",
    procedureName: "Femoral Nailing (Antegrade)",
    opcs4Codes: ["S471", "W191"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" },
      { itemId: "INV-003", itemName: "T2 Alpha Femoral Nail Instruments", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-007", itemName: "Colibri 2 Reamer System", quantity: 1, category: "Standby" },
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 3, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 4, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 3, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-017", itemName: "K-Wire 2.0mm x 150mm", quantity: 2, category: "Specific Consumables" },
      { itemId: "INV-019", itemName: "Guide Wire 3.2mm Ball-Tipped", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 2, category: "Specific Consumables" },
      { itemId: "INV-021", itemName: "Stryker T2 Femoral Nail 10mm x 340mm", quantity: 1, category: "Specific Consumables", notes: "Select appropriate size" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 120,
    anesthesiaType: "GA",
    patientPosition: "Supine on traction table with hip flexed",
    specialInstructions: "Entry point via piriformis fossa. Reaming may be required. Image intensifier essential throughout.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-004",
    procedureName: "Proximal Femoral Nail (TFNA)",
    opcs4Codes: ["S032", "W221"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" },
      { itemId: "INV-004", itemName: "TFNA Instrument Set", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 3, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 4, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-018", itemName: "Guide Wire 2.5mm x 950mm", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-022", itemName: "Synthes TFNA Nail Short 10mm", quantity: 1, category: "Specific Consumables", notes: "Select appropriate length" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-028", itemName: "Traction Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 90,
    anesthesiaType: "GA",
    patientPosition: "Supine on traction table",
    specialInstructions: "For proximal femoral fractures (intertrochanteric/subtrochanteric). Helical blade requires careful insertion.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-005",
    procedureName: "Tibial Nailing (IMN Tibia)",
    opcs4Codes: ["V541", "W191"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" },
      { itemId: "INV-002", itemName: "Small Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-007", itemName: "Colibri 2 Reamer System", quantity: 1, category: "Standby" },
      { itemId: "INV-029", itemName: "Angio Table (Radiolucent)", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 3, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-018", itemName: "Guide Wire 2.5mm x 950mm", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 2, category: "Specific Consumables" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-029", itemName: "Angio Table (Radiolucent)", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 105,
    anesthesiaType: "GA",
    patientPosition: "Supine with knee flexed over bolster",
    specialInstructions: "Entry point just medial to patellar tendon. Reaming typically required. Image intensifier essential.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-006",
    procedureName: "Humeral Nailing (IMN Humerus)",
    opcs4Codes: ["V441"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 3, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-018", itemName: "Guide Wire 2.5mm x 950mm", quantity: 1, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 1, category: "Specific Consumables" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 90,
    anesthesiaType: "GA",
    patientPosition: "Beach chair or supine",
    specialInstructions: "Entry point at greater tuberosity. Care with rotator cuff. Unreamed nails preferred.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-007",
    procedureName: "Forearm Nailing (Both Bones)",
    opcs4Codes: ["V511", "V531"],
    specialty: "Orthopaedics & Trauma",
    category: "NAILINGS",

    basicSets: [
      { itemId: "INV-002", itemName: "Small Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-013", itemName: "Orthopedic Trauma Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 3, category: "Consumables" },
      { itemId: "INV-016", itemName: "Monocryl 3.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-017", itemName: "K-Wire 2.0mm x 150mm", quantity: 2, category: "Specific Consumables" },
      { itemId: "INV-020", itemName: "Drill Bit 4.2mm x 360mm (Long)", quantity: 1, category: "Specific Consumables" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 120,
    anesthesiaType: "GA",
    patientPosition: "Supine with arm on table",
    specialInstructions: "Both radius and ulna fixation. Careful soft tissue handling. Image intensifier required.",
    lastUpdated: "2025-01-15"
  },

  // ========================================
  // JOINT REPLACEMENTS (from Kardex)
  // ========================================
  {
    id: "PC-008",
    procedureName: "Total Hip Replacement (THR) Uncemented",
    opcs4Codes: ["W371", "W381"],
    specialty: "Orthopaedics & Trauma",
    category: "JOINTS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" },
      { itemId: "INV-005", itemName: "Pinnacle Acetabular System", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-007", itemName: "Colibri 2 Reamer System", quantity: 1, category: "Standby" },
      { itemId: "INV-027", itemName: "Pulse Lavage System", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 3, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 6, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 3, category: "Consumables" }
    ],

    specificConsumables: [
      { itemId: "INV-023", itemName: "DePuy Pinnacle Cup 54mm", quantity: 1, category: "Specific Consumables", notes: "Select size intraoperatively" },
      { itemId: "INV-024", itemName: "Corail Femoral Stem Size 12", quantity: 1, category: "Specific Consumables", notes: "Select size intraoperatively" }
    ],

    addOns: [],

    operatingTable: [
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 90,
    anesthesiaType: "GA",
    patientPosition: "Lateral decubitus",
    specialInstructions: "Posterior approach. Templating required. Tranexamic acid 1g at induction and closure.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-009",
    procedureName: "Total Hip Replacement (THR) Cemented",
    opcs4Codes: ["W371", "W381"],
    specialty: "Orthopaedics & Trauma",
    category: "JOINTS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-026", itemName: "Cement Gun for Hip/Knee", quantity: 1, category: "Standby" },
      { itemId: "INV-027", itemName: "Pulse Lavage System", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 3, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 6, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 3, category: "Consumables" }
    ],

    specificConsumables: [],

    addOns: [],

    operatingTable: [
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 105,
    anesthesiaType: "GA",
    patientPosition: "Lateral decubitus",
    specialInstructions: "Cement mixing required. Pressurization technique. Tranexamic acid 1g at induction and closure.",
    lastUpdated: "2025-01-15"
  },

  {
    id: "PC-010",
    procedureName: "Total Knee Replacement (TKR)",
    opcs4Codes: ["W401", "W411"],
    specialty: "Orthopaedics & Trauma",
    category: "JOINTS",

    basicSets: [
      { itemId: "INV-001", itemName: "Large Orthopaedic Tray", quantity: 1, category: "Basic Set" }
    ],

    standbyEquipment: [
      { itemId: "INV-006", itemName: "BPL2 Drill System", quantity: 1, category: "Standby" },
      { itemId: "INV-026", itemName: "Cement Gun for Hip/Knee", quantity: 1, category: "Standby" },
      { itemId: "INV-027", itemName: "Pulse Lavage System", quantity: 1, category: "Standby" }
    ],

    consumables: [
      { itemId: "INV-012", itemName: "Hip Drape Pack", quantity: 1, category: "Consumables" },
      { itemId: "INV-013", itemName: "Chlorhexidine 2% Applicator", quantity: 2, category: "Consumables" },
      { itemId: "INV-014", itemName: "Vicryl 1 Suture", quantity: 4, category: "Consumables" },
      { itemId: "INV-015", itemName: "Vicryl 2.0 Suture", quantity: 2, category: "Consumables" }
    ],

    specificConsumables: [],

    addOns: [],

    operatingTable: [
      { itemId: "INV-030", itemName: "Shearer Table", quantity: 1, category: "Operating Table" }
    ],

    estimatedDuration: 90,
    anesthesiaType: "GA",
    patientPosition: "Supine",
    specialInstructions: "Tourniquet typically used. Tranexamic acid 1g IV and 1g intra-articular. Cement fixation standard.",
    lastUpdated: "2025-01-15"
  }
];

// Helper functions
export function getPreferenceCardById(id: string): PreferenceCard | undefined {
  return PREFERENCE_CARDS.find(card => card.id === id);
}

export function getPreferenceCardsBySpecialty(specialty: string): PreferenceCard[] {
  return PREFERENCE_CARDS.filter(card => card.specialty === specialty);
}

export function getPreferenceCardsByCategory(category: string): PreferenceCard[] {
  return PREFERENCE_CARDS.filter(card => card.category === category);
}

export function getPreferenceCardByProcedure(procedureName: string): PreferenceCard | undefined {
  return PREFERENCE_CARDS.find(card =>
    card.procedureName.toLowerCase().includes(procedureName.toLowerCase())
  );
}

export function searchPreferenceCards(query: string): PreferenceCard[] {
  const lowerQuery = query.toLowerCase();
  return PREFERENCE_CARDS.filter(card =>
    card.procedureName.toLowerCase().includes(lowerQuery) ||
    card.opcs4Codes.some(code => code.toLowerCase().includes(lowerQuery)) ||
    card.specialty.toLowerCase().includes(lowerQuery) ||
    card.category.toLowerCase().includes(lowerQuery)
  );
}

export const PREFERENCE_CARD_CATEGORIES = [
  "NAILINGS",
  "PLATINGS",
  "JOINTS",
  "TRAUMA",
  "SPINES",
  "ELECTIVES"
];

/**
 * Auto-score a preference card using the intelligent scoring service
 * This populates the scoring fields based on procedure characteristics
 */
export async function autoScorePreferenceCard(card: PreferenceCard): Promise<PreferenceCard> {
  // Dynamically import to avoid circular dependencies
  const { scoreProcedure } = await import('./services/procedureScoringService');

  const score = scoreProcedure(
    card.procedureName,
    card.opcs4Codes,
    card.specialty,
    undefined
  );

  return {
    ...card,
    customCode: score.customCode,
    complexityScore: score.complexityScore,
    durationScore: score.durationScore,
    variabilityScore: score.variabilityScore,
    surgeonLevelScore: score.surgeonLevelScore,
    averageScore: score.averageScore,
    complexity: score.complexity,
    estimatedDuration: score.estimatedDuration, // Update with calculated duration
  };
}

/**
 * Auto-score all preference cards
 */
export async function autoScoreAllPreferenceCards(): Promise<PreferenceCard[]> {
  const scoredCards: PreferenceCard[] = [];

  for (const card of PREFERENCE_CARDS) {
    const scored = await autoScorePreferenceCard(card);
    scoredCards.push(scored);
  }

  return scoredCards;
}
