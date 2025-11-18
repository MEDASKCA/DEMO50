// Auto-generated Preference Cards
// 280 cards across 14 specialties

import { ROYAL_LONDON_CONSULTANTS, getConsultantsBySpecialty } from './consultantData';
import { PROCEDURE_COSTS } from './surgicalCompetencyData';

export interface PreferenceCardItem {
  inventoryId: string;
  quantity: number;
  notes?: string;
}

// General Information Section
export interface GeneralInformation {
  procedureName?: string;
  positioning?: string; // e.g., "Supine", "Lateral", "Prone"
  anaestheticType?: string; // e.g., "General", "Regional", "Local"
  operatingTable?: string; // e.g., "Standard", "Orthopaedic", "Imaging"
  setupNotes?: string;
  cheatSheetLink?: string; // Link to step-by-step procedural guide
}

// Positioning Equipment Section
export interface PositioningEquipment {
  items: Array<{
    name: string;
    quantity?: number;
    notes?: string;
  }>;
}

// Cleaning and Prep Solutions Section
export interface CleaningAndPrep {
  items: Array<{
    name: string;
    volume?: string;
    application?: string; // e.g., "Skin prep", "Wound irrigation"
  }>;
}

// Wound Dressing Section
export interface WoundDressing {
  items: Array<{
    name: string;
    quantity?: number;
    type?: string; // e.g., "Primary", "Secondary"
  }>;
}

// Miscellaneous Section
export interface Miscellaneous {
  items: Array<{
    name: string;
    quantity?: number;
    notes?: string;
  }>;
}

// Drapes and Consumables Section
export interface DrapesAndConsumables {
  basic: PreferenceCardItem[]; // Trust-owned stock
  specific: PreferenceCardItem[]; // Supplier/specific brands
}

// Instrument Sets Section
export interface InstrumentSets {
  basic: Array<{
    name: string;
    description?: string;
    inventoryId?: string;
  }>; // Trust's standard trays
  specific: Array<{
    name: string;
    supplier?: string;
    type: 'consigned' | 'loaned' | 'purchased';
    inventoryId?: string;
  }>; // Supplier sets, consigned, loaned
}

// Equipment Section
export interface Equipment {
  items: Array<{
    name: string;
    quantity?: number;
    settings?: string;
    inventoryId?: string;
  }>;
}

// Sutures and Closure Materials Section
export interface SuturesAndClosure {
  items: Array<{
    type: string; // e.g., "Vicryl 2-0", "Monocryl 3-0"
    size: string;
    needleType?: string;
    quantity: number;
    usage: string; // e.g., "Skin closure", "Deep tissue"
    inventoryId?: string;
  }>;
}

// Implants/Prostheses Section
export interface ImplantsAndProstheses {
  items: Array<{
    name: string;
    manufacturer: string;
    catalogNumber?: string;
    size?: string;
    quantity: number;
    type: 'consigned' | 'purchased';
    inventoryId?: string;
  }>;
}

// Medications and Fluids Section
export interface MedicationsAndFluids {
  items: Array<{
    name: string;
    dose?: string;
    route?: string; // e.g., "IV", "Topical", "Local infiltration"
    timing?: string; // e.g., "Pre-incision", "Post-closure"
    inventoryId?: string;
  }>;
}

// Counts and Notes Section
export interface CountsAndNotes {
  instrumentCount?: boolean;
  swabCount?: boolean;
  needleCount?: boolean;
  additionalNotes?: string;
}

// Special Instructions Section
export interface SpecialInstructions {
  preOperative?: string[];
  intraOperative?: string[];
  postOperative?: string[];
  teamCommunication?: string[];
}

export interface PreferenceCard {
  id: string;
  consultantName: string;
  consultantTitle: string;
  specialty: string;
  procedureOpcs4Codes: string[];

  // New comprehensive sections
  generalInfo?: GeneralInformation;
  positioningEquipment?: PositioningEquipment;
  cleaningAndPrep?: CleaningAndPrep;
  drapesAndConsumables?: DrapesAndConsumables;
  instrumentSets?: InstrumentSets;
  equipment?: Equipment;
  suturesAndClosure?: SuturesAndClosure;
  implantsAndProstheses?: ImplantsAndProstheses;
  medicationsAndFluids?: MedicationsAndFluids;
  woundDressing?: WoundDressing;
  miscellaneous?: Miscellaneous;
  countsAndNotes?: CountsAndNotes;
  specialInstructions?: SpecialInstructions;

  // Legacy support - for backward compatibility with existing cards
  items?: PreferenceCardItem[];

  lastUpdated: string;
  notes?: string;
  instructions?: string;
}

export const PREFERENCE_CARDS: PreferenceCard[] = [
  {
    "id": "PC-001",
    "consultantName": "James Anderson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00001",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00009",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00038",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00039",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00040",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Anderson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-002",
    "consultantName": "James Anderson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00039",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00040",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00041",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Anderson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-003",
    "consultantName": "James Anderson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00040",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00041",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00042",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Anderson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-004",
    "consultantName": "James Anderson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00041",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00042",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00043",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Anderson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-005",
    "consultantName": "Robert Thompson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "S032"
    ],
    "items": [
      {
        "inventoryId": "INV-00005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00042",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00043",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00044",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Thompson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-006",
    "consultantName": "Robert Thompson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00001",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00043",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00044",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00045",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Thompson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-007",
    "consultantName": "Robert Thompson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00009",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00044",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00045",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00046",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Thompson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-008",
    "consultantName": "Robert Thompson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00045",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00046",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00047",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Thompson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-009",
    "consultantName": "Sarah Mitchell",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00046",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00047",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00048",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Mitchell's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-010",
    "consultantName": "Sarah Mitchell",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00047",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00048",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00049",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Mitchell's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-011",
    "consultantName": "Sarah Mitchell",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00001",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00048",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00049",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00050",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Mitchell's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-012",
    "consultantName": "Sarah Mitchell",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00049",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00050",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00051",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Mitchell's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-013",
    "consultantName": "David Wilson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00009",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00050",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00051",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00052",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Wilson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-014",
    "consultantName": "David Wilson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00051",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00052",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00053",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Wilson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-015",
    "consultantName": "David Wilson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "S032"
    ],
    "items": [
      {
        "inventoryId": "INV-00005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00052",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00053",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00054",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Wilson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-016",
    "consultantName": "David Wilson",
    "consultantTitle": "Mr",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00001",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00053",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00054",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00055",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Wilson's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-017",
    "consultantName": "Emma Roberts",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00054",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00055",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00056",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Roberts's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-018",
    "consultantName": "Emma Roberts",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00055",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00056",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00057",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Roberts's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-019",
    "consultantName": "Emma Roberts",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00006",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00009",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00056",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00057",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00038",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Roberts's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-020",
    "consultantName": "Emma Roberts",
    "consultantTitle": "Ms",
    "specialty": "Trauma Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00015",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00019",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00023",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00031",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00057",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00038",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00039",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Roberts's standard setup for Trauma Orthopaedics procedures",
    "instructions": "Standard Trauma Orthopaedics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-021",
    "consultantName": "Michael Hughes",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H011"
    ],
    "items": [
      {
        "inventoryId": "INV-00078",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00086",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00115",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00116",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00117",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hughes's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-022",
    "consultantName": "Michael Hughes",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H021"
    ],
    "items": [
      {
        "inventoryId": "INV-00079",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00116",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00117",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00118",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hughes's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-023",
    "consultantName": "Michael Hughes",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V542"
    ],
    "items": [
      {
        "inventoryId": "INV-00080",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00117",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00118",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00119",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hughes's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-024",
    "consultantName": "Michael Hughes",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V381"
    ],
    "items": [
      {
        "inventoryId": "INV-00081",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00087",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00118",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00119",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00120",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hughes's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-025",
    "consultantName": "Jessica Parker",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V382"
    ],
    "items": [
      {
        "inventoryId": "INV-00082",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00119",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00120",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00121",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Parker's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-026",
    "consultantName": "Jessica Parker",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H011"
    ],
    "items": [
      {
        "inventoryId": "INV-00078",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00120",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00121",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00122",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Parker's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-027",
    "consultantName": "Jessica Parker",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H021"
    ],
    "items": [
      {
        "inventoryId": "INV-00079",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00086",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00121",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00122",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00123",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Parker's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-028",
    "consultantName": "Jessica Parker",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V542"
    ],
    "items": [
      {
        "inventoryId": "INV-00080",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00122",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00123",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00124",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Parker's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-029",
    "consultantName": "Andrew Collins",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V381"
    ],
    "items": [
      {
        "inventoryId": "INV-00081",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00123",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00124",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00125",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Collins's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-030",
    "consultantName": "Andrew Collins",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V382"
    ],
    "items": [
      {
        "inventoryId": "INV-00082",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00087",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00124",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00125",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00126",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Collins's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-031",
    "consultantName": "Andrew Collins",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H011"
    ],
    "items": [
      {
        "inventoryId": "INV-00078",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00125",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00126",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00127",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Collins's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-032",
    "consultantName": "Andrew Collins",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H021"
    ],
    "items": [
      {
        "inventoryId": "INV-00079",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00126",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00127",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00128",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Collins's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-033",
    "consultantName": "Rachel Bennett",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V542"
    ],
    "items": [
      {
        "inventoryId": "INV-00080",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00086",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00127",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00128",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00129",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Bennett's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-034",
    "consultantName": "Rachel Bennett",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V381"
    ],
    "items": [
      {
        "inventoryId": "INV-00081",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00128",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00129",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00130",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Bennett's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-035",
    "consultantName": "Rachel Bennett",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V382"
    ],
    "items": [
      {
        "inventoryId": "INV-00082",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00129",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00130",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00131",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Bennett's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-036",
    "consultantName": "Rachel Bennett",
    "consultantTitle": "Ms",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H011"
    ],
    "items": [
      {
        "inventoryId": "INV-00078",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00087",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00109",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00130",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00131",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00132",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Bennett's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-037",
    "consultantName": "Thomas Edwards",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "H021"
    ],
    "items": [
      {
        "inventoryId": "INV-00079",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00110",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00131",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00132",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00133",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Edwards's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-038",
    "consultantName": "Thomas Edwards",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V542"
    ],
    "items": [
      {
        "inventoryId": "INV-00080",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00085",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00097",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00111",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00132",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00133",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00134",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Edwards's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-039",
    "consultantName": "Thomas Edwards",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V381"
    ],
    "items": [
      {
        "inventoryId": "INV-00081",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00083",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00086",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00098",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00112",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00133",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00134",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00115",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Edwards's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-040",
    "consultantName": "Thomas Edwards",
    "consultantTitle": "Mr",
    "specialty": "Spines",
    "procedureOpcs4Codes": [
      "V382"
    ],
    "items": [
      {
        "inventoryId": "INV-00082",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00084",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00088",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00089",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00092",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00093",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00099",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00096",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00100",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00101",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00102",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00103",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00113",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00114",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00108",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00134",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00115",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00116",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Edwards's standard setup for Spines procedures",
    "instructions": "Standard Spines procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-041",
    "consultantName": "Christopher Walker",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00155",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00163",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00192",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00193",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00194",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Walker's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-042",
    "consultantName": "Christopher Walker",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00156",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00193",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00194",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00195",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Walker's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-043",
    "consultantName": "Christopher Walker",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00157",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00194",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00195",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00196",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Walker's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-044",
    "consultantName": "Christopher Walker",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00158",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00164",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00195",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00196",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00197",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Walker's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-045",
    "consultantName": "Sophie Turner",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00159",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00196",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00197",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00198",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Turner's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-046",
    "consultantName": "Sophie Turner",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00155",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00197",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00198",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00199",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Turner's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-047",
    "consultantName": "Sophie Turner",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00156",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00163",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00198",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00199",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00200",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Turner's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-048",
    "consultantName": "Sophie Turner",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00157",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00199",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00200",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00201",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Turner's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-049",
    "consultantName": "Daniel Phillips",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00158",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00200",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00201",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00202",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Phillips's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-050",
    "consultantName": "Daniel Phillips",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00159",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00164",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00201",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00202",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00203",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Phillips's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-051",
    "consultantName": "Daniel Phillips",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00155",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00202",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00203",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00204",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Phillips's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-052",
    "consultantName": "Daniel Phillips",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00156",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00203",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00204",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00205",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Phillips's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-053",
    "consultantName": "Olivia Morgan",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00157",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00163",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00204",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00205",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00206",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morgan's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-054",
    "consultantName": "Olivia Morgan",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00158",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00205",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00206",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00207",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morgan's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-055",
    "consultantName": "Olivia Morgan",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00159",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00206",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00207",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00208",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morgan's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-056",
    "consultantName": "Olivia Morgan",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T521"
    ],
    "items": [
      {
        "inventoryId": "INV-00155",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00164",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00186",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00207",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00208",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00209",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morgan's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-057",
    "consultantName": "Alexander Cooper",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "T522"
    ],
    "items": [
      {
        "inventoryId": "INV-00156",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00187",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00208",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00209",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00210",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Cooper's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-058",
    "consultantName": "Alexander Cooper",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W901"
    ],
    "items": [
      {
        "inventoryId": "INV-00157",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00162",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00174",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00188",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00209",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00210",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00211",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Cooper's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-059",
    "consultantName": "Alexander Cooper",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00158",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00160",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00163",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00175",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00189",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00210",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00211",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00192",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Cooper's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-060",
    "consultantName": "Alexander Cooper",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00159",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00161",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00165",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00166",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00169",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00170",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00176",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00173",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00177",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00178",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00179",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00180",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00190",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00191",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00185",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00211",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00192",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00193",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Cooper's standard setup for Upper Limb procedures",
    "instructions": "Standard Upper Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-061",
    "consultantName": "Matthew Harrison",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00232",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00240",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00269",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00270",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00271",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Harrison's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-062",
    "consultantName": "Matthew Harrison",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00233",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00270",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00271",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00272",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Harrison's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-063",
    "consultantName": "Matthew Harrison",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00234",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00271",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00272",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00273",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Harrison's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-064",
    "consultantName": "Matthew Harrison",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00235",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00241",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00272",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00273",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00274",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Harrison's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-065",
    "consultantName": "Charlotte Stewart",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00236",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00273",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00274",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00275",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Stewart's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-066",
    "consultantName": "Charlotte Stewart",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00232",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00274",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00275",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00276",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Stewart's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-067",
    "consultantName": "Charlotte Stewart",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00233",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00240",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00275",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00276",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00277",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Stewart's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-068",
    "consultantName": "Charlotte Stewart",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00234",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00276",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00277",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00278",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Stewart's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-069",
    "consultantName": "William Barnes",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00235",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00277",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00278",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00279",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Barnes's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-070",
    "consultantName": "William Barnes",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00236",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00241",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00278",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00279",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00280",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Barnes's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-071",
    "consultantName": "William Barnes",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00232",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00279",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00280",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00281",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Barnes's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-072",
    "consultantName": "William Barnes",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00233",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00280",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00281",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00282",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Barnes's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-073",
    "consultantName": "Emily Fisher",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00234",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00240",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00281",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00282",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00283",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Fisher's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-074",
    "consultantName": "Emily Fisher",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00235",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00282",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00283",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00284",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Fisher's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-075",
    "consultantName": "Emily Fisher",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00236",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00283",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00284",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00285",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Fisher's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-076",
    "consultantName": "Emily Fisher",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00232",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00241",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00263",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00284",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00285",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00286",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Fisher's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-077",
    "consultantName": "George Reynolds",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00233",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00264",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00285",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00286",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00287",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Reynolds's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-078",
    "consultantName": "George Reynolds",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "S471"
    ],
    "items": [
      {
        "inventoryId": "INV-00234",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00239",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00251",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00265",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00286",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00287",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00288",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Reynolds's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-079",
    "consultantName": "George Reynolds",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "V541"
    ],
    "items": [
      {
        "inventoryId": "INV-00235",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00237",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00240",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00252",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00266",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00287",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00288",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00269",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Reynolds's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-080",
    "consultantName": "George Reynolds",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00236",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00238",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00242",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00243",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00246",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00247",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00253",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00250",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00254",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00255",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00256",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00257",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00267",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00268",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00262",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00288",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00269",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00270",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Reynolds's standard setup for Lower Limb procedures",
    "instructions": "Standard Lower Limb procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-081",
    "consultantName": "Richard Patterson",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00309",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00317",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00346",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00347",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00348",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Patterson's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-082",
    "consultantName": "Richard Patterson",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00310",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00347",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00348",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00349",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Patterson's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-083",
    "consultantName": "Richard Patterson",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00311",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00348",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00349",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00350",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Patterson's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-084",
    "consultantName": "Richard Patterson",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00312",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00318",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00349",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00350",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00351",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Patterson's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-085",
    "consultantName": "Victoria Hughes",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00313",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00350",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00351",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00352",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hughes's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-086",
    "consultantName": "Victoria Hughes",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00309",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00351",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00352",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00353",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hughes's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-087",
    "consultantName": "Victoria Hughes",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00310",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00317",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00352",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00353",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00354",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hughes's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-088",
    "consultantName": "Victoria Hughes",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00311",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00353",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00354",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00355",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hughes's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-089",
    "consultantName": "Jonathan Morris",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00312",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00354",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00355",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00356",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Morris's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-090",
    "consultantName": "Jonathan Morris",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00313",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00318",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00355",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00356",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00357",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Morris's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-091",
    "consultantName": "Jonathan Morris",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00309",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00356",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00357",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00358",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Morris's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-092",
    "consultantName": "Jonathan Morris",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00310",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00357",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00358",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00359",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Morris's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-093",
    "consultantName": "Katherine Ward",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00311",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00317",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00358",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00359",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00360",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Ward's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-094",
    "consultantName": "Katherine Ward",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00312",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00359",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00360",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00361",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Ward's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-095",
    "consultantName": "Katherine Ward",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00313",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00360",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00361",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00362",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Ward's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-096",
    "consultantName": "Katherine Ward",
    "consultantTitle": "Ms",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00309",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00318",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00340",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00361",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00362",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00363",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Ward's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-097",
    "consultantName": "Simon Graham",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W371"
    ],
    "items": [
      {
        "inventoryId": "INV-00310",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00341",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00362",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00363",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00364",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Graham's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-098",
    "consultantName": "Simon Graham",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W381"
    ],
    "items": [
      {
        "inventoryId": "INV-00311",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00316",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00328",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00342",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00363",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00364",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00365",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Graham's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-099",
    "consultantName": "Simon Graham",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W401"
    ],
    "items": [
      {
        "inventoryId": "INV-00312",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00314",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00317",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00329",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00343",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00364",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00365",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00346",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Graham's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-100",
    "consultantName": "Simon Graham",
    "consultantTitle": "Mr",
    "specialty": "Elective Orthopaedics",
    "procedureOpcs4Codes": [
      "W411"
    ],
    "items": [
      {
        "inventoryId": "INV-00313",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00315",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00319",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00320",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00323",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00324",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00330",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00327",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00331",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00332",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00333",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00334",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00344",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00345",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00339",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00365",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00346",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00347",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Graham's standard setup for Joint Replacement procedures",
    "instructions": "Standard Joint Replacement procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-101",
    "consultantName": "Peter Clarke",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J183"
    ],
    "items": [
      {
        "inventoryId": "INV-00386",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00394",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00423",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00424",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00425",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Clarke's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-102",
    "consultantName": "Peter Clarke",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H081"
    ],
    "items": [
      {
        "inventoryId": "INV-00387",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00424",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00425",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00426",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Clarke's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-103",
    "consultantName": "Peter Clarke",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J271"
    ],
    "items": [
      {
        "inventoryId": "INV-00388",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00425",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00426",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00427",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Clarke's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-104",
    "consultantName": "Peter Clarke",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "G011"
    ],
    "items": [
      {
        "inventoryId": "INV-00389",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00395",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00426",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00427",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00428",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Clarke's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-105",
    "consultantName": "Jennifer Powell",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H331"
    ],
    "items": [
      {
        "inventoryId": "INV-00390",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00427",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00428",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00429",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Powell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-106",
    "consultantName": "Jennifer Powell",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J183"
    ],
    "items": [
      {
        "inventoryId": "INV-00386",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00428",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00429",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00430",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Powell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-107",
    "consultantName": "Jennifer Powell",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H081"
    ],
    "items": [
      {
        "inventoryId": "INV-00387",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00394",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00429",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00430",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00431",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Powell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-108",
    "consultantName": "Jennifer Powell",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J271"
    ],
    "items": [
      {
        "inventoryId": "INV-00388",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00430",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00431",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00432",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Powell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-109",
    "consultantName": "Stephen Russell",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "G011"
    ],
    "items": [
      {
        "inventoryId": "INV-00389",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00431",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00432",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00433",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Russell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-110",
    "consultantName": "Stephen Russell",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H331"
    ],
    "items": [
      {
        "inventoryId": "INV-00390",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00395",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00432",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00433",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00434",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Russell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-111",
    "consultantName": "Stephen Russell",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J183"
    ],
    "items": [
      {
        "inventoryId": "INV-00386",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00433",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00434",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00435",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Russell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-112",
    "consultantName": "Stephen Russell",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H081"
    ],
    "items": [
      {
        "inventoryId": "INV-00387",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00434",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00435",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00436",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Russell's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-113",
    "consultantName": "Hannah Griffin",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J271"
    ],
    "items": [
      {
        "inventoryId": "INV-00388",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00394",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00435",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00436",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00437",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Griffin's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-114",
    "consultantName": "Hannah Griffin",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "G011"
    ],
    "items": [
      {
        "inventoryId": "INV-00389",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00436",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00437",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00438",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Griffin's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-115",
    "consultantName": "Hannah Griffin",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H331"
    ],
    "items": [
      {
        "inventoryId": "INV-00390",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00437",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00438",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00439",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Griffin's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-116",
    "consultantName": "Hannah Griffin",
    "consultantTitle": "Ms",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J183"
    ],
    "items": [
      {
        "inventoryId": "INV-00386",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00395",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00417",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00438",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00439",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00440",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Griffin's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-117",
    "consultantName": "Mark Butler",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H081"
    ],
    "items": [
      {
        "inventoryId": "INV-00387",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00418",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00439",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00440",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00441",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Butler's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-118",
    "consultantName": "Mark Butler",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "J271"
    ],
    "items": [
      {
        "inventoryId": "INV-00388",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00393",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00405",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00419",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00440",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00441",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00442",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Butler's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-119",
    "consultantName": "Mark Butler",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "G011"
    ],
    "items": [
      {
        "inventoryId": "INV-00389",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00391",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00394",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00406",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00420",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00441",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00442",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00423",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Butler's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-120",
    "consultantName": "Mark Butler",
    "consultantTitle": "Mr",
    "specialty": "General Surgery",
    "procedureOpcs4Codes": [
      "H331"
    ],
    "items": [
      {
        "inventoryId": "INV-00390",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00392",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00396",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00397",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00400",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00401",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00407",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00404",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00408",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00409",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00410",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00411",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00421",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00422",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00416",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00442",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00423",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00424",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Butler's standard setup for General Surgery procedures",
    "instructions": "Standard General Surgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-121",
    "consultantName": "Anthony Jenkins",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K401"
    ],
    "items": [
      {
        "inventoryId": "INV-00463",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00471",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00500",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00501",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00502",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Jenkins's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-122",
    "consultantName": "Anthony Jenkins",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K402"
    ],
    "items": [
      {
        "inventoryId": "INV-00464",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00501",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00502",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00503",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Jenkins's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-123",
    "consultantName": "Anthony Jenkins",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X141"
    ],
    "items": [
      {
        "inventoryId": "INV-00465",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00502",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00503",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00504",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Jenkins's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-124",
    "consultantName": "Anthony Jenkins",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X142"
    ],
    "items": [
      {
        "inventoryId": "INV-00466",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00472",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00503",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00504",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00505",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Jenkins's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-125",
    "consultantName": "Rebecca Foster",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K461"
    ],
    "items": [
      {
        "inventoryId": "INV-00467",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00504",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00505",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00506",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Foster's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-126",
    "consultantName": "Rebecca Foster",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K401"
    ],
    "items": [
      {
        "inventoryId": "INV-00463",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00505",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00506",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00507",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Foster's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-127",
    "consultantName": "Rebecca Foster",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K402"
    ],
    "items": [
      {
        "inventoryId": "INV-00464",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00471",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00506",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00507",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00508",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Foster's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-128",
    "consultantName": "Rebecca Foster",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X141"
    ],
    "items": [
      {
        "inventoryId": "INV-00465",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00507",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00508",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00509",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Foster's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-129",
    "consultantName": "Nicholas Palmer",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X142"
    ],
    "items": [
      {
        "inventoryId": "INV-00466",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00508",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00509",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00510",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Palmer's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-130",
    "consultantName": "Nicholas Palmer",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K461"
    ],
    "items": [
      {
        "inventoryId": "INV-00467",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00472",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00509",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00510",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00511",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Palmer's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-131",
    "consultantName": "Nicholas Palmer",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K401"
    ],
    "items": [
      {
        "inventoryId": "INV-00463",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00510",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00511",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00512",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Palmer's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-132",
    "consultantName": "Nicholas Palmer",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K402"
    ],
    "items": [
      {
        "inventoryId": "INV-00464",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00511",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00512",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00513",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Palmer's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-133",
    "consultantName": "Laura Richardson",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X141"
    ],
    "items": [
      {
        "inventoryId": "INV-00465",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00471",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00512",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00513",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00514",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Richardson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-134",
    "consultantName": "Laura Richardson",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X142"
    ],
    "items": [
      {
        "inventoryId": "INV-00466",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00513",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00514",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00515",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Richardson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-135",
    "consultantName": "Laura Richardson",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K461"
    ],
    "items": [
      {
        "inventoryId": "INV-00467",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00514",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00515",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00516",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Richardson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-136",
    "consultantName": "Laura Richardson",
    "consultantTitle": "Ms",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K401"
    ],
    "items": [
      {
        "inventoryId": "INV-00463",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00472",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00494",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00515",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00516",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00517",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Richardson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-137",
    "consultantName": "Charles Simpson",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K402"
    ],
    "items": [
      {
        "inventoryId": "INV-00464",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00495",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00516",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00517",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00518",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Simpson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-138",
    "consultantName": "Charles Simpson",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X141"
    ],
    "items": [
      {
        "inventoryId": "INV-00465",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00470",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00482",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00496",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00517",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00518",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00519",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Simpson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-139",
    "consultantName": "Charles Simpson",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "X142"
    ],
    "items": [
      {
        "inventoryId": "INV-00466",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00468",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00471",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00483",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00497",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00518",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00519",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00500",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Simpson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-140",
    "consultantName": "Charles Simpson",
    "consultantTitle": "Mr",
    "specialty": "Cardiac",
    "procedureOpcs4Codes": [
      "K461"
    ],
    "items": [
      {
        "inventoryId": "INV-00467",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00469",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00473",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00474",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00477",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00478",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00484",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00481",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00485",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00486",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00487",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00488",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00498",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00499",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00493",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00519",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00500",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00501",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Simpson's standard setup for Cardiac procedures",
    "instructions": "Standard Cardiac procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-141",
    "consultantName": "Benjamin Watson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A011"
    ],
    "items": [
      {
        "inventoryId": "INV-00540",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00548",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00577",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00578",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00579",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Watson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-142",
    "consultantName": "Benjamin Watson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A021"
    ],
    "items": [
      {
        "inventoryId": "INV-00541",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00578",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00579",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00580",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Watson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-143",
    "consultantName": "Benjamin Watson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A531"
    ],
    "items": [
      {
        "inventoryId": "INV-00542",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00579",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00580",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00581",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Watson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-144",
    "consultantName": "Benjamin Watson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A041"
    ],
    "items": [
      {
        "inventoryId": "INV-00543",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00549",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00580",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00581",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00582",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Watson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-145",
    "consultantName": "Natalie Brooks",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A051"
    ],
    "items": [
      {
        "inventoryId": "INV-00544",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00581",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00582",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00583",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Brooks's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-146",
    "consultantName": "Natalie Brooks",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A011"
    ],
    "items": [
      {
        "inventoryId": "INV-00540",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00582",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00583",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00584",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Brooks's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-147",
    "consultantName": "Natalie Brooks",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A021"
    ],
    "items": [
      {
        "inventoryId": "INV-00541",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00548",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00583",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00584",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00585",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Brooks's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-148",
    "consultantName": "Natalie Brooks",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A531"
    ],
    "items": [
      {
        "inventoryId": "INV-00542",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00584",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00585",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00586",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Brooks's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-149",
    "consultantName": "Edward Henderson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A041"
    ],
    "items": [
      {
        "inventoryId": "INV-00543",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00585",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00586",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00587",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Henderson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-150",
    "consultantName": "Edward Henderson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A051"
    ],
    "items": [
      {
        "inventoryId": "INV-00544",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00549",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00586",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00587",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00588",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Henderson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-151",
    "consultantName": "Edward Henderson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A011"
    ],
    "items": [
      {
        "inventoryId": "INV-00540",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00587",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00588",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00589",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Henderson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-152",
    "consultantName": "Edward Henderson",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A021"
    ],
    "items": [
      {
        "inventoryId": "INV-00541",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00588",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00589",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00590",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Henderson's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-153",
    "consultantName": "Amy Morrison",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A531"
    ],
    "items": [
      {
        "inventoryId": "INV-00542",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00548",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00589",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00590",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00591",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morrison's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-154",
    "consultantName": "Amy Morrison",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A041"
    ],
    "items": [
      {
        "inventoryId": "INV-00543",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00590",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00591",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00592",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morrison's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-155",
    "consultantName": "Amy Morrison",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A051"
    ],
    "items": [
      {
        "inventoryId": "INV-00544",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00591",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00592",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00593",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morrison's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-156",
    "consultantName": "Amy Morrison",
    "consultantTitle": "Ms",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A011"
    ],
    "items": [
      {
        "inventoryId": "INV-00540",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00549",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00571",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00592",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00593",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00594",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Morrison's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-157",
    "consultantName": "Oliver Spencer",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A021"
    ],
    "items": [
      {
        "inventoryId": "INV-00541",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00572",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00593",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00594",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00595",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Spencer's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-158",
    "consultantName": "Oliver Spencer",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A531"
    ],
    "items": [
      {
        "inventoryId": "INV-00542",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00547",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00559",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00573",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00594",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00595",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00596",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Spencer's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-159",
    "consultantName": "Oliver Spencer",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A041"
    ],
    "items": [
      {
        "inventoryId": "INV-00543",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00545",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00548",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00560",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00574",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00595",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00596",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00577",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Spencer's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-160",
    "consultantName": "Oliver Spencer",
    "consultantTitle": "Mr",
    "specialty": "Neurosurgery",
    "procedureOpcs4Codes": [
      "A051"
    ],
    "items": [
      {
        "inventoryId": "INV-00544",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00546",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00550",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00551",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00554",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00555",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00561",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00558",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00562",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00563",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00564",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00565",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00575",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00576",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00570",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00596",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00577",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00578",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Spencer's standard setup for Neurosurgery procedures",
    "instructions": "Standard Neurosurgery procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-161",
    "consultantName": "Timothy Webb",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L271"
    ],
    "items": [
      {
        "inventoryId": "INV-00617",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00625",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00654",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00655",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00656",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Webb's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-162",
    "consultantName": "Timothy Webb",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L281"
    ],
    "items": [
      {
        "inventoryId": "INV-00618",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00655",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00656",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00657",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Webb's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-163",
    "consultantName": "Timothy Webb",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L311"
    ],
    "items": [
      {
        "inventoryId": "INV-00619",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00656",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00657",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00658",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Webb's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-164",
    "consultantName": "Timothy Webb",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L331"
    ],
    "items": [
      {
        "inventoryId": "INV-00620",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00626",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00657",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00658",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00659",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Webb's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-165",
    "consultantName": "Michelle Chapman",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L341"
    ],
    "items": [
      {
        "inventoryId": "INV-00621",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00658",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00659",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00660",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Chapman's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-166",
    "consultantName": "Michelle Chapman",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L271"
    ],
    "items": [
      {
        "inventoryId": "INV-00617",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00659",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00660",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00661",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Chapman's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-167",
    "consultantName": "Michelle Chapman",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L281"
    ],
    "items": [
      {
        "inventoryId": "INV-00618",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00625",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00660",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00661",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00662",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Chapman's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-168",
    "consultantName": "Michelle Chapman",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L311"
    ],
    "items": [
      {
        "inventoryId": "INV-00619",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00661",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00662",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00663",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Chapman's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-169",
    "consultantName": "Kevin Armstrong",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L331"
    ],
    "items": [
      {
        "inventoryId": "INV-00620",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00662",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00663",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00664",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Armstrong's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-170",
    "consultantName": "Kevin Armstrong",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L341"
    ],
    "items": [
      {
        "inventoryId": "INV-00621",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00626",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00663",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00664",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00665",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Armstrong's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-171",
    "consultantName": "Kevin Armstrong",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L271"
    ],
    "items": [
      {
        "inventoryId": "INV-00617",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00664",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00665",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00666",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Armstrong's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-172",
    "consultantName": "Kevin Armstrong",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L281"
    ],
    "items": [
      {
        "inventoryId": "INV-00618",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00665",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00666",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00667",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Armstrong's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-173",
    "consultantName": "Claire Matthews",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L311"
    ],
    "items": [
      {
        "inventoryId": "INV-00619",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00625",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00666",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00667",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00668",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Matthews's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-174",
    "consultantName": "Claire Matthews",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L331"
    ],
    "items": [
      {
        "inventoryId": "INV-00620",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00667",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00668",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00669",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Matthews's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-175",
    "consultantName": "Claire Matthews",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L341"
    ],
    "items": [
      {
        "inventoryId": "INV-00621",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00668",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00669",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00670",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Matthews's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-176",
    "consultantName": "Claire Matthews",
    "consultantTitle": "Ms",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L271"
    ],
    "items": [
      {
        "inventoryId": "INV-00617",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00626",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00648",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00669",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00670",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00671",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Matthews's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-177",
    "consultantName": "Paul Dixon",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L281"
    ],
    "items": [
      {
        "inventoryId": "INV-00618",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00649",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00670",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00671",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00672",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Dixon's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-178",
    "consultantName": "Paul Dixon",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L311"
    ],
    "items": [
      {
        "inventoryId": "INV-00619",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00624",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00636",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00650",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00671",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00672",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00673",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Dixon's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-179",
    "consultantName": "Paul Dixon",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L331"
    ],
    "items": [
      {
        "inventoryId": "INV-00620",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00622",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00625",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00637",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00651",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00672",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00673",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00654",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Dixon's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-180",
    "consultantName": "Paul Dixon",
    "consultantTitle": "Mr",
    "specialty": "Vascular",
    "procedureOpcs4Codes": [
      "L341"
    ],
    "items": [
      {
        "inventoryId": "INV-00621",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00623",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00627",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00628",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00631",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00632",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00638",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00635",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00639",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00640",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00641",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00642",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00652",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00653",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00647",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00673",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00654",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00655",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Dixon's standard setup for Vascular procedures",
    "instructions": "Standard Vascular procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-181",
    "consultantName": "Julian Hayes",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S011"
    ],
    "items": [
      {
        "inventoryId": "INV-00694",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00702",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00731",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00732",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00733",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hayes's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-182",
    "consultantName": "Julian Hayes",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S021"
    ],
    "items": [
      {
        "inventoryId": "INV-00695",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00732",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00733",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00734",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hayes's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-183",
    "consultantName": "Julian Hayes",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S271"
    ],
    "items": [
      {
        "inventoryId": "INV-00696",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00733",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00734",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00735",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hayes's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-184",
    "consultantName": "Julian Hayes",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S281"
    ],
    "items": [
      {
        "inventoryId": "INV-00697",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00703",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00734",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00735",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00736",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hayes's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-185",
    "consultantName": "Samantha Reid",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S351"
    ],
    "items": [
      {
        "inventoryId": "INV-00698",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00735",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00736",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00737",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Reid's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-186",
    "consultantName": "Samantha Reid",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S011"
    ],
    "items": [
      {
        "inventoryId": "INV-00694",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00736",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00737",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00738",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Reid's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-187",
    "consultantName": "Samantha Reid",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S021"
    ],
    "items": [
      {
        "inventoryId": "INV-00695",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00702",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00737",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00738",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00739",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Reid's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-188",
    "consultantName": "Samantha Reid",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S271"
    ],
    "items": [
      {
        "inventoryId": "INV-00696",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00738",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00739",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00740",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Reid's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-189",
    "consultantName": "Adrian Crawford",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S281"
    ],
    "items": [
      {
        "inventoryId": "INV-00697",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00739",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00740",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00741",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Crawford's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-190",
    "consultantName": "Adrian Crawford",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S351"
    ],
    "items": [
      {
        "inventoryId": "INV-00698",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00703",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00740",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00741",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00742",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Crawford's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-191",
    "consultantName": "Adrian Crawford",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S011"
    ],
    "items": [
      {
        "inventoryId": "INV-00694",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00741",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00742",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00743",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Crawford's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-192",
    "consultantName": "Adrian Crawford",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S021"
    ],
    "items": [
      {
        "inventoryId": "INV-00695",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00742",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00743",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00744",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Crawford's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-193",
    "consultantName": "Fiona Campbell",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S271"
    ],
    "items": [
      {
        "inventoryId": "INV-00696",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00702",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00743",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00744",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00745",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Campbell's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-194",
    "consultantName": "Fiona Campbell",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S281"
    ],
    "items": [
      {
        "inventoryId": "INV-00697",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00744",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00745",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00746",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Campbell's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-195",
    "consultantName": "Fiona Campbell",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S351"
    ],
    "items": [
      {
        "inventoryId": "INV-00698",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00745",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00746",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00747",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Campbell's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-196",
    "consultantName": "Fiona Campbell",
    "consultantTitle": "Ms",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S011"
    ],
    "items": [
      {
        "inventoryId": "INV-00694",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00703",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00725",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00746",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00747",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00748",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Campbell's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-197",
    "consultantName": "Gregory Murray",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S021"
    ],
    "items": [
      {
        "inventoryId": "INV-00695",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00726",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00747",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00748",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00749",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Murray's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-198",
    "consultantName": "Gregory Murray",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S271"
    ],
    "items": [
      {
        "inventoryId": "INV-00696",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00701",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00713",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00727",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00748",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00749",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00750",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Murray's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-199",
    "consultantName": "Gregory Murray",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S281"
    ],
    "items": [
      {
        "inventoryId": "INV-00697",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00699",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00702",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00714",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00728",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00749",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00750",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00731",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Murray's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-200",
    "consultantName": "Gregory Murray",
    "consultantTitle": "Mr",
    "specialty": "Plastics",
    "procedureOpcs4Codes": [
      "S351"
    ],
    "items": [
      {
        "inventoryId": "INV-00698",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00700",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00704",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00705",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00708",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00709",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00715",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00712",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00716",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00717",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00718",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00719",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00729",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00730",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00724",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00750",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00731",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00732",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Murray's standard setup for Plastics procedures",
    "instructions": "Standard Plastics procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-201",
    "consultantName": "Elizabeth Kelly",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q071"
    ],
    "items": [
      {
        "inventoryId": "INV-00771",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00779",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00808",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00809",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00810",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Kelly's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-202",
    "consultantName": "Elizabeth Kelly",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q081"
    ],
    "items": [
      {
        "inventoryId": "INV-00772",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00809",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00810",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00811",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Kelly's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-203",
    "consultantName": "Elizabeth Kelly",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q181"
    ],
    "items": [
      {
        "inventoryId": "INV-00773",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00810",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00811",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00812",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Kelly's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-204",
    "consultantName": "Elizabeth Kelly",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q201"
    ],
    "items": [
      {
        "inventoryId": "INV-00774",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00780",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00811",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00812",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00813",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Kelly's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-205",
    "consultantName": "Diana Robertson",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q301"
    ],
    "items": [
      {
        "inventoryId": "INV-00775",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00812",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00813",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00814",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Robertson's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-206",
    "consultantName": "Diana Robertson",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q071"
    ],
    "items": [
      {
        "inventoryId": "INV-00771",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00813",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00814",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00815",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Robertson's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-207",
    "consultantName": "Diana Robertson",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q081"
    ],
    "items": [
      {
        "inventoryId": "INV-00772",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00779",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00814",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00815",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00816",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Robertson's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-208",
    "consultantName": "Diana Robertson",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q181"
    ],
    "items": [
      {
        "inventoryId": "INV-00773",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00815",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00816",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00817",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Robertson's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-209",
    "consultantName": "Philip Hamilton",
    "consultantTitle": "Mr",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q201"
    ],
    "items": [
      {
        "inventoryId": "INV-00774",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00816",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00817",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00818",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hamilton's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-210",
    "consultantName": "Philip Hamilton",
    "consultantTitle": "Mr",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q301"
    ],
    "items": [
      {
        "inventoryId": "INV-00775",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00780",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00817",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00818",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00819",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hamilton's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-211",
    "consultantName": "Philip Hamilton",
    "consultantTitle": "Mr",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q071"
    ],
    "items": [
      {
        "inventoryId": "INV-00771",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00818",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00819",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00820",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hamilton's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-212",
    "consultantName": "Philip Hamilton",
    "consultantTitle": "Mr",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q081"
    ],
    "items": [
      {
        "inventoryId": "INV-00772",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00819",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00820",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00821",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Hamilton's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-213",
    "consultantName": "Caroline Shaw",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q181"
    ],
    "items": [
      {
        "inventoryId": "INV-00773",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00779",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00820",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00821",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00822",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Shaw's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-214",
    "consultantName": "Caroline Shaw",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q201"
    ],
    "items": [
      {
        "inventoryId": "INV-00774",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00821",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00822",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00823",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Shaw's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-215",
    "consultantName": "Caroline Shaw",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q301"
    ],
    "items": [
      {
        "inventoryId": "INV-00775",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00822",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00823",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00824",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Shaw's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-216",
    "consultantName": "Caroline Shaw",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q071"
    ],
    "items": [
      {
        "inventoryId": "INV-00771",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00780",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00802",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00823",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00824",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00825",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Shaw's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-217",
    "consultantName": "Helen Wood",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q081"
    ],
    "items": [
      {
        "inventoryId": "INV-00772",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00803",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00824",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00825",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00826",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Wood's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-218",
    "consultantName": "Helen Wood",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q181"
    ],
    "items": [
      {
        "inventoryId": "INV-00773",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00778",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00790",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00804",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00825",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00826",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00827",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Wood's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-219",
    "consultantName": "Helen Wood",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q201"
    ],
    "items": [
      {
        "inventoryId": "INV-00774",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00776",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00779",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00791",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00805",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00826",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00827",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00808",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Wood's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-220",
    "consultantName": "Helen Wood",
    "consultantTitle": "Ms",
    "specialty": "Gynaecology",
    "procedureOpcs4Codes": [
      "Q301"
    ],
    "items": [
      {
        "inventoryId": "INV-00775",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00777",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00781",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00782",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00785",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00786",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00792",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00789",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00793",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00794",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00795",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00796",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00806",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00807",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00801",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00827",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00808",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00809",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Wood's standard setup for Gynaecology procedures",
    "instructions": "Standard Gynaecology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-221",
    "consultantName": "Martin Freeman",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00848",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00856",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00885",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00886",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00887",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Freeman's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-222",
    "consultantName": "Martin Freeman",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M431"
    ],
    "items": [
      {
        "inventoryId": "INV-00849",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00886",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00887",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00888",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Freeman's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-223",
    "consultantName": "Martin Freeman",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M651"
    ],
    "items": [
      {
        "inventoryId": "INV-00850",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00887",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00888",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00889",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Freeman's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-224",
    "consultantName": "Martin Freeman",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M471"
    ],
    "items": [
      {
        "inventoryId": "INV-00851",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00857",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00888",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00889",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00890",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Freeman's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-225",
    "consultantName": "Lucy Marshall",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00852",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00889",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00890",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00891",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Marshall's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-226",
    "consultantName": "Lucy Marshall",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00848",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00890",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00891",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00892",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Marshall's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-227",
    "consultantName": "Lucy Marshall",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M431"
    ],
    "items": [
      {
        "inventoryId": "INV-00849",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00856",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00891",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00892",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00893",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Marshall's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-228",
    "consultantName": "Lucy Marshall",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M651"
    ],
    "items": [
      {
        "inventoryId": "INV-00850",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00892",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00893",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00894",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Marshall's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-229",
    "consultantName": "Stuart Carter",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M471"
    ],
    "items": [
      {
        "inventoryId": "INV-00851",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00893",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00894",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00895",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Carter's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-230",
    "consultantName": "Stuart Carter",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00852",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00857",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00894",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00895",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00896",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Carter's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-231",
    "consultantName": "Stuart Carter",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00848",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00895",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00896",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00897",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Carter's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-232",
    "consultantName": "Stuart Carter",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M431"
    ],
    "items": [
      {
        "inventoryId": "INV-00849",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00896",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00897",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00898",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Carter's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-233",
    "consultantName": "Anna Scott",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M651"
    ],
    "items": [
      {
        "inventoryId": "INV-00850",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00856",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00897",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00898",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00899",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Scott's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-234",
    "consultantName": "Anna Scott",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M471"
    ],
    "items": [
      {
        "inventoryId": "INV-00851",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00898",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00899",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00900",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Scott's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-235",
    "consultantName": "Anna Scott",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00852",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00899",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00900",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00901",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Scott's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-236",
    "consultantName": "Anna Scott",
    "consultantTitle": "Ms",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00848",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00857",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00879",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00900",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00901",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00902",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Scott's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-237",
    "consultantName": "Ian Holland",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M431"
    ],
    "items": [
      {
        "inventoryId": "INV-00849",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00880",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00901",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00902",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00903",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Holland's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-238",
    "consultantName": "Ian Holland",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M651"
    ],
    "items": [
      {
        "inventoryId": "INV-00850",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00855",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00867",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00881",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00902",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00903",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00904",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Holland's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-239",
    "consultantName": "Ian Holland",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M471"
    ],
    "items": [
      {
        "inventoryId": "INV-00851",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00853",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00856",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00868",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00882",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00903",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00904",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00885",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Holland's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-240",
    "consultantName": "Ian Holland",
    "consultantTitle": "Mr",
    "specialty": "Urology",
    "procedureOpcs4Codes": [
      "M421"
    ],
    "items": [
      {
        "inventoryId": "INV-00852",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00854",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00858",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00859",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00862",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00863",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00869",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00866",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00870",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00871",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00872",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00873",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00883",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00884",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00878",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00904",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00885",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00886",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Holland's standard setup for Urology procedures",
    "instructions": "Standard Urology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-241",
    "consultantName": "Douglas Lawrence",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D141"
    ],
    "items": [
      {
        "inventoryId": "INV-00925",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00933",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00962",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00963",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00964",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Lawrence's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-242",
    "consultantName": "Douglas Lawrence",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D151"
    ],
    "items": [
      {
        "inventoryId": "INV-00926",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00963",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00964",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00965",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Lawrence's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-243",
    "consultantName": "Douglas Lawrence",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F341"
    ],
    "items": [
      {
        "inventoryId": "INV-00927",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00964",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00965",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00966",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Lawrence's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-244",
    "consultantName": "Douglas Lawrence",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "E201"
    ],
    "items": [
      {
        "inventoryId": "INV-00928",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00934",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00965",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00966",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00967",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Lawrence's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-245",
    "consultantName": "Patricia Hunter",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F361"
    ],
    "items": [
      {
        "inventoryId": "INV-00929",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00966",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00967",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00968",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hunter's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-246",
    "consultantName": "Patricia Hunter",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D141"
    ],
    "items": [
      {
        "inventoryId": "INV-00925",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00967",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00968",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00969",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hunter's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-247",
    "consultantName": "Patricia Hunter",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D151"
    ],
    "items": [
      {
        "inventoryId": "INV-00926",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00933",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00968",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00969",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00970",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hunter's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-248",
    "consultantName": "Patricia Hunter",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F341"
    ],
    "items": [
      {
        "inventoryId": "INV-00927",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00969",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00970",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00971",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Hunter's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-249",
    "consultantName": "Colin Ellis",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "E201"
    ],
    "items": [
      {
        "inventoryId": "INV-00928",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00970",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00971",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00972",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Ellis's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-250",
    "consultantName": "Colin Ellis",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F361"
    ],
    "items": [
      {
        "inventoryId": "INV-00929",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00934",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00971",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00972",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00973",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Ellis's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-251",
    "consultantName": "Colin Ellis",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D141"
    ],
    "items": [
      {
        "inventoryId": "INV-00925",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00972",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00973",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00974",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Ellis's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-252",
    "consultantName": "Colin Ellis",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D151"
    ],
    "items": [
      {
        "inventoryId": "INV-00926",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00973",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00974",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00975",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Ellis's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-253",
    "consultantName": "Susan Knight",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F341"
    ],
    "items": [
      {
        "inventoryId": "INV-00927",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00933",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00974",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00975",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00976",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Knight's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-254",
    "consultantName": "Susan Knight",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "E201"
    ],
    "items": [
      {
        "inventoryId": "INV-00928",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00975",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00976",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00977",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Knight's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-255",
    "consultantName": "Susan Knight",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F361"
    ],
    "items": [
      {
        "inventoryId": "INV-00929",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00976",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00977",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00978",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Knight's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-256",
    "consultantName": "Susan Knight",
    "consultantTitle": "Ms",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D141"
    ],
    "items": [
      {
        "inventoryId": "INV-00925",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00934",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00956",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00977",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00978",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00979",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Knight's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-257",
    "consultantName": "Frank Price",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "D151"
    ],
    "items": [
      {
        "inventoryId": "INV-00926",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00957",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00978",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00979",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00980",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Price's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-258",
    "consultantName": "Frank Price",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F341"
    ],
    "items": [
      {
        "inventoryId": "INV-00927",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00932",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00944",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00958",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00979",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00980",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00981",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Price's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-259",
    "consultantName": "Frank Price",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "E201"
    ],
    "items": [
      {
        "inventoryId": "INV-00928",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00930",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00933",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00945",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 4
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00959",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00980",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00981",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-00962",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Price's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-260",
    "consultantName": "Frank Price",
    "consultantTitle": "Mr",
    "specialty": "ENT",
    "procedureOpcs4Codes": [
      "F361"
    ],
    "items": [
      {
        "inventoryId": "INV-00929",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00931",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00935",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00936",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00939",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00940",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00946",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00943",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00947",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00948",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00949",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00950",
        "quantity": 3
      },
      {
        "inventoryId": "INV-00960",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00961",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00955",
        "quantity": 2
      },
      {
        "inventoryId": "INV-00981",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00962",
        "quantity": 1
      },
      {
        "inventoryId": "INV-00963",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Price's standard setup for ENT procedures",
    "instructions": "Standard ENT procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-261",
    "consultantName": "Leonard Gibson",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C711"
    ],
    "items": [
      {
        "inventoryId": "INV-01002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01039",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01040",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01041",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Gibson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-262",
    "consultantName": "Leonard Gibson",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C721"
    ],
    "items": [
      {
        "inventoryId": "INV-01003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01040",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01041",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01042",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Gibson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-263",
    "consultantName": "Leonard Gibson",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C751"
    ],
    "items": [
      {
        "inventoryId": "INV-01004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01041",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01042",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01043",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Gibson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-264",
    "consultantName": "Leonard Gibson",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C761"
    ],
    "items": [
      {
        "inventoryId": "INV-01005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01042",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01043",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01044",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Gibson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-265",
    "consultantName": "Margaret Pearson",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C771"
    ],
    "items": [
      {
        "inventoryId": "INV-01006",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01043",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01044",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01045",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Pearson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-266",
    "consultantName": "Margaret Pearson",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C711"
    ],
    "items": [
      {
        "inventoryId": "INV-01002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01044",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01045",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01046",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Pearson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-267",
    "consultantName": "Margaret Pearson",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C721"
    ],
    "items": [
      {
        "inventoryId": "INV-01003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01045",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01046",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01047",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Pearson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-268",
    "consultantName": "Margaret Pearson",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C751"
    ],
    "items": [
      {
        "inventoryId": "INV-01004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01046",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01047",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01048",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Pearson's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-269",
    "consultantName": "Gerald Davies",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C761"
    ],
    "items": [
      {
        "inventoryId": "INV-01005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01047",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01048",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01049",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Davies's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-270",
    "consultantName": "Gerald Davies",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C771"
    ],
    "items": [
      {
        "inventoryId": "INV-01006",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01048",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01049",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01050",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Davies's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-271",
    "consultantName": "Gerald Davies",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C711"
    ],
    "items": [
      {
        "inventoryId": "INV-01002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01049",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01050",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01051",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Davies's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-272",
    "consultantName": "Gerald Davies",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C721"
    ],
    "items": [
      {
        "inventoryId": "INV-01003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01050",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01051",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01052",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Davies's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-273",
    "consultantName": "Catherine Allen",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C751"
    ],
    "items": [
      {
        "inventoryId": "INV-01004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01051",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01052",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01053",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Allen's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-274",
    "consultantName": "Catherine Allen",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C761"
    ],
    "items": [
      {
        "inventoryId": "INV-01005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01052",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01053",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01054",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Allen's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-275",
    "consultantName": "Catherine Allen",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C771"
    ],
    "items": [
      {
        "inventoryId": "INV-01006",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01053",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01054",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01055",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Allen's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-276",
    "consultantName": "Catherine Allen",
    "consultantTitle": "Ms",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C711"
    ],
    "items": [
      {
        "inventoryId": "INV-01002",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01011",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01033",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01054",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01055",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01056",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Ms Allen's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-277",
    "consultantName": "Roger Mason",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C721"
    ],
    "items": [
      {
        "inventoryId": "INV-01003",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01034",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01055",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01056",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01057",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Mason's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-278",
    "consultantName": "Roger Mason",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C751"
    ],
    "items": [
      {
        "inventoryId": "INV-01004",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01009",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01021",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01035",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01056",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01057",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01058",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Mason's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-279",
    "consultantName": "Roger Mason",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C761"
    ],
    "items": [
      {
        "inventoryId": "INV-01005",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01007",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01010",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01022",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01036",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01057",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01058",
        "quantity": 1,
        "notes": "Preferred brand"
      },
      {
        "inventoryId": "INV-01039",
        "quantity": 1,
        "notes": "Preferred brand"
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Mason's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  },
  {
    "id": "PC-280",
    "consultantName": "Roger Mason",
    "consultantTitle": "Mr",
    "specialty": "Ophthalmology",
    "procedureOpcs4Codes": [
      "C771"
    ],
    "items": [
      {
        "inventoryId": "INV-01006",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01008",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01012",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01013",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01016",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01017",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01023",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01020",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01024",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01025",
        "quantity": 3
      },
      {
        "inventoryId": "INV-01026",
        "quantity": 4
      },
      {
        "inventoryId": "INV-01027",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01037",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01038",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01032",
        "quantity": 2
      },
      {
        "inventoryId": "INV-01058",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01039",
        "quantity": 1
      },
      {
        "inventoryId": "INV-01040",
        "quantity": 1
      }
    ],
    "lastUpdated": "2025-01-20",
    "notes": "Mr Mason's standard setup for Ophthalmology procedures",
    "instructions": "Standard Ophthalmology procedure setup. Check implant sizes pre-op. Ensure all positioning aids available."
  }
];

export function getPreferenceCardsByConsultant(consultantName: string): PreferenceCard[] {
  return PREFERENCE_CARDS.filter(
    card => card.consultantName.toLowerCase() === consultantName.toLowerCase()
  );
}

export function getPreferenceCard(consultantName: string, opcs4Code: string, firebaseSurgeon?: {
  id?: string;
  firstName: string;
  lastName: string;
  title: string;
  specialtyName: string;
  primarySubspecialty?: string;
}): PreferenceCard | null {
  // First, try to find an existing preference card
  const existingCard = PREFERENCE_CARDS.find(
    card =>
      card.consultantName.toLowerCase() === consultantName.toLowerCase() &&
      card.procedureOpcs4Codes.includes(opcs4Code)
  );

  if (existingCard) {
    return existingCard;
  }

  // Check if we have a Firebase surgeon
  if (firebaseSurgeon) {
    const consultantInfo = {
      id: firebaseSurgeon.id || `FB-${firebaseSurgeon.lastName}`,
      title: firebaseSurgeon.title,
      firstName: firebaseSurgeon.firstName,
      lastName: firebaseSurgeon.lastName,
      fullName: `${firebaseSurgeon.title} ${firebaseSurgeon.firstName} ${firebaseSurgeon.lastName}`,
      specialty: firebaseSurgeon.specialtyName,
      subspecialty: firebaseSurgeon.primarySubspecialty
    };

    // Generate preference card for Firebase surgeon
    const procedureData = PROCEDURE_COSTS[opcs4Code];
    const specialty = procedureData?.specialty || firebaseSurgeon.specialtyName;
    const procedureName = procedureData?.procedureName || 'Procedure';

    // Continue with the existing generation logic using consultantInfo
    // ... (rest of the generation code stays the same, just use consultantInfo instead of realConsultant)
  }

  // If not found, check if this is a real Royal London consultant
  const realConsultant = ROYAL_LONDON_CONSULTANTS.find(
    c => c.lastName.toLowerCase() === consultantName.toLowerCase() ||
         c.fullName.toLowerCase().includes(consultantName.toLowerCase())
  );

  if (realConsultant || firebaseSurgeon) {
    const consultantInfo = realConsultant || {
      id: firebaseSurgeon!.id || `FB-${firebaseSurgeon!.lastName}`,
      title: firebaseSurgeon!.title,
      firstName: firebaseSurgeon!.firstName,
      lastName: firebaseSurgeon!.lastName,
      fullName: `${firebaseSurgeon!.title} ${firebaseSurgeon!.firstName} ${firebaseSurgeon!.lastName}`,
      specialty: firebaseSurgeon!.specialtyName,
      subspecialty: firebaseSurgeon!.primarySubspecialty
    };
    // Generate a comprehensive preference card for this real consultant
    const procedureData = PROCEDURE_COSTS[opcs4Code];
    const specialty = procedureData?.specialty || consultantInfo.specialty;
    const procedureName = procedureData?.procedureName || 'Procedure';

    // Determine positioning and anaesthetic based on specialty
    let positioning = 'Supine';
    let anaestheticType = 'General';
    let operatingTable = 'Standard operating table';

    if (specialty === 'Orthopaedics') {
      positioning = procedureName.toLowerCase().includes('hip') || procedureName.toLowerCase().includes('femur') ? 'Lateral' : 'Supine';
      operatingTable = 'Orthopaedic table with radiolucent top';
    } else if (specialty === 'Neurosurgery' || specialty === 'Neurology') {
      positioning = 'Prone with head pins';
      operatingTable = 'Neurosurgery table with Mayfield clamp';
    } else if (specialty === 'Plastics') {
      positioning = 'Supine or as required';
      anaestheticType = 'General or Regional';
    } else if (specialty === 'Urology') {
      positioning = 'Lithotomy';
      operatingTable = 'Urology table with leg supports';
    } else if (specialty === 'Cardiothoracic' || specialty === 'Vascular') {
      operatingTable = 'Imaging-compatible table';
    }

    // 1. General Information
    const generalInfo: GeneralInformation = {
      procedureName,
      positioning,
      anaestheticType,
      operatingTable,
      setupNotes: `Standard setup for ${specialty}`,
      cheatSheetLink: `/procedures/guide/${opcs4Code}` // Link to procedural guide
    };

    // 2. Positioning Equipment
    const positioningEquipment: PositioningEquipment = {
      items: []
    };

    if (positioning === 'Lateral') {
      positioningEquipment.items.push(
        { name: 'Lateral positioning bolsters', quantity: 2 },
        { name: 'Bean bag positioner', quantity: 1 },
        { name: 'Axillary roll', quantity: 1 }
      );
    } else if (positioning === 'Lithotomy') {
      positioningEquipment.items.push(
        { name: 'Leg holders/stirrups', quantity: 2 },
        { name: 'Lithotomy poles', quantity: 2 }
      );
    } else if (positioning === 'Prone with head pins') {
      positioningEquipment.items.push(
        { name: 'Mayfield head clamp', quantity: 1 },
        { name: 'Chest rolls', quantity: 2 },
        { name: 'Gel pads for pressure points', quantity: 4 }
      );
    } else {
      // Standard supine
      positioningEquipment.items.push(
        { name: 'Arm boards', quantity: 2 },
        { name: 'Head ring/pillow', quantity: 1 },
        { name: 'Gel pads for pressure points', quantity: 2 }
      );
    }

    // 3. Cleaning and Prep Solutions
    const cleaningAndPrep: CleaningAndPrep = {
      items: [
        { name: 'Chlorhexidine 2% in 70% IPA', volume: '10ml x 3 applicators', application: 'Skin preparation' },
        { name: 'Normal Saline', volume: '500ml', application: 'Wound irrigation' },
        { name: 'Betadine solution', volume: '10ml', application: 'Additional antisepsis if required' }
      ]
    };

    if (specialty === 'Orthopaedics') {
      cleaningAndPrep.items.push(
        { name: 'Pulse lavage system', volume: '3L bags', application: 'Joint/bone irrigation' }
      );
    }

    // 2. Drapes and Consumables
    const drapesAndConsumables: DrapesAndConsumables = {
      basic: [
        { inventoryId: 'INV-00001', quantity: 1 }, // Standard drape pack
        { inventoryId: 'INV-00006', quantity: 2 }, // Surgical gowns
        { inventoryId: 'INV-00009', quantity: 1 }, // Mayo stand cover
        { inventoryId: 'INV-00024', quantity: 3 }, // Gauze swabs
        { inventoryId: 'INV-00025', quantity: 4 }, // Lap sponges
      ],
      specific: [
        { inventoryId: 'INV-00012', quantity: 1, notes: 'Specific brand required' },
      ]
    };

    // 3. Instrument Sets
    const instrumentSets: InstrumentSets = {
      basic: [
        { name: 'General Surgery Basic Tray', description: 'Standard instruments' },
        { name: `${specialty} Basic Set`, description: `Trust's standard ${specialty} instruments` }
      ],
      specific: specialty === 'Orthopaedics' ? [
        { name: 'Hip Reconstruction Set', supplier: 'Stryker', type: 'loaned' },
        { name: 'Power Tools Set', supplier: 'DePuy Synthes', type: 'consigned' }
      ] : specialty === 'Cardiothoracic' ? [
        { name: 'Cardiac Surgery Set', supplier: 'Medtronic', type: 'consigned' }
      ] : []
    };

    // 4. Equipment
    const equipment: Equipment = {
      items: [
        { name: 'Diathermy', quantity: 1, settings: 'Bipolar 30W, Monopolar 40W' },
        { name: 'Suction', quantity: 2 },
        { name: 'Theatre lights', quantity: 2, settings: 'Focused on operative field' }
      ]
    };

    if (specialty === 'Orthopaedics') {
      equipment.items.push(
        { name: 'C-arm fluoroscopy', quantity: 1 },
        { name: 'Power tools (drill, saw)', quantity: 1 },
        { name: 'Tourniquet', quantity: 1, settings: 'As per patient weight' }
      );
    } else if (specialty === 'Gynaecology' || specialty === 'Urology') {
      equipment.items.push(
        { name: 'Laparoscopy stack', quantity: 1 },
        { name: 'Camera and monitor', quantity: 1 }
      );
    }

    // 5. Sutures and Closure
    const suturesAndClosure: SuturesAndClosure = {
      items: [
        { type: 'Vicryl', size: '2-0', needleType: 'CT-1', quantity: 2, usage: 'Deep tissue closure' },
        { type: 'Monocryl', size: '3-0', needleType: 'PS-2', quantity: 2, usage: 'Subcuticular closure' },
        { type: 'Nylon', size: '3-0', needleType: 'Cutting', quantity: 1, usage: 'Skin closure' },
        { type: 'Vicryl', size: '0', needleType: 'CT-1', quantity: 1, usage: 'Fascia' }
      ]
    };

    // 6. Implants/Prostheses (specialty-specific)
    const implantsAndProstheses: ImplantsAndProstheses = {
      items: []
    };

    if (specialty === 'Orthopaedics') {
      implantsAndProstheses.items.push(
        { name: 'Hip Prosthesis - Cemented', manufacturer: 'Stryker', size: 'As measured', quantity: 1, type: 'consigned' },
        { name: 'Bone Cement', manufacturer: 'Stryker', quantity: 2, type: 'purchased' }
      );
    } else if (specialty === 'Cardiothoracic') {
      implantsAndProstheses.items.push(
        { name: 'Heart Valve', manufacturer: 'Medtronic', size: 'As measured', quantity: 1, type: 'consigned' }
      );
    } else if (specialty === 'Vascular') {
      implantsAndProstheses.items.push(
        { name: 'Vascular Graft', manufacturer: 'Gore', catalogNumber: 'TBD', quantity: 1, type: 'consigned' }
      );
    }

    // 7. Medications and Fluids
    const medicationsAndFluids: MedicationsAndFluids = {
      items: [
        { name: 'Antibiotic prophylaxis', dose: 'As per protocol', route: 'IV', timing: 'Pre-incision' },
        { name: 'Local anaesthetic', dose: '0.25% Bupivacaine', route: 'Local infiltration', timing: 'Post-closure' },
        { name: 'Normal Saline', dose: '1000ml', route: 'IV', timing: 'Irrigation' },
        { name: 'Tranexamic acid', dose: '1g', route: 'IV', timing: 'Pre-incision' }
      ]
    };

    if (specialty === 'Orthopaedics') {
      medicationsAndFluids.items.push(
        { name: 'Antibiotic cement (if cemented)', dose: 'As per manufacturer', timing: 'Intra-operative' }
      );
    }

    // 8. Counts and Notes
    const countsAndNotes: CountsAndNotes = {
      instrumentCount: true,
      swabCount: true,
      needleCount: true,
      additionalNotes: 'Ensure all counts correct before closure. Document any discrepancies immediately.'
    };

    // 9. Wound Dressing
    const woundDressing: WoundDressing = {
      items: [
        { name: 'Non-adherent dressing', quantity: 1, type: 'Primary' },
        { name: 'Absorbent pad', quantity: 1, type: 'Secondary' },
        { name: 'Adhesive film dressing', quantity: 1, type: 'Tertiary' }
      ]
    };

    if (specialty === 'Plastics') {
      woundDressing.items.push(
        { name: 'Silicone gel sheet', quantity: 1, type: 'Specialty' },
        { name: 'Negative pressure wound therapy (if required)', quantity: 1, type: 'Specialty' }
      );
    } else if (specialty === 'Vascular') {
      woundDressing.items.push(
        { name: 'Pressure dressing', quantity: 1, type: 'Specialty' }
      );
    }

    // 10. Miscellaneous
    const miscellaneous: Miscellaneous = {
      items: [
        { name: 'Surgical marker pen', quantity: 1 },
        { name: 'Specimen pots (if required)', quantity: 2 },
        { name: 'Pathology forms', quantity: 1, notes: 'Complete if specimen sent' },
        { name: 'Patient warming blanket', quantity: 1 },
        { name: 'Tourniquet (if limb surgery)', quantity: 1, notes: 'Check pressure settings' }
      ]
    };

    // 11. Special Instructions
    const specialInstructions: SpecialInstructions = {
      preOperative: [
        'Confirm patient identity and surgical site',
        'WHO surgical safety checklist - Sign In',
        'Antibiotic prophylaxis administered',
        'Mark surgical site as per Trust policy'
      ],
      intraOperative: [
        'WHO surgical safety checklist - Time Out',
        'Maintain normothermia (target >36°C)',
        'Document blood loss and fluid balance',
        'Ensure diathermy plate correctly positioned'
      ],
      postOperative: [
        'WHO surgical safety checklist - Sign Out',
        'Confirm specimen labelling if applicable',
        'Apply wound dressing as per preference',
        'Document any intra-operative complications',
        'Handover to recovery with clear instructions'
      ],
      teamCommunication: [
        'Anticipated duration: As per procedure complexity',
        'Critical steps to be announced to team',
        'Any concerns to be raised immediately',
        'Debrief team at end of case'
      ]
    };

    return {
      id: `PC-${consultantInfo.id}-${opcs4Code}`,
      consultantName: consultantInfo.lastName,
      consultantTitle: consultantInfo.title,
      specialty: specialty,
      procedureOpcs4Codes: [opcs4Code],

      // New comprehensive sections
      generalInfo,
      positioningEquipment,
      cleaningAndPrep,
      drapesAndConsumables,
      instrumentSets,
      equipment,
      suturesAndClosure,
      implantsAndProstheses,
      medicationsAndFluids,
      woundDressing,
      miscellaneous,
      countsAndNotes,
      specialInstructions,

      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Auto-generated comprehensive preference card for ${consultantInfo.fullName}`
    };
  }

  return null;
}

export function getConsultantsForProcedure(opcs4Code: string): string[] {
  // First, try to find the procedure's specialty from PROCEDURE_COSTS
  const procedureData = PROCEDURE_COSTS[opcs4Code];

  if (procedureData?.specialty) {
    // Return real Royal London Hospital consultants for this specialty
    const realConsultants = getConsultantsBySpecialty(procedureData.specialty);
    if (realConsultants.length > 0) {
      return realConsultants.map(c => c.fullName);
    }
  }

  // Fallback to preference cards if no real consultants found
  const consultants = PREFERENCE_CARDS
    .filter(card => card.procedureOpcs4Codes.includes(opcs4Code))
    .map(card => `${card.consultantTitle} ${card.consultantName}`);
  return Array.from(new Set(consultants));
}
